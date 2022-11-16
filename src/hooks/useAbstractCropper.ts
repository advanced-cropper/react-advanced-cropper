import { useImperativeHandle, useRef } from 'react';
import {
	AbstractCropperInstanceCallbacks,
	AbstractCropperInstanceParameters,
	CropperImage,
	DrawOptions,
} from 'advanced-cropper';
import { StretchableBoundaryMethods } from '../components/service/StretchableBoundary';
import { CropperCanvasMethods } from '../components/service/CropperCanvas';
import { ExtendedSettings, SettingsExtension } from '../types';
import { AbstractCropperRef, AbstractCropperSettings } from '../components/AbstractCropper';
import { useStateWithCallback } from './useStateWithCallback';
import { CropperInstanceSettingsProp, useCropperInstance } from './useCropperInstance';
import { useCropperImage } from './useCropperImage';
import { useWindowResize } from './useWindowResize';
import { useUpdateEffect } from './useUpdateEffect';
import { useCropperAutoReconcile } from './useCropperAutoReconcile';

export interface AbstractCropperHookProps<Settings extends AbstractCropperSettings>
	extends AbstractCropperInstanceParameters<Settings>,
		AbstractCropperInstanceCallbacks<AbstractCropperRef<Settings>> {
	src?: string | null;
	checkOrientation?: boolean;
	canvas?: boolean;
	crossOrigin?: 'anonymous' | 'use-credentials' | boolean;
	onReady?: (cropper: AbstractCropperRef<Settings>) => void;
	onError?: (cropper: AbstractCropperRef<Settings>) => void;
	unloadTime?: number;
	autoReconcileState?: boolean;
	settings?: CropperInstanceSettingsProp<Settings>;
}

export function useAbstractCropper<Extension extends SettingsExtension = {}>(
	props: () => AbstractCropperHookProps<ExtendedSettings<Extension>>,
) {
	const {
		src,
		onReady,
		onError,
		onUpdate,
		canvas = true,
		unloadTime = 500,
		crossOrigin = true,
		checkOrientation = true,
		autoReconcileState = true,
	} = props();

	const imageRef = useRef<HTMLElement>(null);
	const boundaryRef = useRef<StretchableBoundaryMethods>(null);
	const canvasRef = useRef<CropperCanvasMethods>(null);
	const cropperRef = useRef<AbstractCropperRef<ExtendedSettings<Extension>>>(null);

	const [currentImage, setCurrentImage] = useStateWithCallback<CropperImage | null>(null);

	const cropper = useCropperInstance(() => ({
		...props(),
		getInstance() {
			return cropperRef.current;
		},
	}));

	const cropperImage = useCropperImage({
		src,
		crossOrigin,
		checkOrientation,
		unloadTime,
		canvas,
		onLoad() {
			if (cropperRef.current) {
				onReady?.(cropperRef.current);
			}
		},
		onError() {
			if (cropperRef.current) {
				onError?.(cropperRef.current);
			}
		},
	});

	const autoReconcile = useCropperAutoReconcile(cropper, autoReconcileState);

	const resetCropper = async () => {
		if (boundaryRef.current) {
			autoReconcile.pause();
			const image = cropperImage.getImage();
			const boundary = await boundaryRef.current?.stretchTo(image);
			setCurrentImage(image, () => {
				if (boundary && image) {
					cropper.reset(boundary, image);
				} else {
					cropper.clear();
				}
			});
			autoReconcile.resume();
		}
	};

	const refreshCropper = async () => {
		if (boundaryRef.current) {
			autoReconcile.pause();
			const image = cropperImage.getImage();
			const boundary = await boundaryRef.current?.stretchTo(image);
			if (boundary && image) {
				const state = cropper.getState();
				if (state) {
					if (boundary.width !== state.boundary.width || boundary.height !== state.boundary.height) {
						cropper.setBoundary(boundary);
						// It's important because, probably, after the boundary reset
						// the cropper can meet some restrictions that were broken before
						cropper.reconcileState();
					}
				} else {
					cropper.reset(boundary, image);
				}
			} else {
				cropper.clear();
			}
			autoReconcile.resume();
		}
	};
	const cropperInterface = {
		reset: () => resetCropper(),
		refresh: () => refreshCropper(),
		setImage: (image: CropperImage) => setCurrentImage(image),
		reconcileState: cropper.reconcileState,
		moveCoordinates: cropper.moveCoordinates,
		moveCoordinatesEnd: cropper.moveCoordinatesEnd,
		resizeCoordinates: cropper.resizeCoordinates,
		clear: cropper.clear,
		resizeCoordinatesEnd: cropper.resizeCoordinatesEnd,
		moveImage: cropper.moveImage,
		flipImage: cropper.flipImage,
		zoomImage: cropper.zoomImage,
		rotateImage: cropper.rotateImage,
		transformImage: cropper.transformImage,
		transformImageEnd: cropper.transformImageEnd,
		setCoordinates: cropper.setCoordinates,
		setVisibleArea: cropper.setVisibleArea,
		startTransitions: cropper.startTransitions,
		setState: cropper.setState,
		hasInteractions: cropper.hasInteractions,
		getStencilCoordinates: cropper.getStencilCoordinates,
		getCoordinates: cropper.getCoordinates,
		getVisibleArea: cropper.getVisibleArea,
		getTransforms: cropper.getTransforms,
		getTransitions: cropper.getTransitions,
		getInteractions: cropper.getInteractions,
		getSettings: cropper.getSettings,
		getState: cropper.getState,
		getDefaultState() {
			const state = cropper.getState();
			const image = cropperImage.getImage();
			if (state && image) {
				return cropper.createDefaultState(state.boundary, image);
			} else {
				return null;
			}
		},
		getCanvas: (options?: DrawOptions) => {
			const state = cropper.getState();
			if (imageRef.current && canvasRef.current && state) {
				return canvasRef.current.draw(state, imageRef.current, options);
			} else {
				return null;
			}
		},
		getImage: () => {
			return currentImage ? { ...currentImage } : null;
		},
		isLoading: cropperImage.isLoading,
		isLoaded: cropperImage.isLoaded,
	};

	useWindowResize(() => {
		refreshCropper();
	});

	useUpdateEffect(() => {
		resetCropper();
	}, [cropperImage.getImage()]);

	useUpdateEffect(() => {
		if (cropperRef.current) {
			onUpdate?.(cropperRef.current);
		}
	}, [cropperImage.isLoaded(), cropperImage.isLoading()]);

	useImperativeHandle(cropperRef, () => cropperInterface);

	return {
		cropper: cropperInterface,
		refs: {
			image: imageRef,
			boundary: boundaryRef,
			canvas: canvasRef,
		},
		image: currentImage,
	};
}
