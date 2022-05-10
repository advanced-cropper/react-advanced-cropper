import React, { useState, useRef, useEffect } from 'react';
import cn from 'classnames';
import { Cropper, CropperRef } from 'react-advanced-cropper';
import { Navigation } from './components/Navigation';
import { Slider } from './components/Slider';
import { AdjustableImage } from './components/AdjustableImage';
import './ImageEditor.scss';

export const ImageEditor = () => {
	const cropperRef = useRef<CropperRef>(null);

	const [src, setSrc] = useState(
		'https://images.pexels.com/photos/4383577/pexels-photo-4383577.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260',
	);

	const [mode, setMode] = useState('crop');

	const [adjustments, setAdjustments] = useState({
		brightness: 0,
		hue: 0,
		saturation: 0,
		contrast: 0,
	});

	const onChangeValue = (value: number) => {
		if (mode in adjustments) {
			setAdjustments((previousValue) => ({
				...previousValue,
				[mode]: value,
			}));
		}
	};

	const onUpload = (blob: string) => {
		setAdjustments({
			brightness: 0,
			hue: 0,
			saturation: 0,
			contrast: 0,
		});
		setMode('crop');
		setSrc(blob);
	};

	const onDownload = () => {
		if (cropperRef.current) {
			const newTab = window.open();
			if (newTab) {
				newTab.document.body.innerHTML = `<img src="${cropperRef.current.getCanvas()?.toDataURL()}"/>`;
			}
		}
	};

	const cropperEnabled = mode === 'crop';

	return (
		<div className={'image-editor'}>
			<div className="image-editor__cropper">
				<Cropper
					src={src}
					ref={cropperRef}
					stencilProps={{
						movable: cropperEnabled,
						resizable: cropperEnabled,
						lines: cropperEnabled,
						handlers: cropperEnabled,
						overlayClassName: cn(
							'image-editor__cropper-overlay',
							!cropperEnabled && 'image-editor__cropper-overlay--faded',
						),
					}}
					backgroundWrapperProps={{
						scaleImage: cropperEnabled,
						moveImage: cropperEnabled,
					}}
					backgroundComponent={AdjustableImage}
					backgroundProps={adjustments}
				/>
				{mode !== 'crop' && (
					<Slider className="image-editor__slider" value={adjustments[mode]} onChange={onChangeValue} />
				)}
			</div>
			<Navigation mode={mode} onChange={setMode} onUpload={onUpload} onDownload={onDownload} />
		</div>
	);
};
