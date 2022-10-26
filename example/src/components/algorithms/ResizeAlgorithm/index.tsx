import React, { useEffect, useRef, useState } from 'react';
import { BoundingBox } from 'react-advanced-cropper';
import './index.scss';
import { coordinatesToStyle } from '@site/src/components/algorithms/utils';
import {
	approximateSize,
	Coordinates,
	createAspectRatio,
	moveToPositionRestrictions,
	anchoredResizeCoordinatesAlgorithm,
	ResizeOptions,
} from 'advanced-cropper';
import { useWindowResize } from '../../../service/useWindowResize';

export const ResizeAlgorithm = () => {
	const exampleRef = useRef<HTMLDivElement>(null);

	const [aspectRatio] = useState(1);
	const [boundary, setBoundary] = useState({ width: 0, height: 0 });
	const [coordinates, setCoordinates] = useState({ width: 100, height: 100, left: 0, top: 0 });

	const [reference, setReference] = useState<Coordinates | null>(null);

	const coordinatesStyle = coordinatesToStyle(coordinates);
	const referenceStyle = coordinatesToStyle(reference);

	const onResize = (anchor, directions, options: ResizeOptions) => {
		setReference(options.reference || null);
		setCoordinates(
			anchoredResizeCoordinatesAlgorithm(coordinates, anchor, directions, options, {
				aspectRatio: createAspectRatio(aspectRatio),
				sizeRestrictions: {
					maxWidth: boundary.width,
					maxHeight: boundary.height,
					minWidth: 0,
					minHeight: 0,
				},
				positionRestrictions: {
					left: 0,
					top: 0,
					right: boundary.width,
					bottom: boundary.height,
				},
			}),
		);
	};

	const onResizeEnd = () => {
		setReference(null);
	};

	const updateBoundary = () => {
		if (exampleRef.current) {
			const updatedBoundary = {
				width: exampleRef.current.clientWidth,
				height: exampleRef.current.clientHeight,
			};
			setBoundary(updatedBoundary);
			setCoordinates((coordinates) => {
				if (coordinates) {
					const updatedCoordinates = {
						...coordinates,
						...approximateSize({
							width: coordinates.width,
							height: coordinates.height,
							aspectRatio,
							sizeRestrictions: {
								maxWidth: updatedBoundary.width,
								maxHeight: updatedBoundary.height,
								minHeight: 0,
								minWidth: 0,
							},
						}),
					};
					return moveToPositionRestrictions(updatedCoordinates, {
						left: 0,
						top: 0,
						bottom: updatedBoundary.height,
						right: updatedBoundary.width,
					});
				}
				return coordinates;
			});
		}
	};

	useWindowResize(updateBoundary);

	useEffect(() => {
		if (exampleRef.current) {
			setCoordinates({
				width: 100,
				height: 100,
				left: exampleRef.current.clientWidth / 2 - 50,
				top: exampleRef.current.clientHeight / 2 - 50,
			});
		}
		updateBoundary();
	}, []);

	return (
		<div className={'resize-algorithm'} ref={exampleRef}>
			<div
				className={'resize-algorithm__boundary'}
				style={{
					width: `${boundary.width}px`,
					height: `${boundary.height}px`,
				}}
			>
				<BoundingBox
					reference={coordinates}
					style={coordinatesStyle}
					className={'resize-algorithm__stencil'}
					onResize={onResize}
					onResizeEnd={onResizeEnd}
					lineClassNames={{
						default: 'resize-algorithm__stencil-line',
					}}
				/>
				<div className={'resize-algorithm__reference'} style={referenceStyle} />
			</div>
		</div>
	);
};
