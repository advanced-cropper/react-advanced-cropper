import React, { CSSProperties, ReactNode } from 'react';
import classnames from 'classnames';
import {
	HorizontalCardinalDirection,
	MoveDirections,
	VerticalCardinalDirection,
	getDirectionNames,
} from 'advanced-cropper';
import { DraggableElement } from './DraggableElement';

interface Props {
	className?: string;
	style?: CSSProperties;
	children?: ReactNode;
	onDrag?: (shift: MoveDirections, event: MouseEvent | TouchEvent) => void;
	onDragEnd?: () => void;
	onLeave?: () => void;
	onEnter?: () => void;
	disabled?: boolean;
	horizontalPosition?: HorizontalCardinalDirection;
	verticalPosition?: VerticalCardinalDirection;
}

export const HandlerWrapper = ({
	horizontalPosition,
	verticalPosition,
	className,
	disabled,
	onDrag,
	onDragEnd,
	onLeave,
	onEnter,
	children,
	style,
}: Props) => {
	const position =
		horizontalPosition || verticalPosition
			? getDirectionNames(horizontalPosition, verticalPosition).snakeCase
			: null;

	return (
		<div
			style={style}
			className={classnames(
				className,
				'advanced-cropper-handler-wrapper',
				position && `advanced-cropper-handler-wrapper--${position}`,
				disabled && 'advanced-cropper-handler-wrapper--disabled',
			)}
		>
			<DraggableElement
				className={'advanced-cropper-handler-wrapper__draggable'}
				disabled={disabled}
				onMove={onDrag}
				onMoveEnd={onDragEnd}
				onLeave={onLeave}
				onEnter={onEnter}
				activationDistance={0}
			>
				{children}
			</DraggableElement>
		</div>
	);
};
