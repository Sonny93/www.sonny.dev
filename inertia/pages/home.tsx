import { Data } from '@generated/data';
import { Head, Link } from '@inertiajs/react';

import { URLs } from '~/constants/urls';
import { formatStructuredPeriod } from '~/lib/format_period';
import { VerticalTimeline } from '~/components/timeline/vertical_timeline';

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

function asDate(value: unknown): Date | null {
	if (value instanceof Date && !Number.isNaN(value.getTime())) return value;
	if (typeof value === 'string') {
		const d = new Date(value);
		return Number.isNaN(d.getTime()) ? null : d;
	}
	if (typeof value === 'number') {
		const d = new Date(value);
		return Number.isNaN(d.getTime()) ? null : d;
	}
	return null;
}

function formatPostDate(value: unknown) {
	const d = asDate(value);
	return d ? d.toLocaleDateString('en-GB', { dateStyle: 'medium' }) : '';
}

function postDateIso(value: unknown) {
	const d = asDate(value);
	return d ? d.toISOString().slice(0, 10) : '';
}

export default function Home({ posts, experiences }: HomeProps) {
	return (
		<>
			<Head title="Homepage" />
			<div className="mx-auto flex w-full max-w-3xl flex-col gap-16 px-4 py-10 sm:gap-20 sm:py-16">
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

				{posts.length > 0 ? (
					<section className="flex w-full flex-col gap-4">
						<h2 className="text-xs font-semibold uppercase tracking-widest text-gray-500 dark:text-gray-400">
							Latest posts
						</h2>
						<ul className="flex flex-col gap-3">
							{posts.map((post) => (
								<li key={post.slug}>
									<Link
										href={`${URLs.Blog}/${post.slug}`}
										className="group block rounded-lg border border-gray-200 bg-white/80 p-5 shadow-sm transition-colors duration-100 hover:border-sky-400/40 hover:shadow-md dark:border-gray-700 dark:bg-gray-800/70 dark:hover:border-sky-500/35"
									>
										<div className="flex flex-wrap items-baseline justify-between gap-2 gap-y-1">
											<h3 className="text-lg font-semibold text-gray-900 transition-colors group-hover:text-sky-700 dark:text-white dark:group-hover:text-sky-300">
												{post.title}
											</h3>
											<time
												className="shrink-0 text-xs tabular-nums text-gray-500 dark:text-gray-400"
												dateTime={postDateIso(post.publishedAt)}
											>
												{formatPostDate(post.publishedAt)}
											</time>
										</div>
										<p className="mt-2 line-clamp-2 text-left text-sm leading-relaxed text-gray-600 dark:text-gray-400">
											{post.description}
										</p>
										{post.tags.length > 0 ? (
											<ul className="mt-3 flex list-none flex-wrap gap-2">
												{post.tags.map((tag) => (
													<li
														key={tag}
														className="rounded-md bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600 dark:bg-gray-700/90 dark:text-gray-300 capitalize"
													>
														{tag}
													</li>
												))}
											</ul>
										) : null}
									</Link>
								</li>
							))}
						</ul>
					</section>
				) : null}
			</div>
		</>
	);
}
