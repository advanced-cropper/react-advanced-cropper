import React, { forwardRef, useImperativeHandle, useRef, CSSProperties, useState } from 'react';
import cn from 'classnames';
import { DrawOptions } from 'advanced-cropper/canvas';
import { StretchAlgorithm } from 'advanced-cropper/html';
import {
	BoundarySizeAlgorithm,
	CropperImage,
	CropperSettings,
	CropperState,
	CropperTransitions,
} from 'advanced-cropper/types';
import { isUndefined } from 'advanced-cropper/utils';
import {
	BasicCropperRef,
	CropperBackgroundWrapperComponent,
	CropperWrapperComponent,
	MoveImageSettings,
	ResizeImageSettings,
	RotateImageSettings,
	StencilComponent,
} from '../types';
import { useWindowResize } from '../hooks/useWindowResize';
import { useCropperImage } from '../hooks/useCropperImage';
import { useMoveImageOptions } from '../hooks/useMoveImageOptions';
import { useResizeImageOptions } from '../hooks/useResizeImageOptions';
import {
	CropperStateCallbacks,
	CropperStateHook,
	CropperStateSettings,
	useCropperState,
} from '../hooks/useCropperState';
import { mergeRefs } from '../service/react';
import { useUpdateEffect } from '../hooks/useUpdateEffect';
import { useRotateImageOptions } from '../hooks/useRotateImageOptions';
import { CropperBoundary, CropperBoundaryMethods } from './service/CropperBoundary';
import { CropperWrapper } from './service/CropperWrapper';
import { CropperBackgroundImage } from './service/CropperBackgroundImage';
import { CropperCanvas, CropperCanvasMethods } from './service/CropperCanvas';
import { RectangleStencil } from './stencils/RectangleStencil';
import { CropperBackgroundWrapper } from './service/CropperBackgroundWrapper';
import './Cropper.scss';

export interface CropperProps extends CropperStateSettings, CropperStateCallbacks<CropperRef | null> {
	src?: string | null;
	backgroundWrapperComponent?: CropperBackgroundWrapperComponent;
	backgroundWrapperProps?: Record<string | number | symbol, unknown>;
	stateSettings?: Record<string | number | symbol, unknown>;
	wrapperComponent?: CropperWrapperComponent;
	wrapperProps?: Record<string | number | symbol, unknown>;
	stencilComponent?: StencilComponent;
	stencilProps?: Record<string | number | symbol, unknown>;
	className?: string;
	imageClassName?: string;
	boundaryClassName?: string;
	backgroundClassName?: string;
	checkOrientation?: boolean;
	canvas?: boolean;
	crossOrigin?: 'anonymous' | 'use-credentials';
	rotateImage?: boolean | RotateImageSettings;
	resizeImage?: boolean | ResizeImageSettings;
	moveImage?: boolean | MoveImageSettings;
	boundarySizeAlgorithm?: BoundarySizeAlgorithm | string;
	stretchAlgorithm?: StretchAlgorithm;
	style?: CSSProperties;
	onReady?: (cropper: CropperRef) => void;
	onError?: (cropper: CropperRef) => void;
}

export interface CropperRef extends BasicCropperRef {
	reset: () => void;
	refresh: () => void;
	setCoordinates: CropperStateHook['setCoordinates'];
	setState: CropperStateHook['setState'];
	flipImage: CropperStateHook['flipImage'];
	zoomImage: CropperStateHook['zoomImage'];
	rotateImage: CropperStateHook['rotateImage'];
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
	getCanvas: (options?: DrawOptions) => HTMLCanvasElement | null;
	getSettings: () => CropperSettings;
	getImage: () => CropperImage;
	getState: () => CropperState;
	getTransitions: () => CropperTransitions;
}

