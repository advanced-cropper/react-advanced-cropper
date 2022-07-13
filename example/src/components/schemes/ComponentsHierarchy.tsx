import React, { FC } from 'react';
import { HierarchyElement } from './HierarchyElement';

export const ComponentsHierarchy: FC = () => {
	return (
		<div className={'hierarchy'}>
			<HierarchyElement to={'Cropper'} type={'component'} title={'Cropper'}>
				<HierarchyElement
					to={'/docs/hooks/useCropperState'}
					type={'hook'}
					title={'useCropperState'}
				/>
				<HierarchyElement to={'/docs/hooks/useCropperImage'} type={'hook'} title={'useCropperImage'} />

				<HierarchyElement to={'CropperWrapper'} type={'custom-component'} title={'CropperWrapper'}>
					<HierarchyElement to={'StretchableBoundary'} type={'component'} title={'StretchableBoundary'}>
						<HierarchyElement
							to={'CropperBackgroundWrapper'}
							type={'custom-component'}
							title={'CropperBackgroundWrapper'}
						>
							<HierarchyElement to={'CropperBackground'} type={'component'} title={'CropperBackground'} />
							<HierarchyElement type={'custom-component'} title={'Stencil'} />
						</HierarchyElement>
						<HierarchyElement to={'CropperCanvas'} type={'component'} title={'CropperCanvas'} />
					</HierarchyElement>
				</HierarchyElement>
			</HierarchyElement>
		</div>
	);
};
