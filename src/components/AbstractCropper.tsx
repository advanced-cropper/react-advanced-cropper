import React, { useImperativeHandle, useRef, CSSProperties, Ref } from 'react';
import cn from 'classnames';
import {
	DrawOptions,
	BoundaryStretchAlgorithm,
	DefaultSettings,
	defaultStencilConstraints,
	BoundarySizeAlgorithm,
	CoreSettings,
	CropperImage,
	CropperState,
	CropperTransitions,
	ModifierSettings,
	AbstractCropperCallbacks,
	AbstractCropperParameters,
} from 'advanced-cropper';

import {
	CropperBackgroundWrapperComponent,
	CropperWrapperComponent,
	StencilComponent,
	CropperBackgroundComponent,
	ArbitraryProps,
	StencilConstraints,
	SettingsExtension,
	ExtendedSettings,
	CustomCropperRef,
} from '../types';
import { useWindowResize } from '../hooks/useWindowResize';
import { useCropperImage } from '../hooks/useCropperImage';
import {
	CropperStateHook,
	CropperStateSettings,
	CropperStateSettingsProp,
	useCropperState,
} from '../hooks/useCropperState';
import { mergeRefs } from '../service/react';
import { useUpdateEffect } from '../hooks/useUpdateEffect';
import { useStateWithCallback } from '../hooks/useStateWithCallback';
import { createCropper } from '../service/cropper';
import { StretchableBoundary, StretchableBoundaryMethods } from './service/StretchableBoundary';
import { CropperWrapper } from './service/CropperWrapper';
import { CropperBackgroundImage } from './service/CropperBackgroundImage';
import { CropperCanvas, CropperCanvasMethods } from './service/CropperCanvas';
import { RectangleStencil } from './stencils/RectangleStencil';
import { CropperBackgroundWrapper } from './service/CropperBackgroundWrapper';
import './AbstractCropper.scss';

export type AbstractCropperSettingsProp<Settings extends CropperStateSettings> = CropperStateSettingsProp<Settings>;

export type AbstractCropperSettings = DefaultSettings & CoreSettings & ModifierSettings;

export interface AbstractCropperRef<Settings extends AbstractCropperSettings = AbstractCropperSettings> {
	reset: () => void;
	refresh: () => void;
	setCoordinates: CropperStateHook['setCoordinates'];
	setState: CropperStateHook['setState'];
	setImage: (image: CropperImage) => void;
	flipImage: CropperStateHook['flipImage'];
	zoomImage: CropperStateHook['zoomImage'];
	rotateImage: CropperStateHook['rotateImage'];
	reconcileState: CropperStateHook['reconcileState'];
	moveImage: CropperStateHook['moveImage'];
	moveCoordinates: CropperStateHook['moveCoordinates'];
	moveCoordinatesEnd: CropperStateHook['moveCoordinatesEnd'];
	resizeCoordinates: CropperStateHook['resizeCoordinates'];
	resizeCoordinatesEnd: CropperStateHook['resizeCoordinatesEnd'];
	transformImage: CropperStateHook['transformImage'];
	transformImageEnd: CropperStateHook['transformImageEnd'];
	getCoordinates: CropperStateHook['getCoordinates'];
	getVisibleArea: CropperStateHook['getVisibleArea'];
	getTransforms: CropperStateHook['getTransforms'];
	getStencilCoordinates: CropperStateHook['getStencilCoordinates'];
	getDefaultState: CropperStateHook['getDefaultState'];
	getCanvas: (options?: DrawOptions) => HTMLCanvasElement | null;
	getSettings: () => Settings;
	getImage: () => CropperImage | null;
	getState: () => CropperState | null;
	getTransitions: () => CropperTransitions;
}

export interface AbstractCropperProps<Settings extends AbstractCropperSettings>
	extends AbstractCropperParameters<Settings>,
		AbstractCropperCallbacks<AbstractCropperRef<Settings>> {
	src?: string | null;
	backgroundComponent?: CropperBackgroundComponent;
	backgroundProps?: ArbitraryProps;
	backgroundWrapperComponent?: CropperBackgroundWrapperComponent;
	backgroundWrapperProps?: ArbitraryProps;
	wrapperComponent?: CropperWrapperComponent;
	wrapperProps?: ArbitraryProps;
	stencilComponent?: StencilComponent;
	stencilProps?: ArbitraryProps;
	stencilConstraints?: StencilConstraints<AbstractCropperSettingsProp<Settings>>;
	className?: string;
	imageClassName?: string;
	boundaryClassName?: string;
	backgroundClassName?: string;
	checkOrientation?: boolean;
	canvas?: boolean;
	crossOrigin?: 'anonymous' | 'use-credentials';
	boundaryStretchAlgorithm?: BoundaryStretchAlgorithm;
	boundarySizeAlgorithm?: BoundarySizeAlgorithm | string;
	style?: CSSProperties;
	onReady?: (cropper: AbstractCropperRef<Settings>) => void;
	onError?: (cropper: AbstractCropperRef<Settings>) => void;
	unloadTime?: number;
	settings: CropperStateSettingsProp<Settings>;
}

