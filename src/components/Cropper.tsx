import React, { CSSProperties, useLayoutEffect } from 'react';
import { forwardRef, useImperativeHandle, useRef } from 'react';
import cn from 'classnames';
import { DrawOptions } from 'advanced-cropper/canvas';
import { StretchAlgorithm } from 'advanced-cropper/html';
import { BoundarySizeAlgorithm, CropperImage, CropperSettings, CropperState, CropperTransitions } from 'advanced-cropper/types';
import { isUndefined } from 'advanced-cropper/utils';
import { MoveImageSettings, ResizeImageSettings, StencilComponent } from '../types';
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
import { CropperBoundary, CropperBoundaryMethods } from './service/CropperBoundary';
import { CropperWrapper } from './service/CropperWrapper';
import { CropperBackgroundImage } from './service/CropperBackgroundImage';
import { CropperCanvas, CropperCanvasMethods } from './service/CropperCanvas';
import { RectangleStencil } from './stencils/RectangleStencil';
import './Cropper.scss';

export interface CropperProps extends CropperStateSettings, CropperStateCallbacks<CropperRef | null> {
	src?: string | null;
	stencilComponent?: StencilComponent;
	stencilProps?: Record<string | number | symbol, unknown>;
	className?: string;
	imageClassName?: string;
	boundaryClassName?: string;
	backgroundClassName?: string;
	checkOrientation?: boolean;
	canvas?: boolean;
	crossOrigin?: 'anonymous' | 'use-credentials';
	resizeImage?: boolean | ResizeImageSettings;
	moveImage?: boolean | MoveImageSettings;
	boundarySizeAlgorithm?: BoundarySizeAlgorithm | string;
	stretchAlgorithm?: StretchAlgorithm;
	style?: CSSProperties;
	wrapperStyle?: CSSProperties;
	onReady?: (cropper: CropperRef) => void;
	onError?: (cropper: CropperRef) => void;
}

export interface CropperRef {
	reset: () => void;
	refresh: () => void;
	setCoordinates: CropperStateHook['setCoordinates'];
	setState: CropperStateHook['setState'];
	flip: CropperStateHook['flip'];
	zoom: CropperStateHook['zoom'];
	rotate: CropperStateHook['rotate'];
	move: CropperStateHook['move'];
	getCoordinates: CropperStateHook['getCoordinates'];
	getVisibleArea: CropperStateHook['getVisibleArea'];
	getTransforms: CropperStateHook['getTransforms'];
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
		style,
		wrapperStyle,
		stencilProps = {},
		onReady,
		onError,
		...cropperSettings
	} = props;

	const stencilRef = useRef<StencilComponent>(null);
	const imageRef = useRef<HTMLImageElement>(null);
	const boundaryRef = useRef<CropperBoundaryMethods>(null);
	const canvasRef = useRef<CropperCanvasMethods>(null);
	const cropperRef = useRef<CropperRef>(null);

	const resizeImageOptions = useResizeImageOptions(resizeImage);
	const moveImageOptions = useMoveImageOptions(moveImage);


	const { image, loaded } = useCropperImage({
		src,
		crossOrigin,
		checkOrientation,
		minimumLoadingTime: 500,
		unloadTime: 500,
		canvas,
		onLoad() {
			onReady && onReady(cropperRef.current);
		},
		onError() {
			onError && onError(cropperRef.current);
		},
	});

	const cropper = useCropperState({
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

	const resetCropper = () => {
		if (boundaryRef.current) {
			boundaryRef.current.stretchTo(image).then((boundary) => {
				if (boundary) {
					cropper.reset(boundary, image);
				} else {
					cropper.clear();
				}
			});
		}
	};

	const refreshCropper = () => {
		if (boundaryRef.current) {
			boundaryRef.current.stretchTo(image).then((boundary) => {
				if (boundary) {
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
			if (imageRef.current && canvasRef.current) {
				return canvasRef.current.draw(cropper.state, imageRef.current, options);
			} else {
				return null;
			}
		},
		getImage: () => {
			return { ...image };
		},
		flip: cropper.flip,
		zoom: cropper.zoom,
		rotate: cropper.rotate,
		move: cropper.move,
		setCoordinates: cropper.setCoordinates,
		setState: cropper.setState,
		getCoordinates: cropper.getCoordinates,
		getVisibleArea: cropper.getVisibleArea,
		getTransforms: cropper.getTransforms,
		getTransitions: cropper.getTransitions,
		getSettings: cropper.getSettings,
		getState: cropper.getState,
	}));

	const Stencil = stencilComponent;

	return (
		<CropperBoundary
			style={style}
			ref={boundaryRef}
			stretchAlgorithm={stretchAlgorithm}
			sizeAlgorithm={boundarySizeAlgorithm}
			className={cn('react-advanced-cropper', className)}
			contentClassName={cn('react-advanced-cropper__boundary', boundaryClassName)}
			stretcherClassName={cn('react-advanced-cropper__stretcher')}
		>
			<CropperWrapper
				className={cn(
					'react-advanced-cropper__wrapper',
					cropper.state && loaded && 'react-advanced-cropper__wrapper--visible',
				)}
				wheelResize={resizeImageOptions.wheel}
				touchResize={resizeImageOptions.touch}
				touchMove={moveImageOptions.touch}
				mouseMove={moveImageOptions.mouse}
				onMove={cropper.onTransformImage}
				onResize={cropper.onTransformImage}
				onTransformEnd={cropper.onTransformImageEnd}
				style={wrapperStyle}
			>
				<div className={cn('react-advanced-cropper__background', backgroundClassName)}>
					{cropper.state && (
						<CropperBackgroundImage
							ref={imageRef}
							crossOrigin={crossOrigin}
							image={image}
							state={cropper.state}
							transitions={cropper.transitions}
							className={cn('react-advanced-cropper__image', imageClassName)}
						/>
					)}
				</div>
				<Stencil
					{...stencilProps}
					ref={stencilRef}
					image={image}
					state={cropper.state}
					transitions={cropper.transitions}
					onResize={cropper.onResize}
					onResizeEnd={cropper.onResizeEnd}
					onMove={cropper.onMove}
					onMoveEnd={cropper.onMoveEnd}
				/>
				{canvas && <CropperCanvas ref={canvasRef} />}
			</CropperWrapper>
		</CropperBoundary>
	);
});
