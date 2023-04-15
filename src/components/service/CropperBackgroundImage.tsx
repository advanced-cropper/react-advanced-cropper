import React, { CSSProperties, forwardRef } from 'react';
import cn from 'classnames';
import { CropperTransitions, CropperImage, CropperState, getBackgroundStyle } from 'advanced-cropper';
import { preventDefault } from '../../service/events';

interface DesiredCropperRef {
	getState: () => CropperState | null;
	getTransitions: () => CropperTransitions;
	getImage: () => CropperImage | null;
}

export interface CropperBackgroundImageProps {
	className?: string;
	cropper: DesiredCropperRef;
	crossOrigin?: 'anonymous' | 'use-credentials' | boolean;
	style?: CSSProperties;
}

export const CropperBackgroundImage = forwardRef<HTMLImageElement, CropperBackgroundImageProps>(
	({ className, style, cropper, crossOrigin = true }: CropperBackgroundImageProps, ref) => {
		const state = cropper.getState();
		const transitions = cropper.getTransitions();
		const image = cropper.getImage();

		const transformStyles = image && state ? getBackgroundStyle(image, state, transitions) : {};

		const src = image ? image.src : undefined;

		return src ? (
			<img
				key={src}
				ref={ref}
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
	},
);

CropperBackgroundImage.displayName = 'CropperBackgroundImage';
