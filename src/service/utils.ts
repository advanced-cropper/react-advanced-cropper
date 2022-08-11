export function deprecationWarning(text: string) {
	if (process.env.NODE_ENV === 'development') {
		console.warn(`Deprecation warning: ${text}`);
	}
}
