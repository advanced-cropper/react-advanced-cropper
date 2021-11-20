import React, { useRef, useState } from 'react';
import { CropperRef, Cropper, Preview, CropperImage, CropperState, CropperTransitions } from 'react-advanced-cropper';
import './PreviewResultExample.scss';
import { SquareButton } from '../../components/examples/components/SquareButton';
import { RotateLeftIcon } from '../../components/icons/RotateLeftIcon';

export const PreviewResultExample = () => {
	const cropperRef = useRef<CropperRef>();

	const [state, setState] = useState<CropperState>(null);
	const [image, setImage] = useState<CropperImage>(null);
	const [transitions, setTransitions] = useState<CropperTransitions>(null);

	const [src, setSrc] = useState(
		'https://images.unsplash.com/photo-1623432532623-f8f1347d954c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=387&q=80',
	);

	const onChange = (cropper: CropperRef) => {
		setState(cropper.getState());
		setImage(cropper.getImage());
	};

	const onTransitionsChange = (cropper: CropperRef) => {
		setTransitions(cropper.getTransitions());
	};

	const onRotate = () => {
		if (cropperRef.current) {
			cropperRef.current.rotateImage(90);
		}
	};

	return (
		<div className={'preview-result-example'}>
			<Cropper
				ref={cropperRef}
				className={'preview-result-example__cropper'}
				stencilProps={{ aspectRatio: 1 }}
				src={src}
				onChange={onChange}
				onTransitionsStart={onTransitionsChange}
				onTransitionsEnd={onTransitionsChange}
			/>
			<div className="preview-result-example__previews">
				<Preview
					className="preview-result-example__preview"
					image={image}
					state={state}
					transitions={transitions}
				/>
				<Preview
					className="preview-result-example__preview preview-result-example__preview--small"
					state={state}
					image={image}
					transitions={transitions}
				/>
			</div>
			<div className="preview-result-example__buttons">
				<SquareButton className="preview-result-example__button" title="Rotate" onClick={onRotate}>
					<RotateLeftIcon />
				</SquareButton>
			</div>
		</div>
	);
};
