import React, { useState, useRef } from 'react';
import { rotateSize, Size } from 'advanced-cropper';
import './RotateCoordinatesExample.scss';

interface Example {
	image: Size;
	stencil: Size;
	rotate: number;
}

export const RotateCoordinatesExample = () => {
	const [image] = useState('/react-advanced-cropper/img/images/pexels-roman-iskanderov-624959616-17587410.jpg');

	const examples: Example[] = [
		{
			image: {
				width: 194,
				height: 353,
			},
			stencil: {
				width: 150,
				height: 200,
			},
			rotate: 0,
		},
		{
			image: {
				width: 194,
				height: 353,
			},
			stencil: {
				width: 150,
				height: 200,
			},
			rotate: 45,
		},
	];

	const renderExample = (example: Example) => {
		const rotatedSize = rotateSize(example.image, example.rotate);

		const coefficient = rotatedSize.height / example.image.height;

		const aspectRatio = rotatedSize.width / rotatedSize.height;

		return (
			<div
				className={'rotate-coordinates-example__example'}
				style={{
					width: `${100 / examples.length}%`,
				}}
			>
				<div
					className="rotate-coordinates-example__image-wrapper"
					style={{
						width: `${aspectRatio * 100}%`,
					}}
				>
					<img
						className={'rotate-coordinates-example__image'}
						style={{
							transform: `translate(-50%, -50%) scale(${1 / coefficient}) rotate(${example.rotate}deg)`,
						}}
						src={image}
					/>
					<div
						className="rotate-coordinates-example__stencil"
						style={{
							width: `${example.stencil.width / 2}px`,
							height: `${example.stencil.height / 2}px`,
						}}
					/>
					<div
						className="rotate-coordinates-example__left"
						style={{
							left: `0px`,
							top: `calc(50% - ${example.stencil.height / 4}px)`,
							width: `calc(50% - ${example.stencil.width / 4}px)`,
						}}
					/>
					<div
						className="rotate-coordinates-example__top"
						style={{
							top: `0px`,
							left: `calc(50% - ${example.stencil.width / 4}px)`,
							height: `calc(50% - ${example.stencil.height / 4}px)`,
						}}
					/>
				</div>
			</div>
		);
	};

	return <div className={'rotate-coordinates-example'}>{examples.map((example) => renderExample(example))}</div>;
};
