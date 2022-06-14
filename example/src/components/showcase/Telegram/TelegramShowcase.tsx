import React from 'react';
import { TelegramCropper } from './components/TelegramCropper';
import './TelegramShowcase.scss';

export const TelegramShowcase = () => {
	return (
		<TelegramCropper
			className={'telegram-showcase'}
			src={'/react-advanced-cropper/img/images/pexels-photo-12381305.jpeg'}
		/>
	);
};
