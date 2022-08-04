import React, { useState } from 'react';
import { CircleStencil, Cropper } from 'react-advanced-cropper';
import './OverlayColorExample.scss';

export const OverlayColorExample = () => {
	const [image] = useState(
		'https://images.unsplash.com/photo-1653443664854-47e17177f78b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=430&q=80',
	);

	return (
		<Cropper
			className={'overlay-color-example'}
			stencilComponent={CircleStencil}
			src={image}
			stencilProps={{
				overlayClassName: 'overlay-color-example__overlay',
			}}
		/>
	);
};
