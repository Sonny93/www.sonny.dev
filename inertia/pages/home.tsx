import { PROJECT_NAME } from '#config/project';
import { Formation } from '#shared/types/index';
import { Trans } from '@lingui/react';
import { LocaleSelector } from '~/components/common/locale_selector';
import { useFormations } from '~/hooks/useFormations';

interface FormationCardProps {
	formation: Formation;
}

function FormationCard({ formation }: FormationCardProps) {
	const formatDate = (date: string) => {
		return new Date(date).getFullYear().toString();
	};

	const formatPeriod = () => {
		const start = formatDate(formation.startDate);
		const end = formation.endDate ? formatDate(formation.endDate) : 'En cours';
		return `${start} - ${end}`;
	};

	return (
		<div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700 hover:border-purple-500 transition-all duration-300">
			<div className="flex justify-between items-start mb-4">
				<div className="flex-1">
					<h3 className="text-xl font-semibold text-white mb-2">
						{formation.degreeName}
					</h3>
					<p className="text-purple-400 font-medium">{formation.schoolName}</p>
					{formation.location && (
						<p className="text-gray-400 text-sm mt-1">
							📍 {formation.location}
						</p>
					)}
				</div>
				<div className="text-right">
					<span className="bg-purple-600/20 text-purple-300 px-3 py-1 rounded-full text-sm">
						{formation.degreeType.toUpperCase()}
					</span>
				</div>
			</div>

			<div className="flex justify-between items-center">
				<span className="text-gray-300 text-sm">{formatPeriod()}</span>
				{formation.result && (
					<span className="text-green-400 text-sm font-medium">
						{formation.result}
					</span>
				)}
			</div>

			{formation.url && (
				<div className="mt-4 pt-4 border-t border-gray-700">
					<a
						href={formation.url}
						target="_blank"
						rel="noopener noreferrer"
						className="text-purple-400 hover:text-purple-300 text-sm transition-colors"
					>
						🌐 Voir l'école →
					</a>
				</div>
			)}
		</div>
	);
}

function Home() {
	const formations = useFormations();

	return (
		<>
			<div className="container mx-auto px-4 py-16">
				{/* Header */}
				<header className="text-center mb-16">
					<h1 className="text-6xl font-bold text-white mb-4">
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
					<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-1">
						{formations.map((formation, index) => (
							<FormationCard
								key={`${formation.schoolName}-${index}`}
								formation={formation}
							/>
						))}
					</div>
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
}

export default Home;
