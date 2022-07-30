const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');
require('dotenv').config();

// With JSDoc @type annotations, IDEs can provide config autocompletion
/** @type {import('@docusaurus/types').DocusaurusConfig} */
(
	module.exports = {
		title: 'React Advanced Cropper',
		tagline: 'Create the cropper you desire',
		url: 'https://advanced-cropper.github.io',
		baseUrl: '/react-advanced-cropper/',
		onBrokenLinks: 'ignore',
		onBrokenMarkdownLinks: 'warn',
		favicon: 'img/favicon.png',
		organizationName: 'Norserium', // Usually your GitHub org/user name.
		projectName: 'react-advanced-cropper', // Usually your repo name.
		plugins: ['docusaurus-plugin-sass'],
		presets: [
			[
				'@docusaurus/preset-classic',
				/** @type {import('@docusaurus/preset-classic').Options} */
				({
					docs: {
						sidebarPath: require.resolve('./sidebars.js'),
						// Please change this to your repo.
						editUrl: 'https://github.com/facebook/docusaurus/edit/main/website/',
					},
					blog: {
						showReadingTime: true,
						// Please change this to your repo.
						editUrl: 'https://github.com/facebook/docusaurus/edit/main/website/blog/',
					},
					theme: {
						customCss: require.resolve('./src/css/custom.css'),
					},
				}),
			],
		],

		themeConfig:
			/** @type {import('@docusaurus/preset-classic').ThemeConfig} */
			({
				colorMode: {
					defaultMode: 'light',
					disableSwitch: false,
					switchConfig: {
						darkIcon: ' ',
						lightIcon: ' ',
					},
				},
				image: 'img/og-image.jpg',
				navbar: {
					title: 'Advanced Cropper',
					logo: {
						alt: 'React Advanced Cropper Logo',
						src: 'img/logo.svg',
						srcDark: 'img/logo.svg',
					},
					items: [
						{
							type: 'doc',
							docId: 'intro',
							position: 'right',
							label: 'Documentation',
						},
						{
							href: 'https://github.com/advanced-cropper/react-advanced-cropper/',
							label: 'GitHub',
							position: 'right',
						},
					],
				},
				footer: {
					style: 'dark',
					links: [
						{
							title: 'Docs',
							items: [
								{
									label: 'Getting started',
									to: '/docs/intro',
								},
								{
									label: 'Recipes',
									to: '/docs/guides/recipes',
								},
								{
									label: 'Advanced Recipes',
									to: '/docs/guides/advanced-recipes',
								},
							],
						},
						{
							title: 'Community',
							items: [
								{
									label: 'Stack Overflow',
									href: 'https://stackoverflow.com/questions/tagged/react-advanced-cropper',
								},
							],
						},
						{
							title: 'More',
							items: [
								{
									label: 'Documentation',
									to: '/docs/intro',
								},
								{
									label: 'GitHub',
									href: 'https://github.com/advanced-cropper/react-advanced-cropper',
								},
							],
						},
					],
					copyright: `Copyright © ${new Date().getFullYear()} Norserium.`,
				},
				prism: {
					theme: lightCodeTheme,
					darkTheme: darkCodeTheme,
				},
			}),
	}
);
