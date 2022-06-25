import React, { useState, useRef } from 'react';
import { CropperRef, Cropper } from 'react-advanced-cropper';
import { onInputChange } from '../../service/react';
import './ResizeResultExample.scss';

export const ResizeResultExample = () => {
	const cropperRef = useRef<CropperRef>(null);

	const [height, setHeight] = useState<number>();
	const [width, setWidth] = useState<number>();
	const [maxWidth, setMaxWidth] = useState<number>(256);
	const [minWidth, setMinWidth] = useState<number>();
	const [maxArea, setMaxArea] = useState<number>();

	const [image] = useState('/react-advanced-cropper/img/images/pexels-isabella-mariana-1988684.jpg');

	const showImage = () => {
		if (cropperRef.current) {
			const canvas = cropperRef.current.getCanvas({
				height,
				width,
				maxWidth,
				minWidth,
				maxArea,
			});
			const newTab = window.open();
			if (newTab && canvas) {
				newTab.document.body.innerHTML = `<img src="${canvas.toDataURL()}"></img>`;
			}
		}
	};

	return (
		<div className={'resize-result-example'}>
			<Cropper ref={cropperRef} className={'resize-result-example__cropper'} src={image} />
			<div className="resize-result-example-panel">
				<div className="resize-result-example-panel__left">
					<div className="resize-result-example-panel__input">
						<span className="resize-result-example-panel__input-label">Max width</span>
						<input
							value={maxWidth}
							onChange={onInputChange(setMaxWidth)}
							className="resize-result-example-panel__input-control"
							type="text"
						/>
					</div>
					<div className="resize-result-example-panel__input">
						<span className="resize-result-example-panel__input-label">Min width</span>
						<input
							value={minWidth}
							onChange={onInputChange(setMinWidth)}
							className="resize-result-example-panel__input-control"
							type="text"
						/>
					</div>
					<div className="resize-result-example-panel__input">
						<span className="resize-result-example-panel__input-label">Width</span>
						<input
							value={width}
							onChange={onInputChange(setWidth)}
							className="resize-result-example-panel__input-control"
							type="text"
						/>
					</div>
					<div className="resize-result-example-panel__input">
						<span className="resize-result-example-panel__input-label">Height</span>
						<input
							value={height}
							onChange={onInputChange(setHeight)}
							className="resize-result-example-panel__input-control"
							type="text"
						/>
					</div>
					<div className="resize-result-example-panel__input">
						<span className="resize-result-example-panel__input-label">Max area (width × height)</span>
						<input
							value={maxArea}
							onChange={onInputChange(setMaxArea)}
							className="resize-result-example-panel__input-control"
							type="text"
						/>
					</div>
				</div>
				<div className="resize-result-example-panel__right">
					<div className="resize-result-example-panel__button" onClick={showImage}>
						Crop
					</div>
				</div>
			</div>
		</div>
	);
};
