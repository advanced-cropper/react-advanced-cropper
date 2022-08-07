import React, { ComponentType, forwardRef, useImperativeHandle, useState } from 'react';
import cn from 'classnames';
import {
	CardinalDirection,
	OrdinalDirection,
	CropperTransitions,
	CropperState,
	ResizeDirections,
	MoveDirections,
	CropperImage,
	ResizeOptions,
	getStencilCoordinates,
} from 'advanced-cropper';
import { SimpleLine } from '../lines/SimpleLine';
import { SimpleHandler } from '../handlers/SimpleHandler';
import { BoundingBox } from '../service/BoundingBox';
import { StencilOverlay } from '../service/StencilOverlay';
import { DraggableArea } from '../service/DraggableArea';
import { StencilWrapper } from '../service/StencilWrapper';
import { StencilOptions } from '../../types';

type HandlerComponent = ComponentType<any>;

type LineComponent = ComponentType<any>;

interface HandlersClassNames extends Partial<Record<OrdinalDirection, string>> {
	default?: string;
	disabled?: string;
	hover?: string;
}

interface LinesClassNames extends Partial<Record<CardinalDirection, string>> {
	default?: string;
	disabled?: string;
	hover?: string;
}

interface DesiredCropperRef {
	getState: () => CropperState;
	getTransitions: () => CropperTransitions;
	resizeCoordinates: (directions: ResizeDirections, options: ResizeOptions) => void;
	resizeCoordinatesEnd: () => void;
	moveCoordinates: (directions: MoveDirections) => void;
	moveCoordinatesEnd: () => void;
	setStencilOptions: (options: StencilOptions) => void;
}

interface Props {
	cropper: DesiredCropperRef;
	image: CropperImage | null;
	handlerComponent?: HandlerComponent;
	handlers?: Partial<Record<OrdinalDirection, boolean>>;
	handlerClassNames?: HandlersClassNames;
	handlerWrapperClassNames?: HandlersClassNames;
	lines?: Partial<Record<CardinalDirection, boolean>>;
	lineComponent?: LineComponent;
	lineClassNames?: LinesClassNames;
	lineWrapperClassNames?: LinesClassNames;
	movingClassName?: string;
	resizingClassName?: string;
	previewClassName?: string;
	boundingBoxClassName?: string;
	overlayClassName?: string;
	draggableAreaClassName?: string;
	minAspectRatio?: number;
	maxAspectRatio?: number;
	aspectRatio?: number;
	movable?: boolean;
	resizable?: boolean;
}

interface Methods {
	aspectRatio: number;
}

export const CircleStencil = forwardRef<Methods, Props>(
	(
		{
			cropper,
			handlerComponent = SimpleHandler,
			handlers = {
				eastNorth: true,
				westNorth: true,
				westSouth: true,
				eastSouth: true,
			},
			handlerClassNames = {},
			handlerWrapperClassNames = {},
			lines = {
				west: true,
				north: true,
				east: true,
				south: true,
			},
			lineComponent = SimpleLine,
			lineClassNames = {},
			lineWrapperClassNames = {},
			resizable = true,
			movable = true,
			movingClassName,
			resizingClassName,
			previewClassName,
			boundingBoxClassName,
			overlayClassName,
			draggableAreaClassName,
		}: Props,
		ref,
	) => {
		const [moving, setMoving] = useState(false);

		const [resizing, setResizing] = useState(false);

		const state = cropper.getState();

		const transitions = cropper.getTransitions();

		useImperativeHandle(ref, () => ({
			aspectRatio: 1,
			boundingBox: 'circle',
		}));

		const onMove = (directions: MoveDirections) => {
			if (movable && cropper) {
				cropper.moveCoordinates(directions);
				setMoving(true);
			}
		};

		const onMoveEnd = () => {
			if (cropper) {
				cropper.moveCoordinatesEnd();
			}
			setMoving(false);
		};

		const onResize = (directions: ResizeDirections, options: ResizeOptions) => {
			if (resizable) {
				if (cropper) {
					cropper.resizeCoordinates(directions, options);
				}
				setResizing(true);
			}
		};

		const onResizeEnd = () => {
			if (cropper) {
				cropper.resizeCoordinatesEnd();
			}
			setResizing(false);
		};

		const { width, height, left, top } = getStencilCoordinates(state);

		return (
			state && (
				<StencilWrapper
					className={cn(
						'advanced-cropper-circle-stencil',
						movable && 'advanced-cropper-circle-stencil--movable',
						moving && 'advanced-cropper-circle-stencil--moving',
						resizable && 'advanced-cropper-circle-stencil--resizable',
						resizing && 'advanced-cropper-circle-stencil--resizing',
						moving && movingClassName,
						resizing && resizingClassName,
					)}
					width={width}
					height={height}
					left={left}
					top={top}
					transitions={transitions}
				>
					<BoundingBox
						className={cn(boundingBoxClassName, 'advanced-cropper-circle-stencil__bounding-box')}
						handlers={handlers}
						handlerComponent={handlerComponent}
						handlerClassNames={handlerClassNames}
						handlerWrapperClassNames={handlerWrapperClassNames}
						lines={lines}
						lineComponent={lineComponent}
						lineClassNames={lineClassNames}
						lineWrapperClassNames={lineWrapperClassNames}
						onResize={onResize}
						onResizeEnd={onResizeEnd}
						disabled={!resizable}
					>
						<DraggableArea
							disabled={!movable}
							onMove={onMove}
							onMoveEnd={onMoveEnd}
							className={cn('advanced-cropper-circle-stencil__draggable-area', draggableAreaClassName)}
						>
							<StencilOverlay
								className={cn('advanced-cropper-circle-stencil__overlay', overlayClassName)}
							>
								<div className={cn('advanced-cropper-circle-stencil__preview', previewClassName)} />
							</StencilOverlay>
						</DraggableArea>
					</BoundingBox>
				</StencilWrapper>
			)
		);
	},
);

CircleStencil.displayName = 'CircleStencil';
