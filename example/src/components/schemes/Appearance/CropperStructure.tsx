import React, { FC } from 'react';
import { SchemeLabel } from '../SchemeLabel';
import { BackgroundImage } from './BackgroundImage';
import { WrapperBackground } from './WrapperBackground';
import './CropperStructure.scss';

export interface CropperStructureProps {
	labels?: boolean;
}

export const CropperStructure: FC<CropperStructureProps> = ({ labels }) => {
	return (
		<div className={'cropper-structure'}>
			<SchemeLabel>Wrapper</SchemeLabel>
			<div className={'cropper-structure__wrapper'}>
				<WrapperBackground className={'cropper-structure__wrapper-background'} />
				<div className={'cropper-structure__background'}>
					<SchemeLabel className={'cropper-structure__background-label'}>Background Image</SchemeLabel>
					<BackgroundImage className={'cropper-structure__background-image'} />
				</div>
			</div>
		</div>
	);
};
