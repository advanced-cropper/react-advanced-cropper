import React from 'react';

export const onInputChange = (setter: (value: unknown) => void) => (event: React.ChangeEvent<HTMLInputElement>) => {
	setter(event.target.value);
};
