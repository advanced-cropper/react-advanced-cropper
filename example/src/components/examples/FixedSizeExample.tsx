import React from 'react';
import { FixedCropper, ImageRestriction } from 'react-advanced-cropper';
import './FixedSizeExample.scss';

export const FixedSizeExample = () => {
	return (
		<FixedCropper
			className={'fixed-size-example'}
			src={
				'/react-advanced-cropper/img/images/photo-1527137342181-19aab11a8ee8.jpg'
			}
			stencilSize={{
				width: 300,
				height: 300,
			}}
			stencilProps={{
				handlers: {},
				lines: {},
				movable: false,
				resizable: false,
			}}
			imageRestriction={ImageRestriction.stencil}
		/>
	);
};
