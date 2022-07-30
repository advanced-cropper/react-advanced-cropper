import React from 'react';
import './index.scss';

import Navbar from '@theme/Navbar';
import CodeBlock from '@theme/CodeBlock';
import Link from '@docusaurus/Link';
import ThemeContext from '@theme/ThemeContext';
import useTheme from '@theme/hooks/useTheme';
import { InstallationBlock } from '@site/src/components/InstallationBlock';
import Layout from '../components/layout/Layout';
import { CroppersWizard } from '../components/CroppersWizard';

const example = `
import React, { useState } from 'react';
import { CropperRef, Cropper } from 'react-advanced-cropper';
import 'react-advanced-cropper/dist/style.css'

export const GettingStartedExample = () => {
    const [image] = useState(
        'https://images.unsplash.com/photo-1599140849279-1014532882fe?fit=crop&w=1300&q=80',
    );

    const onChange = (cropper: CropperRef) => {
        console.log(cropper.getCoordinates(), cropper.getCanvas());
    };

    return (
        <Cropper
            src={image}
            onChange={onChange}
            className={'cropper'}
        />;
    )
};
`;

export default function Home(): JSX.Element {
	const { setLightTheme, setDarkTheme } = useTheme();
	return (
		<Layout
			title={'Main Page'}
			description="The flexible React cropper component that gives you the opportunity to create almost any cropper that you desire. Identically easy to use and customize."
		>
			<div className="main-page">
				<div className="main-page__landing">
					<div className="main-page__container">
						<div className="main-page__header">
							<Navbar />
						</div>
						<h1 className="main-page__landing-title">Create the cropper you desire</h1>
						<div className="main-page__section-text">
							This react cropper library gives you the possibility to create croppers that exactly suited
							for your website design. Don’t limit yourself. Rotate, zoom, transitions, autozoom and many
							other features included.
						</div>
						<div className="main-page__family">
							<span className="main-page__family-item main-page__family-item--active">React</span>
							<a
								href={'https://advanced-cropper.github.io/vue-advanced-cropper/'}
								className="main-page__family-item"
							>
								Vue
							</a>
						</div>
						<div className="main-page__showcase">
							<CroppersWizard />
						</div>
					</div>
				</div>
				<div className="main-page__features-wrapper">
					<div className="main-page__features">
						<div className="main-page__features-container">
							<div className="main-page__section-title-wrapper">
								<h2 className="main-page__section-title">Features</h2>
							</div>
							<div className="main-page__features-row">
								<div className="main-page__feature">
									<div className="main-page__feature-title">Fully Customisable</div>
									<div className="main-page__feature-text">
										Customise almost any aspect of the cropper component, or use it right out of the
										box. Not only the appearance, but the behavior alike.
									</div>
								</div>
								<div className="main-page__feature">
									<div className="main-page__feature-title">Mobile Support</div>
									<div className="main-page__feature-text">
										The library supports desktop and mobile devices alike. Built-in support of touch
										events, cropper resizing, etc. to make the image crop smooth and easy.
									</div>
								</div>
							</div>
							<div className="main-page__features-row">
								<div className="main-page__feature">
									<div className="main-page__feature-title">Canvas / Coordinates</div>
									<div className="main-page__feature-text">
										This react cropper can be used to create a canvas with a cropped area or just
										coordinates relative to the original image to crop it server-side in the future.
									</div>
								</div>
								<div className="main-page__feature">
									<div className="main-page__feature-title">Advanced Features</div>
									<div className="main-page__feature-text">
										Set minimum and maximum aspect ratios, customize minimum and maximum height and
										width, etc.
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<ThemeContext.Provider value={{ isDarkTheme: false, setLightTheme, setDarkTheme }}>
					<div className="main-page__example">
						<div className="main-page__container">
							<div className="main-page__section-title-wrapper">
								<h2 className="main-page__section-title">How to start?</h2>
							</div>
							<div className="main-page__section-text">
								This library gives you numerous possibilities to customize your cropper. It's almost the
								framework for creating of the image croppers. But also it's very easy to use. Install
								the library and use the fragments of code below. That's all that you need to start.
							</div>
							<div className="main-page__example-installation-block">
								<InstallationBlock />
							</div>
						</div>
						<div className="main-page__example-code-wrapper">
							<div className="main-page__example-code">
								<CodeBlock className={'language-tsx'}>{example}</CodeBlock>
							</div>
						</div>
						<div className="main-page__container">
							<div className="main-page__section-text">
								It should be noted, that the documentation contains more different examples that covers
								almost all of common aspect of using the cropper. From the{' '}
								<Link to={'/docs/guides/recipes'}>basic ones</Link> to the{' '}
								<Link to={'/docs/guides/advanced-recipes'}>advanced ones.</Link>
							</div>
						</div>
					</div>
				</ThemeContext.Provider>
			</div>
		</Layout>
	);
}
