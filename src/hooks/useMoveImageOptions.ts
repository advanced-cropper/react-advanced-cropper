import { useMemo } from 'react';
import { getOptions } from 'advanced-cropper';
import { MoveImageSettings } from '../types';

export function useMoveImageOptions(moveImage: MoveImageSettings | boolean) {
	return useMemo(
		() =>
			getOptions(
				moveImage,
				{
					touch: true,
					mouse: true,
				},
				{
					touch: false,
					mouse: false,
				},
			),
		[moveImage],
	);
}
