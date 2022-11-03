import React, { forwardRef, HTMLAttributes, RefObject } from 'react';
import cn from 'classnames';

interface Props extends HTMLAttributes<HTMLImageElement> {
	src?: string | null;
	crossOrigin?: 'anonymous' | 'use-credentials' | boolean;
}

export const CropperSource = forwardRef<HTMLImageElement, Props>(
	({ src, crossOrigin = true, ...props }: Props, ref) => {
		return src ? (
			<img
				key={src}
				ref={ref as RefObject<HTMLImageElement>}
				src={src}
				className={cn('advanced-cropper-source')}
				crossOrigin={crossOrigin === true ? 'anonymous' : crossOrigin || undefined}
				{...props}
			/>
		) : null;
	},
);

CropperSource.displayName = 'CropperSource';
