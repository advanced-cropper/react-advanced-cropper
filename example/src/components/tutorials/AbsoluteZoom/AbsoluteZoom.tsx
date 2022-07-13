import React from 'react';
import './AbsoluteZoom.scss';
import { CustomCropper } from './components/CustomCropper';

export const AbsoluteZoom = () => {
	return (
		<CustomCropper
			className={'absolute-zoom-tutorial'}
			src={'/react-advanced-cropper/img/images/kamyar-ghalamchi-HO4cDQGPlq0-unsplash.jpg'}
			stencilSize={{
				width: 350,
				height: 350,
			}}
		/>
	);
};
