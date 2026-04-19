import { Data } from '@generated/data';

import { PostItem } from './post_item';

interface PostListProps {
	posts: Data.Post[];
}

export const PostList = ({ posts }: Readonly<PostListProps>) => (
	<ul className="flex flex-col gap-4">
		{posts.map((post) => (
			<PostItem post={post} key={post.slug} />
		))}
	</ul>
);
