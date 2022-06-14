import React, { FC, useLayoutEffect, useRef, useState } from 'react';
import { Coordinates, CropperTransitions } from 'advanced-cropper/types';
import { deepCompare, isNumber } from 'advanced-cropper/utils';
import classnames from 'classnames';
import { useTransition } from '../../hooks/useAnimatedState';
import './ArtificialTransition.scss';

interface Props {
	className?: string;
	transitions?: CropperTransitions;
	width?: number;
	height?: number;
	left?: number;
	top?: number;
}

export const ArtificialTransition: FC<Props> = ({ className, transitions, children, ...values }) => {
	const root = useRef<HTMLDivElement>(null);

	const [rememberedValues, setRememberedValues] = useState(values);

	const [runTransitions, transitionsActive] = useTransition(transitions);

	useLayoutEffect(() => {
		if (!deepCompare(rememberedValues, values) && !transitionsActive) {
			setRememberedValues(values);
			runTransitions((progress) => {
				const properties = ['left', 'top', 'height', 'width'] as const;

				const coordinates: Partial<Coordinates> = {};

				properties.forEach((property) => {
					const desiredValue = values[property];
					const startValue = rememberedValues[property];

					coordinates[property] =
						isNumber(startValue) && isNumber(desiredValue)
							? startValue + (desiredValue - startValue) * progress
							: desiredValue;
				});

				if (root.current) {
					root.current.style.width = `${coordinates.width}px`;
					root.current.style.height = `${coordinates.height}px`;
					root.current.style.transform = `translate3d(${coordinates.left}px, ${coordinates.top}px, 0px)`;
				}
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [rememberedValues, transitionsActive, values.width, values.height, values.top, values.left]);

	const rootStyle = transitionsActive
		? { left: 0, top: 0 }
		: {
				left: 0,
				top: 0,
				width: `${values.width}px`,
				height: `${values.height}px`,
				transform: `translate3d(${values.left}px, ${values.top}px, 0px)`,
		  };

	return (
		<div ref={root} className={classnames('react-artificial-transition', className)} style={rootStyle}>
			{children}
		</div>
	);
};
