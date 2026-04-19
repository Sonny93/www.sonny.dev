import { Data } from '@generated/data';
import { Head } from '@inertiajs/react';

import { PostList } from '~/components/posts/post_list';
import { SectionTitle } from '~/components/section_title';
import { formatStructuredPeriod } from '~/lib/format_period';
import { VerticalTimeline } from '~/components/timeline/vertical_timeline';
import { Link } from '@adonisjs/inertia/react';

const TAG_LINES = [
	'Full Stack developer and DevOps',
	'Passionate about automation',
	'And creating tools in any genre',
] as const;

interface HomeProps {
	posts: Data.Post[];
	experiences: Data.Experience[];
}

function experienceBullets(description: Data.Experience['description']) {
	if (description == null) return [];
	if (Array.isArray(description)) return description;
	return description
		.split(/\r?\n/)
		.map((line) => line.trim())
		.filter(Boolean);
}

export default function Home({ posts, experiences }: HomeProps) {
	return (
		<>
			<Head title="Homepage" />
			<section className="flex flex-col items-center text-center">
				<h1 className="text-balance text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl dark:text-white">
					Hello, I&apos;m{' '}
					<span className="bg-linear-to-r from-sky-600 to-indigo-600 bg-clip-text text-transparent dark:from-sky-400 dark:to-indigo-400">
						Sonny
					</span>
				</h1>
				<hr
					className="mx-auto mt-8 h-[2px] w-20 max-w-full rounded-full border-0 bg-gray-300 dark:bg-gray-600"
					aria-hidden
				/>
				<ul className="mt-8 flex list-none flex-col gap-3 text-pretty text-base leading-relaxed text-gray-600 sm:text-lg dark:text-gray-400">
					{TAG_LINES.map((line) => (
						<li key={line}>{line}</li>
					))}
				</ul>
			</section>

			{posts.length > 0 && (
				<section className="flex w-full flex-col gap-4">
					<SectionTitle title="Derniers articles" />
					<Link
						route="show_posts"
						className="self-end text-sm text-gray-600 dark:text-gray-400"
					>
						Voir tous les articles &rarr;
					</Link>
					<PostList posts={posts} />
				</section>
			)}

			{experiences.length > 0 && (
				<VerticalTimeline
					title="Expériences"
					items={experiences.map((e, index) => ({
						id: `experience-${index}-${String(e.beginningDate)}`,
						title: e.title,
						titleVariant: 'uppercase' as const,
						meta: (
							<>
								{formatStructuredPeriod(e.beginningDate, e.endDate)}{' '}
								<span>
									(
									<span className="font-semibold text-gray-900 dark:text-white/95">
										{e.company}
									</span>
									{' – '}
									{e.city})
								</span>
							</>
						),
						bullets: experienceBullets(e.description),
					}))}
				/>
			)}
		</>
	);
}
