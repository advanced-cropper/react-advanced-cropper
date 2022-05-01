import React, { useState, useRef } from 'react';
import { ImageRestriction, Priority, Cropper, CropperState, CropperRef, VisibleArea } from 'react-advanced-cropper';
import './AdjustStencilExample.scss';

export const AdjustStencilExample = () => {
	const cropperRef = useRef<CropperRef>(null);

	const [adjustStencil, setAdjustStencil] = useState(false);

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setAdjustStencil(e.target.checked);
		if (cropperRef.current) {
			cropperRef.current.reset();
		}
	};

	const defaultSize = (state: CropperState) => {
		const visibleArea = state.visibleArea as VisibleArea;
		return {
			width: visibleArea.width * 0.8,
			height: visibleArea.height * 0.8,
		};
	};

	const defaultPosition = (state: CropperState) => {
		const visibleArea = state.visibleArea as VisibleArea;
		return {
			left: visibleArea.left + 0.1 * visibleArea.width,
			top: visibleArea.top + 0.1 * visibleArea.height,
		};
	};

	return (
		<div className="adjust-stencil-example">
			<Cropper
				ref={cropperRef}
				className={'adjust-stencil-example__cropper'}
				transformImage={{
					adjustStencil,
				}}
				priority={Priority.visibleArea}
				imageRestriction={ImageRestriction.fitArea}
				defaultSize={defaultSize}
				defaultPosition={defaultPosition}
				defaultVisibleArea={{
					width: 594,
					height: 450,
					left: 19,
					top: 183,
				}}
				src={
					'https://images.unsplash.com/photo-1596473322597-91d5b6938b8a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80'
				}
			/>
			<label className="adjust-stencil-example__adjust">
				<input type="checkbox" checked={adjustStencil} onChange={onChange} />
				Adjust stencil
			</label>
		</div>
	);
};
