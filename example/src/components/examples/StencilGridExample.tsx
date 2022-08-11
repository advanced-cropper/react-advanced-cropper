import React, { useState } from 'react';
import { Cropper } from 'react-advanced-cropper';

export const StencilGridExample = () => {
	const [image] = useState('/react-advanced-cropper/img/images/anna1991anna-0WDLQzK7u0E-unsplash.jpg');

	return (
		<Cropper
			className={'grid-example'}
			stencilProps={{
				grid: true,
			}}
			src={image}
		/>
	);
};
