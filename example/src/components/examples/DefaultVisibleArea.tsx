import React from 'react';
import { Cropper, Priority } from 'react-advanced-cropper';
import './DefaultVisibleArea.scss';

export const DefaultVisibleArea = () => {
	const defaultVisibleArea = {
		width: 800,
		height: 775,
		left: 63,
		top: 668,
	};
	return (
		<Cropper
			className={'default-visible-area-example'}
			src={
				'/react-advanced-cropper/img/images/photo-1602718571797-49d5e9d54563.jpg'
			}
			defaultVisibleArea={defaultVisibleArea}
			priority={Priority.visibleArea}
		/>
	);
};
