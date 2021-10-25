import React, { ComponentType, forwardRef, useImperativeHandle, CSSProperties, useState } from 'react';
import cn from 'classnames';
import {
	CardinalDirection,
	OrdinalDirection,
	CropperTransitions,
	CropperState,
	AspectRatio,
} from 'advanced-cropper/types';
import { MoveEvent, ResizeEvent } from 'advanced-cropper/events';
import { getStencilCoordinates } from 'advanced-cropper/service';
import { SimpleLine } from '../lines/SimpleLine';
import { SimpleHandler } from '../handlers/SimpleHandler';
import { BoundingBox } from '../service/BoundingBox';
import { StencilOverlay } from '../service/StencilOverlay';
import { DraggableArea } from '../service/DraggableArea';
import { StencilWrapper } from '../service/StencilWrapper';
import './RectangleStencil.scss';

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

interface Props {
	state: CropperState | null;
	transitions?: CropperTransitions | null;
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
	onResize?: (event: ResizeEvent) => void;
	onResizeEnd?: () => void;
	onMove?: (event: MoveEvent) => void;
	onMoveEnd?: () => void;
}

interface Methods {
	aspectRatio: () => AspectRatio;
}

export const RectangleStencil = forwardRef<Methods, Props>(
	(
		{
			state,
			transitions,
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
			...props
		}: Props,
		ref,
	) => {
		const [moving, setMoving] = useState(false);

		const [resizing, setResizing] = useState(false);

		useImperativeHandle(ref, () => ({
			aspectRatio: () => {
				return {
					minimum: aspectRatio || minAspectRatio,
					maximum: aspectRatio || maxAspectRatio,
				};
			},
		}));

		const onMove = (event: MoveEvent) => {
			if (movable) {
				if (props.onMove) {
					props.onMove(event);
				}
				setMoving(true);
			}
		};

		const onMoveEnd = () => {
			if (props.onMoveEnd) {
				props.onMoveEnd();
			}
			setMoving(false);
		};

		const onResize = (event: ResizeEvent) => {
			if (resizable) {
				if (props.onResize) {
					props.onResize(event);
				}
				setResizing(true);
			}
		};

		const onResizeEnd = () => {
			if (props.onResizeEnd) {
				props.onResizeEnd();
			}
			setResizing(false);
		};

		const { width, height, left, top } = getStencilCoordinates(state);

		const style: CSSProperties = {
			width: `${width}px`,
			height: `${height}px`,
			left: `${left}px`,
			top: `${top}px`,
			transition: '0ms',
		};

		return (
			state && (
				<StencilWrapper
					style={style}
					className={cn(
						'react-rectangle-stencil',
						movable && 'react-rectangle-stencil--movable',
						moving && 'react-rectangle-stencil--moving',
						resizable && 'react-rectangle-stencil--resizable',
						resizing && 'react-rectangle-stencil--resizing',
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
						className={cn(boundingBoxClassName, 'react-rectangle-stencil__bounding-box')}
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
					>
						<DraggableArea
							movable={movable}
							onMove={onMove}
							onMoveEnd={onMoveEnd}
							className={cn('react-rectangle-stencil__draggable-area', draggableAreaClassName)}
						>
							<StencilOverlay className={cn('react-rectangle-stencil__overlay', overlayClassName)}>
								<div className={cn('react-rectangle-stencil__preview', previewClassName)} />
							</StencilOverlay>
						</DraggableArea>
					</BoundingBox>
				</StencilWrapper>
			)
		);
	},
);

RectangleStencil.displayName = 'RectangleStencil';
