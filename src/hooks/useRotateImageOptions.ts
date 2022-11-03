import { useMemo } from 'react';
import { getOptions } from 'advanced-cropper';
import { RotateImageOptions } from '../types';

interface DefinedRotateImageOptions {
	touch: boolean;
}

export function useRotateImageOptions(rotateImage: RotateImageOptions | boolean): DefinedRotateImageOptions {
	return useMemo(
		() =>
			getOptions(
				rotateImage,
				{
					touch: true,
				},
				{
					touch: false,
				},
			),
		[rotateImage],
	);
}
