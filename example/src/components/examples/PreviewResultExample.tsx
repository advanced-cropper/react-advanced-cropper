import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import {
	CropperRef,
	Cropper,
	CropperPreview,
	CropperState,
	CropperImage,
	CropperTransitions,
} from 'react-advanced-cropper';
import './PreviewResultExample.scss';
import { RotateLeftIcon } from '../icons/RotateLeftIcon';
import { UploadIcon } from '../icons/UploadIcon';
import { SquareButton } from './components/SquareButton';

interface PreviewState {
	state: CropperState | null;
	image: CropperImage | null;
	transitions: CropperTransitions | null;
	loading?: false;
	loaded?: false;
}

export const PreviewResultExample = () => {
	const cropperRef = useRef<CropperRef>(null);
	const inputRef = useRef<HTMLInputElement>(null);

	const [previewState, setPreviewState] = useState<PreviewState>({
		state: null,
		image: null,
		transitions: null,
	});

	const [src, setSrc] = useState('/react-advanced-cropper/img/images/photo-1623432532623-f8f1347d954c.jpg');

	const onUpdate = (cropper: CropperRef) => {
		setPreviewState({
			state: cropper.getState(),
			image: cropper.getImage(),
			transitions: cropper.getTransitions(),
			loaded: cropper.isLoaded(),
			loading: cropper.isLoading(),
		});
	};

	const onRotate = () => {
		cropperRef.current?.rotateImage(90);
	};

	const onUpload = () => {
		if (inputRef.current) {
			inputRef.current.click();
		}
	};

	const onLoadImage = (event: ChangeEvent<HTMLInputElement>) => {
		const { files } = event.target;
		if (files && files[0]) {
			setSrc(URL.createObjectURL(files[0]));
		}
		event.target.value = '';
	};

	useEffect(() => {
		return () => {
			if (src) {
				URL.revokeObjectURL(src);
			}
		};
	}, [src]);

	return (
		<div className={'preview-result-example'}>
			<Cropper
				src={src}
				ref={cropperRef}
				stencilProps={{ aspectRatio: 1 }}
				className={'preview-result-example__cropper'}
				onUpdate={onUpdate}
			/>
			<div className="preview-result-example__previews">
				<CropperPreview {...previewState} className="preview-result-example__preview" />
				<CropperPreview
					{...previewState}
					className="preview-result-example__preview preview-result-example__preview--small"
				/>
			</div>
			<div className="preview-result-example__buttons">
				<SquareButton className="preview-result-example__button" title="Upload" onClick={onUpload}>
					<UploadIcon />
					<input
						className="preview-result-example__download-input"
						ref={inputRef}
						type="file"
						accept="image/*"
						onChange={onLoadImage}
					/>
				</SquareButton>
				<SquareButton className="preview-result-example__button" title="Rotate" onClick={onRotate}>
					<RotateLeftIcon />
				</SquareButton>
			</div>
		</div>
	);
};
