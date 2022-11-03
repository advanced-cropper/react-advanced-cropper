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
import { ArbitraryProps } from '../../types';
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

		const instance = cropper || {
			current: {
				getState: () => state,
				getTransitions: () => transitions,
				getImage: () => image,
				isLoaded: () => loaded,
				isLoading: () => loading,
			},
		};

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
			refresh: rerender,
		}));

		const WrapperComponent = wrapperComponent;

		const BackgroundComponent = backgroundComponent;

		return (
			<WrapperComponent
				{...wrapperProps}
				className={cn(className, 'advanced-cropper-preview')}
				cropper={instance.current}
				style={style}
			>
				<StretchableBoundary
					ref={boundaryRef}
					className={'advanced-cropper-preview__boundary'}
					contentClassName={'advanced-cropper-preview__boundary-content'}
					stretchAlgorithm={stretchPreviewBoundary}
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
				</StretchableBoundary>
			</WrapperComponent>
		);
	},
);
