import React, { CSSProperties, FC } from 'react';
import { CropperTransitions } from 'advanced-cropper/types';
import { getTransitionStyle } from 'advanced-cropper/service';
import classnames from 'classnames';
import './StencilWrapper.scss';

interface Props {
	className?: string;
	style?: CSSProperties;
	transitions?: CropperTransitions;
	width?: number;
	height?: number;
	left: number;
	top: number;
}

export const StencilWrapper: FC<Props> = ({ className, style, transitions, width, height, left, top, children }) => {
	return (
		<div
			style={{
				...style,
				width: `${width}px`,
				height: `${height}px`,
				top: `0px`,
				left: `0px`,
				transform: `translate3d(${left}px, ${top}px, 0px)`,
				transition: getTransitionStyle(transitions),
			}}
			className={classnames('react-stencil-wrapper', className)}
		>
			{children}
		</div>
	);
};
