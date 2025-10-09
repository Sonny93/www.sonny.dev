import { PROJECT_NAME } from '#config/project';
import { Trans } from '@lingui/react';
import { LocaleSelector } from '~/components/common/locale_selector';
import { FormationList } from '~/components/formations/formation_list';

const Home = () => (
	<>
		<div className="container mx-auto px-4 py-16">
			{/* Header */}
			<header className="text-center mb-16">
				<h1 className="text-6xl text-center font-bold text-white mb-4">
					<Trans id="Hello, I'm" />{' '}
					<span className="text-purple-400">Sonny</span>✌️
				</h1>
				<p className="text-xl text-gray-300 mb-8">
					<Trans id="Fullstack Developer passionate" />
				</p>
				<div className="flex justify-center gap-2">
					<span className="px-4 py-2 bg-react text-white rounded-full text-sm">
						React
					</span>
					<span className="px-4 py-2 bg-typescript text-white rounded-full text-sm">
						TypeScript
					</span>
					<span className="px-4 py-2 bg-node text-white rounded-full text-sm">
						Node.js
					</span>
					<span className="px-4 py-2 bg-adonis text-white rounded-full text-sm">
						AdonisJS
					</span>
				</div>
			</header>

			{/* Main Content */}
			<main className="max-w-xl mx-auto">
				<div className="space-y-6">
					<h2 className="text-3xl font-bold text-white mb-4">
						<Trans id="About me" />
					</h2>
					<p className="text-gray-300 leading-relaxed">
						<Trans id="Passionate about web development, I create modern and performant applications using the latest technologies. My expertise covers the frontend and the backend to offer complete solutions." />
					</p>
					<div className="flex gap-2 mt-4">
						<button className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors border-none text-lg">
							<Trans id="Contact me" />
						</button>
						<LocaleSelector />
					</div>
				</div>
			</main>

			{/* Formations Section */}
			<section className="max-w-4xl mx-auto mt-16">
				<h2 className="text-3xl font-bold text-white mb-8 text-center">
					<Trans id="Formations" />
				</h2>
				<FormationList />
			</section>

			{/* Footer */}
			<footer className="text-center mt-16">
				<p className="text-gray-400">
					© 2025 {PROJECT_NAME} - <Trans id="Fullstack Developer" />
				</p>
			</footer>
		</div>
	</>
);

export default Home;
