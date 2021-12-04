import React, { CSSProperties, FC, useLayoutEffect } from 'react';
import { CropperTransitions } from 'advanced-cropper/types';
import classnames from 'classnames';
import { useAnimatedState } from '../../hooks/useAnimatedState';
import './ArtificialTransition.scss';

interface Props {
	className?: string;
	style?: CSSProperties;
	transitions?: CropperTransitions;
	width?: number;
	height?: number;
	left?: number;
	top?: number;
}

export const ArtificialTransition: FC<Props> = ({
	className,
	style,
	transitions,
	width,
	height,
	left,
	top,
	children,
}) => {
	const [state, setState, animation] = useAnimatedState({
		width,
		height,
		top,
		left,
	});

	useLayoutEffect(() => {
		if (state.width !== width || state.height !== height || state.left !== left || state.top !== top) {
			setState((state, progress) => {
				const result = { ...state };

				result.left = result.left && left ? result.left + (left - result.left) * progress : left;
				result.top = result.top && top ? result.top + (top - result.top) * progress : top;
				result.width = result.width && width ? result.width + (width - result.width) * progress : width;
				result.height = result.height && height ? result.height + (height - result.height) * progress : height;

				return result;
			}, transitions);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [width, height, top, left, transitions]);
	return (
		<div
			className={classnames('react-artificial-transition', className)}
			style={{
				...style,
				width: `${animation ? state.width : width}px`,
				height: `${animation ? state.height : height}px`,
				transform: `translate3d(${animation ? state.left : left}px, ${animation ? state.top : top}px, 0px)`,
				left: 0,
				top: 0,
			}}
		>
			{children}
		</div>
	);
};
