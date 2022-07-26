import { useMemo } from 'react';
import { getOptions } from 'advanced-cropper';
import { RotateImageSettings } from '../types';

export function useRotateImageOptions(rotateImage: RotateImageSettings | boolean) {
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
