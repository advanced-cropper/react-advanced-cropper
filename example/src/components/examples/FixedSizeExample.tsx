import React from 'react';
import { FixedCropper, ImageRestriction } from 'react-advanced-cropper';
import './FixedSizeExample.scss';

export const FixedSizeExample = () => {

	return (
		<FixedCropper
			className={'fixed-size-example'}
			src={
				'https://images.unsplash.com/photo-1527137342181-19aab11a8ee8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80'
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
