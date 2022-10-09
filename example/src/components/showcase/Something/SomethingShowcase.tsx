import React from 'react';
import { SomethingCropper } from './components/SomethingCropper';
import './SomethingShowcase.scss';

export const SomethingShowcase = () => {
	return (
		<div className={'something-showcase-wrapper'}>
			<div className={'something-showcase-wrapper__background'} />
			<div className={'something-showcase-wrapper__overlay'} />
			<SomethingCropper
				className={'something-showcase'}
				src={'/react-advanced-cropper/img/images/photo-1507692812060-98338d07aca3.jpeg'}
			/>
		</div>
	);
};
