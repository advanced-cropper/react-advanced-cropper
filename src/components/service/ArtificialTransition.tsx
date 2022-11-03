import React, { FC, useLayoutEffect, useRef, useState } from 'react';
import { Coordinates, CropperTransitions, deepCompare, isNumber } from 'advanced-cropper';
import classnames from 'classnames';
import { useTransition } from '../../hooks/useTransition';

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

	const transitionValues = useRef<Partial<Coordinates>>(values);

	const [rememberedValues, setRememberedValues] = useState(values);

	const [runTransitions, transitionsActive] = useTransition(transitions);

	useLayoutEffect(() => {
		if (!deepCompare(rememberedValues, values)) {
			setRememberedValues(values);

			const startValues = transitionsActive
				? {
						...transitionValues.current,
				  }
				: rememberedValues;

			runTransitions((progress) => {
				const properties = ['left', 'top', 'height', 'width'] as const;

				properties.forEach((property) => {
					const desiredValue = values[property];
					const startValue = startValues[property];

					transitionValues.current[property] =
						isNumber(startValue) && isNumber(desiredValue)
							? startValue + (desiredValue - startValue) * progress
							: desiredValue;
				});

				if (root.current) {
					root.current.style.width = `${transitionValues.current.width}px`;
					root.current.style.height = `${transitionValues.current.height}px`;
					root.current.style.transform = `translate3d(${transitionValues.current.left}px, ${transitionValues.current.top}px, 0px)`;
				}
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [rememberedValues, transitionsActive, values.width, values.height, values.top, values.left]);

	const currentValues = transitionsActive ? transitionValues.current : values;

	const rootStyle = {
		left: 0,
		top: 0,
		width: `${currentValues.width}px`,
		height: `${currentValues.height}px`,
		transform: `translate3d(${currentValues.left}px, ${currentValues.top}px, 0px)`,
	};

	return (
		<div ref={root} className={classnames('advanced-cropper-artificial-transition', className)} style={rootStyle}>
			{children}
		</div>
	);
};
