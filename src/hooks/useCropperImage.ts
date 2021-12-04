import { useEffect, useRef, useState } from 'react';
import { isUndefined, promiseTimeout } from 'advanced-cropper/utils';
import { loadImage } from 'advanced-cropper/image';
import { CropperImage } from 'advanced-cropper/types';

export interface CropperImageHookSettings {
	src?: string | null;
	onLoadingStart?: () => void;
	onLoadingEnd?: () => void;
	onError?: () => void;
	onLoad?: (image?: CropperImage) => void;
	crossOrigin?: 'anonymous' | 'use-credentials' | boolean;
	checkOrientation?: boolean;
	canvas?: string | boolean;
	minimumLoadingTime?: number;
	unloadTime?: number;
}

export function useCropperImage(options: CropperImageHookSettings) {
	const { src, onLoadingStart, onLoadingEnd, onError, onLoad, crossOrigin, checkOrientation, canvas } = options;
	const [loading, setLoading] = useState(false);
	const [loaded, setLoaded] = useState(false);
	const [image, setImage] = useState<CropperImage | null>(null);

	const currentSrc = useRef<string | null>(null);

	useEffect(() => {
		if (currentSrc.current !== src) {
			currentSrc.current = src || null;
			setLoaded(false);
			if (src) {
				setLoading(true);
				if (onLoadingStart) {
					onLoadingStart();
				}
				const promises: Promise<unknown>[] = [
					loadImage(src, {
						crossOrigin: isUndefined(crossOrigin) ? canvas : crossOrigin,
						checkOrientation,
					}),
				];

				if (options.minimumLoadingTime) {
					promises.push(promiseTimeout(options.minimumLoadingTime));
				}
				Promise.all(promises)
					.then((responses) => {
						const [image] = responses as [CropperImage];
						if (currentSrc.current === src) {
							setImage(image);
							if (onLoad) {
								onLoad(image);
							}
						}
					})
					.catch(() => {
						if (currentSrc.current === src) {
							if (onError) {
								onError();
							}
						}
					})
					.finally(() => {
						if (currentSrc.current === src) {
							if (onLoadingEnd) {
								onLoadingEnd();
							}
							setLoading(false);
						}
					});
			} else {
				if (options.unloadTime) {
					promiseTimeout(options.unloadTime).then(() => {
						setImage(null)
					})
				} else {
					setImage(null)
				}
			}
		}
	}, [src]);

	useEffect(() => {
		if (image) {
			setLoaded(true)
		}
	}, [image])

	return { loading, loaded, image, setImage };
}
