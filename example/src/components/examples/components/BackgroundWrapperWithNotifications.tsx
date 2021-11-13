import React, { useState } from 'react';
import {
	CropperBackgroundWrapperProps,
	TransformableImage,
	TransformImageType,
	isTouchEvent,
	isWheelEvent,
} from 'react-advanced-cropper';
import { useDebouncedCallback } from 'use-debounce';
import './BackgroundWrapperWithNotifications.scss';
import cn from 'classnames';

export const BackgroundWrapperWithNotifications = ({
	touchMove,
	mouseMove,
	touchResize,
	wheelResize,
	children,
	className,
	onMove,
	onResize,
	onTransformEnd,
	style,
	transitions,
}: CropperBackgroundWrapperProps) => {
	const [notificationType, setNotificationType] = useState<'touch' | 'wheel'>('wheel');

	const [notificationVisible, setNotificationVisible] = useState(false);

	const debouncedHideNotification = useDebouncedCallback(() => {
		setNotificationVisible(false);
	}, 1500);

	const eventsFilter = (
		transform: TransformImageType,
		nativeEvent: Event,
		currentTransforms: Record<TransformImageType, boolean>,
	) => {
		if (transform === 'touchTransform') {
			if (isTouchEvent(nativeEvent) && nativeEvent.touches.length === 1 && !currentTransforms.touchTransform) {
				setNotificationVisible(true);
				setNotificationType('touch');
				debouncedHideNotification();
				return false;
			} else {
				setNotificationVisible(false);
			}
		} else if (transform === 'wheelResize') {
			if (
				isWheelEvent(nativeEvent) &&
				!nativeEvent.ctrlKey &&
				!currentTransforms.wheelResize &&
				!currentTransforms.mouseMove
			) {
				setNotificationVisible(true);
				setNotificationType('wheel');
				debouncedHideNotification();
				return false;
			} else {
				setNotificationVisible(false);
			}
		}
		nativeEvent.preventDefault();
		nativeEvent.stopPropagation();

		return !transitions;
	};

	return (
		<TransformableImage
			className={className}
			style={style}
			onMove={onMove}
			onResize={onResize}
			onTransformEnd={onTransformEnd}
			touchMove={touchMove}
			mouseMove={mouseMove}
			touchResize={touchResize}
			wheelResize={wheelResize}
			eventsFilter={eventsFilter}
		>
			{children}

			<div
				className={cn(
					'cropper-event-notification',
					notificationVisible && 'cropper-event-notification--visible',
				)}
			>
				{notificationType === 'wheel'
					? 'Use ctrl + scroll to zoom the cropper'
					: 'Use two fingers to move the cropper'}
			</div>
		</TransformableImage>
	);
};
