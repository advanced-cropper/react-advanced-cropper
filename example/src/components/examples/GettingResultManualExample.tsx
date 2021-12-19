import React, { useState, useRef } from 'react';
import { CropperRef, Cropper } from 'react-advanced-cropper';
import { PreviewResults } from '../../components/examples/components/PreviewResults';
import './GettingResultManualExample.scss';

export const GettingResultManualExample = () => {
	const cropperRef = useRef<CropperRef>();

	const [coordinates, setCoordinates] = useState({ width: 0, height: 0, left: 0, top: 0 });

	const [preview, setPreview] = useState(null);

	const [image] = useState(
		'https://images.unsplash.com/photo-1586083718719-019f9dc6ca94?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1024&q=80',
	);

	const onCrop = () => {
		if (cropperRef.current) {
			setCoordinates(cropperRef.current.getCoordinates());
			setPreview(cropperRef.current.getCanvas().toDataURL());
		}
	};

	return (
		<div className={'getting-result-manual-example'}>
			<Cropper
				ref={cropperRef}
				className={'getting-result-manual-example__cropper'}
				stencilProps={{ aspectRatio: 1 }}
				src={image}
			/>
			<PreviewResults coordinates={coordinates} preview={preview} />
			<div className={'getting-result-manual-example__crop-button'} onClick={onCrop}>
				Crop Image
			</div>
		</div>
	);
};
