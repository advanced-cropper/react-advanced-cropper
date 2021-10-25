import { parse, stringify } from 'query-string';
import { useHistory, useLocation } from 'react-router-dom';
import { useMemo } from 'react';

export function useQueryState<T = unknown>(name: string, defaultValue?: T) {
	const location = useLocation();
	const history = useHistory();
	const params = useMemo(() => parse(location.search), [location.search]);

	const value = params[name] || defaultValue;

	const setValue = (value: T) => {
		history.replace({
			pathname: location.pathname,
			search: stringify({
				...params,
				[name]: value,
			}),
		});
	};

	return [value, setValue];
}
