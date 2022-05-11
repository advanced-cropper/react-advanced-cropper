import React, { FC } from 'react';
import cn from 'classnames';
import { FlipHorizontalIcon } from '../../../icons/FlipHorizontalIcon';
import { RotateRightIcon } from '../../../icons/RotateRightIcon';
import { RotateLeftIcon } from '../../../icons/RotateLeftIcon';
import { FlipVerticalIcon } from '../../../icons/FlipVerticalIcon';
import { ResetIcon } from '../../../icons/ResetIcon';
import './Navigation.scss';

interface Props {
	onRotate?: (angle: number) => void;
	onFlip?: (horizontal: boolean, vertical: boolean) => void;
	onReset?: () => void;
	changed?: boolean;
	className?: string;
	disabled?: unknown;
}

export const Navigation: FC<Props> = ({ className, disabled, changed, onReset, onRotate, onFlip }) => {
	const rotateLeft = () => {
		if (onRotate && !disabled) {
			onRotate(-90);
		}
	};

	const rotateRight = () => {
		if (onRotate && !disabled) {
			onRotate(90);
		}
	};

	const flipHorizontal = () => {
		if (onFlip && !disabled) {
			onFlip(true, false);
		}
	};

	const flipVertical = () => {
		if (onFlip && !disabled) {
			onFlip(false, true);
		}
	};

	return (
		<div className={cn('default-cropper-navigation', className)}>
			<button className="default-cropper-navigation__button" onClick={flipHorizontal}>
				<FlipHorizontalIcon />
			</button>
			<button className="default-cropper-navigation__button" onClick={rotateRight}>
				<RotateRightIcon />
			</button>
			<div className="default-cropper-navigation__delimiter">
				<div
					className={cn(
						'default-cropper-navigation__dot',
						changed && 'default-cropper-navigation__dot--hidden',
					)}
				/>
				<button
					className={cn(
						'default-cropper-navigation__reset-button',
						!changed && 'default-cropper-navigation__reset-button--hidden',
					)}
					onClick={onReset}
				>
					<ResetIcon />
				</button>
			</div>
			<button className="default-cropper-navigation__button" onClick={rotateLeft}>
				<RotateLeftIcon />
			</button>
			<button className="default-cropper-navigation__button" onClick={flipVertical}>
				<FlipVerticalIcon />
			</button>
		</div>
	);
};
