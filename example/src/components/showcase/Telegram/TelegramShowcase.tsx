import React from 'react';
import { TelegramCropper } from './components/TelegramCropper';
import './TelegramShowcase.scss';

export const TelegramShowcase = () => {
	return (
		<TelegramCropper
			className={'telegram-showcase'}
			src={
				'https://images.pexels.com/photos/12381305/pexels-photo-12381305.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
			}
		/>
	);
};
