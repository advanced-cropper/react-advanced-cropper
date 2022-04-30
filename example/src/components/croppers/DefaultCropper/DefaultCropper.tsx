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
			const transforms = cropper.getTransforms();

			const k = (transforms.rotate > 0 ? Math.floor : Math.ceil)(transforms.rotate / 360);

			return (props.createStateAlgorithm || createState)(
				{
					boundary: state.boundary,
					imageSize: state.imageSize,
					priority: props.priority,
					transforms: image
						? {
								...image.transforms,
								rotate: k * 360 + image.transforms.rotate,
						  }
						: {
								flip: {
									horizontal: false,
									vertical: false,
								},
								rotate: k * 360,
						  },
				},
				cropper.getSettings(),
			);
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

		setChanged(state ? !isEqualStates(state, getDefaultState(cropper)) : false);
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
