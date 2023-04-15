import React, { CSSProperties } from 'react';
import cn from 'classnames';
import { CropperTransitions, CropperImage, CropperState, Size, getPreviewStyle } from 'advanced-cropper';
import { preventDefault } from '../../service/events';

interface DesiredCropperRef {
	getState: () => CropperState | null;
	getTransitions: () => CropperTransitions;
	getImage: () => CropperImage | null;
}

export interface CropperPreviewBackgroundProps {
	className?: string;
	cropper: DesiredCropperRef;
	crossOrigin?: 'anonymous' | 'use-credentials' | boolean;
	size?: Size | null;
	style?: CSSProperties;
}

export const CropperPreviewBackground = ({
	className,
	cropper,
	crossOrigin = true,
	size,
	style,
}: CropperPreviewBackgroundProps) => {
	const state = cropper.getState();
	const transitions = cropper.getTransitions();
	const image = cropper.getImage();

	const transformStyles = size && image && state?.coordinates ? getPreviewStyle(image, state, size, transitions) : {};

	const src = image ? image.src : undefined;

	return src ? (
		<img
			key={src}
			className={cn('advanced-cropper-background-image', className)}
			src={src}
			crossOrigin={crossOrigin === true ? 'anonymous' : crossOrigin || undefined}
			style={{
				...transformStyles,
				...style,
			}}
			onMouseDown={preventDefault}
		/>
	) : null;
};
