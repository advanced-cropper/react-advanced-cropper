import React, { FC } from 'react';
import { Coordinates } from 'react-advanced-cropper';
import './PreviewResults.scss';

interface Props {
	coordinates: Coordinates;
	preview: string | null;
}

export const PreviewResults: FC<Props> = ({ coordinates, preview }) => {
	return (
		<div className="preview-results">
			{preview && (
				<div className="preview-results__wrapper">
					<div className="preview-results__coordinates">
						<p className="preview-results__coordinates-title">Results:</p>
						<p className="preview-results__coordinates-value">Width: {coordinates.width}</p>
						<p className="preview-results__coordinates-value">Height: {coordinates.height}</p>
						<p className="preview-results__coordinates-value">Left: {coordinates.left}</p>
						<p className="preview-results__coordinates-value">Top: {coordinates.top}</p>
					</div>
					<div className="preview-results__preview">
						<img src={preview} />
					</div>
				</div>
			)}
		</div>
	);
};
