import React, { useState } from 'react';
import cn from 'classnames';
import { DragEvent } from 'advanced-cropper/events';
import { CardinalDirection } from 'advanced-cropper/types';
import { LineWrapper } from '../service/LineWrapper';
import './SimpleLine.scss';

interface Props {
	defaultClassName?: string;
	hoverClassName?: string;
	wrapperClassName?: string;
	position?: CardinalDirection;
	disabled?: boolean;
	onDrag?: (event: DragEvent) => void;
	onDragEnd?: () => void;
}

export const SimpleLine = ({
	position,
	hoverClassName,
	wrapperClassName,
	defaultClassName,
	disabled,
	onDrag,
	onDragEnd,
}: Props) => {
	const [hover, setHover] = useState(false);

	const onEnter = () => {
		setHover(true);
	};

	const onLeave = () => {
		setHover(false);
	};

	return (
		<LineWrapper
			className={cn('react-simple-line-wrapper', wrapperClassName, {
				[`react-simple-line-wrapper--${position}`]: !!position,
			})}
			position={position}
			disabled={disabled}
			onDrag={onDrag}
			onDragEnd={onDragEnd}
			onLeave={onLeave}
			onEnter={onEnter}
		>
			<div
				className={cn('react-simple-line', defaultClassName, hover && hoverClassName, {
					[`react-simple-line--${position}`]: !!position,
				})}
			/>
		</LineWrapper>
	);
};
