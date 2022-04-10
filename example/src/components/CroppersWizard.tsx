import React, { FC, useRef, useState } from 'react';
import { CircleStencil, RectangleStencil, ImageRestriction, Priority } from 'react-advanced-cropper';
import { Cropper as MobileCropper } from 'react-mobile-cropper';
import cn from 'classnames';
import { useToggle } from '@site/src/service/useToggle';
import { CloseIcon } from '@site/src/components/icons/CloseIcon';
import { useHashState } from '@site/src/service/useHashState';
import { FixedCropperIcon } from './icons/FixedCropperIcon';
import { FixedCropper } from './croppers/FixedCropper/FixedCropper';
import { DefaultCropper } from './croppers/DefaultCropper/DefaultCropper';
import { InfoIcon } from './icons/InfoIcon';
import { MobileCropperIcon } from './icons/MobileCropperIcon';
import { DefaultCropperIcon } from './icons/DefaultCropperIcon';
import { SettingsIcon } from './icons/SettingsIcon';
import { CroppersWizardInfo } from './CroppersWizardInfo';
import { CroppersWizardSettings } from './CroppersWizardSettings';
import './CroppersWizard.scss';

interface Image {
	src: string;
	preview: string;
}

export interface CropperSettings {
	aspectRatio?: number;
	minAspectRatio?: number;
	maxAspectRatio?: number;
	imageRestriction?: ImageRestriction;
	stencilType?: 'rectangle' | 'circle';
	minWidth?: number;
	maxWidth?: number;
	minHeight?: number;
	maxHeight?: number;
	scaleImage?: boolean;
}

export interface CropperDescription {
	key: string;
	info: {
		name: string;
		description: string;
	};
	link?: string;
	features: string[];
	settings: string[];
}

