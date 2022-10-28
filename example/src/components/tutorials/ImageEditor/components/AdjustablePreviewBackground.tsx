import React from 'react';
import { CropperTransitions, CropperImage, CropperState, Size } from 'react-advanced-cropper';
import { getPreviewStyle } from 'advanced-cropper';
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
	size?: Size | null;
}

export const AdjustablePreviewBackground = ({
	className,
	cropper,
	crossOrigin,
	brightness = 0,
	saturation = 0,
	hue = 0,
	contrast = 0,
	size,
}: Props) => {
	const state = cropper.getState();
	const transitions = cropper.getTransitions();
	const image = cropper.getImage();

	const style = image && state && size ? getPreviewStyle(image, state, size, transitions) : {};

	return (
		<AdjustableImage
			src={image?.src}
			crossOrigin={crossOrigin}
			brightness={brightness}
			saturation={saturation}
			hue={hue}
			contrast={contrast}
			className={className}
			style={style}
		/>
	);
};
