import React, { useState } from 'react';
import { Cropper } from 'react-advanced-cropper';
import { CircleStencil } from './components/CircleStencil';
import './ChangingStencilExample.scss';

export const CustomStencilExample = () => {
	const [image] = useState(
		'https://images.pexels.com/photos/1451124/pexels-photo-1451124.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
	);

	return <Cropper className={'custom-stencil-example'} stencilComponent={CircleStencil} src={image} />;
};
