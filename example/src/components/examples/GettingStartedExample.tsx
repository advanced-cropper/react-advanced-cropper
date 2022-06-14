import React, { useState } from 'react';
import { CropperRef, Cropper } from 'react-advanced-cropper';
import './GettingStartedExample.scss';

export const GettingStartedExample = () => {
	const [image] = useState(
		'/react-advanced-cropper/img/images/photo-1599140849279-1014532882fe.jpg',
	);

	const onChange = (cropper: CropperRef) => {
		console.log(cropper.getCoordinates(), cropper.getCanvas());
	};

	return <Cropper src={image} onChange={onChange} className={'getting-started-example'} />;
};
