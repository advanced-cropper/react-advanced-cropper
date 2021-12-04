import React, { FC, forwardRef, useRef } from 'react';
import cn from 'classnames';
import { CropperRef, CropperProps, Cropper, CircleStencil, RectangleStencil, mergeRefs } from 'react-advanced-cropper';
import { Wrapper } from './components/Wrapper';
import './FixedCropper.scss';

export interface FixedCropperProps extends Omit<CropperProps, 'defaultSize' | 'defaultCoordinates' | 'stencilSize'> {
	stencilType?: 'circle' | 'rectangle';
}

export type FixedCropperMethods = CropperRef;

export const FixedCropper: FC<FixedCropperProps> = forwardRef<FixedCropperMethods, FixedCropperProps>(
	({ className, stencilProps, stencilType, ...props }: FixedCropperProps, ref) => {
		const cropperRef = useRef<CropperRef>(null);

		const defaultSize = ({ imageSize, visibleArea }) => {
			return {
				width: (visibleArea || imageSize).width,
				height: (visibleArea || imageSize).height,
			};
		};

		const stencilSize = ({ boundary }) => {
			return {
				width: Math.min(boundary.height, boundary.width) - 80,
				height: Math.min(boundary.height, boundary.width) - 80,
			};
		};

		return (
			<Cropper
				ref={mergeRefs([ref, cropperRef])}
				className={cn('fixed-cropper', className)}
				defaultSize={defaultSize}
				stencilSize={stencilSize}
				imageRestriction={'stencil'}
				stencilProps={{
					previewClassName: cn(
						'fixed-cropper-stencil__preview',
						stencilType === 'circle' && 'fixed-cropper-stencil__preview--circle',
					),
					overlayClassName: cn(
						'fixed-cropper-stencil__overlay',
						stencilType === 'circle' && 'fixed-cropper-stencil__overlay--circle',
					),
					handlers: {},
					lines: {},
					movable: false,
					resizable: false,
					...stencilProps,
				}}
				stencilComponent={stencilType === 'circle' ? CircleStencil : RectangleStencil}
				wrapperComponent={Wrapper}
				{...props}
			/>
		);
	},
);

FixedCropper.displayName = 'FixedCropper';
