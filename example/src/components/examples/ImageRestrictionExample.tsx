import React, { useState, useRef } from 'react';
import { Cropper, CropperRef, ImageRestriction } from 'react-advanced-cropper';
import './ImageRestrictionExample.scss';

export const ImageRestrictionExample = () => {
	const cropperRef = useRef<CropperRef>(null);

	const [restrictionType, setRestrictionType] = useState<ImageRestriction>(ImageRestriction.none);

	const showImage = () => {
		const cropper = cropperRef.current;
		if (cropper) {
			const newTab = window.open();
			if (newTab) {
				newTab.document.body.innerHTML = `<img src="${cropper.getCanvas()?.toDataURL()}"></img>`;
			}
		}
	};

	const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setRestrictionType(e.target.value as ImageRestriction);
	};

	return (
		<div className="image-restriction-example">
			<Cropper
				ref={cropperRef}
				className={'image-restriction-example__cropper'}
				imageRestriction={restrictionType}
				src={
					'/react-advanced-cropper/img/images/pexels-photo-10426274.jpeg'
				}
			/>
			<div className="image-restriction-example__panel">
				<div className="image-restriction-example__panel-left">
					<div className="image-restriction-example__input">
						<span className="image-restriction-example__input-label">Image Restriction Type</span>
						<select
							value={restrictionType}
							className="image-restriction-example__input-control"
							onChange={onChange}
						>
							<option value="fillArea">fillArea</option>
							<option value="fitArea">fitArea</option>
							<option value="stencil">stencil</option>
							<option value="none">none</option>
						</select>
					</div>
				</div>
				<div className="image-restriction-example__panel-right">
					<div className="image-restriction-example__button" onClick={showImage}>
						Download
					</div>
				</div>
			</div>
		</div>
	);
};
