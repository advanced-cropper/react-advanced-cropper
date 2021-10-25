import React, { useState, useRef, ChangeEvent, useEffect } from 'react';
import { CropperRef, Cropper, getMimeType } from 'react-advanced-cropper';
import { saveAs } from 'file-saver';
import { ClearIcon } from '../../components/icons/ClearIcon';
import './LoadImageExample.scss';

export const LoadImageExample = () => {
	const cropperRef = useRef<CropperRef>();
	const inputRef = useRef<HTMLInputElement>();

	const [type, setType] = useState<string>(null);
	const [src, setSrc] = useState<string>(null);

	const onUpload = () => {
		if (inputRef.current) {
			inputRef.current.click();
		}
	};

	const onCrop = () => {
		const canvas = cropperRef.current.getCanvas();
		canvas.toBlob((blob) => {
			saveAs(blob);
		}, type);
	};

	const onClear = () => {
		setSrc(null);
		setType(null);
	};

	const onLoadImage = (event: ChangeEvent<HTMLInputElement>) => {
		// Reference to the DOM input element
		const file = event.target.files && event.target.files[0];

		// Ensure that you have a file before attempting to read it
		if (file) {
			// 1. Revoke the object URL, to allow the garbage collector to destroy the uploaded before file
			if (src) {
				URL.revokeObjectURL(src);
			}
			// 2. Create the blob link to the file to optimize performance:
			const blob = URL.createObjectURL(file);

			// 3. The steps below are designated to determine a file mime type to use it during the
			// getting of a cropped image from the canvas. You can replace it them by the following string,
			// but the type will be derived from the extension and it can lead to an incorrect result:
			//
			// setImage({
			//    src: blob;
			//    type: files[0].type
			// })

			// Create a new FileReader to read this image binary data
			const reader = new FileReader();
			// Define a callback function to run, when FileReader finishes its job
			reader.onload = (e) => {
				// Note: arrow function used here, so that "this.image" refers to the image of Vue component
				setSrc(blob);
				setType(getMimeType(e.target.result, file.type));
			};
			// Start the reader job - read file as a data url (base64 format)
			reader.readAsArrayBuffer(file);
		}
		event.target.value = '';
	};

	useEffect(() => {
		// Revoke the object URL, to allow the garbage collector to destroy the uploaded before file
		return () => {
			if (src) {
				URL.revokeObjectURL(src);
			}
		};
	}, []);

	return (
		<div className="load-image-example">
			<div className="load-image-example__cropper-wrapper">
				<Cropper
					ref={cropperRef}
					className="load-image-example__cropper"
					backgroundClassName="load-image-example__cropper-background"
					src={src}
				/>
				<div className="load-image-example__reset-button" title="Reset Image" onClick={onClear}>
					<ClearIcon />
				</div>
				{type && <div className="load-image-example__file-type">{type}</div>}
			</div>
			<div className="load-image-example__buttons-wrapper">
				<button className="load-image-example__button" onClick={onUpload}>
					<input ref={inputRef} type="file" accept="image/*" onChange={onLoadImage} />
					Upload image
				</button>
				{src && (
					<button className="load-image-example__button" onClick={onCrop}>
						Download result
					</button>
				)}
			</div>
		</div>
	);
};
