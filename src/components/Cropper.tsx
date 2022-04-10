import React, { forwardRef, useImperativeHandle, useRef, CSSProperties } from 'react';
import cn from 'classnames';
import { DrawOptions } from 'advanced-cropper/canvas';
import { calculateAspectRatio } from 'advanced-cropper/service';
import { StretchAlgorithm } from 'advanced-cropper/html';
import {
	BoundarySizeAlgorithm,
	CropperImage,
	CropperSettings,
	CropperState,
	CropperTransitions,
} from 'advanced-cropper/types';
import {
	BasicCropperRef,
	CropperBackgroundWrapperComponent,
	CropperWrapperComponent,
	MoveImageSettings,
	ScaleImageSettings,
	RotateImageSettings,
	StencilComponent,
	BasicCropperCallbacks,
	BasicCropperProps,
} from '../types';
import { useWindowResize } from '../hooks/useWindowResize';
import { useCropperImage } from '../hooks/useCropperImage';
import { useMoveImageOptions } from '../hooks/useMoveImageOptions';
import { useScaleImageOptions } from '../hooks/useScaleImageOptions';
import { CropperStateHook, useCropperState } from '../hooks/useCropperState';
import { mergeRefs } from '../service/react';
import { useUpdateEffect } from '../hooks/useUpdateEffect';
import { useRotateImageOptions } from '../hooks/useRotateImageOptions';
import { useStateWithCallback } from '../hooks/useStateWithCallback';
import { StretchableBoundary, StretchableBoundaryMethods } from './service/StretchableBoundary';
import { CropperWrapper } from './service/CropperWrapper';
import { CropperBackgroundImage } from './service/CropperBackgroundImage';
import { CropperCanvas, CropperCanvasMethods } from './service/CropperCanvas';
import { RectangleStencil } from './stencils/RectangleStencil';
import { CropperBackgroundWrapper } from './service/CropperBackgroundWrapper';
import './Cropper.scss';

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
	getImage: () => CropperImage | null;
	getState: () => CropperState | null;
	getTransitions: () => CropperTransitions;
}

export interface CropperProps extends BasicCropperProps, BasicCropperCallbacks<CropperRef> {
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
	scaleImage?: boolean | ScaleImageSettings;
	moveImage?: boolean | MoveImageSettings;
	boundarySizeAlgorithm?: BoundarySizeAlgorithm | string;
	stretchAlgorithm?: StretchAlgorithm;
	style?: CSSProperties;
	onReady?: (cropper: CropperRef) => void;
	onError?: (cropper: CropperRef) => void;
	unloadTime?: number;
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
		scaleImage = true,
		moveImage = true,
		rotateImage = false,
		style,
		stencilProps = {},
		onReady,
		onError,
		stateSettings,
		unloadTime = 500,
		...cropperSettings
	} = props;

	const stencilRef = useRef<StencilComponent>(null);
	const imageRef = useRef<HTMLImageElement>(null);
	const boundaryRef = useRef<StretchableBoundaryMethods>(null);
	const canvasRef = useRef<CropperCanvasMethods>(null);
	const cropperRef = useRef<CropperRef>(null);

	const rotateImageOptions = useRotateImageOptions(rotateImage);
	const scaleImageOptions = useScaleImageOptions(scaleImage);
	const moveImageOptions = useMoveImageOptions(moveImage);

	const cropper = useCropperState({
		...stateSettings,
		...cropperSettings,
		scaleImage: scaleImageOptions,
		getInstance() {
			return cropperRef.current;
		},
		aspectRatio() {
			return calculateAspectRatio(stencilRef.current?.aspectRatio?.(), stencilProps);
		},
	});

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
				if (cropper.state) {
					cropper.setBoundary(boundary);
				} else {
					cropper.reset(boundary, image);
				}
			} else {
				cropper.clear();
			}
		});
	};

	useWindowResize(() => {
		refreshCropper();
	});

	useUpdateEffect(() => {
		cropper.reconcileState();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [stencilComponent, stencilProps.aspectRatio, stencilProps.maxAspectRatio, stencilProps.minAspectRatio]);

	useUpdateEffect(() => {
		resetCropper();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [image]);

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
			<StretchableBoundary
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
					wheelScale={scaleImageOptions.wheel}
					touchScale={scaleImageOptions.touch}
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
			</StretchableBoundary>
		</WrapperComponent>
	);
});
