import React, { forwardRef, useRef } from 'react';
import cn from 'classnames';
import {
	CropperProps,
	mergeRefs,
	ImageRestriction,
	FixedCropper,
	FixedCropperRef,
	FixedCropperSettings,
	StencilSize,
	DefaultSize,
} from 'react-advanced-cropper';
import { Wrapper } from './Wrapper';
import './TwitterCropper.scss';

export type TwitterCropperProps = Omit<
	CropperProps<FixedCropperSettings>,
	'stencilSize' | 'transitions' | 'imageRestriction'
>;

export const TwitterCropper = forwardRef((props: TwitterCropperProps, ref) => {
	const { className, stencilProps = {}, wrapperComponent, ...cropperProps } = props;

	const cropperRef = useRef<FixedCropperRef>(null);

	const WrapperComponent = wrapperComponent || Wrapper;

	const stencilSize: StencilSize = ({ boundary }) => {
		return {
			width: Math.min(boundary.height, boundary.width) - 48,
			height: Math.min(boundary.height, boundary.width) - 48,
		};
	};

	const defaultSize: DefaultSize = ({ imageSize }) => {
		return {
			width: Math.min(imageSize.height, imageSize.width),
			height: Math.min(imageSize.height, imageSize.width),
		};
	};

	return (
		<FixedCropper
			minWidth={150}
			minHeight={150}
			defaultSize={defaultSize}
			{...cropperProps}
			ref={mergeRefs([ref, cropperRef])}
			className={cn('twitter-cropper', className)}
			stencilProps={{
				...stencilProps,
				previewClassName: cn(stencilProps.previewClassName, 'twitter-cropper__preview'),
				overlayClassName: cn(stencilProps.overlayClassName, 'twitter-cropper__overlay'),
				movable: false,
				scalable: false,
				lines: {},
				handlers: {},
				aspectRatio: 1,
			}}
			wrapperComponent={WrapperComponent}
			imageRestriction={ImageRestriction.stencil}
			stencilSize={stencilSize}
			transitions={false}
		/>
	);
});

TwitterCropper.displayName = 'TwitterCropper';
