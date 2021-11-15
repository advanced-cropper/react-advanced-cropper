import React, { FC } from 'react';
import classnames from 'classnames';
import { CropperState } from 'advanced-cropper/types';
import { CropperFade } from './CropperFade';

export interface CropperWrapperProps<CropperRef = unknown> {
	cropper?: unknown;
	loading?: boolean;
	loaded?: boolean;
	className?: string;
}

export const CropperWrapper: FC<CropperWrapperProps> = ({ state, children, loaded, className }) => {
	return (
		<CropperFade visible={state && loaded} className={classnames(className)}>
			{children}
		</CropperFade>
	);
};
