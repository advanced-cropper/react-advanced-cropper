import React, { FC } from 'react';
import cn from 'classnames';
import './CropperFade.scss';

interface Props {
	visible?: boolean;
	className?: string;
}

export const CropperFade: FC<Props> = ({ visible, className, children }) => {
	return (
		<div className={cn(className, 'react-cropper-fade', visible && 'react-cropper-fade--visible')}>{children}</div>
	);
};
