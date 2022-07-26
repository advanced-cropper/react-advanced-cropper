import React, { CSSProperties, FC } from 'react';
import cn from 'classnames';
import { CropperState } from 'advanced-cropper';
import { CropperFade } from './CropperFade';

interface DesiredCropperRef {
	getState: () => CropperState | null;
}

export interface CropperWrapperProps {
	cropper?: DesiredCropperRef;
	loading?: boolean;
	loaded?: boolean;
	className?: string;
	style?: CSSProperties;
}

export const CropperWrapper: FC<CropperWrapperProps> = ({ cropper, children, loaded, className, style }) => {
	const state = cropper ? cropper.getState() : null;
	return (
		<div className={cn(className, 'advanced-cropper-wrapper')} style={style}>
			<CropperFade visible={state && loaded} className={'advanced-cropper-wrapper__fade'}>
				{children}
			</CropperFade>
		</div>
	);
};
