import { useMemo } from 'react';
import { getOptions } from 'advanced-cropper/utils';
import { ScaleImageSettings } from '../types';

interface UseScaleImageOptions {
	enabled: boolean;
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
					enabled: true,
					touch: true,
					wheel: {
						ratio: 0.1,
					},
					adjustStencil: true,
				},
				{
					enabled: false,
					touch: false,
					wheel: false,
					adjustStencil: false,
				},
			),
		[scaleImage],
	);
}
