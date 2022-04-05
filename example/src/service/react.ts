import React from 'react';

export const onInputChange = (setter: (value: any) => void) => (event: React.ChangeEvent<HTMLInputElement>) => {
	setter(event.target.value);
};
