import React, { CSSProperties, FC, ReactNode } from 'react';
import cn from 'classnames';
import { CropperState } from 'advanced-cropper';
import { CropperFade } from './CropperFade';

interface DesiredCropperRef {
	getState: () => CropperState | null;
	isLoading: () => boolean;
	isLoaded: () => boolean;
}

export interface CropperWrapperProps {
	cropper?: DesiredCropperRef;
	className?: string;
	style?: CSSProperties;
	children?: ReactNode;
	disabled?: boolean;
}

export const CropperWrapper: FC<CropperWrapperProps> = ({ cropper, children, className, style }) => {
	const state = cropper ? cropper.getState() : null;
	const loaded = cropper ? cropper.isLoaded() : false;
	return (
		<div className={cn(className, 'advanced-cropper-wrapper')} style={style}>
			<CropperFade visible={state && loaded} className={'advanced-cropper-wrapper__fade'}>
				{children}
			</CropperFade>
		</div>
	);
};
