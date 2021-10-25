import React from 'react';
import { Cropper } from 'react-advanced-cropper';
import './FillingCropperExample.scss';

export const FillingCropperExample = () => {
	const defaultSize = ({ imageSize, visibleArea }) => {
		return {
			width: (visibleArea || imageSize).width,
			height: (visibleArea || imageSize).height,
		};
	};
	return (
		<Cropper
			className={'filling-cropper-example'}
			src={
				'https://images.pexels.com/photos/6524107/pexels-photo-6524107.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
			}
			defaultSize={defaultSize}
		/>
	);
};
