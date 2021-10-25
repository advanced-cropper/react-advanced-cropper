import React from 'react';
import cn from 'classnames';
import { CropperProps, Cropper } from 'react-advanced-cropper';
import './CropperTypesExample.scss';

interface Props extends CropperProps {
	size?: 'small' | 'medium';
}

export const CropperTypesExample = ({ size, ...props }: Props) => {
	return (
		<div>
			<Cropper
				className={cn(
					'cropper-types-example',
					size === 'small' && 'cropper-types-example--small',
					size === 'medium' && 'cropper-types-example--medium',
				)}
				{...props}
			/>
		</div>
	);
};
