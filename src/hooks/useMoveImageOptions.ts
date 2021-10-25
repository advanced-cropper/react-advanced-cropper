import { useMemo } from 'react';
import { MoveImageSettings } from '../types';
import { getOptions } from 'advanced-cropper/utils';

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
