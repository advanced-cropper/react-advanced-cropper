import React, { ReactNode } from 'react';
import cn from 'classnames';
import { HorizontalCardinalDirection, MoveDirections, VerticalCardinalDirection } from 'advanced-cropper';
import { DraggableElement } from './DraggableElement';

interface Props {
	className?: string;
	children?: ReactNode;
	onDrag?: (directions: MoveDirections, event: TouchEvent | MouseEvent) => void;
	onDragEnd?: () => void;
	onLeave?: () => void;
	onEnter?: () => void;
	disabled?: boolean;
	position?: HorizontalCardinalDirection | VerticalCardinalDirection;
}

export const LineWrapper = ({
	position,
	className,
	disabled,
	onDrag,
	onDragEnd,
	onLeave,
	onEnter,
	children,
}: Props) => {
	return (
		<DraggableElement
			className={cn([
				'advanced-cropper-line-wrapper',
				position && `advanced-cropper-line-wrapper--${position}`,
				className,
			])}
			disabled={disabled}
			onMove={onDrag}
			onMoveEnd={onDragEnd}
			onLeave={onLeave}
			onEnter={onEnter}
			activationDistance={0}
		>
			<div
				className={cn([
					'advanced-cropper-line-wrapper__content',
					position && `advanced-cropper-line-wrapper__content--${position}`,
				])}
			>
				{children}
			</div>
		</DraggableElement>
	);
};
