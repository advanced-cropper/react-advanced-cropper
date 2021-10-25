import React, { FC, useState } from 'react';
import './InstallationBlock.scss';

export const InstallationBlock: FC = () => {
	const [manager, setManager] = useState('yarn');

	return (
		<div className={'installation-block'}>
			<div className="installation-block__buttons">
				<button className="installation-block__button" onClick={() => setManager('yarn')}>yarn</button> /{' '}
				<button className="installation-block__button" onClick={() => setManager('npm')}>npm</button>
			</div>
			<div className="installation-block__text">
				<span className="installation-block__prefix">$</span>
				{manager === 'yarn' ? 'yarn add react-advanced-cropper' : 'npm install -S react-advanced-cropper'}
			</div>
		</div>
	);
};
