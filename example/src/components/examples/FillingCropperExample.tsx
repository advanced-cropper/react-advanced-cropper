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
				'/react-advanced-cropper/img/images/pexels-photo-6524107.jpeg'
			}
			defaultSize={defaultSize}
		/>
	);
};
