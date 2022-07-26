import React, { useState, useRef, ChangeEvent, useEffect } from 'react';
import { CropperRef, Cropper } from 'react-advanced-cropper';
import { getMimeType } from 'advanced-cropper/extensions/mimes';
import { saveAs } from 'file-saver';
import { ClearIcon } from '../../components/icons/ClearIcon';
import './LoadImageExample.scss';

interface Image {
	type?: string;
	src: string;
}

export const LoadImageExample = () => {
	const cropperRef = useRef<CropperRef>(null);
	const inputRef = useRef<HTMLInputElement>(null);

	const [image, setImage] = useState<Image | null>(null);

	const onUpload = () => {
		if (inputRef.current) {
			inputRef.current.click();
		}
	};

	const onCrop = () => {
		const canvas = cropperRef.current?.getCanvas();
		if (canvas) {
			canvas.toBlob((blob) => {
				saveAs(blob);
			}, image?.type);
		}
	};

	const onClear = () => {
		setImage(null);
	};

	const onLoadImage = (event: ChangeEvent<HTMLInputElement>) => {
		// Reference to the DOM input element
		const { files } = event.target;

		// Ensure that you have a file before attempting to read it
		if (files && files[0]) {
			// 1. Create the blob link to the file to optimize performance:
			const blob = URL.createObjectURL(files[0]);

			// 2. The steps below are designated to determine a file mime type to use it during the
			// getting of a cropped image from the canvas. You can replace it them by the following string,
			// but the type will be derived from the extension and it can lead to an incorrect result:
			//
			// setImage({
			//    src: blob;
			//    type: files[0].type
			// })

			// Create a new FileReader to read this image binary data
			const reader = new FileReader();

			// Remember the fallback type:
			const typeFallback = files[0].type;

			// Define a callback function to run, when FileReader finishes its job
			reader.onload = (e) => {
				// Note: arrow function used here, so that "this.image" refers to the image of Vue component
				setImage({
					// Read image as base64 and set it as src:
					src: blob,
					// Determine the image type to preserve it during the extracting the image from canvas:
					type: getMimeType(e.target?.result, typeFallback),
				});
			};
			// Start the reader job - read file as a data url (base64 format) and get the real file type
			reader.readAsArrayBuffer(files[0]);
		}
		// Clear the event target value to give the possibility to upload the same image:
		event.target.value = '';
	};

	useEffect(() => {
		// Revoke the object URL, to allow the garbage collector to destroy the uploaded before file
		return () => {
			if (image && image.src) {
				URL.revokeObjectURL(image.src);
			}
		};
	}, [image]);

	return (
		<div className="load-image-example">
			<div className="load-image-example__cropper-wrapper">
				<Cropper
					ref={cropperRef}
					className="load-image-example__cropper"
					backgroundClassName="load-image-example__cropper-background"
					src={image?.src}
				/>
				<div className="load-image-example__reset-button" title="Reset Image" onClick={onClear}>
					<ClearIcon />
				</div>
				{image && <div className="load-image-example__file-type">{image.type}</div>}
			</div>
			<div className="load-image-example__buttons-wrapper">
				<button className="load-image-example__button" onClick={onUpload}>
					<input ref={inputRef} type="file" accept="image/*" onChange={onLoadImage} />
					Upload image
				</button>
				{image && (
					<button className="load-image-example__button" onClick={onCrop}>
						Download result
					</button>
				)}
			</div>
		</div>
	);
};
