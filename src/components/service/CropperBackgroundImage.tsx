import React, { forwardRef } from 'react';
import cn from 'classnames';
import { CropperTransitions, CropperImage, CropperState, getBackgroundStyle } from 'advanced-cropper';
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
}

export const CropperBackgroundImage = forwardRef<HTMLImageElement, Props>(
	({ className, cropper, crossOrigin = true }: Props, ref) => {
		const state = cropper.getState();
		const transitions = cropper.getTransitions();
		const image = cropper.getImage();

		const style = image && state ? getBackgroundStyle(image, state, transitions) : {};

		const src = image ? image.src : undefined;

		return src ? (
			<img
				key={src}
				ref={ref}
				className={cn('advanced-cropper-background-image', className)}
				src={src}
				crossOrigin={crossOrigin === true ? 'anonymous' : crossOrigin || undefined}
				style={style}
				onMouseDown={preventDefault}
			/>
		) : null;
	},
);

CropperBackgroundImage.displayName = 'CropperBackgroundImage';
