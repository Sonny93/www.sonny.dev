import React from 'react';
import { Data } from '@generated/data';
import { Head } from '@inertiajs/react';
import { Trans } from '@lingui/react/macro';

import { PostLayout } from '~/layouts/post_layout';
import { SectionTitle } from '~/components/section_title';

interface ShowPostProps {
	post: Data.Post;
	content: string;
}

function ShowPost({ post, content }: Readonly<ShowPostProps>) {
	return (
		<>
			<Head title={post.title} />
			<SectionTitle title={post.title} />
			<div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
				{post.publishedAt} &middot; {post.estimatedReadTime}{' '}
				<Trans>min read</Trans>
			</div>
			<div
				className="prose dark:prose-invert min-w-full"
				dangerouslySetInnerHTML={{ __html: content }}
			/>
		</>
	);
}

ShowPost.layout = (page: React.ReactNode) => <PostLayout>{page}</PostLayout>;

export default ShowPost;
