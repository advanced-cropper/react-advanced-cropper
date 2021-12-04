import React, { CSSProperties, FC } from 'react';
import cx from 'classnames';
import { CropperState } from 'advanced-cropper/types';
import { CropperFade } from './CropperFade';
import './CropperWrapper.scss';

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
		<div className={cx(className, 'react-cropper-wrapper')} style={style}>
			<CropperFade visible={state && loaded} className={'react-cropper-wrapper__fade'}>
				{children}
			</CropperFade>
		</div>
	);
};
