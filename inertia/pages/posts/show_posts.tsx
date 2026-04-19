import { Data } from '@generated/data';

import { PostList } from '~/components/posts/post_list';
import { SectionTitle } from '~/components/section_title';

interface ShowPostsProps {
	posts: Data.Post[];
}

export default function ShowPosts({ posts }: Readonly<ShowPostsProps>) {
	return (
		<div>
			<SectionTitle title="Articles de blog" />
			<PostList posts={posts} />
		</div>
	);
}
