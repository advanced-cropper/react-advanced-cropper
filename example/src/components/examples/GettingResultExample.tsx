import React, { useState } from 'react';
import { CropperRef, Cropper, Coordinates } from 'react-advanced-cropper';
import { useDebouncedCallback } from 'use-debounce';
import { PreviewResults } from '@site/src/components/examples/components/PreviewResults';
import './GettingResultExample.scss';

export const GettingResultExample = () => {
	const [coordinates, setCoordinates] = useState<Coordinates | null>(null);

	const [preview, setPreview] = useState<string>();

	const [image] = useState(
		'/react-advanced-cropper/img/images/photo-1583511655857-d19b40a7a54e.jpg',
	);

	const onChange = useDebouncedCallback((cropper: CropperRef) => {
		setCoordinates(cropper.getCoordinates());
		setPreview(cropper.getCanvas()?.toDataURL());
	}, 500);

	return (
		<div className={'getting-result-example'}>
			<Cropper
				className={'getting-result-example__cropper'}
				stencilProps={{ aspectRatio: 1 }}
				src={image}
				onChange={onChange}
			/>
			{coordinates && preview && <PreviewResults coordinates={coordinates} preview={preview} />}
		</div>
	);
};
