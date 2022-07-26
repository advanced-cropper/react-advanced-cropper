import { useMemo } from 'react';
import { getOptions } from 'advanced-cropper';
import { ScaleImageSettings } from '../types';

interface UseScaleImageOptions {
	touch: boolean;
	wheel:
		| boolean
		| {
				ratio: number;
		  };
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
				},
				{
					touch: false,
					wheel: false,
				},
			),
		[scaleImage],
	);
}
