import { Data } from '@generated/data';
import { t } from '@lingui/core/macro';
import { Head } from '@inertiajs/react';
import { Trans } from '@lingui/react/macro';
import { Link } from '@adonisjs/inertia/react';

import { PostList } from '~/components/posts/post_list';
import { SectionTitle } from '~/components/section_title';
import { formatStructuredPeriod } from '~/lib/format_period';
import { VerticalTimeline } from '~/components/timeline/vertical_timeline';

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
			<Head title={t`Homepage`} />
			<section className="relative overflow-hidden rounded-3xl border border-sky-100/70 bg-linear-to-br from-white via-sky-50/70 to-cyan-100/70 px-6 py-10 shadow-xl shadow-sky-100/40 sm:px-10 sm:py-12 dark:border-slate-700 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 dark:shadow-none">
				<div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-sky-300/25 blur-3xl dark:bg-sky-500/15" />
				<div className="pointer-events-none absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-cyan-300/20 blur-3xl dark:bg-cyan-500/15" />

				<div className="relative">
					<div className="space-y-6">
						<span className="inline-flex w-fit items-center rounded-full border border-sky-200 bg-white/80 px-4 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-sky-700 backdrop-blur dark:border-slate-600 dark:bg-slate-900/75 dark:text-sky-300">
							<Trans>Based in France · Open to remote opportunities</Trans>
						</span>

						<h1 className="max-w-3xl text-balance text-4xl font-black tracking-tight text-gray-900 sm:text-5xl md:text-6xl dark:text-white">
							<Trans>
								I build reliable web platforms and developer-focused systems.
							</Trans>
						</h1>

						<p className="max-w-2xl text-pretty text-base leading-relaxed text-slate-700 sm:text-lg dark:text-slate-300">
							<Trans>
								Hi, I&apos;m Sonny. I design and ship maintainable products with
								clear architecture, thoughtful DX, and practical automation.
							</Trans>
						</p>

						<ul className="grid gap-2.5 text-sm text-slate-700 sm:grid-cols-2 sm:text-base dark:text-slate-300">
							<li className="flex items-center gap-2 rounded-xl bg-white/70 px-3 py-2 backdrop-blur dark:bg-slate-800/70">
								<span
									className="h-2 w-2 rounded-full bg-sky-500 dark:bg-sky-400"
									aria-hidden
								/>
								<Trans>Full-stack engineering and DevOps</Trans>
							</li>
							<li className="flex items-center gap-2 rounded-xl bg-white/70 px-3 py-2 backdrop-blur dark:bg-slate-800/70">
								<span
									className="h-2 w-2 rounded-full bg-sky-500 dark:bg-sky-400"
									aria-hidden
								/>
								<Trans>Automation-first mindset</Trans>
							</li>
							<li className="flex items-center gap-2 rounded-xl bg-white/70 px-3 py-2 backdrop-blur dark:bg-slate-800/70">
								<span
									className="h-2 w-2 rounded-full bg-sky-500 dark:bg-sky-400"
									aria-hidden
								/>
								<Trans>Productive tooling across domains</Trans>
							</li>
						</ul>

						<Link
							route="show_posts"
							className="inline-flex items-center rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
						>
							<Trans>Read my latest posts</Trans>
						</Link>
					</div>
				</div>
			</section>

			{posts.length > 0 && (
				<section className="flex w-full flex-col gap-4">
					<SectionTitle title={<Trans>Latest articles</Trans>} />
					<Link
						route="show_posts"
						className="self-end text-sm text-gray-600 dark:text-gray-400"
					>
						<Trans>View all articles</Trans> &rarr;
					</Link>
					<PostList posts={posts} />
				</section>
			)}

			{experiences.length > 0 && (
				<VerticalTimeline
					title={<Trans>Experiences</Trans>}
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
