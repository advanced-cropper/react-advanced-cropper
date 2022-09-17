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

	const getDefaultState = () => {
		const currentState = cropperRef.current?.getState();
		const defaultState = cropperRef.current?.getDefaultState();
		return currentState && defaultState
			? {
					...defaultState,
					transforms: {
						...defaultState.transforms,
						rotate: getCloserAngle(currentState.transforms.rotate, defaultState.transforms.rotate),
					},
			  }
			: null;
	};

	const onRotate = (angle: number) => {
		cropperRef.current?.rotateImage(angle);
	};

	const onFlip = (horizontal: boolean, vertical: boolean) => {
		cropperRef.current?.flipImage(horizontal, vertical);
	};

	const onReset = () => {
		cropperRef.current?.setState(getDefaultState());
	};
	const onChange = (cropper: CropperRef) => {
		setChanged(!isEqualState(cropper.getState(), getDefaultState()));
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
