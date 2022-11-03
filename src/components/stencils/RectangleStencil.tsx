import React, { ComponentType, forwardRef, useImperativeHandle } from 'react';
import cn from 'classnames';
import {
	CardinalDirection,
	OrdinalDirection,
	CropperTransitions,
	CropperState,
	MoveDirections,
	ResizeOptions,
	getStencilCoordinates,
	CropperInteractions,
	ResizeAnchor,
	isFunction,
	Coordinates,
	RawAspectRatio,
	createAspectRatio,
} from 'advanced-cropper';
import { SimpleLine } from '../lines/SimpleLine';
import { SimpleHandler } from '../handlers/SimpleHandler';
import { BoundingBox } from '../service/BoundingBox';
import { StencilOverlay } from '../service/StencilOverlay';
import { DraggableArea } from '../service/DraggableArea';
import { StencilWrapper } from '../service/StencilWrapper';
import { StencilGrid } from '../service/StencilGrid';

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
	getState: () => CropperState | null;
	getTransitions: () => CropperTransitions;
	getInteractions: () => CropperInteractions;
	hasInteractions: () => boolean;
	resizeCoordinates: (anchor: ResizeAnchor, directions: Partial<MoveDirections>, parameters: unknown) => void;
	resizeCoordinatesEnd: () => void;
	moveCoordinates: (directions: Partial<MoveDirections>) => void;
	moveCoordinatesEnd: () => void;
}

interface Props {
	cropper: DesiredCropperRef;
	coordinates?: Coordinates | ((state: CropperState | null) => Coordinates);
	handlerComponent?: HandlerComponent;
	handlers?: Partial<Record<OrdinalDirection, boolean>>;
	handlerClassNames?: HandlerClassNames;
	handlerWrapperClassNames?: HandlerClassNames;
	lines?: Partial<Record<CardinalDirection, boolean>>;
	lineComponent?: LineComponent;
	lineClassNames?: LineClassNames;
	lineWrapperClassNames?: LineClassNames;
	className?: string;
	movingClassName?: string;
	resizingClassName?: string;
	gridClassName?: string;
	previewClassName?: string;
	boundingBoxClassName?: string;
	overlayClassName?: string;
	draggableAreaClassName?: string;
	minAspectRatio?: number;
	maxAspectRatio?: number;
	aspectRatio?: RawAspectRatio;
	movable?: boolean;
	resizable?: boolean;
	grid?: boolean;
}

interface Methods {
	aspectRatio: RawAspectRatio;
}

export const RectangleStencil = forwardRef<Methods, Props>(
	(
		{
			cropper,
			coordinates,
			aspectRatio,
			minAspectRatio,
			maxAspectRatio,
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
			grid,
			gridClassName,
			className,
			movingClassName,
			resizingClassName,
			previewClassName,
			boundingBoxClassName,
			overlayClassName,
			draggableAreaClassName,
		}: Props,
		ref,
	) => {
		const state = cropper.getState();
		const transitions = cropper.getTransitions();
		const interactions = cropper.getInteractions();

		useImperativeHandle(ref, () => ({
			aspectRatio: createAspectRatio(
				aspectRatio || {
					minimum: minAspectRatio,
					maximum: maxAspectRatio,
				},
			),
		}));

		const onMove = (directions: MoveDirections) => {
			if (cropper && movable) {
				cropper.moveCoordinates(directions);
			}
		};

		const onMoveEnd = () => {
			if (cropper) {
				cropper.moveCoordinatesEnd();
			}
		};

		const onResize = (anchor: ResizeAnchor, directions: MoveDirections, options: ResizeOptions) => {
			if (cropper && resizable) {
				cropper.resizeCoordinates(anchor, directions, options);
			}
		};

		const onResizeEnd = () => {
			if (cropper) {
				cropper.resizeCoordinatesEnd();
			}
		};

		const { width, height, left, top } = coordinates
			? isFunction(coordinates)
				? coordinates(state)
				: coordinates
			: getStencilCoordinates(state);

		return (
			state && (
				<StencilWrapper
					className={cn(
						'advanced-cropper-rectangle-stencil',
						className,
						interactions.moveCoordinates && movingClassName,
						interactions.resizeCoordinates && resizingClassName,
						{
							'advanced-cropper-rectangle-stencil--movable': movable,
							'advanced-cropper-rectangle-stencil--moving': interactions.moveCoordinates,
							'advanced-cropper-rectangle-stencil--resizable': resizable,
							'advanced-cropper-rectangle-stencil--resizing': interactions.resizeCoordinates,
						},
					)}
					width={width}
					height={height}
					left={left}
					top={top}
					transitions={transitions}
				>
					<BoundingBox
						reference={state.coordinates}
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
								{grid && (
									<StencilGrid
										visible={cropper.hasInteractions()}
										columns={interactions.transformImage.rotate ? 9 : 3}
										rows={interactions.transformImage.rotate ? 9 : 3}
										className={cn('advanced-cropper-rectangle-stencil__grid', gridClassName)}
									/>
								)}
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
