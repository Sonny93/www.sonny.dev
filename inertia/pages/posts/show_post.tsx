import { Data } from '@generated/data';

import { SectionTitle } from '~/components/section_title';

interface ShowPostProps {
	post: Data.Post;
}

export default function ShowPost({ post }: Readonly<ShowPostProps>) {
	return (
		<div>
			<SectionTitle title={post.title} />
			<div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
				{post.publishedAt} &middot; {post.estimatedReadTime} min read
			</div>
		</>
	);
}
