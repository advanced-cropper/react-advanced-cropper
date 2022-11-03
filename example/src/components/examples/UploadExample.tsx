import React, { useState, useRef } from 'react';
import { CropperRef, Cropper } from 'react-advanced-cropper';
import './UploadExample.scss';

export const UploadExample = () => {
	const cropperRef = useRef<CropperRef>(null);

	const [image] = useState('/react-advanced-cropper/img/images/photo-1604335079441-274c03ad99a1.jpg');

	const onUpload = () => {
		const canvas = cropperRef.current?.getCanvas();
		if (canvas) {
			const form = new FormData();
			canvas.toBlob((blob) => {
				if (blob) {
					form.append('file', blob);
					fetch('http://example.com/upload/', {
						method: 'POST',
						body: form,
					});
				}
			}, 'image/jpeg');
		}
	};

	return (
		<div className={'upload-example'}>
			<div className={'upload-example__cropper-wrapper'}>
				<Cropper
					ref={cropperRef}
					className={'upload-example__cropper'}
					backgroundClassName={'upload-example__cropper-background'}
					src={image}
				/>
			</div>
			<div className="upload-example__button-wrapper">
				<div className={'upload-example__button'} onClick={onUpload}>
					Crop Image
				</div>
			</div>
		</div>
	);
};
