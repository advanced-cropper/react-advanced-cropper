import { useMemo } from 'react';
import { getOptions } from 'advanced-cropper/utils';
import { RotateImageSettings } from '../types';

export function useRotateImageOptions(rotateImage: RotateImageSettings | boolean) {
	return useMemo(
		() =>
			getOptions(
				rotateImage,
				{
					enabled: true,
					touch: true,
				},
				{
					enabled: false,
					touch: false,
				},
			),
		[rotateImage],
	);
}
