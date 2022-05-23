import { useEffect, useRef } from 'react';

export function useCropperProps<Props>(props: () => Props) {
	const propsRef = useRef(props);

	useEffect(() => {
		propsRef.current = props;
	}, [props]);

	return () => propsRef.current();
}
