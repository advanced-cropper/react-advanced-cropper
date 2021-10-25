import React, { useRef } from 'react';
import { CropperRef, Cropper } from 'react-advanced-cropper';
import { SquareButton } from '@site/src/components/examples/components/SquareButton';
import { VerticalButtons } from '@site/src/components/examples/components/VerticalButtons';
import { ResizeIcon } from '@site/src/components/icons/ResizeIcon';
import { ResizeVerticalIcon } from '@site/src/components/icons/ResizeVerticalIcon';
import { ResizeHorizontalIcon } from '@site/src/components/icons/ResizeHorizontalIcon';
import { ResizeReduceIcon } from '@site/src/components/icons/ResizeReduceIcon';
import { ResizeMaximizeIcon } from '@site/src/components/icons/ResizeMaximizeIcon';
import { CenterIcon } from '@site/src/components/icons/CenterIcon';
import './SetCoordinatesExample.scss';

export const SetCoordinatesExample = () => {
	const cropperRef = useRef<CropperRef>();

	const resize =
		(width = 1, height = 1) =>
		() => {
			if (cropperRef.current) {
				const initialCoordinates = cropperRef.current.getCoordinates();

				cropperRef.current.setCoordinates([
					({ coordinates, imageSize }) => {
						return {
							width: coordinates.width * width,
							height: coordinates.height * height,
						};
					},
					({ coordinates, imageSize }) => ({
						left: initialCoordinates.left + (initialCoordinates.width - coordinates.width) / 2,
						top: initialCoordinates.top + (initialCoordinates.height - coordinates.height) / 2,
					}),
				]);
			}
		};

	const center = () => {
		if (cropperRef.current) {
			cropperRef.current.setCoordinates(({ coordinates, imageSize }) => ({
				left: imageSize.width / 2 - coordinates.width / 2,
				top: imageSize.height / 2 - coordinates.height / 2,
			}));
		}
	};

	const maximize = () => {
		if (cropperRef.current) {
			cropperRef.current.setCoordinates(({ imageSize }) => imageSize);
		}
	};

	return (
		<div className={'set-coordinates-example'}>
			<Cropper
				ref={cropperRef}
				className={'set-coordinates-example__cropper'}
				src={
					'https://images.unsplash.com/photo-1532182657011-d3d31357b5d8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=696&q=80'
				}
				stencilProps={{
					minAspectRatio: 1 / 2,
				}}
			/>
			<VerticalButtons>
				<SquareButton title="Resize (x2)" onClick={resize(2, 2)}>
					<ResizeIcon />
				</SquareButton>
				<SquareButton title="Resize height (x2)" onClick={resize(1, 2)}>
					<ResizeVerticalIcon />
				</SquareButton>
				<SquareButton title="Resize width (x2)" onClick={resize(2, 1)}>
					<ResizeHorizontalIcon />
				</SquareButton>
				<SquareButton title="Resize (x1/2)" onClick={resize(0.5, 0.5)}>
					<ResizeReduceIcon />
				</SquareButton>
				<SquareButton title="Maximize" onClick={maximize}>
					<ResizeMaximizeIcon />
				</SquareButton>
				<SquareButton title="Center" onClick={center}>
					<CenterIcon />
				</SquareButton>
			</VerticalButtons>
		</div>
	);
};
