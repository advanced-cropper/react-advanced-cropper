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

export function sum(collection: number[]) {
	return collection.reduce((result, value) => result + value, 0);
}

export function isClient() {
	return typeof window !== undefined;
}
