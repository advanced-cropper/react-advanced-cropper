import { useHistory, useLocation } from 'react-router-dom';

export function useHashState(defaultValue?: string, allowedValues?: string[]): [string, (value: string) => void] {
	const location = useLocation();
	const history = useHistory();

	const hash = location.hash.replace('#', '');

	const value = allowedValues ? (allowedValues.indexOf(hash) >= 0 ? hash : defaultValue) : hash || defaultValue;

	const setValue = (value: string) => {
		history.replace({
			pathname: location.pathname,
			hash: value,
		});
	};

	return [value, setValue];
}
