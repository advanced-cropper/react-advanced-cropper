import React, { FC, useEffect, useState } from 'react';
import ScrollContainer from 'react-indiana-drag-scroll';
import { ImageRestriction } from 'react-advanced-cropper';
import cn from 'classnames';
import { CloseIcon } from '@site/src/components/icons/CloseIcon';
import { SettingsCheckbox } from '@site/src/components/SettingsCheckbox';
import { CropperSettings } from './CroppersWizard';
import { FreeAspectRatioIcon } from './icons/settings/FreeAspectRatioIcon';
import { SquareAspectRatioIcon } from './icons/settings/SquareAspectRatioIcon';
import { VerticalAspectRatioIcon } from './icons/settings/VerticalAspectRatioIcon';
import { PortraitAspectRatioIcon } from './icons/settings/PortraitAspectRatioIcon';
import { HorizontalAspectRatioIcon } from './icons/settings/HorizontalAspectRatioIcon';
import { RangeAspectRatioIcon } from './icons/settings/RangeAspectRatioIcon';
import { FitAreaIcon } from './icons/settings/FitAreaIcon';
import { FillAreaIcon } from './icons/settings/FillAreaIcon';
import { StencilIcon } from './icons/settings/StencilIcon';
import { NoneIcon } from './icons/settings/NoneIcon';
import { RectangleIcon } from './icons/settings/RectangleIcon';
import { CircleIcon } from './icons/settings/CircleIcon';
import { SettingsInput } from './SettingsInput';
import './CroppersWizardSettings.scss';

interface Props {
	settings: CropperSettings;
	open?: boolean;
	onClose: (value: CropperSettings) => void;
	properties: string[];
	className?: string;
	visibleClassName?: string;
}

export const CroppersWizardSettings: FC<Props> = (props) => {
	const { open, onClose, properties, visibleClassName, className } = props;

	const [settings, setSettings] = useState(props.settings);

	useEffect(() => {
		setSettings(props.settings);
	}, [open]);

	const aspectRatios = [
		{
			icon: <FreeAspectRatioIcon />,
		},
		{
			icon: <SquareAspectRatioIcon />,
			aspectRatio: 1,
		},
		{
			icon: <VerticalAspectRatioIcon />,
			aspectRatio: 1 / 2,
		},
		{
			icon: <PortraitAspectRatioIcon />,
			aspectRatio: 3 / 4,
		},
		{
			icon: <HorizontalAspectRatioIcon />,
			aspectRatio: 2 / 1,
		},
		{
			icon: <RangeAspectRatioIcon />,
			minAspectRatio: 1 / 2,
			maxAspectRatio: 2 / 1,
		},
	];

	const imageRestrictions = [
		{
			icon: <FitAreaIcon />,
			imageRestriction: ImageRestriction.fitArea,
		},
		{
			icon: <FillAreaIcon />,
			imageRestriction: ImageRestriction.fillArea,
		},
		{
			icon: <StencilIcon />,
			imageRestriction: ImageRestriction.stencil,
		},
		{
			icon: <NoneIcon />,
			imageRestriction: ImageRestriction.none,
		},
	];

	const stencilTypes = [
		{
			icon: <RectangleIcon />,
			stencilType: 'rectangle' as const,
		},
		{
			icon: <CircleIcon />,
			stencilType: 'circle' as const,
		},
	];

	const inputs = [
		{
			label: 'Min Width',
			field: 'minWidth',
			placeholder: '0',
		},
		{
			label: 'Min Height',
			field: 'minHeight',
			placeholder: '0',
		},
		{
			label: 'Max Width',
			field: 'maxWidth',
			placeholder: '∞',
		},
		{
			label: 'Max Height',
			field: 'maxHeight',
			placeholder: '∞',
		},
	];

	const onCloseInternal = () => {
		onClose(settings);
	};

	const updateSettings = (values: Partial<CropperSettings>) => {
		setSettings({
			...settings,
			...values,
		});
	};

	const inlineSettings = ['grid', 'scaleImage'].some((property) => properties.indexOf(property) !== -1);

	return (
		<div className={cn('croppers-wizard-settings', open && visibleClassName, className)}>
			<button className="croppers-wizard-settings__close-button" onClick={onCloseInternal}>
				<CloseIcon />
			</button>
			{properties.indexOf('aspectRatio') !== -1 && (
				<div className="croppers-wizard-settings__property">
					<div className="croppers-wizard-settings__property-title">Aspect Ratio</div>
					<ScrollContainer className="croppers-wizard-settings__property-values">
						{aspectRatios.map((ratio, index) => {
							const { maxAspectRatio, minAspectRatio, aspectRatio } = ratio;
							const active =
								settings.maxAspectRatio === maxAspectRatio &&
								settings.minAspectRatio === minAspectRatio &&
								settings.aspectRatio === aspectRatio;
							return (
								<div
									key={index}
									className={cn(
										'croppers-wizard-settings__icon',
										active && 'croppers-wizard-settings__icon--active',
									)}
									onClick={() => updateSettings({ maxAspectRatio, minAspectRatio, aspectRatio })}
								>
									{ratio.icon}
								</div>
							);
						})}
					</ScrollContainer>
				</div>
			)}
			{properties.indexOf('imageRestriction') !== -1 && (
				<div className="croppers-wizard-settings__property">
					<div className="croppers-wizard-settings__property-title">Image Restriction</div>
					<ScrollContainer className="croppers-wizard-settings__property-values">
						{imageRestrictions.map((restriction, index) => {
							return (
								<div
									key={index}
									className={cn(
										'croppers-wizard-settings__icon',
										restriction.imageRestriction === settings.imageRestriction &&
											'croppers-wizard-settings__icon--active',
									)}
									onClick={() => updateSettings({ imageRestriction: restriction.imageRestriction })}
								>
									{restriction.icon}
								</div>
							);
						})}
					</ScrollContainer>
				</div>
			)}
			<div className="croppers-wizard-settings__property">
				<div className="croppers-wizard-settings__property-title">Stencil Type</div>
				<ScrollContainer className="croppers-wizard-settings__property-values">
					{stencilTypes.map((type, index) => {
						return (
							<div
								key={index}
								className={cn(
									'croppers-wizard-settings__icon',
									type.stencilType === settings.stencilType &&
										'croppers-wizard-settings__icon--active',
								)}
								onClick={() => updateSettings({ stencilType: type.stencilType })}
							>
								{type.icon}
							</div>
						);
					})}
				</ScrollContainer>
			</div>
			<ScrollContainer className="croppers-wizard-settings__inputs">
				{inputs.map((input, index) => (
					<div key={index} className={'croppers-wizard-settings__input'}>
						<SettingsInput
							value={settings[input.field]}
							label={input.label}
							placeholder={input.placeholder}
							onChange={(value?: number) => updateSettings({ [input.field]: value })}
						/>
					</div>
				))}
			</ScrollContainer>
			{inlineSettings && (
				<ScrollContainer className="croppers-wizard-settings__property-values">
					{properties.indexOf('scaleImage') !== -1 && (
						<SettingsCheckbox
							className={'croppers-wizard-settings__inline-property'}
							value={settings.scaleImage}
							onChange={(value?: boolean) => updateSettings({ scaleImage: value })}
							label={'Scale Image'}
						/>
					)}
					{properties.indexOf('grid') !== -1 && (
						<SettingsCheckbox
							className={'croppers-wizard-settings__inline-property'}
							value={settings.grid}
							onChange={(value?: boolean) => updateSettings({ grid: value })}
							label={'Stencil Grid'}
						/>
					)}
				</ScrollContainer>
			)}
		</div>
	);
};
