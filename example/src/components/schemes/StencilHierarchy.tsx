import React, { FC } from 'react';
import { HierarchyElement } from './HierarchyElement';

export const StencilHierarchy: FC = () => {
	return (
		<div className={'hierarchy'}>
			<HierarchyElement to={'RectangleStencil'} type={'custom-component'} title={'Rectangle Stencil'}>
				<HierarchyElement to={'StencilWrapper'} type={'component'} title={'StencilWrapper'} />
				<HierarchyElement to={'BoundingBox'} type={'component'} title={'BoundingBox'}>
					<HierarchyElement to={'SimpleHandler'} type={'custom-component'} title={'SimpleHandler'}>
						<HierarchyElement to={'HandlerWrapper'} type={'component'} title={'HandlerWrapper'}>
							<HierarchyElement to={'DraggableElement'} type={'component'} title={'DraggableElement'} />
						</HierarchyElement>
					</HierarchyElement>
					<HierarchyElement to={'SimpleLine'} type={'custom-component'} title={'SimpleLine'}>
						<HierarchyElement to={'LineWrapper'} type={'component'} title={'LineWrapper'}>
							<HierarchyElement to={'DraggableElement'} type={'component'} title={'DraggableElement'} />
						</HierarchyElement>
					</HierarchyElement>
				</HierarchyElement>
				<HierarchyElement to={'DraggableArea'} type={'component'} title={'DraggableArea'} />
				<HierarchyElement to={'StencilOverlay'} type={'component'} title={'StencilOverlay'} />
				<HierarchyElement to={'StencilGrid'} type={'component'} title={'StencilGrid'} />
			</HierarchyElement>
		</div>
	);
};
