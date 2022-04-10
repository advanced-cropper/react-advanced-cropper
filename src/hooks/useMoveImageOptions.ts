import { useMemo } from 'react';
import { getOptions } from 'advanced-cropper/utils';
import { MoveImageSettings } from '../types';

export function useMoveImageOptions(moveImage: MoveImageSettings | boolean) {
	return useMemo(
		() =>
			getOptions(
				moveImage,
				{
					enabled: true,
					touch: true,
					mouse: true,
				},
				{
					enabled: false,
					touch: false,
					mouse: false,
				},
			),
		[moveImage],
	);
}
