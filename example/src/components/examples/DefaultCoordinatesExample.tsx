import React from 'react';
import { Cropper } from 'react-advanced-cropper';
import './GettingStartedExample.scss';

export const DefaultCoordinatesExample = () => {
	return (
		<Cropper
			className={'default-position-example'}
			src={'/react-advanced-cropper/img/images/photo-1527199372136-dff50c10ea34.jpg'}
			defaultCoordinates={{
				width: 400,
				height: 400,
				left: 100,
				top: 100,
			}}
		/>
	);
};
