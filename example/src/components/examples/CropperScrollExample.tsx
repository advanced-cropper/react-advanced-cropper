import React, { useState } from 'react';
import { Cropper } from 'react-advanced-cropper';
import { BackgroundWrapperWithNotifications } from '@site/src/components/examples/components/BackgroundWrapperWithNotifications';
import './CropperScrollExample.scss';

export const CropperScrollExample = () => {
	const [image] = useState(
		'https://images.unsplash.com/photo-1633158617942-204b1469bc05?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1024&h=1024&q=80',
	);

	return (
		<Cropper
			className={'cropper-scroll-example'}
			stencilProps={{
				movable: false,
				resizable: false,
				handlers: {},
				lines: {},
			}}
			scaleImage={{
				adjustStencil: false,
			}}
			imageRestriction={'stencil'}
			backgroundWrapperComponent={BackgroundWrapperWithNotifications}
			src={image}
		/>
	);
};
