import React, { forwardRef } from 'react';
import { CropperTransitions, CropperImage, CropperState } from 'react-advanced-cropper';
import { getBackgroundStyle } from 'advanced-cropper';
import { AdjustableImage } from './AdjustableImage';

interface DesiredCropperRef {
	getState: () => CropperState;
	getTransitions: () => CropperTransitions;
	getImage: () => CropperImage;
}

interface Props {
	className?: string;
	cropper: DesiredCropperRef;
	crossOrigin?: 'anonymous' | 'use-credentials' | boolean;
	brightness?: number;
	saturation?: number;
	hue?: number;
	contrast?: number;
}

export const AdjustableCropperBackground = forwardRef<HTMLCanvasElement, Props>(
	({ className, cropper, crossOrigin, brightness = 0, saturation = 0, hue = 0, contrast = 0 }: Props, ref) => {
		const state = cropper.getState();
		const transitions = cropper.getTransitions();
		const image = cropper.getImage();

		const style = image && state ? getBackgroundStyle(image, state, transitions) : {};

		return (
			<AdjustableImage
				src={image?.src}
				crossOrigin={crossOrigin}
				brightness={brightness}
				saturation={saturation}
				hue={hue}
				contrast={contrast}
				ref={ref}
				className={className}
				style={style}
			/>
		);
	},
);
