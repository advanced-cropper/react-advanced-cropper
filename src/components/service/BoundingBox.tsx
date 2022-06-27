import React, { ComponentType, useMemo, ReactNode, CSSProperties } from 'react';
import classnames from 'classnames';
import cn from 'classnames';
import {
	CardinalDirection,
	OrdinalDirection,
	HorizontalCardinalDirection,
	VerticalCardinalDirection,
	CropperTransitions,
	ResizeDirections,
	MoveDirections,
} from 'advanced-cropper/types';
import { getDirectionNames, isCardinalDirection, isObject } from 'advanced-cropper/utils';
import { ResizeOptions } from 'advanced-cropper/state';
import { SimpleLine } from '../lines/SimpleLine';
import { SimpleHandler } from '../handlers/SimpleHandler';
import { ArtificialTransition } from './ArtificialTransition';
import './BoundingBox.scss';

const HORIZONTAL_DIRECTIONS = ['east', 'west', null] as const;
const VERTICAL_DIRECTIONS = ['south', 'north', null] as const;

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
	style?: CSSProperties;
	className?: string;
	handlerComponent?: HandlerComponent;
	handlers?: boolean | Partial<Record<OrdinalDirection, boolean>>;
	handlerClassNames?: HandlersClassNames;
	handlerWrapperClassNames?: HandlersClassNames;
	lines?: boolean | Partial<Record<CardinalDirection, boolean>>;
	lineComponent?: LineComponent;
	lineClassNames?: LinesClassNames;
	lineWrapperClassNames?: LinesClassNames;
	disabled?: boolean;
	onResize?: (directions: ResizeDirections, options: ResizeOptions) => void;
	onResizeEnd?: () => void;
	children?: ReactNode;
	width?: number;
	height?: number;
	transitions?: CropperTransitions;
}

interface HandlerNode {
	name: OrdinalDirection;
	component: HandlerComponent;
	className: string;
	wrapperClassName?: string;
	hoverClassName?: string;
	style?: CSSProperties;
	verticalPosition: VerticalCardinalDirection | null;
	horizontalPosition: HorizontalCardinalDirection | null;
	disabled: boolean;
}

interface LineNode {
	name: CardinalDirection;
	component: HandlerComponent;
	className: string;
	wrapperClassName?: string;
	hoverClassName?: string;
	style?: CSSProperties;
	verticalPosition: VerticalCardinalDirection | null;
	horizontalPosition: HorizontalCardinalDirection | null;
	disabled: boolean;
}

interface PointNode {
	name: OrdinalDirection;
	className: string;
	verticalPosition: VerticalCardinalDirection | null;
	horizontalPosition: HorizontalCardinalDirection | null;
}

