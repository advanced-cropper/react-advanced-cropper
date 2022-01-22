import { useMemo } from 'react';
import { getOptions } from 'advanced-cropper/utils';
import { ScaleImageSettings } from '../types';

interface UseScaleImageOptions {
	touch: boolean;
	wheel:
		| boolean
		| {
				ratio: number;
		  };
	adjustStencil: boolean;
}

export function useScaleImageOptions(scaleImage: ScaleImageSettings | boolean) {
	return useMemo<UseScaleImageOptions>(
		() =>
			getOptions(
				scaleImage,
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
		[scaleImage],
	);
}
