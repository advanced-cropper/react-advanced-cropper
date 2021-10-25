import React from 'react';
import { Cropper } from 'react-advanced-cropper';
import './GettingStartedExample.scss';

export const DefaultPositionExample = () => {
	const defaultPosition = () => {
		return {
			left: 100,
			top: 100,
		};
	};
	const defaultSize = () => {
		return {
			width: 400,
			height: 400,
		};
	};
	return (
		<Cropper
			className={'default-position-example'}
			src={
				'https://images.unsplash.com/photo-1527199372136-dff50c10ea34?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80'
			}
			defaultSize={defaultSize}
			defaultPosition={defaultPosition}
		/>
	);
};
