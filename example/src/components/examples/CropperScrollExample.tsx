import React, { useState } from 'react';
import { Cropper, ImageRestriction } from 'react-advanced-cropper';
import { BackgroundWrapperWithNotifications } from '@site/src/components/examples/components/BackgroundWrapperWithNotifications';
import './CropperScrollExample.scss';

export const CropperScrollExample = () => {
	const [image] = useState(
		'/react-advanced-cropper/img/images/photo-1633158617942-204b1469bc05.jpg',
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
			transformImage={{
				adjustStencil: false,
			}}
			imageRestriction={ImageRestriction.stencil}
			backgroundWrapperComponent={BackgroundWrapperWithNotifications}
			src={image}
		/>
	);
};
