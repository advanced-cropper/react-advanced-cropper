import React, { useState } from 'react';
import { CropperRef, Cropper } from 'react-advanced-cropper';
import { useDebouncedCallback } from 'use-debounce';
import { PreviewResults } from '@site/src/components/examples/components/PreviewResults';
import './GettingResultExample.scss';

export const GettingResultExample = () => {
	const [coordinates, setCoordinates] = useState({ width: 0, height: 0, left: 0, top: 0 });

	const [preview, setPreview] = useState(null);

	const [image] = useState(
		'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1049&q=80',
	);

	const onChange = useDebouncedCallback((cropper: CropperRef) => {
		setCoordinates(cropper.getCoordinates());
		setPreview(cropper.getCanvas().toDataURL());
	}, 500);

	return (
		<div className={'getting-result-example'}>
			<Cropper
				className={'getting-result-example__cropper'}
				stencilProps={{ aspectRatio: 1 }}
				src={image}
				onChange={onChange}
			/>
			<PreviewResults coordinates={coordinates} preview={preview} />
		</div>
	);
};
