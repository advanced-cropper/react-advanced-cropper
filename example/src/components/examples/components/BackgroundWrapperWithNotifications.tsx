import React, { useState } from 'react';
import { CropperBackgroundWrapperProps, TransformableImage, isTouchEvent, isWheelEvent } from 'react-advanced-cropper';
import { useDebouncedCallback } from 'use-debounce';
import './BackgroundWrapperWithNotifications.scss';
import cn from 'classnames';

export const BackgroundWrapperWithNotifications = ({
	cropper,
	touchMove,
	mouseMove,
	touchResize,
	wheelResize,
	children,
	className,
	style,
}: CropperBackgroundWrapperProps) => {
	const [notificationType, setNotificationType] = useState<'touch' | 'wheel'>('wheel');

	const [notificationVisible, setNotificationVisible] = useState(false);

	const debouncedHideNotification = useDebouncedCallback(() => {
		setNotificationVisible(false);
	}, 1500);

	const eventsFilter = (nativeEvent: Event, transforming: boolean) => {
		if (isTouchEvent(nativeEvent)) {
			if (nativeEvent.touches.length === 1 && !transforming) {
				setNotificationVisible(true);
				setNotificationType('touch');
				debouncedHideNotification();
				return false;
			} else {
				setNotificationVisible(false);
			}
		} else if (isWheelEvent(nativeEvent)) {
			if (!transforming && !nativeEvent.ctrlKey) {
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

		return !cropper.getTransitions().active;
	};

	return (
		<TransformableImage
			className={className}
			style={style}
			onTransform={cropper.transformImage}
			onTransformEnd={cropper.transformImageEnd}
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
