import React, {
	RefObject,
	ComponentType,
	CSSProperties,
	forwardRef,
	useImperativeHandle,
	useLayoutEffect,
	useRef,
	useState,
} from 'react';
import cn from 'classnames';
import {
	CropperImage,
	CropperState,
	CropperTransitions,
	Size,
	ratio,
	isGreater,
	stretchPreviewBoundary,
} from 'advanced-cropper';
import { StretchableBoundary, StretchableBoundaryMethods } from '../service/StretchableBoundary';
import { useWindowResize } from '../../hooks/useWindowResize';
import { ArbitraryProps, CropperBoundaryComponent } from '../../types';
import { useForceRerender } from '../../hooks/useForceRerender';
import { CropperPreviewWrapper } from './CropperPreviewWrapper';
import { CropperPreviewBackground } from './CropperPreviewBackground';

interface DesiredCropperRef {
	getState: () => CropperState | null;
	getImage: () => CropperImage | null;
	getTransitions: () => CropperTransitions;
	isLoading: () => boolean;
	isLoaded: () => boolean;
}

export interface CropperPreviewRef {
	refresh: () => void;
	update: (cropper?: DesiredCropperRef) => void;
}

type PreviewWrapperComponent = ComponentType<{
	cropper: any;
	className?: string;
	style?: CSSProperties;
	loading?: boolean;
	loaded?: boolean;
}>;

type PreviewBackgroundComponent = ComponentType<{
	cropper: any;
	size: Size | null;
	className?: string;
}>;

interface Props {
	state?: CropperState | null;
	image?: CropperImage | null;
	transitions?: CropperTransitions | null;
	loading?: boolean;
	loaded?: boolean;
	className?: string;
	contentClassName?: string;
	backgroundClassName?: string;
	backgroundComponent?: PreviewBackgroundComponent;
	backgroundProps?: ArbitraryProps;
	boundaryComponent?: CropperBoundaryComponent;
	boundaryProps?: ArbitraryProps;
	boundaryClassName?: string;
	wrapperComponent?: PreviewWrapperComponent;
	wrapperProps?: ArbitraryProps;
	style?: CSSProperties;
	cropper?: RefObject<DesiredCropperRef | null>;
}

export const CropperPreview = forwardRef<CropperPreviewRef, Props>(
	(
		{
			className,
			contentClassName,
			state = null,
			image = null,
			transitions = null,
			backgroundComponent = CropperPreviewBackground,
			backgroundProps,
			backgroundClassName,
			boundaryComponent = StretchableBoundary,
			boundaryProps,
			boundaryClassName,
			wrapperComponent = CropperPreviewWrapper,
			wrapperProps,
			loaded = true,
			loading = false,
			style,
			cropper,
		}: Props,
		ref,
	) => {
		const rerender = useForceRerender();

		const boundaryRef = useRef<StretchableBoundaryMethods>(null);

		const internalInstance = useRef<DesiredCropperRef | null>(null);

		const instance = cropper || (internalInstance.current ? internalInstance : {
			current: {
				getState: () => state,
				getTransitions: () => transitions,
				getImage: () => image,
				isLoaded: () => loaded,
				isLoading: () => loading,
			},
		});

		const [size, setSize] = useState<Size | null>(null);

		const coordinates = instance.current?.getState()?.coordinates;

		const src = instance.current?.getImage()?.src;

		const contentStyle = size
			? {
					width: `${size.width}px`,
					height: `${size.height}px`,
			  }
			: {};

		const refresh = () => {
			const coordinates = instance.current?.getState()?.coordinates;
			if (boundaryRef.current && coordinates) {
				boundaryRef.current.stretchTo(coordinates).then((size) => {
					if (size && coordinates) {
						if (isGreater(ratio(coordinates), ratio(size))) {
							setSize({
								width: size.width,
								height: size.width / ratio(coordinates),
							});
						} else {
							setSize({
								width: size.height * ratio(coordinates),
								height: size.height,
							});
						}
					} else {
						setSize(null);
					}
				});
			}
			rerender();
		};

		useWindowResize(refresh);

		useLayoutEffect(refresh, [coordinates?.height, coordinates?.width]);

		useImperativeHandle(ref, () => ({
			refresh,
			update(cropper?: DesiredCropperRef) {
				if (cropper) {
					internalInstance.current = cropper;
				} else {
					internalInstance.current = null;
				}
				refresh();
			}
		}));

		const WrapperComponent = wrapperComponent;

		const BackgroundComponent = backgroundComponent;

		const BoundaryComponent = boundaryComponent;

		return (
			<WrapperComponent
				{...wrapperProps}
				className={cn(className, 'advanced-cropper-preview')}
				cropper={instance.current}
				style={style}
			>
				<BoundaryComponent
					ref={boundaryRef}
					stretchAlgorithm={stretchPreviewBoundary}
					{...boundaryProps}
					className={cn('advanced-cropper-preview__boundary', boundaryClassName)}
				>
					<div className={cn(contentClassName, 'advanced-cropper-preview__content')} style={contentStyle}>
						{instance.current && (
							<BackgroundComponent
								{...backgroundProps}
								cropper={instance.current}
								size={size}
								className={cn(
									backgroundClassName,
									'advanced-cropper-preview__image',
									src && 'advanced-cropper-preview__image--visible',
								)}
							/>
						)}
					</div>
				</BoundaryComponent>
			</WrapperComponent>
		);
	},
);
