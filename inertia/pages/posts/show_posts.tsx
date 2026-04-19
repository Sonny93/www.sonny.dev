import { Data } from '@generated/data';
import { Trans } from '@lingui/react/macro';

import { PostList } from '~/components/posts/post_list';
import { SectionTitle } from '~/components/section_title';

interface ShowPostsProps {
	posts: Data.Post[];
}

export default function ShowPosts({ posts }: Readonly<ShowPostsProps>) {
	return (
		<div>
			<SectionTitle title={<Trans>Blog articles</Trans>} />
			<PostList posts={posts} />
		</div>
	);
}
