import { Data } from '@generated/data';
import { Trans } from '@lingui/react/macro';
import { Link } from '@adonisjs/inertia/react';

import { URLs } from '~/constants/urls';

interface PostProps {
	post: Data.Post;
}

export const PostItem = ({ post }: Readonly<PostProps>) => (
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
					dateTime={post.publishedAt!}
				>
					{post.publishedAt}
				</time>
			</div>
			<p className="text-xs text-gray-600 dark:text-gray-400">
				{post.estimatedReadTime} <Trans>min read</Trans>
			</p>
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
);
