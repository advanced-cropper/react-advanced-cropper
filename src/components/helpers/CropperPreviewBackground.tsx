import React from 'react';
import cn from 'classnames';
import { CropperTransitions, CropperImage, CropperState, Size, getPreviewStyle } from 'advanced-cropper';
import { preventDefault } from '../../service/events';

interface DesiredCropperRef {
	getState: () => CropperState | null;
	getTransitions: () => CropperTransitions;
	getImage: () => CropperImage | null;
}

interface Props {
	className?: string;
	cropper: DesiredCropperRef;
	crossOrigin?: 'anonymous' | 'use-credentials' | boolean;
	size?: Size | null;
}

export const CropperPreviewBackground = ({ className, cropper, crossOrigin = true, size }: Props) => {
	const state = cropper.getState();
	const transitions = cropper.getTransitions();
	const image = cropper.getImage();

	const style = size && image && state?.coordinates ? getPreviewStyle(image, state, size, transitions) : {};

	const src = image ? image.src : undefined;

	return src ? (
		<img
			key={src}
			className={cn('advanced-cropper-background-image', className)}
			src={src}
			crossOrigin={crossOrigin === true ? 'anonymous' : crossOrigin || undefined}
			style={style}
			onMouseDown={preventDefault}
		/>
	) : null;
};
