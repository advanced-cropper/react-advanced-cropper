import React from 'react';
import clsx from 'clsx';
import SkipToContent from '@theme/SkipToContent';
import AnnouncementBar from '@theme/AnnouncementBar';
import Footer from '@theme/Footer';
import LayoutProviders from '@theme/LayoutProviders';
import LayoutHead from '@theme/LayoutHead';
import type { Props } from '@theme/Layout';
import useKeyboardNavigation from '@theme/hooks/useKeyboardNavigation';
import { ThemeClassNames } from '@docusaurus/theme-common';

function Layout(props: Props): JSX.Element {
	const { children, noFooter, wrapperClassName, pageClassName } = props;

	useKeyboardNavigation();

	return (
		<LayoutProviders>
			<LayoutHead {...props} />

			<SkipToContent />

			<AnnouncementBar />

			<div className={clsx(ThemeClassNames.wrapper.main, wrapperClassName, pageClassName)}>{children}</div>

			{!noFooter && <Footer />}
		</LayoutProviders>
	);
}

export default Layout;
