import React from 'react';
import { TwitterCropper } from './components/TwitterCropper';
import './TwitterShowcase.scss';

export const TwitterShowcase = () => {
	return (
		<TwitterCropper
			className={'twitter-showcase'}
			src={'/react-advanced-cropper/img/images/sule-makaroglu-wvEaVy5DGf4-unsplash.jpg'}
		/>
	);
};
