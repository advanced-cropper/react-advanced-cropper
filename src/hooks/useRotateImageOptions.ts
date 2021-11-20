import { useMemo } from 'react';
import { MoveImageSettings, RotateImageSettings } from '../types';
import { getOptions } from 'advanced-cropper/utils';

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
