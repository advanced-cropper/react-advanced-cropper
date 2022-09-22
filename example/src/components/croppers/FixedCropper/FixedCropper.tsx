import React, { FC, forwardRef, useEffect, useRef } from 'react';
import cn from 'classnames';
import AdvancedCropper, {
	FixedCropper as InternalCropper,
	CircleStencil,
	RectangleStencil,
	ImageRestriction,
	mergeRefs,
} from 'react-advanced-cropper';
import { Wrapper } from './components/Wrapper';
import './FixedCropper.scss';

export type FixedCropperProps = Omit<AdvancedCropper.FixedCropperProps, 'stencilSize'> & {
	stencilType?: 'circle' | 'rectangle';
};

export type FixedCropperRef = AdvancedCropper.FixedCropperRef;

export const FixedCropper: FC<FixedCropperProps> = forwardRef<FixedCropperRef, FixedCropperProps>(
	({ className, stencilProps, stencilType, ...props }: FixedCropperProps, ref) => {
		const cropperRef = useRef<FixedCropperRef>(null);

		const defaultSize = ({ imageSize, visibleArea }) => {
			return {
				width: (visibleArea || imageSize).width,
				height: (visibleArea || imageSize).height,
			};
		};

		const stencilSize = ({ boundary }) => {
			return {
				width: boundary.height - 80,
				height: boundary.height - 80,
			};
		};

		useEffect(() => {
			cropperRef.current?.refresh();
		}, [stencilType]);

		return (
			<InternalCropper
				ref={mergeRefs([ref, cropperRef])}
				className={cn('fixed-cropper', className)}
				stencilSize={stencilSize}
				defaultSize={defaultSize}
				imageRestriction={ImageRestriction.stencil}
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
