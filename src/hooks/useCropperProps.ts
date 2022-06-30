import { useRef } from 'react';

export function useCropperProps<Props>(props: () => Props) {
	const propsRef = useRef(props);

	propsRef.current = props;

	return () => propsRef.current();
}
