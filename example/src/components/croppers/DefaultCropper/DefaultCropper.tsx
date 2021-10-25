import React, { useRef, useState } from 'react';
import cn from 'classnames';
import { createState, CropperRef, isEqualStates, CropperProps, Cropper } from 'react-advanced-cropper';
import './DefaultCropper.scss';
import { Navigation } from './components/Navigation';

export interface DefaultCropperProps extends CropperProps {
	wrapperClassName?: string;
}

export type DefaultCropperMethods = CropperRef;

export const DefaultCropper = ({ wrapperClassName, className, ...props }: DefaultCropperProps) => {
	const [changed, setChanged] = useState(false);

	const cropperRef = useRef<CropperRef>();

	const getDefaultState = (cropper: CropperRef) => {
		const state = cropper.getState();
		if (state) {
			const image = cropper.getImage();
			return (props.createStateAlgorithm || createState)(
				{
					boundary: state.boundary,
					imageSize: state.imageSize,
					priority: props.priority,
					transforms: image.transforms,
				},
				cropper.getSettings(),
			);
		}
	};

	const onRotate = (angle: number) => {
		if (cropperRef.current) {
			cropperRef.current.rotate(angle);
		}
	};

	const onFlip = (horizontal: boolean, vertical: boolean) => {
		if (cropperRef.current) {
			cropperRef.current.flip(horizontal, vertical);
		}
	};

	const onReset = () => {
		if (cropperRef.current) {
			cropperRef.current.setState(getDefaultState(cropperRef.current));
		}
	};
	const onChange = (cropper: CropperRef) => {
		const state = cropper.getState();

		setChanged(state && !isEqualStates(state, getDefaultState(cropper)));
	};

	return (
		<div className={cn('default-cropper', wrapperClassName)}>
			<Cropper
				onChange={onChange}
				className={cn('default-cropper__cropper', className)}
				ref={cropperRef}
				{...props}
			/>
			<div className="default-cropper__navigation">
				<Navigation changed={changed} onReset={onReset} onFlip={onFlip} onRotate={onRotate} />
			</div>
		</div>
	);
};

DefaultCropper.displayName = 'DefaultCropper';
