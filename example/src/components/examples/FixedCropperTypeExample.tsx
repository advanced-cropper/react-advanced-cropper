import React from 'react';
import cn from 'classnames';
import { FixedCropper, FixedCropperProps } from 'react-advanced-cropper';
import './FixedCroperTypeExample.scss';

interface Props extends FixedCropperProps {
	size?: 'small' | 'medium';
}

export const FixedCropperTypeExample = ({ size, ...props }: Props) => {
	return (
		<FixedCropper
			className={cn(
				'fixed-cropper-type-example',
				size === 'small' && 'fixed-cropper-type-example--small',
				size === 'medium' && 'fixed-cropper-type-example--medium',
			)}
			{...props}
		/>
	);
};
