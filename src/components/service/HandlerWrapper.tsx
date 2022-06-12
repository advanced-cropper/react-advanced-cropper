import React, { CSSProperties, ReactNode } from 'react';
import classnames from 'classnames';
import { HorizontalCardinalDirection, MoveDirections, VerticalCardinalDirection } from 'advanced-cropper/types';
import { getDirectionNames } from 'advanced-cropper/utils';
import { DraggableElement } from './DraggableElement';

import './HandlerWrapper.scss';

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
				'react-handler-wrapper',
				position && `react-handler-wrapper--${position}`,
				disabled && 'react-handler-wrapper--disabled',
			)}
		>
			<DraggableElement
				className={'react-handler-wrapper__draggable'}
				disabled={disabled}
				onMove={onDrag}
				onMoveEnd={onDragEnd}
				onLeave={onLeave}
				onEnter={onEnter}
			>
				{children}
			</DraggableElement>
		</div>
	);
};
