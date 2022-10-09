import React, { forwardRef, RefObject } from 'react';
import cn from 'classnames';

interface Props {
	src?: string | null;
	crossOrigin?: 'anonymous' | 'use-credentials' | boolean;
}

export const CropperSource = forwardRef<HTMLElement, Props>(({ src, crossOrigin = true }: Props, ref) => {
	return src ? (
		<img
			key={src}
			ref={ref as RefObject<HTMLImageElement>}
			src={src}
			className={cn('advanced-cropper-source')}
			crossOrigin={crossOrigin === true ? 'anonymous' : crossOrigin || undefined}
		/>
	) : null;
});

CropperSource.displayName = 'CropperSource';
