import React, { forwardRef, useImperativeHandle, useLayoutEffect, useRef, useState } from 'react';
import { ImmediatelyOptions, InteractionOptions, NormalizeOptions, TransitionOptions } from 'advanced-cropper';
import cn from 'classnames';
import { FlipHorizontalIcon } from '../icons/FlipHorizontalIcon';
import { RotateRightIcon } from '../icons/RotateRightIcon';
import { RotateLeftIcon } from '../icons/RotateLeftIcon';
import { FlipVerticalIcon } from '../icons/FlipVerticalIcon';
import { RotateComponent, RotateComponentRef } from './RotateComponent';
import './Navigation.scss';

export interface PublicNavigationProps {
	className?: string;
	buttonClassName?: string;
	rotateComponentClassName?: string;
	barClassName?: string;
	highlightedBarClassName?: string;
	activeBarClassName?: string;
	zeroBarClassName?: string;
	valueBarClassName?: string;
}

interface NavigationProps extends PublicNavigationProps {
	value: number;
	onRotate?: (angle: number, options?: TransitionOptions & InteractionOptions & ImmediatelyOptions) => void;
	onRotateEnd?: () => void;
	onFlip?: (
		horizontal: boolean,
		vertical?: boolean,
		options?: TransitionOptions & InteractionOptions & ImmediatelyOptions & NormalizeOptions,
	) => void;
	className?: string;
	disabled?: unknown;
}

export interface NavigationRef {
	refresh: () => void;
}

export const Navigation = forwardRef<NavigationRef, NavigationProps>(
	(
		{
			className,
			buttonClassName,
			rotateComponentClassName,
			barClassName,
			highlightedBarClassName,
			zeroBarClassName,
			valueBarClassName,
			disabled,
			value,
			onRotate,
			onRotateEnd,
			onFlip,
		}: NavigationProps,
		ref,
	) => {
		const [quarter, setQuarter] = useState(0);
		const [adjustmentAngle, setAdjustmentAngle] = useState(0);
		const rotateComponentRef = useRef<RotateComponentRef>(null);

		useLayoutEffect(() => {
			const absRotate = Math.abs(value);

			let rotate;
			if (absRotate % 90 > 45) {
				rotate = (absRotate - (absRotate % 90) + 90) / 90;
			} else if (absRotate % 90 < 45) {
				rotate = (absRotate - (absRotate % 90)) / 90;
			} else {
				rotate = quarter;
			}
			rotate = Math.sign(rotate) * rotate;

			if (rotate !== quarter) {
				setQuarter(rotate);
			}
			setAdjustmentAngle(Math.sign(value) * (Math.abs(value) - Math.abs(rotate) * 90));
			// eslint-disable-next-line react-hooks/exhaustive-deps
		}, [value]);

		useImperativeHandle(ref, () => {
			return {
				refresh() {
					if (rotateComponentRef.current) {
						rotateComponentRef.current.refresh();
					}
				},
			};
		});

		const rotateTo = (angle: number) => {
			if (onRotate && !disabled) {
				onRotate(angle, {
					transitions: false,
					interaction: true,
					immediately: true,
				});
			}
		};

		const rotateLeft = () => {
			if (onRotate && !disabled) {
				if (adjustmentAngle > 0) {
					onRotate(-adjustmentAngle);
				} else if (adjustmentAngle < 0) {
					onRotate(-90 - adjustmentAngle);
				} else {
					onRotate(-90);
				}
			}
		};

		const rotateRight = () => {
			if (onRotate && !disabled) {
				if (adjustmentAngle > 0) {
					onRotate(90 - adjustmentAngle);
				} else if (adjustmentAngle < 0) {
					onRotate(-adjustmentAngle);
				} else {
					onRotate(90);
				}
			}
		};

		const flip = (horizontal: boolean, vertical: boolean) => {
			const evenQuarter = quarter % 2 === 0;
			onFlip?.(evenQuarter ? horizontal : vertical, evenQuarter ? vertical : horizontal, {
				normalize: false,
			});
		};

		const flipHorizontal = () => {
			flip(true, false);
		};

		const flipVertical = () => {
			flip(false, true);
		};

		return (
			<div className={cn('telegram-navigation', className)}>
				<button className={cn('telegram-navigation__button', buttonClassName)} onClick={flipHorizontal}>
					<FlipHorizontalIcon />
				</button>
				<button className={cn('telegram-navigation__button', buttonClassName)} onClick={rotateRight}>
					<RotateRightIcon />
				</button>
				<RotateComponent
					ref={rotateComponentRef}
					className={cn('telegram-navigation__rotator', rotateComponentClassName)}
					barClassName={barClassName}
					zeroBarClassName={zeroBarClassName}
					valueBarClassName={valueBarClassName}
					highlightedBarClassName={highlightedBarClassName}
					onChange={rotateTo}
					onBlur={onRotateEnd}
					from={-45}
					to={45}
					value={adjustmentAngle}
				/>
				<button className={cn('telegram-navigation__button', buttonClassName)} onClick={rotateLeft}>
					<RotateLeftIcon />
				</button>
				<button className={cn('telegram-navigation__button', buttonClassName)} onClick={flipVertical}>
					<FlipVerticalIcon />
				</button>
			</div>
		);
	},
);

Navigation.displayName = 'Navigation';
