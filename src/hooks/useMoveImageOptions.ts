import { useMemo } from 'react';
import { getOptions } from 'advanced-cropper';
import { MoveImageOptions } from '../types';

interface DefinedMoveImageOptions {
	touch: boolean;
	mouse: boolean;
}

export function useMoveImageOptions(moveImage: MoveImageOptions | boolean): DefinedMoveImageOptions {
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
