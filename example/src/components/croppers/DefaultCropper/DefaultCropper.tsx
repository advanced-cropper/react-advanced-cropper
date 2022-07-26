import React, { useRef, useState } from 'react';
import cn from 'classnames';
import { CropperRef, isEqualState, CropperProps, Cropper } from 'react-advanced-cropper';
import { getCloserAngle } from 'advanced-cropper';
import { Navigation } from './components/Navigation';
import './DefaultCropper.scss';

export interface DefaultCropperProps extends CropperProps {
	wrapperClassName?: string;
}

export type DefaultCropperMethods = CropperRef;

export const DefaultCropper = ({ wrapperClassName, className, ...props }: DefaultCropperProps) => {
	const [changed, setChanged] = useState(false);

	const cropperRef = useRef<CropperRef>(null);

	const getDefaultState = (cropper: CropperRef) => {
		const state = cropper.getState();
		const image = cropper.getImage();
		if (state && image) {
			const defaultState = cropper.getDefaultState(state.boundary, image);
			return {
				...defaultState,
				transforms: {
					...defaultState.transforms,
					rotate: getCloserAngle(state.transforms.rotate, defaultState.transforms.rotate),
				},
			};
		} else {
			return null;
		}
	};

	const onRotate = (angle: number) => {
		if (cropperRef.current) {
			cropperRef.current.rotateImage(angle);
		}
	};

	const onFlip = (horizontal: boolean, vertical: boolean) => {
		const cropper = cropperRef.current;
		if (cropper) {
			if (cropper.getTransforms().rotate % 180 !== 0) {
				cropper.flipImage(!horizontal, !vertical);
			} else {
				cropper.flipImage(horizontal, vertical);
			}
		}
	};

	const onReset = () => {
		const cropper = cropperRef.current;
		if (cropper) {
			cropper.setState(getDefaultState(cropper));
		}
	};
	const onChange = (cropper: CropperRef) => {
		const state = cropper.getState();

		setChanged(state ? !isEqualState(state, getDefaultState(cropper)) : false);
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
