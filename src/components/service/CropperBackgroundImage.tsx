import React, { forwardRef } from 'react';
import cn from 'classnames';
import { CropperTransitions, CropperImage, CropperState } from 'advanced-cropper/types';
import { getBackgroundStyle } from 'advanced-cropper/image';
import { preventDefault } from '../../service/events';

import './CropperBackgroundImage.scss';

interface DesiredCropperRef {
	getState: () => CropperState;
	getTransitions: () => CropperTransitions;
	getImage: () => CropperImage;
}

interface Props {
	className?: string;
	cropper: DesiredCropperRef;
	crossOrigin?: 'anonymous' | 'use-credentials' | boolean;
}

export const CropperBackgroundImage = forwardRef<HTMLImageElement, Props>(
	({ className, cropper, crossOrigin }: Props, ref) => {
		const state = cropper.getState();
		const transitions = cropper.getTransitions();
		const image = cropper.getImage();

		const style = image && state ? getBackgroundStyle(image, state, transitions) : {};

		const src = image ? image.src : undefined;

		return src ? (
			<img
				key={src}
				ref={ref}
				className={cn('react-cropper-background-image', className)}
				src={src}
				crossOrigin={crossOrigin === true ? 'anonymous' : crossOrigin || undefined}
				style={style}
				onMouseDown={preventDefault}
			/>
		) : null;
	},
);

CropperBackgroundImage.displayName = 'CropperBackgroundImage';
