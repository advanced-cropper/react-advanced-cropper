import React, { useState } from 'react';
import { CircleStencil, Cropper } from 'react-advanced-cropper';
import './CustomPreviewExample.scss';

export const CustomPreviewExample = () => {
	const [image] = useState('/react-advanced-cropper/img/images/pexels-photo-1642574.jpeg');

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
