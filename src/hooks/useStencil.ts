import { useRef, useState } from 'react';
import { StencilComponent, StencilOptions } from '../types';
import { useUpdateEffect } from './useUpdateEffect';

export function useStencil(component: StencilComponent) {
	const [stencilOptions, setStencilOptions] = useState<StencilOptions>({});
	const stencilComponent = useRef<StencilComponent>(component);

	// Reset the previous options on a stencil component change
	useUpdateEffect(() => {
		setStencilOptions({});
		stencilComponent.current = component;
	}, [component]);

	return {
		options: stencilOptions,
		setOptions: setStencilOptions,
		component: stencilComponent.current,
	};
}
