import { useCallback, useState } from 'react';

type Toggle = [boolean, () => void, () => void];

export function useToggle(): Toggle {
	const [open, setOpen] = useState(false);

	const onOpen = useCallback(() => {
		setOpen(true);
	}, [setOpen]);

	const onClose = useCallback(() => {
		setOpen(false);
	}, [setOpen]);

	return [open, onOpen, onClose];
}
