import { useMemo } from 'react';
import { ResizeImageSettings } from '../types';
import { getOptions } from 'advanced-cropper/utils';

interface UseResizeImageOptions {
	touch: boolean;
	wheel:
		| boolean
		| {
				ratio: number;
		  };
	adjustStencil: boolean;
}

export function useResizeImageOptions(resizeImage: ResizeImageSettings | boolean) {
	return useMemo<UseResizeImageOptions>(
		() =>
			getOptions(
				resizeImage,
				{
					touch: true,
					wheel: {
						ratio: 0.1,
					},
					adjustStencil: true,
				},
				{
					touch: false,
					wheel: false,
					adjustStencil: false,
				},
			),
		[resizeImage],
	);
}
