import React, { CSSProperties, FC, ReactNode } from 'react';
import cn from 'classnames';
import { CropperFade } from '../service/CropperFade';

interface DesiredCropperRef {
	isLoaded: () => boolean;
}

export interface CropperPreviewWrapperProps {
	cropper?: DesiredCropperRef;
	className?: string;
	style?: CSSProperties;
	children?: ReactNode;
}

export const CropperPreviewWrapper: FC<CropperPreviewWrapperProps> = ({ children, cropper, className, style }) => {
	return (
		<div className={cn(className, 'cropper-preview-wrapper')} style={style}>
			<CropperFade visible={cropper?.isLoaded()} className={'cropper-preview-wrapper__fade'}>
				{children}
			</CropperFade>
		</div>
	);
};