export const Cropper = forwardRef((props: CropperProps, ref) => {
	const {
		src,
		stencilComponent = RectangleStencil,
		wrapperComponent = CropperWrapper,
		wrapperProps = {},
		backgroundWrapperComponent = CropperBackgroundWrapper,
		backgroundWrapperProps = {},
		imageClassName,
		className,
		boundaryClassName,
		backgroundClassName,
		boundarySizeAlgorithm,
		stretchAlgorithm,
		crossOrigin = true,
		checkOrientation = true,
		canvas = true,
		resizeImage = true,
		moveImage = true,
		rotateImage = false,
		style,
		stencilProps = {},
		onReady,
		onError,
		stateSettings,
		...cropperSettings
	} = props;

	const stencilRef = useRef<StencilComponent>(null);
	const imageRef = useRef<HTMLImageElement>(null);
	const boundaryRef = useRef<CropperBoundaryMethods>(null);
	const canvasRef = useRef<CropperCanvasMethods>(null);
	const cropperRef = useRef<CropperRef>(null);

	const rotateImageOptions = useRotateImageOptions(rotateImage);
	const resizeImageOptions = useResizeImageOptions(resizeImage);
	const moveImageOptions = useMoveImageOptions(moveImage);

	const cropper = useCropperState({
		...stateSettings,
		...cropperSettings,
		adjustStencil: resizeImageOptions.adjustStencil,
		getInstance() {
			return cropperRef.current;
		},
		aspectRatio() {
			let minimum, maximum;
			const { aspectRatio, minAspectRatio, maxAspectRatio } = stencilProps;

			if (stencilRef.current && stencilRef.current.aspectRatio) {
				({ minimum, maximum } = stencilRef.current.aspectRatio() || {});
			}

			if (isUndefined(minimum)) {
				minimum = !isUndefined(aspectRatio) ? aspectRatio : minAspectRatio;
			}
			if (isUndefined(maximum)) {
				maximum = !isUndefined(aspectRatio) ? aspectRatio : maxAspectRatio;
			}
			return {
				minimum,
				maximum,
			};
		},
	});

	const { image, loaded, loading } = useCropperImage({
		src,
		crossOrigin,
		checkOrientation,
		minimumLoadingTime: 500,
		unloadTime: 500,
		canvas,
		onLoad() {
			if (cropperRef.current) {
				onReady && onReady(cropperRef.current);
			}
		},
		onError() {
			if (cropperRef.current) {
				onError && onError(cropperRef.current);
			}
		},
	});

	// Additional variable to give the possibility to change an image without resetting the state
	const [currentImage, setCurrentImage] = useState<CropperImage | null>(null);

	const resetCropper = () => {
		if (boundaryRef.current) {
			boundaryRef.current.stretchTo(image).then((boundary) => {
				if (boundary && image) {
					cropper.reset(boundary, image);
				} else {
					cropper.clear();
				}
				setCurrentImage(image);
			});
		}
	};

	const refreshCropper = () => {
		if (boundaryRef.current) {
			boundaryRef.current.stretchTo(image).then((boundary) => {
				if (boundary && image) {
					if (cropper.state) {
						cropper.setBoundary(boundary);
					} else {
						cropper.reset(boundary, image);
					}
				} else {
					cropper.clear();
				}
			});
		}
	};

	useUpdateEffect(() => {
		cropper.reconcileState();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [stencilComponent, stencilProps.aspectRatio, stencilProps.maxAspectRatio, stencilProps.minAspectRatio]);

	useUpdateEffect(() => {
		resetCropper();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [image]);

	useWindowResize(() => {
		refreshCropper();
	});

	useImperativeHandle(mergeRefs([ref, cropperRef]), () => ({
		reset: () => {
			resetCropper();
		},
		refresh: () => {
			refreshCropper();
		},
		getCanvas: (options?: DrawOptions) => {
			if (imageRef.current && canvasRef.current && cropper.state) {
				return canvasRef.current.draw(cropper.state, imageRef.current, options);
			} else {
				return null;
			}
		},
		getImage: () => {
			return { ...currentImage };
		},
		setImage: (image: CropperImage) => {
			setCurrentImage(image);
		},
		moveCoordinates: cropper.moveCoordinates,
		moveCoordinatesEnd: cropper.moveCoordinatesEnd,
		resizeCoordinates: cropper.resizeCoordinates,
		resizeCoordinatesEnd: cropper.resizeCoordinatesEnd,
		moveImage: cropper.moveImage,
		flipImage: cropper.flipImage,
		zoomImage: cropper.zoomImage,
		rotateImage: cropper.rotateImage,
		transformImage: cropper.transformImage,
		transformImageEnd: cropper.transformImageEnd,
		setCoordinates: cropper.setCoordinates,
		setState: cropper.setState,
		getStencilCoordinates: cropper.getStencilCoordinates,
		getCoordinates: cropper.getCoordinates,
		getVisibleArea: cropper.getVisibleArea,
		getTransforms: cropper.getTransforms,
		getTransitions: cropper.getTransitions,
		getSettings: cropper.getSettings,
		getState: cropper.getState,
	}));

	const StencilComponent = stencilComponent;

	const WrapperComponent = wrapperComponent;

	const BackgroundWrapperComponent = backgroundWrapperComponent;

	return (
		<WrapperComponent
			{...wrapperProps}
			className={cn('react-advanced-cropper', className)}
			loaded={loaded && currentImage === image}
			cropper={cropper}
			loading={loading}
			style={style}
		>
			<CropperBoundary
				ref={boundaryRef}
				stretchAlgorithm={stretchAlgorithm}
				sizeAlgorithm={boundarySizeAlgorithm}
				className={cn('react-advanced-cropper__boundary', boundaryClassName)}
				stretcherClassName={cn('react-advanced-cropper__stretcher')}
			>
				<BackgroundWrapperComponent
					{...backgroundWrapperProps}
					cropper={cropper}
					className={'react-advanced-cropper__background-wrapper'}
					wheelResize={resizeImageOptions.wheel}
					touchResize={resizeImageOptions.touch}
					touchMove={moveImageOptions.touch}
					mouseMove={moveImageOptions.mouse}
					touchRotate={rotateImageOptions.touch}
				>
					<div className={cn('react-advanced-cropper__background', backgroundClassName)}>
						{cropper.state && (
							<CropperBackgroundImage
								ref={imageRef}
								crossOrigin={crossOrigin}
								image={currentImage}
								state={cropper.state}
								transitions={cropper.transitions}
								className={cn('react-advanced-cropper__image', imageClassName)}
							/>
						)}
					</div>
					<StencilComponent {...stencilProps} ref={stencilRef} cropper={cropper} image={currentImage} />
				</BackgroundWrapperComponent>
				{canvas && <CropperCanvas ref={canvasRef} />}
			</CropperBoundary>
		</WrapperComponent>
	);
});
