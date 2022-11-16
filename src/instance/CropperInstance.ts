import {
	AbstractCropperInstance,
	AbstractCropperInstanceData,
	AbstractCropperInstanceProps,
	AbstractCropperInstanceSettings,
	getEmptyInteractions,
} from 'advanced-cropper';

export interface CropperInstanceProps<Settings extends AbstractCropperInstanceSettings, Instance> {
	getProps: () => AbstractCropperInstanceProps<Settings, Instance>;
	setData?: (data: AbstractCropperInstanceData) => void;
}

export class CropperInstance<
	Settings extends AbstractCropperInstanceSettings,
	Instance = unknown,
> extends AbstractCropperInstance<Settings, Instance> {
	data: AbstractCropperInstanceData;
	notify: () => void;
	props: () => AbstractCropperInstanceProps<Settings, Instance>;

	constructor(props: () => AbstractCropperInstanceProps<Settings, Instance>, onChange: () => void) {
		super();
		this.props = props;
		this.notify = onChange;
		this.data = {
			state: null,
			transitions: false,
			interactions: getEmptyInteractions(),
		};
	}

	protected getProps() {
		return this.props();
	}

	protected setData(data: AbstractCropperInstanceData) {
		this.data = data;
		this.notify();
	}

	protected getData(): AbstractCropperInstanceData {
		return this.data;
	}
}
