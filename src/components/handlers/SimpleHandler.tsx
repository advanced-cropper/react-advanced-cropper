import React, { CSSProperties, useState } from 'react';
import cn from 'classnames';
import { HorizontalCardinalDirection, MoveDirections, VerticalCardinalDirection } from 'advanced-cropper/types';
import { HandlerWrapper } from '../service/HandlerWrapper';
import './SimpleHandler.scss';

interface Props {
	defaultClassName?: string;
	hoverClassName?: string;
	wrapperClassName?: string;
	wrapperStyle?: CSSProperties;
	verticalPosition?: VerticalCardinalDirection;
	horizontalPosition?: HorizontalCardinalDirection;
	disabled?: boolean;
	onDrag?: (shift: MoveDirections, event: TouchEvent | MouseEvent) => void;
	onDragEnd?: () => void;
}

export const SimpleHandler = ({
	verticalPosition,
	horizontalPosition,
	hoverClassName,
	wrapperClassName,
	defaultClassName,
	wrapperStyle,
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
		<HandlerWrapper
			style={wrapperStyle}
			className={cn(
				'react-simple-handler-wrapper',
				wrapperClassName,
				verticalPosition && `react-simple-handler-wrapper--${verticalPosition}`,
				horizontalPosition && `react-simple-handler-wrapper--${horizontalPosition}`,
				horizontalPosition &&
					verticalPosition &&
					`react-simple-handler-wrapper--${horizontalPosition}-${verticalPosition}`,
				hover && 'react-simple-handler-wrapper--hover',
			)}
			verticalPosition={verticalPosition}
			horizontalPosition={horizontalPosition}
			disabled={disabled}
			onDrag={onDrag}
			onDragEnd={onDragEnd}
			onLeave={onLeave}
			onEnter={onEnter}
		>
			<div
				className={cn('react-simple-handler', defaultClassName, hover && hoverClassName, {
					[hoverClassName]: hoverClassName && hover,
					[`react-simple-handler--${verticalPosition}`]: !!verticalPosition,
					[`react-simple-handler--${horizontalPosition}`]: !!horizontalPosition,
					[`react-simple-handler--${horizontalPosition}-${verticalPosition}`]:
						horizontalPosition && verticalPosition,
				})}
			/>
		</HandlerWrapper>
	);
};
