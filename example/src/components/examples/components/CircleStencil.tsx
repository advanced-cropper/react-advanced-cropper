import React, { useImperativeHandle, forwardRef } from 'react';
import { MoveDirections } from 'advanced-cropper/types';
import {
	StencilRef,
	BasicStencilProps,
	StencilWrapper,
	StencilOverlay,
	DraggableElement,
	DraggableArea,
} from 'react-advanced-cropper';
import './CircleStencil.scss';

export const CircleStencil = forwardRef<StencilRef, BasicStencilProps>(({ cropper }: BasicStencilProps, ref) => {
	const coordinates = cropper.getStencilCoordinates();
	const transitions = cropper.getTransitions();

	useImperativeHandle(ref, () => ({
		aspectRatio: () => {
			return {
				minimum: 1,
				maximum: 1,
			};
		},
	}));

	const onResize = (shift: MoveDirections) => {
		cropper.resizeCoordinates(
			{
				left: -shift.top,
				right: -shift.top,
				top: -shift.top,
				bottom: -shift.top,
			},
			{
				compensate: true,
			},
		);
	};

	return (
		<StencilWrapper className="circle-stencil" transitions={transitions} {...coordinates}>
			<DraggableElement
				className="circle-stencil__handler"
				onDrag={onResize}
				onDragEnd={cropper.resizeCoordinatesEnd}
			>
				<svg xmlns="http://www.w3.org/2000/svg" width="26.7" height="26.3" xmlSpace="preserve">
					<path
						fill="#FFF"
						d="M15.1 4.7 18.3 6l-3.2 3.3 2.3 2.3 3.3-3.3 1.3 3.3L26.7 0zM9.3 14.7 6 18l-1.3-3.3L0 26.3l11.6-4.7-3.3-1.3 3.3-3.3z"
					/>
				</svg>
			</DraggableElement>
			<DraggableArea
				className="circle-stencil__draggable-area"
				onMove={cropper.moveCoordinates}
				onMoveEnd={cropper.moveCoordinatesEnd}
			>
				<StencilOverlay className="circle-stencil__overlay" />
			</DraggableArea>
		</StencilWrapper>
	);
});

CircleStencil.displayName = 'CircleStencil';
