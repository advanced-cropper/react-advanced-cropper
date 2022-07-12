import React from 'react';
import './AbsoluteZoom.scss';
import { CustomCropper } from './components/CustomCropper';

export const AbsoluteZoom = () => {
	return (
		<CustomCropper
			src={'/react-advanced-cropper/img/images/photo-1583511655857-d19b40a7a54e.jpg'}
			stencilSize={{
				width: 250,
				height: 250,
			}}
		/>
	);
};
