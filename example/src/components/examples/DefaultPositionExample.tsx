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
				'/react-advanced-cropper/img/images/photo-1527199372136-dff50c10ea34.jpg'
			}
			defaultSize={defaultSize}
			defaultPosition={defaultPosition}
		/>
	);
};
