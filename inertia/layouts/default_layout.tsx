import { PropsWithChildren } from 'react';
import { Navbar } from '~/components/common/navbar';
import { BaseLayout } from './base_layout';

const DefaultLayout = ({ children }: PropsWithChildren) => (
	<BaseLayout>
		<Layout>{children}</Layout>
	</BaseLayout>
);

export default DefaultLayout;

const LAYOUT_WIDTH = '1500px';
const Layout = ({ children }: PropsWithChildren) => (
	<>
		{/* Top navbar */}
		<Navbar width={LAYOUT_WIDTH} />

		{/* Page content */}
		<div className="relative min-h-[100dvh] pt-32 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 font-sans flex-1 px-4">
			<div
				className="h-full max-w-full w-full mx-auto mb-60"
				style={{
					width: LAYOUT_WIDTH,
				}}
			>
				{children}
			</div>
		</div>
	</>
);
