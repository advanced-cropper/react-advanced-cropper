import React, { useState, useRef, useEffect, useMemo, ChangeEvent } from 'react';
import { Cropper, ImageRestriction } from 'react-advanced-cropper';
import './DefaultTransformsExample.scss';

export const DefaultTransformsExample = () => {
	const inputRef = useRef<HTMLInputElement>(null);

	const [src, setSrc] = useState<string>(
		'/react-advanced-cropper/img/images/farzin-yarahmadi-yR3GrvkWnLA-unsplash.jpg',
	);

	const [transformsType, setTransformsType] = useState<string>('rotate-90');

	const defaultTransforms = useMemo(() => {
		if (transformsType === 'horizontal-flip') {
			return {
				flip: {
					horizontal: true,
				},
			};
		} else if (transformsType === 'vertical-flip') {
			return {
				flip: {
					vertical: true,
				},
			};
		} else if (transformsType === 'rotate-90') {
			return {
				rotate: 90,
			};
		} else if (transformsType === 'rotate-180') {
			return {
				rotate: 180,
			};
		}
	}, [transformsType]);

	const onUpload = () => {
		if (inputRef.current) {
			inputRef.current.click();
		}
	};

	const onLoadImage = (event: ChangeEvent<HTMLInputElement>) => {
		// Reference to the DOM input element
		const file = event.target.files && event.target.files[0];

		// Ensure that you have a file before attempting to read it
		if (file) {
			setSrc(URL.createObjectURL(file));
		}
		event.target.value = '';
	};

	const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setTransformsType(e.target.value as ImageRestriction);
	};

	useEffect(() => {
		// Revoke the object URL, to allow the garbage collector to destroy the uploaded before file
		return () => {
			if (src) {
				URL.revokeObjectURL(src);
			}
		};
	}, [src]);

	return (
		<div className="default-transforms-example">
			<Cropper
				className={'default-transforms-example__cropper'}
				defaultTransforms={defaultTransforms}
				src={src}
			/>
			<div className="default-transforms-example__panel">
				<div className="default-transforms-example__panel-left">
					<div className="default-transforms-example__input">
						<span className="default-transforms-example__input-label">Default Transform</span>
						<select
							value={transformsType}
							className="default-transforms-example__input-control"
							onChange={onChange}
						>
							<option value="horizontal-flip">Horizontal Flip</option>
							<option value="vertical-flip">Vertical Flip</option>
							<option value="rotate-90">Rotate 90°</option>
							<option value="rotate-180">Rotate 180°</option>
						</select>
					</div>
				</div>
				<div className="default-transforms-example__panel-right">
					<div className="default-transforms-example__button" onClick={onUpload}>
						Upload image
						<input ref={inputRef} type="file" accept="image/*" onChange={onLoadImage} />
					</div>
				</div>
			</div>
		</div>
	);
};
