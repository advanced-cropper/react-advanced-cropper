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
import { SimpleLine } from '../lines/SimpleLine';
import { SimpleHandler } from '../handlers/SimpleHandler';
import { getStencilCoordinates } from 'advanced-cropper/service';
import { BoundingBox } from '../service/BoundingBox';
import { StencilOverlay } from '../service/StencilOverlay';
import { DraggableArea } from '../service/DraggableArea';
import { StencilWrapper } from '../service/StencilWrapper';
import './CircleStencil.scss';

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

interface Props {
	state: CropperState | null;
	transitions?: CropperTransitions | null;
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
	onResize?: (event: ResizeEvent) => void;
	onResizeEnd?: () => void;
	onMove?: (event: MoveEvent) => void;
	onMoveEnd?: () => void;
}

interface Methods {
	aspectRatio: () => AspectRatio;
}

export const CircleStencil = forwardRef<Methods, Props>(
	(
		{
			state,
			transitions,
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
			...props
		}: Props,
		ref,
	) => {
		const [moving, setMoving] = useState(false);

		const [resizing, setResizing] = useState(false);

		useImperativeHandle(ref, () => ({
			aspectRatio: () => {
				return {
					minimum: 1,
					maximum: 1,
				};
			},
		}));

		const onMove = (event: MoveEvent) => {
			if (props.onMove) {
				props.onMove(event);
			}
			setMoving(true);
		};

		const onMoveEnd = () => {
			if (props.onMoveEnd) {
				props.onMoveEnd();
			}
			setMoving(false);
		};

		const onResize = (event: ResizeEvent) => {
			if (props.onResize) {
				props.onResize(event);
			}
			setResizing(true);
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
						'react-circle-stencil',
						movable && 'react-circle-stencil--movable',
						moving && 'react-circle-stencil--moving',
						resizable && 'react-circle-stencil--resizable',
						resizing && 'react-circle-stencil--resizing',
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
						className={cn(boundingBoxClassName, 'react-circle-stencil__bounding-box')}
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
					>
						<DraggableArea
							movable={movable}
							onMove={onMove}
							onMoveEnd={onMoveEnd}
							className={cn('react-circle-stencil__draggable-area', draggableAreaClassName)}
						>
							<StencilOverlay className={cn('react-circle-stencil__overlay', overlayClassName)}>
								<div className={cn('react-circle-stencil__preview', previewClassName)} />
							</StencilOverlay>
						</DraggableArea>
					</BoundingBox>
				</StencilWrapper>
			)
		);
	},
);

CircleStencil.displayName = 'CircleStencil';
