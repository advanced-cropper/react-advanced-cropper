import cn from 'classnames';
import { isObject, isString } from 'advanced-cropper';

export function deprecationWarning(text: string) {
	if (process.env.NODE_ENV === 'development') {
		console.warn(`Deprecation warning: ${text}`);
	}
}

export function joinClassNames(...classNames: unknown[]) {
	const result: Record<string, string> = {};

	classNames.forEach((el) => {
		if (isObject(el)) {
			(Object.keys(el) as (keyof typeof el)[]).forEach((property) => {
				if (isString(el[property])) {
					result[property] = cn(el[property], result[property]);
				}
			});
		}
	});

	return result;
}