export const BoundingBox = ({
	style,
	className,
	children,
	onResize,
	onResizeEnd,
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
	disabled = false,
	width,
	height,
	transitions,
}: Props) => {
	const points = useMemo(() => {
		const result: PointNode[] = [];
		HORIZONTAL_DIRECTIONS.forEach((hDirection) => {
			VERTICAL_DIRECTIONS.forEach((vDirection) => {
				if (hDirection !== vDirection) {
					let { snakeCase, camelCase } = getDirectionNames(hDirection, vDirection);
					if (snakeCase && camelCase) {
						result.push({
							name: camelCase,
							className: snakeCase,
							verticalPosition: vDirection,
							horizontalPosition: hDirection,
						});
					}
				}
			});
		});
		return result;
	}, []);

	const lineNodes = useMemo(() => {
		const result: LineNode[] = [];
		points.forEach((point) => {
			if (isCardinalDirection(point.name) && (isObject(lines) ? lines[point.name] : lines)) {
				result.push({
					name: point.name,
					component: lineComponent,
					className: classnames(
						lineClassNames.default,
						lineClassNames[point.name],
						disabled && lineClassNames.disabled,
					),
					wrapperClassName: classnames(
						lineWrapperClassNames.default,
						lineWrapperClassNames[point.name],
						disabled && lineWrapperClassNames.disabled,
					),
					hoverClassName: lineClassNames.hover,
					verticalPosition: point.verticalPosition,
					horizontalPosition: point.horizontalPosition,
					disabled,
				});
			}
		});
		return result;
	}, [points, lines, lineComponent, lineClassNames, lineWrapperClassNames, disabled]);

	const handlerNodes = useMemo(() => {
		const result: HandlerNode[] = [];
		points.forEach((point) => {
			if (isObject(handlers) ? handlers[point.name] : handlers) {
				result.push({
					name: point.name,
					component: handlerComponent,
					className: classnames(handlerClassNames.default, handlerClassNames[point.name]),
					wrapperClassName: classnames(
						`react-bounding-box__handler`,
						(!width || !height) && `react-bounding-box__handler--${point.className}`,
						handlerWrapperClassNames.default,
						handlerWrapperClassNames[point.name],
					),
					hoverClassName: handlerClassNames.hover,
					verticalPosition: point.verticalPosition,
					horizontalPosition: point.horizontalPosition,
					disabled,
				});
			}
		});
		return result;
	}, [height, width, points, handlers, handlerComponent, handlerClassNames, handlerWrapperClassNames, disabled]);

	const onHandlerDrag =
		(
			horizontalDirection: HorizontalCardinalDirection | null,
			verticalDirection: VerticalCardinalDirection | null,
		) =>
		({ left, top }: MoveDirections, nativeEvent: MouseEvent | TouchEvent) => {
			const directions = {
				left: 0,
				right: 0,
				top: 0,
				bottom: 0,
			};

			if (horizontalDirection === 'west') {
				directions.left -= left;
			} else if (horizontalDirection === 'east') {
				directions.right += left;
			}
			if (verticalDirection === 'north') {
				directions.top -= top;
			} else if (verticalDirection === 'south') {
				directions.bottom += top;
			}

			let respectDirection: 'width' | 'height' | undefined;
			if (!verticalDirection && horizontalDirection) {
				respectDirection = 'width';
			} else if (verticalDirection && !horizontalDirection) {
				respectDirection = 'height';
			}

			if (!disabled) {
				if (onResize) {
					onResize(directions, {
						allowedDirections: {
							left: horizontalDirection === 'west' || !horizontalDirection,
							right: horizontalDirection === 'east' || !horizontalDirection,
							bottom: verticalDirection === 'south' || !verticalDirection,
							top: verticalDirection === 'north' || !verticalDirection,
						},
						preserveAspectRatio: nativeEvent && nativeEvent.shiftKey,
						respectDirection,
					});
				}
			}
		};

	return (
		<div className={cn('react-bounding-box', className)} style={style}>
			{children}
			<div>
				{lineNodes.map((line) => (
					<line.component
						key={line.name}
						defaultClassName={line.className}
						hoverClassName={line.hoverClassName}
						wrapperClassName={line.wrapperClassName}
						position={line.name}
						disabled={line.disabled}
						onDrag={onHandlerDrag(line.horizontalPosition, line.verticalPosition)}
						onDragEnd={onResizeEnd}
					/>
				))}
			</div>
			<div>
				{handlerNodes.map((handler) => {
					const handlerElement = (
						<handler.component
							key={handler.name}
							defaultClassName={handler.className}
							hoverClassName={handler.hoverClassName}
							wrapperClassName={handler.wrapperClassName}
							horizontalPosition={handler.horizontalPosition}
							verticalPosition={handler.verticalPosition}
							disabled={handler.disabled}
							onDrag={onHandlerDrag(handler.horizontalPosition, handler.verticalPosition)}
							onDragEnd={onResizeEnd}
						/>
					);
					if (width && height) {
						const { verticalPosition, horizontalPosition } = handler;
						const left =
							horizontalPosition === 'east' ? width : horizontalPosition === 'west' ? 0 : width / 2;

						const top =
							verticalPosition === 'south' ? height : verticalPosition === 'north' ? 0 : height / 2;
						return (
							<ArtificialTransition
								key={handler.name}
								className={'react-bounding-box__handler-wrapper'}
								transitions={transitions}
								left={left}
								top={top}
							>
								{handlerElement}
							</ArtificialTransition>
						);
					} else {
						return handlerElement;
					}
				})}
			</div>
		</div>
	);
};
