import React, { useState } from 'react';
import { CircleStencil, Cropper } from 'react-advanced-cropper';
import './CustomPreviewExample.scss';

export const CustomPreviewExample = () => {
	const [image] = useState('https://images.pexels.com/photos/1642574/pexels-photo-1642574.jpeg?h=1500&w=2520');

	return (
		<Cropper
			className={'custom-preview-example'}
			stencilComponent={CircleStencil}
			src={image}
			stencilProps={{
				previewClassName: 'custom-preview-example__stencil-preview',
			}}
		/>
	);
};
