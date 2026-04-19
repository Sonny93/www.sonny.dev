import { Data } from '@generated/data';

import { SectionTitle } from '~/components/section_title';

interface ShowPostProps {
	post: Data.Post;
}

export default function ShowPost({ post }: Readonly<ShowPostProps>) {
	return (
		<div>
			<SectionTitle title={post.title} />
		</div>
	);
}
