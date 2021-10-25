import React, { useState } from 'react';
import { CircleStencil, CropperRef, Cropper } from 'react-advanced-cropper';
import './ChangingStencilExample.scss';

export const ChangingStencilExample = () => {
	const [image] = useState(
		'https://images.unsplash.com/photo-1485178575877-1a13bf489dfe?ixlib=rb-1.2.1&auto=format&fit=crop&w=991&q=80',
	);

	const onChange = (cropper: CropperRef) => {
		console.log(cropper.getCoordinates(), cropper.getCanvas());
	};

	return (
		<Cropper
			className={'changing-stencil-example'}
			stencilComponent={CircleStencil}
			src={image}
			onChange={onChange}
		/>
	);
};
