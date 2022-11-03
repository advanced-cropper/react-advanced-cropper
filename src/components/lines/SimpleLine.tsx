import React, { useState } from 'react';
import cn from 'classnames';
import { CardinalDirection, MoveDirections } from 'advanced-cropper';
import { LineWrapper } from '../service/LineWrapper';

interface Props {
	defaultClassName?: string;
	hoverClassName?: string;
	wrapperClassName?: string;
	position?: CardinalDirection;
	disabled?: boolean;
	onMove?: (directions: MoveDirections, event: TouchEvent | MouseEvent) => void;
	onMoveEnd?: () => void;
}

export const SimpleLine = ({
	position,
	hoverClassName,
	wrapperClassName,
	defaultClassName,
	disabled,
	onMove,
	onMoveEnd,
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
			className={cn('advanced-cropper-simple-line-wrapper', wrapperClassName, {
				[`advanced-cropper-simple-line-wrapper--${position}`]: !!position,
			})}
			position={position}
			disabled={disabled}
			onDrag={onMove}
			onDragEnd={onMoveEnd}
			onLeave={onLeave}
			onEnter={onEnter}
		>
			<div
				className={cn(
					'advanced-cropper-simple-line',
					hover && 'advanced-cropper-simple-line--hover',
					defaultClassName,
					hover && hoverClassName,
					{
						[`advanced-cropper-simple-line--${position}`]: !!position,
					},
				)}
			/>
		</LineWrapper>
	);
};
