import React, { CSSProperties, FC, useLayoutEffect } from 'react';
import { CropperTransitions } from 'advanced-cropper/types';
import { isNumber } from 'advanced-cropper/utils';
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

export const ArtificialTransition: FC<Props> = ({ className, style, transitions, children, ...values }) => {
	const [state, setState, animation] = useAnimatedState(values);

	useLayoutEffect(() => {
		if (
			state.width !== values.width ||
			state.height !== values.height ||
			state.left !== values.left ||
			state.top !== values.top
		) {
			setState((state, progress) => {
				const result = { ...state };

				const properties = ['left', 'top', 'height', 'width'] as const;

				properties.forEach((property) => {
					const currentValue = result[property];
					const desiredValue = values[property];
					result[property] =
						isNumber(currentValue) && isNumber(desiredValue)
							? currentValue + (desiredValue - currentValue) * progress
							: desiredValue;
				});

				return result;
			}, transitions);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [values.width, values.height, values.top, values.left, transitions]);

	return (
		<div
			className={classnames('react-artificial-transition', className)}
			style={{
				...style,
				width: `${animation ? state.width : values.width}px`,
				height: `${animation ? state.height : values.height}px`,
				transform: `translate3d(${animation ? state.left : values.left}px, ${
					animation ? state.top : values.top
				}px, 0px)`,
				left: 0,
				top: 0,
			}}
		>
			{children}
		</div>
	);
};