export const CroppersWizard: FC = () => {
	const inputRef = useRef<HTMLInputElement>(null);

	const [settings, setSettings] = useState<CropperSettings>({
		aspectRatio: undefined,
		minAspectRatio: undefined,
		maxAspectRatio: undefined,
		imageRestriction: ImageRestriction.fitArea,
		stencilType: 'rectangle',
		minWidth: 0,
		maxWidth: undefined,
		minHeight: 0,
		maxHeight: undefined,
		scaleImage: true,
	});

	const croppers = [
		{
			key: 'default-cropper',
			info: {
				name: 'Default Cropper',
				description: 'The styled default cropped with custom navigation',
			},
			features: ['Custom Navigation', 'Styling'],
			icon: <DefaultCropperIcon />,
			settings: ['aspectRatio', 'imageRestriction', 'stencil', 'size', 'scaleImage'],
		},
		{
			key: 'mobile-cropper',
			info: {
				name: 'Mobile Cropper',
				description: 'The fully custom cropper that was highly inspirited by popular Android mobile croppers.',
			},
			features: ['Custom Postprocess', 'Custom Navigation', 'Styling'],
			icon: <MobileCropperIcon />,
			settings: ['aspectRatio', 'stencil', 'size'],
			link: 'https://github.com/Norserium/react-mobile-cropper/',
		},
		{
			key: 'fixed-cropper',
			info: {
				name: 'Fixed Cropper',
				description: 'The cropper with the fixed stencil. Just like Twitter has.',
			},
			features: ['Custom Navigation', 'Styling'],
			icon: <FixedCropperIcon />,
			link: 'https://github.com/Norserium/react-advanced-cropper/tree/master/example/src/components/croppers/FixedCropper',
			settings: ['size'],
		},
	];

	const images: Image[] = [
		{
			src: '/react-advanced-cropper/img/images/karina-tess-GIgMRVBD-1s-unsplash.jpg',
			preview: '/react-advanced-cropper/img/images/karina-tess-GIgMRVBD-1s-unsplash-preview.jpg',
		},
		{
			src: 'https://images.pexels.com/photos/876344/pexels-photo-876344.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260',
			preview:
				'https://images.pexels.com/photos/876344/pexels-photo-876344.jpeg?auto=compress&cs=tinysrgb&h=120&w=120',
		},
		{
			src: 'https://images.unsplash.com/photo-1599032909756-5deb82fea3b0?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
			preview:
				'https://images.unsplash.com/photo-1599032909756-5deb82fea3b0?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=120&q=80',
		},
		{
			src: 'https://images.unsplash.com/photo-1639141700803-e5836ba39b4b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1800&q=80',
			preview:
				'https://images.unsplash.com/photo-1639141700803-e5836ba39b4b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=120&q=80',
		},
	];

	const [cropper, setCropper] = useHashState(
		croppers[0].key,
		croppers.map((el) => el.key),
	);

	const [src, setSrc] = useState(images[0].src);

	const [customImage, setCustomImage] = useState(false);

	const loadImage = (event: React.ChangeEvent<HTMLInputElement>) => {
		// Reference to the DOM input element
		const { files } = event.target;
		// Ensure that you have a file before attempting to read it
		if (files && files[0]) {
			// 1. Revoke the object URL, to allow the garbage collector to destroy the uploaded before file
			if (src && customImage) {
				URL.revokeObjectURL(src);
			}
			const blob = URL.createObjectURL(files[0]);

			setSrc(blob);
			setCustomImage(true);
		}
	};

	const onImageClick = (image: Image) => () => {
		setSrc(image.src);
		setCustomImage(false);
	};

	const onCropperClick = (cropper: CropperDescription) => () => {
		setCropper(cropper.key);
	};

	const onFileLoadClick = () => {
		if (inputRef.current) {
			inputRef.current.click();
		}
	};

	const [openInfo, onOpenInfo, onCloseInfo] = useToggle();

	const [showSettings, setShowSettings] = useState(false);

	const onOpenSettings = () => {
		setShowSettings(true);
	};

	const onCloseSettings = (values: CropperSettings) => {
		setSettings(values);
		setShowSettings(false);
	};

	const data = croppers.find((el) => el.key === cropper);

	const hasSettings = data && data.settings.length > 0;

	const {
		minHeight,
		minWidth,
		maxWidth,
		maxHeight,
		aspectRatio,
		maxAspectRatio,
		minAspectRatio,
		imageRestriction,
		stencilType,
		scaleImage,
	} = settings;

	const stencilProps = {
		aspectRatio,
		maxAspectRatio,
		minAspectRatio,
	};

	return (
		<div className={'croppers-wizard'}>
			<div className="croppers-wizard__column croppers-wizard__column--left">
				<div className="croppers-wizard__column-title">Cropper</div>
				{croppers.map((el) => (
					<div
						key={el.key}
						onClick={onCropperClick(el)}
						className={cn(
							'croppers-wizard__column-cell croppers-wizard__cropper-type',
							cropper === el.key && 'croppers-wizard__cropper-type--active',
						)}
					>
						{el.icon}
					</div>
				))}
			</div>
			<div className="croppers-wizard__body">
				{cropper === 'mobile-cropper' && (
					<MobileCropper
						key={'mobile-cropper'}
						minHeight={minHeight}
						minWidth={minWidth}
						maxWidth={maxWidth}
						maxHeight={maxHeight}
						className={'croppers-wizard__cropper'}
						src={src}
						stencilType={stencilType}
						stencilProps={stencilProps}
					/>
				)}
				{cropper === 'default-cropper' && (
					<DefaultCropper
						key={'default-cropper'}
						minHeight={minHeight}
						minWidth={minWidth}
						maxWidth={maxWidth}
						maxHeight={maxHeight}
						priority={
							imageRestriction === ImageRestriction.fillArea ? Priority.visibleArea : Priority.coordinates
						}
						wrapperClassName={'croppers-wizard__cropper'}
						src={src}
						stencilProps={stencilProps}
						imageRestriction={imageRestriction}
						stencilComponent={stencilType === 'circle' ? CircleStencil : RectangleStencil}
						scaleImage={
							scaleImage && {
								adjustStencil: imageRestriction !== 'stencil' && imageRestriction !== 'none',
							}
						}
					/>
				)}
				{cropper === 'fixed-cropper' && (
					<FixedCropper
						key={'fixed-cropper'}
						className={'croppers-wizard__cropper'}
						src={src}
						stencilProps={stencilProps}
						minHeight={minHeight}
						minWidth={minWidth}
						maxWidth={maxWidth}
						maxHeight={maxHeight}
						stencilType={stencilType}
					/>
				)}
				<button className="croppers-wizard__info-button" onClick={onOpenInfo}>
					<InfoIcon />
				</button>
				{hasSettings && (
					<button className="croppers-wizard__settings-button" onClick={onOpenSettings}>
						<SettingsIcon />
					</button>
				)}
				<div className={cn('croppers-wizard__info', openInfo && 'croppers-wizard__info--visible')}>
					<button className="croppers-wizard__close-button" onClick={onCloseInfo}>
						<CloseIcon />
					</button>
					{data && <CroppersWizardInfo data={data} />}
				</div>
				{data && (
					<CroppersWizardSettings
						open={showSettings && hasSettings}
						settings={settings}
						onClose={onCloseSettings}
						sections={data.settings}
						className={'croppers-wizard__settings'}
						visibleClassName={'croppers-wizard__settings--visible'}
					/>
				)}
			</div>
			<div className="croppers-wizard__column croppers-wizard__column--right">
				<div className="croppers-wizard__column-title">Image</div>
				{images.map((image) => (
					<div
						key={image.src}
						onClick={onImageClick(image)}
						className={cn(
							'croppers-wizard__column-cell croppers-wizard__image',
							image.src === src && 'croppers-wizard__image--active',
						)}
						style={{
							backgroundImage: `url(${image.preview})`,
						}}
					/>
				))}
				<div
					onClick={onFileLoadClick}
					className={cn('croppers-wizard__column-cell croppers-wizard__custom-image')}
				>
					<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15.5">
						<path d="M8.6 6.7H15v2.2H8.6v6.7H6.4V8.8H0V6.7h6.4V0h2.2v6.7z" />
					</svg>
					<input className="croppers-wizard__file-input" type="file" ref={inputRef} onChange={loadImage} />
				</div>
			</div>
		</div>
	);
};
