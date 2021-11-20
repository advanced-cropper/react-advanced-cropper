import { useHistory, useLocation } from 'react-router-dom';
import { useEffect, useState } from "react";
import useIsBrowser from "@docusaurus/useIsBrowser";

export function useHashState(defaultValue?: string, allowedValues?: string[]): [string | null, (value: string) => void] {
	const location = useLocation();
	const history = useHistory();

	const isBrowser = useIsBrowser();

	const hash = location.hash.replace('#', '');

	const value = allowedValues ? (allowedValues.indexOf(hash) >= 0 ? hash : defaultValue) : hash || defaultValue;

	const [internalValue, setInternalValue] = useState(isBrowser ? value : null)

	const setValue = (value: string) => {
		history.replace({
			pathname: location.pathname,
			hash: value,
		});
	};


	useEffect(() => {
		if (internalValue !== value) {
			setInternalValue(value);
		}
	}, [value])

	return [internalValue, setValue];
}
