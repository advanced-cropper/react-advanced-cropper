import { useRef } from 'react';

export function usePersistentFunction<Props, Arguments extends any[]>(props: (...args: Arguments) => Props) {
	const propsRef = useRef(props);

	propsRef.current = props;

	return (...args: Arguments) => propsRef.current(...args);
}
