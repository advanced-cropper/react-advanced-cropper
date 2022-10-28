import React, { CSSProperties, FC, useEffect, useRef } from 'react';
import { CropperRef, CropperFade } from 'react-advanced-cropper';
import cn from 'classnames';
import { Spinner } from '../icons/Spinner';
import { Navigation, NavigationRef, PublicNavigationProps } from './Navigation';
import './CropperWrapper.scss';

export interface CropperWrapperProps<CropperRef = unknown> {
	cropper: CropperRef;
	className?: string;
	style?: CSSProperties;
	spinnerClassName?: string;
	navigation?: boolean;
	navigationProps?: PublicNavigationProps;
}

export const CropperWrapper: FC<CropperWrapperProps<CropperRef>> = ({
	cropper,
	children,
	className,
	spinnerClassName,
	navigation,
	navigationProps = {},
}) => {
	const navigationRef = useRef<NavigationRef>(null);

	const state = cropper.getState();

	const transitions = cropper.getTransitions();

	const { rotate } = cropper.getTransforms();

	useEffect(() => {
		navigationRef.current?.refresh();
	}, [state?.boundary.width, state?.boundary.height]);

	return (
		<div
			className={cn(
				'telegram-cropper-wrapper',
				navigation && 'telegram-cropper-wrapper--with-navigation',
				className,
			)}
		>
			<CropperFade className={'telegram-cropper-wrapper__fade'} visible={cropper.isLoaded()}>
				{children}
				{navigation && (
					<Navigation
						ref={navigationRef}
						value={rotate}
						onRotate={cropper.rotateImage}
						onRotateEnd={cropper.transformImageEnd}
						onFlip={cropper.flipImage}
						className={cn('telegram-cropper-wrapper__navigation', navigationProps.className)}
						buttonClassName={navigationProps.buttonClassName}
						barClassName={navigationProps.barClassName}
						valueBarClassName={navigationProps.valueBarClassName}
						zeroBarClassName={navigationProps.zeroBarClassName}
						highlightedBarClassName={navigationProps.highlightedBarClassName}
						disabled={transitions.active}
					/>
				)}
			</CropperFade>
			<Spinner
				className={cn(
					'telegram-cropper-wrapper__spinner',
					cropper.isLoading() && 'telegram-cropper-wrapper__spinner--visible',
					spinnerClassName,
				)}
			/>
		</div>
	);
};
