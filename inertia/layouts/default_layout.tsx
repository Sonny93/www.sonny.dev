import { BaseLayout } from '~/layouts/base_layout';
import { Footer } from '~/components/navigation/footer';
import { Navbar } from '~/components/navigation/navbar';

export const DefaultLayout = ({ children }: React.PropsWithChildren) => (
	<BaseLayout>
		<div className="bg-gray-50 dark:bg-gray-900 h-screen overflow-hidden">
			<div className="container mx-auto p-4 flex flex-col gap-6">
				<Navbar />
				<div className="flex-1 min-h-0 flex flex-col">{children}</div>
				<Footer />
			</div>
		</div>
	</BaseLayout>
);
