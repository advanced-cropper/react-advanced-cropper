import React, { CSSProperties, useState } from 'react';
import cn from 'classnames';
import { HorizontalCardinalDirection, MoveDirections, VerticalCardinalDirection } from 'advanced-cropper';
import { HandlerWrapper } from '../service/HandlerWrapper';

interface Props {
	defaultClassName?: string;
	hoverClassName?: string;
	wrapperClassName?: string;
	wrapperStyle?: CSSProperties;
	verticalPosition?: VerticalCardinalDirection;
	horizontalPosition?: HorizontalCardinalDirection;
	disabled?: boolean;
	onMove?: (shift: MoveDirections, event: TouchEvent | MouseEvent) => void;
	onMoveEnd?: () => void;
}

export const SimpleHandler = ({
	verticalPosition,
	horizontalPosition,
	hoverClassName,
	wrapperClassName,
	defaultClassName,
	wrapperStyle,
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
		<HandlerWrapper
			style={wrapperStyle}
			className={cn(
				'advanced-cropper-simple-handler-wrapper',
				wrapperClassName,
				verticalPosition && `advanced-cropper-simple-handler-wrapper--${verticalPosition}`,
				horizontalPosition && `advanced-cropper-simple-handler-wrapper--${horizontalPosition}`,
				horizontalPosition &&
					verticalPosition &&
					`advanced-cropper-simple-handler-wrapper--${horizontalPosition}-${verticalPosition}`,
				hover && 'advanced-cropper-simple-handler-wrapper--hover',
			)}
			verticalPosition={verticalPosition}
			horizontalPosition={horizontalPosition}
			disabled={disabled}
			onDrag={onMove}
			onDragEnd={onMoveEnd}
			onLeave={onLeave}
			onEnter={onEnter}
		>
			<div
				className={cn(
					'advanced-cropper-simple-handler',
					hover && 'advanced-cropper-simple-handler--hover',
					defaultClassName,
					hover && hoverClassName,
					{
						[`advanced-cropper-simple-handler--${verticalPosition}`]: !!verticalPosition,
						[`advanced-cropper-simple-handler--${horizontalPosition}`]: !!horizontalPosition,
						[`advanced-cropper-simple-handler--${horizontalPosition}-${verticalPosition}`]:
							horizontalPosition && verticalPosition,
					},
				)}
			/>
		</HandlerWrapper>
	);
};
