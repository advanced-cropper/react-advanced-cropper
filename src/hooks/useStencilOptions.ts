import { Ref, useImperativeHandle, useState } from 'react';

export function useStencilOptions<R extends Ref<any>, Options>(ref: R, options: Options) {
	useImperativeHandle(ref, () => options);
	const [transitions, setTransitions] = useState()
	const [state, setState] = useState();


	const cropper = new Cropper({

		...parameters,
		onChange({ state, transitions }) {

		}
	})

}
