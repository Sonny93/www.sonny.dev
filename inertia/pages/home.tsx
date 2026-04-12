import { Head } from '@inertiajs/react';

const Home = () => (
	<>
		<Head title="Homepage" />
		<div className="text-center">
			<h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
				Welcome
			</h1>
			<p className="text-gray-600 dark:text-gray-300">
				Simple template with AdonisJS + UnoCSS
			</p>
		</div>
	</>
);

export default Home;
