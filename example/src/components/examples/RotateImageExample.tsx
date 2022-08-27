import React, { useRef } from 'react';
import { CropperRef, Cropper } from 'react-advanced-cropper';
import './RotateImageExample.scss';
import { SquareButton } from '@site/src/components/examples/components/SquareButton';
import { VerticalButtons } from '@site/src/components/examples/components/VerticalButtons';
import { RotateLeftIcon } from '@site/src/components/icons/RotateLeftIcon';
import { RotateRightIcon } from '@site/src/components/icons/RotateRightIcon';
import { FlipHorizontalIcon } from '@site/src/components/icons/FlipHorizontalIcon';
import { FlipVerticalIcon } from '@site/src/components/icons/FlipVerticalIcon';
import { SaveIcon } from '@site/src/components/icons/SaveIcon';

export const RotateImageExample = () => {
	const cropperRef = useRef<CropperRef>(null);

	const flip = (horizontal: boolean, vertical: boolean) => () => {
		cropperRef.current?.flipImage(horizontal, vertical);
	};

	const rotate = (angle: number) => () => {
		cropperRef.current?.rotateImage(angle);
	};

	const download = () => {
		const cropper = cropperRef.current;
		if (cropper) {
			const result = cropper.getCanvas()?.toDataURL();
			const newTab = window.open();
			if (newTab && result) {
				newTab.document.body.innerHTML = `<img src="${result}"></img>`;
			}
		}
	};

	return (
		<div className={'rotate-image-example'}>
			<Cropper
				ref={cropperRef}
				className={'rotate-image-example__cropper'}
				src={'/react-advanced-cropper/img/images/photo-1600353068867-5b4de71e3afb.jpg'}
			/>
			<VerticalButtons>
				<SquareButton title="Flip Horizontal" onClick={flip(true, false)}>
					<FlipHorizontalIcon />
				</SquareButton>
				<SquareButton title="Flip Vertical" onClick={flip(false, true)}>
					<FlipVerticalIcon />
				</SquareButton>
				<SquareButton title="Rotate Clockwise" onClick={rotate(90)}>
					<RotateRightIcon />
				</SquareButton>
				<SquareButton title="Rotate Counter-Clockwise" onClick={rotate(-90)}>
					<RotateLeftIcon />
				</SquareButton>
				<SquareButton title="Download" onClick={download}>
					<SaveIcon />
				</SquareButton>
			</VerticalButtons>
		</div>
	);
};
