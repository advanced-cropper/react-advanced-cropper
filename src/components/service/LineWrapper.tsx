import React, { ReactNode } from 'react';
import classnames from 'classnames';
import { DragEvent } from 'advanced-cropper/events';
import { HorizontalCardinalDirection, VerticalCardinalDirection } from 'advanced-cropper/types';
import { DraggableElement } from './DraggableElement';

import './LineWrapper.scss';

interface Props {
	className?: string;
	children?: ReactNode;
	onDrag?: (event: DragEvent) => void;
	onDragEnd?: () => void;
	onLeave?: () => void;
	onEnter?: () => void;
	disabled?: boolean;
	position: HorizontalCardinalDirection | VerticalCardinalDirection;
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
			className={classnames(['react-line-wrapper', `react-line-wrapper--${position}`, className])}
			disabled={disabled}
			onDrag={onDrag}
			onDragEnd={onDragEnd}
			onLeave={onLeave}
			onEnter={onEnter}
		>
			{children}
		</DraggableElement>
	);
};
