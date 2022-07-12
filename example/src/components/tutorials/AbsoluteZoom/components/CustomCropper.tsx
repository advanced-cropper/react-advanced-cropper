import React, { forwardRef } from 'react';
import { ImageRestriction, FixedCropper, FixedCropperRef, FixedCropperProps } from 'react-advanced-cropper';
import { CustomWrapper } from './CustomWrapper';

export type CustomCropperProps = FixedCropperProps;

export type CustomCropperRef = FixedCropperRef;

export const CustomCropper = forwardRef<CustomCropperRef, CustomCropperProps>(
	({ stencilProps, ...props }: CustomCropperProps, ref) => {
		return (
			<FixedCropper
				ref={ref}
				stencilProps={{
					handlers: false,
					lines: false,
					movable: false,
					resizable: false,
					...stencilProps,
				}}
				imageRestriction={ImageRestriction.stencil}
				wrapperComponent={CustomWrapper}
				{...props}
			/>
		);
	},
);

CustomCropper.displayName = 'CustomCropper';