export type AbstractCropperIntrinsicProps<Settings extends AbstractCropperSettings> = Omit<
	AbstractCropperProps<Settings>,
	'settings'
>;

const AbstractCropperComponent = <Extension extends SettingsExtension = {}>(
	props: AbstractCropperProps<ExtendedSettings<Extension>>,
	ref: Ref<CustomCropperRef<Extension>>,
) => {
	const {
		src,
		stencilComponent = RectangleStencil,
		stencilConstraints = defaultStencilConstraints,
		stencilProps = {},
		wrapperComponent = CropperWrapper,
		wrapperProps = {},
		backgroundComponent = CropperBackgroundImage,
		backgroundProps = {},
		backgroundWrapperComponent = CropperBackgroundWrapper,
		backgroundWrapperProps = {},
		imageClassName,
		className,
		boundaryClassName,
		backgroundClassName,
		boundarySizeAlgorithm,
		boundaryStretchAlgorithm,
		crossOrigin = true,
		checkOrientation = true,
		canvas = true,
		style,
		onReady,
		onError,
		unloadTime = 500,
		settings,
		...parameters
	} = props;

	const stencilRef = useRef<StencilComponent>(null);
	const imageRef = useRef<HTMLImageElement | HTMLCanvasElement>(null);
	const boundaryRef = useRef<StretchableBoundaryMethods>(null);
	const canvasRef = useRef<CropperCanvasMethods>(null);
	const cropperRef = useRef<AbstractCropperRef<ExtendedSettings<Extension>>>(null);

	const cropper = useCropperState(() => ({
		...parameters,
		getInstance() {
			return cropperRef.current;
		},
		settings: {
			...settings,
			...stencilConstraints(settings, {
				...stencilProps,
				...stencilRef.current,
			}),
		},
	}));

	const { image, loaded, loading } = useCropperImage({
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

	const [currentImage, setCurrentImage] = useStateWithCallback<CropperImage | null>(null);

	const resetCropper = () => {
		boundaryRef.current?.stretchTo(image).then((boundary) => {
			setCurrentImage(image, () => {
				if (boundary && image) {
					cropper.reset(boundary, image);
				} else {
					cropper.clear();
				}
			});
		});
	};

	const refreshCropper = () => {
		boundaryRef.current?.stretchTo(image).then((boundary) => {
			if (boundary && image) {
				const state = cropper.getState();
				if (state) {
					if (boundary.width !== state.boundary.width || boundary.height !== state.boundary.height) {
						cropper.setBoundary(boundary);
					}
					cropper.reconcileState();
				} else {
					cropper.reset(boundary, image);
				}
			} else {
				cropper.clear();
			}
		});
	};

	const cropperInterface = {
		reset: () => {
			resetCropper();
		},
		refresh: () => {
			refreshCropper();
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
		setImage: (image: CropperImage) => {
			setCurrentImage(image);
		},
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
		setState: cropper.setState,
		getDefaultState: cropper.getDefaultState,
		getStencilCoordinates: cropper.getStencilCoordinates,
		getCoordinates: cropper.getCoordinates,
		getVisibleArea: cropper.getVisibleArea,
		getTransforms: cropper.getTransforms,
		getTransitions: cropper.getTransitions,
		getSettings: cropper.getSettings,
		getState: cropper.getState,
	};

	useWindowResize(() => {
		refreshCropper();
	});

	useUpdateEffect(() => {
		resetCropper();
	}, [image]);

	useImperativeHandle(mergeRefs([ref, cropperRef]), () => cropperInterface);

	const StencilComponent = stencilComponent;

	const WrapperComponent = wrapperComponent;

	const BackgroundWrapperComponent = backgroundWrapperComponent;

	const BackgroundComponent = backgroundComponent;

	return (
		<WrapperComponent
			{...wrapperProps}
			className={cn('react-advanced-cropper', className)}
			loaded={loaded}
			cropper={cropperInterface}
			loading={loading}
			style={style}
		>
			<StretchableBoundary
				ref={boundaryRef}
				stretchAlgorithm={boundaryStretchAlgorithm}
				sizeAlgorithm={boundarySizeAlgorithm}
				className={cn('react-advanced-cropper__boundary', boundaryClassName)}
				stretcherClassName={cn('react-advanced-cropper__stretcher')}
			>
				<BackgroundWrapperComponent
					{...backgroundWrapperProps}
					cropper={cropperInterface}
					className={'react-advanced-cropper__background-wrapper'}
				>
					<div className={cn('react-advanced-cropper__background', backgroundClassName)}>
						{cropper.getState() && (
							<BackgroundComponent
								{...backgroundProps}
								ref={imageRef}
								crossOrigin={crossOrigin}
								cropper={cropperInterface}
								className={cn('react-advanced-cropper__image', imageClassName)}
							/>
						)}
					</div>
					<StencilComponent
						{...stencilProps}
						ref={stencilRef}
						cropper={cropperInterface}
						image={currentImage}
					/>
				</BackgroundWrapperComponent>
				{canvas && <CropperCanvas ref={canvasRef} />}
			</StretchableBoundary>
		</WrapperComponent>
	);
};

export const AbstractCropper = createCropper(AbstractCropperComponent);
