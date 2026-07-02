export const TAG_COLOR_PALETTE = [
	'bg-sky-500/20 text-sky-200 border border-sky-500/30',
	'bg-emerald-500/20 text-emerald-200 border border-emerald-500/30',
	'bg-amber-500/20 text-amber-200 border border-amber-500/30',
	'bg-rose-500/20 text-rose-200 border border-rose-500/30',
	'bg-violet-500/20 text-violet-200 border border-violet-500/30',
	'bg-fuchsia-500/20 text-fuchsia-200 border border-fuchsia-500/30',
	'bg-orange-500/20 text-orange-200 border border-orange-500/30',
	'bg-teal-500/20 text-teal-200 border border-teal-500/30',
	'bg-indigo-500/20 text-indigo-200 border border-indigo-500/30',
	'bg-pink-500/20 text-pink-200 border border-pink-500/30',
	'bg-red-500/20 text-red-200 border border-red-500/30',
	'bg-blue-500/20 text-blue-200 border border-blue-500/30',
	'bg-lime-500/20 text-lime-200 border border-lime-500/30',
	'bg-purple-500/20 text-purple-200 border border-purple-500/30',
] as const;

function hashTag(tag: string): number {
	let hash = 0;
	for (let index = 0; index < tag.length; index += 1) {
		hash = (hash << 5) - hash + tag.charCodeAt(index);
		hash |= 0;
	}
	return Math.abs(hash);
}

export function getTagColorClasses(tag: string): string {
	const paletteIndex = hashTag(tag) % TAG_COLOR_PALETTE.length;
	return TAG_COLOR_PALETTE[paletteIndex];
}
