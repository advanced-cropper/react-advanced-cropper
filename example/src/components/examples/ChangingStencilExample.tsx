import React, { useState } from 'react';
import { CircleStencil, CropperRef, Cropper } from 'react-advanced-cropper';
import './ChangingStencilExample.scss';

export const ChangingStencilExample = () => {
	const [image] = useState(
		'/react-advanced-cropper/img/images/photo-1485178575877-1a13bf489dfe.jpg',
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
