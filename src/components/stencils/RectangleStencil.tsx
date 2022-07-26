import React, { ComponentType, forwardRef, useImperativeHandle, CSSProperties, useState, useEffect } from 'react';
import cn from 'classnames';
import {
	CardinalDirection,
	OrdinalDirection,
	CropperImage,
	MoveDirections,
	ResizeDirections,
	CropperState,
	CropperTransitions,
	RawAspectRatio,
} from 'advanced-cropper';
import { createAspectRatio, getStencilCoordinates } from 'advanced-cropper/service';
import { ResizeOptions } from 'advanced-cropper/state';
import { SimpleLine } from '../lines/SimpleLine';
import { SimpleHandler } from '../handlers/SimpleHandler';
import { BoundingBox } from '../service/BoundingBox';
import { StencilOverlay } from '../service/StencilOverlay';
import { DraggableArea } from '../service/DraggableArea';
import { StencilWrapper } from '../service/StencilWrapper';

type HandlerComponent = ComponentType<any>;

type LineComponent = ComponentType<any>;

interface HandlerClassNames extends Partial<Record<OrdinalDirection, string>> {
	default?: string;
	disabled?: string;
	hover?: string;
}

interface LineClassNames extends Partial<Record<CardinalDirection, string>> {
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
	refresh: () => void;
}

interface Props {
	cropper: DesiredCropperRef;
	image?: CropperImage | null;
	handlerComponent?: HandlerComponent;
	handlers?: Partial<Record<OrdinalDirection, boolean>>;
	handlerClassNames?: HandlerClassNames;
	handlerWrapperClassNames?: HandlerClassNames;
	lines?: Partial<Record<CardinalDirection, boolean>>;
	lineComponent?: LineComponent;
	lineClassNames?: LineClassNames;
	lineWrapperClassNames?: LineClassNames;
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
	aspectRatio: RawAspectRatio;
}

export const RectangleStencil = forwardRef<Methods, Props>(
	(
		{
			cropper,
			handlerComponent = SimpleHandler,
			handlers = {
				eastNorth: true,
				north: true,
				westNorth: true,
				west: true,
				westSouth: true,
				south: true,
				eastSouth: true,
				east: true,
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
			aspectRatio,
			minAspectRatio,
			maxAspectRatio,
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

		const options = {
			aspectRatio: createAspectRatio(
				aspectRatio || {
					minimum: minAspectRatio,
					maximum: maxAspectRatio,
				},
			),
		};

		useImperativeHandle(ref, () => options);

		useEffect(() => {
			cropper.refresh();
		}, [options.aspectRatio.minimum, options.aspectRatio.maximum]);

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
						'advanced-cropper-rectangle-stencil',
						movable && 'advanced-cropper-rectangle-stencil--movable',
						moving && 'advanced-cropper-rectangle-stencil--moving',
						resizable && 'advanced-cropper-rectangle-stencil--resizable',
						resizing && 'advanced-cropper-rectangle-stencil--resizing',
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
						className={cn(boundingBoxClassName, 'advanced-cropper-rectangle-stencil__bounding-box')}
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
						transitions={transitions}
						width={width}
						height={height}
						disabled={!resizable}
					>
						<DraggableArea
							disabled={!movable}
							onMove={onMove}
							onMoveEnd={onMoveEnd}
							className={cn('advanced-cropper-rectangle-stencil__draggable-area', draggableAreaClassName)}
						>
							<StencilOverlay
								className={cn('advanced-cropper-rectangle-stencil__overlay', overlayClassName)}
							>
								<div className={cn('advanced-cropper-rectangle-stencil__preview', previewClassName)} />
							</StencilOverlay>
						</DraggableArea>
					</BoundingBox>
				</StencilWrapper>
			)
		);
	},
);

RectangleStencil.displayName = 'RectangleStencil';
