import React, { CSSProperties, FC } from 'react';
import cx from 'classnames';
import { CropperState } from 'advanced-cropper/types';
import { CropperFade } from './CropperFade';
import './CropperWrapper.scss';

interface DesiredCropperRef {
	getState: () => CropperState;
}

export interface CropperWrapperProps<CropperRef = unknown> {
	cropper?: DesiredCropperRef;
	loading?: boolean;
	loaded?: boolean;
	className?: string;
	style?: CSSProperties;
}

export const CropperWrapper: FC<CropperWrapperProps> = ({ cropper, children, loaded, className, style }) => {
	const state = cropper.getState();
	return (
		<div className={cx(className, 'react-cropper-wrapper')} style={style}>
			<CropperFade visible={state && loaded} className={'react-cropper-wrapper__fade'}>
				{children}
			</CropperFade>
		</div>
	);
};
