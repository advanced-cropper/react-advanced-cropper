import React, { FC } from 'react';
import { SchemeLabel } from '../SchemeLabel';
import { BackgroundImage } from './BackgroundImage';
import { WrapperBackground } from './WrapperBackground';
import './StencilStructure.scss';

export const StencilStructure: FC = () => {
	return (
		<div className={'stencil-structure'}>
			<SchemeLabel>Wrapper</SchemeLabel>
			<div className={'stencil-structure__wrapper'}>
				<div className={'stencil-structure__background'}>
					<BackgroundImage className={'stencil-structure__background-image'} />
				</div>
				<WrapperBackground className={'stencil-structure__overlay'} />
				<SchemeLabel className={'stencil-structure__overlay-label'}>Overlay</SchemeLabel>
				<div className="stencil-structure__stencil">
					<div className="stencil-structure__stencil-preview">
						<BackgroundImage className={'stencil-structure__background-image'} />
					</div>
					<SchemeLabel className={'stencil-structure__handler-label'}>Handler</SchemeLabel>
					<SchemeLabel className={'stencil-structure__line-label'}>Line</SchemeLabel>
					<SchemeLabel className={'stencil-structure__preview-label'}>Preview</SchemeLabel>
					<div className="stencil-structure__handler stencil-structure__handler--north stencil-structure__handler--west" />
					<div className="stencil-structure__handler stencil-structure__handler--north stencil-structure__handler--east" />
					<div className="stencil-structure__handler stencil-structure__handler--south stencil-structure__handler--west" />
					<div className="stencil-structure__handler stencil-structure__handler--south stencil-structure__handler--east" />
				</div>
			</div>
		</div>
	);
};
