import React, { forwardRef } from 'react';

export function createCropper<T, P = {}>(
	render: (props: P, ref: React.Ref<T>) => React.ReactElement | null,
): (props: P & React.RefAttributes<T>) => React.ReactElement | null {
	return forwardRef<T, P>(render);
}
