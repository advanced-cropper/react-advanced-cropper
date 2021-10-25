import React, { forwardRef, useMemo } from 'react';
import cn from 'classnames';
import { CropperTransitions, CropperImage, CropperState } from 'advanced-cropper/types';
import { getImageStyle } from 'advanced-cropper/image';
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
	({ className, image, state, transitions, crossOrigin }: Props, ref) => {
		const style = useMemo(() => getImageStyle(image, state, transitions), [image, state, transitions]);

		return (
			Boolean(image) && (
				<img
					ref={ref}
					className={cn('react-cropper-background-image', className)}
					src={image && image.src}
					crossOrigin={crossOrigin === true ? 'anonymous' : crossOrigin || undefined}
					style={style}
					onMouseDown={preventDefault}
				/>
			)
		);
	},
);

CropperBackgroundImage.displayName = 'CropperBackgroundImage';
