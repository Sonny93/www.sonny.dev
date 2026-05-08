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
			<section className="relative overflow-hidden rounded-3xl border border-slate-700 bg-linear-to-br from-slate-900 via-slate-900 to-slate-800 px-6 py-10 sm:px-10 sm:py-12">
				<div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-sky-500/15 blur-3xl" />
				<div className="pointer-events-none absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-cyan-500/15 blur-3xl" />

				<div className="relative">
					<div className="space-y-6">
						<span className="inline-flex w-fit items-center rounded-full border border-slate-600 bg-slate-900/75 px-4 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-sky-300 backdrop-blur">
							<Trans>Based in France · Open to remote opportunities</Trans>
						</span>

						<h1 className="max-w-3xl text-balance text-4xl font-black tracking-tight text-white sm:text-5xl md:text-6xl">
							<Trans>
								I build reliable web platforms and developer-focused systems.
							</Trans>
						</h1>

						<p className="max-w-2xl text-pretty text-base leading-relaxed text-slate-300 sm:text-lg">
							<Trans>
								Hi, I&apos;m Sonny. I design and ship maintainable products with
								clear architecture, thoughtful DX, and practical automation.
							</Trans>
						</p>

						<ul className="grid gap-2.5 text-sm text-slate-300 sm:grid-cols-2 sm:text-base">
							<li className="flex items-center gap-2 rounded-xl bg-slate-800/70 px-3 py-2 backdrop-blur">
								<span
									className="h-2 w-2 rounded-full bg-sky-400"
									aria-hidden
								/>
								<Trans>Full-stack engineering and DevOps</Trans>
							</li>
							<li className="flex items-center gap-2 rounded-xl bg-slate-800/70 px-3 py-2 backdrop-blur">
								<span
									className="h-2 w-2 rounded-full bg-sky-400"
									aria-hidden
								/>
								<Trans>Automation-first mindset</Trans>
							</li>
							<li className="flex items-center gap-2 rounded-xl bg-slate-800/70 px-3 py-2 backdrop-blur">
								<span
									className="h-2 w-2 rounded-full bg-sky-400"
									aria-hidden
								/>
								<Trans>Productive tooling across domains</Trans>
							</li>
						</ul>

						<Link
							route="show_posts"
							className="inline-flex items-center rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-200"
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
						className="self-end text-sm text-gray-400"
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
									<span className="font-semibold text-white/95">
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
