import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { DraggableArea, MoveDirections } from 'react-advanced-cropper';
import cn from 'classnames';
import './RotateComponent.scss';

interface RotateComponentProps {
	from: number;
	to: number;
	value: number;
	step?: number;
	onChange?: (value: number) => void;
	onBlur?: () => void;
	className?: string;
	barsClassName?: string;
	barClassName?: string;
	highlightedBarClassName?: string;
	valueBarClassName?: string;
	zeroBarClassName?: string;
	count?: number;
	thickness?: number;
	density?: number;
}

export interface RotateComponentRef {
	refresh: () => void;
}

function range(from: number, to: number, step = 1): number[] {
	let index = -1;
	let length = Math.max(Math.ceil((to - from) / (step || 1)), 0);

	const result = new Array(length);

	while (length--) {
		result[++index] = from;
		from += step;
	}
	return result;
}

export const RotateComponent = forwardRef<RotateComponentRef, RotateComponentProps>(
	(
		{
			from,
			to,
			value,
			step = 2.5,
			thickness = 2,
			onBlur,
			onChange,
			className,
			valueBarClassName,
			barsClassName,
			barClassName,
			highlightedBarClassName,
			zeroBarClassName,
			density = 10,
		}: RotateComponentProps,
		ref,
	) => {
		const barsRef = useRef<HTMLDivElement>(null);

		const [dragging, setDragging] = useState(false);

		const [items, setItems] = useState<any[]>([]);

		const recalculate = () => {
			if (barsRef.current) {
				const width = barsRef.current.clientWidth;

				const count = width / density;

				const neededLeftBarsCount = Math.max(0, Math.floor(count / 2) - Math.round((value - from) / step));

				const neededRightBarsCount = Math.max(0, Math.floor(count / 2) - Math.round((to - value) / step));

				const values = [
					...range(from - neededLeftBarsCount * step, from, step),
					...range(from, to + step, step),
					...range(to + step, to + step + neededRightBarsCount * step, step),
				];

				const radius = Math.abs(Math.ceil(count / 2) * step);

				setItems(
					values.map((barValue) => {
						const sign = Math.sign(barValue - value);

						// Opacity
						let translate;
						if (Math.abs(barValue - value) / step <= Math.ceil(count / 2)) {
							const multiplier =
								Math.sqrt(Math.pow(radius, 2) - Math.pow(value + sign * radius - barValue, 2)) / radius;
							translate = width / 2 + sign * (width / 2) * Math.pow(multiplier, 2.5);
						} else {
							translate = width / 2 + (sign * width) / 2;
						}

						// Translate
						let opacity = 0;
						if (count > 0 && Math.abs(barValue - value) / step <= Math.ceil(count / 2)) {
							opacity = Math.pow(
								Math.sqrt(Math.pow(radius, 2) - Math.pow(value - barValue, 2)) / radius,
								4,
							);
						}

						return {
							value: barValue,
							highlighted:
								(value < 0 && barValue >= value && barValue <= 0) ||
								(value > 0 && barValue <= value && barValue >= 0),
							zero: barValue === 0,
							opacity,
							translate: translate - thickness / 2,
						};
					}),
				);
			}
		};

		useEffect(() => {
			recalculate();
			// eslint-disable-next-line react-hooks/exhaustive-deps
		}, [density, thickness, from, to, value, step]);

		useImperativeHandle(ref, () => {
			return {
				refresh: recalculate,
			};
		});

		const onMove = (directions: MoveDirections) => {
			if (barsRef.current) {
				const width = barsRef.current.clientWidth;
				const count = width / density;
				const shift = -(directions.left / barsRef.current.clientWidth) * count * step;
				if (onChange) {
					if (value + shift > to) {
						onChange(to - value);
					} else if (value + shift < from) {
						onChange(from - value);
					} else {
						onChange(shift);
					}
				}
			}
		};

		const onMoveEnd = () => {
			document.body.classList.remove('dragging');
			setDragging(false);
			onBlur?.();
		};

		const onMoveStart = () => {
			document.body.classList.add('dragging');
			setDragging(true);
		};

		return (
			<div className={cn('telegram-rotate-component', className)}>
				<DraggableArea onMoveStart={onMoveStart} onMove={onMove} onMoveEnd={onMoveEnd} useAnchor={false}>
					<div
						className={cn(
							'telegram-rotate-component__bars',
							dragging && 'telegram-rotate-component__bars--dragging',
							barsClassName,
						)}
						ref={barsRef}
					>
						{items.map((bar) => (
							<div
								className={cn(
									'telegram-rotate-component__bar',
									bar.zero && 'telegram-rotate-component__bar--zero',
									bar.highlighted && 'telegram-rotate-component__bar--highlighted',
									barClassName,
									bar.highlighted && highlightedBarClassName,
									bar.zero && zeroBarClassName,
								)}
								key={bar.value}
								style={{
									width: bar.opacity ? thickness : 0,
									opacity: bar.opacity,
									transform: `translate(${bar.translate}px, -50%)`,
								}}
							/>
						))}
						<div className={cn('telegram-rotate-component__value', valueBarClassName)}>
							<div className="telegram-rotate-component__value-number">{value.toFixed(1)}°</div>
						</div>
					</div>
				</DraggableArea>
			</div>
		);
	},
);

RotateComponent.displayName = 'RotateComponent';
