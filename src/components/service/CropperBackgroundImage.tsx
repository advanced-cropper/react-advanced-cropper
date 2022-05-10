import React, { forwardRef } from 'react';
import cn from 'classnames';
import { CropperTransitions, CropperImage, CropperState } from 'advanced-cropper/types';
import { getBackgroundStyle } from 'advanced-cropper/image';
import { preventDefault } from '../../service/events';

import './CropperBackgroundImage.scss';

interface Props {
	className?: string;
	image: CropperImage | null;
	state: CropperState | null;
	transitions?: CropperTransitions;
	crossOrigin?: 'anonymous' | 'use-credentials' | boolean;
}

export const CropperBackgroundImage = forwardRef<HTMLImageElement, Props>(
	({ className, image, state, crossOrigin, transitions}: Props, ref) => {
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
