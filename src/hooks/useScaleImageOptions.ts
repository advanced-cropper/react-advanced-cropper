import { useMemo } from 'react';
import { getOptions } from 'advanced-cropper';
import { ScaleImageOptions } from '../types';

interface DefinedScaleImageOptions {
	touch: boolean;
	wheel:
		| boolean
		| {
				ratio: number;
		  };
}

export function useScaleImageOptions(scaleImage: ScaleImageOptions | boolean): DefinedScaleImageOptions {
	return useMemo(
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
