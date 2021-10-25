import React, { FC } from 'react';
import { HierarchyElement } from './HierarchyElement';

export const ComponentsHierarchy: FC = () => {
	return (
		<div className={'hierarchy'}>
			<HierarchyElement to={'Cropper'} type={'component'} title={'Cropper'}>
				<HierarchyElement to={'/docs/hooks/useCropperState'} type={'hook'} title={'useCropperState'}>
					<HierarchyElement
						to={'/docs/hooks/useAbstractCropperState'}
						type={'hook'}
						title={'useAbstractCropperState'}
					/>
				</HierarchyElement>
				<HierarchyElement to={'/docs/hooks/useCropperImage'} type={'hook'} title={'useCropperImage'} />
				<HierarchyElement to={'/docs/hooks/useMoveImageOptions'} type={'hook'} title={'useMoveImageOptions'} />
				<HierarchyElement
					to={'/docs/hooks/useResizeImageOptions'}
					type={'hook'}
					title={'useResizeImageOptions'}
				/>
				<HierarchyElement to={'CropperCanvas'} type={'component'} title={'CropperCanvas'} />
				<HierarchyElement to={'CropperBoundary'} type={'component'} title={'CropperBoundary'} />
				<HierarchyElement to={'CropperBackground'} type={'component'} title={'CropperBackground'} />
				<HierarchyElement to={'CropperWrapper'} type={'component'} title={'CropperWrapper'} />
				<HierarchyElement type={'custom-component'} title={'Stencil'} />
			</HierarchyElement>
		</div>
	);
};
