import React, { FC, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { CropperDescription } from './CroppersWizard';
import './CroppersWizardInfo.scss';

interface Props {
	data: CropperDescription;
}

export const CroppersWizardInfo: FC<Props> = (props) => {
	const { data } = props;

	return (
		<div className={'croppers-wizard-info'}>
			<div className="croppers-wizard-info__name">{data.info.name}</div>

			<div className="croppers-wizard-info__property">
				<div className="croppers-wizard-info__property-title">Description</div>
				<div className="croppers-wizard-info__property-value">{data.info.description}</div>
			</div>
			{data.link && (
				<div className="croppers-wizard-info__property">
					<div className="croppers-wizard-info__property-title">Link</div>
					<a
						className="croppers-wizard-info__property-value"
						href={data.link}
						target={'_blank'}
						rel={'noreferrer norel'}
					>
						{data.link}
					</a>
				</div>
			)}
			<div className="croppers-wizard-info__property">
				<div className="croppers-wizard-info__property-title">Features</div>
				<div className="croppers-wizard-info__property- croppers-wizard-info__features">
					{data.features.map((feature, index) => (
						<div className="croppers-wizard-info__feature" key={index}>
							{feature}
						</div>
					))}
				</div>
			</div>
		</div>
	);
};
