import { BaseLayout } from '~/layouts/base_layout';
import { Footer } from '~/components/navigation/footer';
import { Navbar } from '~/components/navigation/navbar';

export const DefaultLayout = ({ children }: React.PropsWithChildren) => (
	<BaseLayout>
		<div className="flex min-h-dvh flex-col bg-gray-50 dark:bg-gray-900">
			<div className="w-3xl mx-auto flex flex-1 flex-col gap-6 p-4">
				<Navbar />
				<main
					className="flex flex-col gap-16 py-10 sm:gap-20 sm:py-16"
					data-page-transition
				>
					{children}
				</main>
				<Footer />
			</div>
		</div>
	</BaseLayout>
);
