import React, { FC } from 'react';
import './SettingsInput.scss';

interface Props {
	value?: number;
	placeholder?: string;
	label: string;
	onChange?: (value?: number) => void;
}

export const SettingsInput: FC<Props> = (props) => {
	const { value, label, placeholder, onChange } = props;
	const onChangeInternal = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (onChange) {
			if (event.target.value) {
				onChange(Number(event.target.value));
			} else {
				onChange(undefined);
			}
		}
	};
	return (
		<div className={'settings-input'}>
			<div className="settings-input__label">{label}</div>
			<input
				className="settings-input__input"
				onChange={onChangeInternal}
				value={value || ''}
				placeholder={placeholder}
				type={'number'}
			/>
		</div>
	);
};
