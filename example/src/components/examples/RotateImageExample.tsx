import React, { useRef } from 'react';
import { CropperRef, Cropper } from 'react-advanced-cropper';
import './RotateImageExample.scss';
import { SquareButton } from '@site/src/components/examples/components/SquareButton';
import { VerticalButtons } from '@site/src/components/examples/components/VerticalButtons';
import { RotateLeftIcon } from '@site/src/components/icons/RotateLeftIcon';
import { RotateRightIcon } from '@site/src/components/icons/RotateRightIcon';
import { FlipHorizontalIcon } from '@site/src/components/icons/FlipHorizontalIcon';
import { FlipVerticalIcon } from '@site/src/components/icons/FlipVerticalIcon';
import { DownloadIcon } from '@site/src/components/icons/DownloadIcon';

export const RotateImageExample = () => {
	const cropperRef = useRef<CropperRef>(null);

	const flip = (horizontal: boolean, vertical: boolean) => () => {
		const cropper = cropperRef.current;
		if (cropper) {
			if (cropper.getTransforms().rotate % 180 !== 0) {
				cropper.flipImage(!horizontal, !vertical);
			} else {
				cropper.flipImage(horizontal, vertical);
			}
		}
	};

	const rotate = (angle: number) => () => {
		const cropper = cropperRef.current;
		if (cropper) {
			cropper.rotateImage(angle);
		}
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
				src={
					'https://images.unsplash.com/photo-1600353068867-5b4de71e3afb?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80'
				}
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
					<DownloadIcon />
				</SquareButton>
			</VerticalButtons>
		</div>
	);
};
