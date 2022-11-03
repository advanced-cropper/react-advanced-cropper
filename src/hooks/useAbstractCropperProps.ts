import { ExtendedSettings, SettingsExtension } from '../types';
import { AbstractCropperIntrinsicProps } from '../components/AbstractCropper';
import { defaultSettings } from '../service/constants';
import { CoreSettings, DefaultSettings, ModifierSettings } from '../../../../Advanced Cropper/advanced-cropper/dist';

type Props<Extension extends SettingsExtension> = AbstractCropperIntrinsicProps<ExtendedSettings<Extension>>;

export function useAbstractCropperProps<Extension extends SettingsExtension>(
	props: Props<Extension>,
	settings: string[] = defaultSettings,
) {
	const result: any = { settings: {}, props: {} };

	(Object.keys(props) as (keyof typeof props)[]).forEach((key) => {
		if (settings.some((setting) => setting === key)) {
			result.settings[key] = props[key];
		} else {
			result.props[key] = props[key];
		}
	});

	return result as {
		settings: Extension & Partial<DefaultSettings & CoreSettings & ModifierSettings>;
		props: Props<Extension>;
	};
}
