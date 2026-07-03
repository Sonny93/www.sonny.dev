export type VerticalTimelineItem = {
	id: string;
	title: string;
	titleVariant?: 'default' | 'uppercase';
	subtitle?: string;
	metaHtml: string;
	bullets?: readonly string[];
};
