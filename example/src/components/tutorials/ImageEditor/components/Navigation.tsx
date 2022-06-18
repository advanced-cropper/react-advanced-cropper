import React, { ChangeEvent, FC, useRef } from 'react';
import cn from 'classnames';
import { CropIcon } from '../icons/CropIcon';
import { HueIcon } from '../icons/HueIcon';
import { SaturationIcon } from '../icons/SaturationIcon';
import { ContrastIcon } from '../icons/ContrastIcon';
import { BrightnessIcon } from '../icons/BrightnessIcon';
import { UploadIcon } from '../icons/UploadIcon';
import { DownloadIcon } from '../icons/DownloadIcon';
import { Button } from './Button';
import './Navigation.scss';

interface Props {
	className?: string;
	mode?: string;
	onChange?: (mode: string) => void;
	onDownload?: () => void;
	onUpload?: (blob: string) => void;
}

export const Navigation: FC<Props> = ({ className, onChange, onUpload, onDownload, mode }) => {
	const setMode = (mode: string) => () => {
		onChange?.(mode);
	};

	const inputRef = useRef<HTMLInputElement>(null);

	const onUploadButtonClick = () => {
		inputRef.current?.click();
	};

	const onLoadImage = (event: ChangeEvent<HTMLInputElement>) => {
		// Reference to the DOM input element
		const { files } = event.target;

		// Ensure that you have a file before attempting to read it
		if (files && files[0]) {
			if (onUpload) {
				onUpload(URL.createObjectURL(files[0]));
			}
		}
		// Clear the event target value to give the possibility to upload the same image:
		event.target.value = '';
	};

	return (
		<div className={cn('image-editor-navigation', className)}>
			<Button className={'image-editor-navigation__button'} onClick={onUploadButtonClick}>
				<UploadIcon />
				<input
					ref={inputRef}
					type="file"
					accept="image/*"
					onChange={onLoadImage}
					className="image-editor-navigation__upload-input"
				/>
			</Button>
			<div className="image-editor-navigation__buttons">
				<Button
					className={'image-editor-navigation__button'}
					active={mode === 'crop'}
					onClick={setMode('crop')}
				>
					<CropIcon />
				</Button>
				<Button
					className={'image-editor-navigation__button'}
					active={mode === 'saturation'}
					onClick={setMode('saturation')}
				>
					<SaturationIcon />
				</Button>
				<Button
					className={'image-editor-navigation__button'}
					active={mode === 'brightness'}
					onClick={setMode('brightness')}
				>
					<BrightnessIcon />
				</Button>
				<Button
					className={'image-editor-navigation__button'}
					active={mode === 'contrast'}
					onClick={setMode('contrast')}
				>
					<ContrastIcon />
				</Button>
				<Button className={'image-editor-navigation__button'} active={mode === 'hue'} onClick={setMode('hue')}>
					<HueIcon />
				</Button>
			</div>
			<Button className={'image-editor-navigation__button'} onClick={onDownload}>
				<DownloadIcon />
			</Button>
		</div>
	);
};
