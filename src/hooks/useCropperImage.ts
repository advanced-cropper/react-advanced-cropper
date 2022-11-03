import { useEffect, useRef, useState } from 'react';
import { CropperImage, isUndefined, promiseTimeout, loadImage } from 'advanced-cropper';

export interface CropperImageHookSettings {
	src?: string | null;
	onLoadingStart?: () => void;
	onLoadingEnd?: () => void;
	onError?: () => void;
	onLoad?: (image?: CropperImage) => void;
	crossOrigin?: 'anonymous' | 'use-credentials' | boolean;
	checkOrientation?: boolean;
	canvas?: string | boolean;
	unloadTime?: number;
}

export function useCropperImage(options: CropperImageHookSettings) {
	const { src, onLoadingStart, onLoadingEnd, onError, onLoad, crossOrigin, checkOrientation, canvas, unloadTime } = options;
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
				onLoadingStart?.();
				const promises: Promise<unknown>[] = [
					loadImage(src, {
						crossOrigin: isUndefined(crossOrigin) ? canvas : crossOrigin,
						checkOrientation,
					}),
				];

				if (loaded && unloadTime) {
					promises.push(promiseTimeout(unloadTime));
				}
				Promise.all(promises)
					.then((responses) => {
						const [image] = responses as [CropperImage];
						if (currentSrc.current === src) {
							setImage(image);
							onLoad?.(image);
						}
					})
					.catch(() => {
						if (currentSrc.current === src) {
							onError?.();
						}
					})
					.finally(() => {
						if (currentSrc.current === src) {
							onLoadingEnd?.();
							setLoading(false);
						}
					});
			} else {
				if (unloadTime) {
					promiseTimeout(unloadTime).then(() => {
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

	return {
		isLoading() {
			return loading;
		},
		isLoaded() {
			return loaded
		},
		getImage() {
			return image;
		},
		setImage,
	};
}
