import React, { FC } from 'react';
import cn from 'classnames';
import './SettingsCheckbox.scss';
import { CheckboxIcon } from '@site/src/components/icons/CheckboxIcon';

interface Props {
	value?: boolean;
	placeholder?: string;
	className?: string;
	label: string;
	onChange?: (value?: boolean) => void;
}

export const SettingsCheckbox: FC<Props> = (props) => {
	const { value, className, label, placeholder, onChange } = props;
	const onChangeInternal = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (onChange) {
			onChange(event.target.checked);
		}
	};
	return (
		<label className={cn('settings-checkbox', className)}>
			<div className={cn('settings-checkbox__icon-wrapper', value && 'settings-checkbox__icon-wrapper--checked')}>
				<CheckboxIcon className={cn('settings-checkbox__icon', !value && 'settings-checkbox__icon--hidden')} />
			</div>
			<div className="settings-checkbox__label">{label}</div>
			<input
				className="settings-checkbox__input"
				onChange={onChangeInternal}
				checked={value}
				placeholder={placeholder}
				type={'checkbox'}
			/>
		</label>
	);
};
