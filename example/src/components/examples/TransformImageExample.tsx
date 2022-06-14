import React, { useRef } from 'react';
import { CropperRef, Cropper } from 'react-advanced-cropper';
import './TransformImageExample.scss';
import { ZoomInIcon } from '@site/src/components/icons/ZoomInIcon';
import { ZoomOutIcon } from '@site/src/components/icons/ZoomOutIcon';
import { ArrowTopIcon } from '@site/src/components/icons/ArrowTopIcon';
import { ArrowLeftIcon } from '@site/src/components/icons/ArrowLeftIcon';
import { ArrowRightIcon } from '@site/src/components/icons/ArrowRightIcon';
import { ArrowBottomIcon } from '@site/src/components/icons/ArrowBottomIcon';
import { SquareButton } from '@site/src/components/examples/components/SquareButton';
import { VerticalButtons } from '@site/src/components/examples/components/VerticalButtons';

export const TransformImageExample = () => {
	const cropperRef = useRef<CropperRef>(null);

	const zoom = (factor: number) => () => {
		const cropper = cropperRef.current;
		if (cropper) {
			cropper.zoomImage(factor);
		}
	};

	const move = (direction: string) => () => {
		const cropper = cropperRef.current;
		if (cropper) {
			const coordinates = cropper.getCoordinates();
			if (coordinates) {
				const { width, height } = coordinates;
				if (direction === 'left') {
					cropper.moveImage(-width / 4);
				} else if (direction === 'right') {
					cropper.moveImage(width / 4);
				} else if (direction === 'top') {
					cropper.moveImage(0, -height / 4);
				} else if (direction === 'bottom') {
					cropper.moveImage(0, height / 4);
				}
			}
		}
	};

	return (
		<div className={'transform-image-example'}>
			<Cropper
				ref={cropperRef}
				className={'transform-image-example__cropper'}
				src={
					'/react-advanced-cropper/img/images/photo-1538888649860-8fb12eb67541.jpg'
				}
			/>
			<VerticalButtons>
				<SquareButton title="Zoom In" onClick={zoom(2)}>
					<ZoomInIcon />
				</SquareButton>
				<SquareButton title="Zoom Out" onClick={zoom(0.5)}>
					<ZoomOutIcon />
				</SquareButton>
				<SquareButton title="Move Top" onClick={move('top')}>
					<ArrowTopIcon />
				</SquareButton>
				<SquareButton title="Move Left" onClick={move('left')}>
					<ArrowLeftIcon />
				</SquareButton>
				<SquareButton title="Move Right" onClick={move('right')}>
					<ArrowRightIcon />
				</SquareButton>
				<SquareButton title="Move Bottom" onClick={move('bottom')}>
					<ArrowBottomIcon />
				</SquareButton>
			</VerticalButtons>
		</div>
	);
};
