export function range(from: number, to: number, step = 1): number[] {
	let index = -1;
	let length = Math.max(Math.ceil((to - from) / (step || 1)), 0);

	const result = new Array(length);

	while (length--) {
		result[++index] = from;
		from += step;
	}
	return result;
}

export function isNull<T>(value: T | null): value is null {
	return value === null;
}

export function isObject<T extends object, U>(value: T | U): value is NonNullable<T> {
	return !isNull(value) && typeof value === 'object';
}

export function isString<T>(value: string | T): value is string {
	return typeof value === 'string';
}
