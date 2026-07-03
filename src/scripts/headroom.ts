const FIXED_AT_PX = 120;
const BOTTOM_TOLERANCE_PX = 2;
const SCROLL_DELTA_THRESHOLD_PX = 8;

function isAtBottom(scrollY: number): boolean {
	return (
		scrollY + window.innerHeight >=
		document.documentElement.scrollHeight - BOTTOM_TOLERANCE_PX
	);
}

let removeScrollListener: (() => void) | undefined;

function initializeHeadroom(): void {
	removeScrollListener?.();
	removeScrollListener = undefined;

	const headroomElements = Array.from(
		document.querySelectorAll<HTMLElement>('[data-headroom]')
	);
	if (headroomElements.length === 0) return;

	let lastScrollY = window.scrollY;

	const applyPinnedState = (isPinned: boolean): void => {
		for (const headroomElement of headroomElements) {
			if (headroomElement.dataset.menuOpen === 'true') continue;
			headroomElement.dataset.pinned = String(isPinned);
			headroomElement.inert = !isPinned;
		}
	};

	const handleScroll = (): void => {
		const scrollY = window.scrollY;
		const scrollDelta = scrollY - lastScrollY;
		lastScrollY = scrollY;

		if (scrollY < FIXED_AT_PX || isAtBottom(scrollY)) {
			applyPinnedState(true);
			return;
		}
		if (scrollDelta > SCROLL_DELTA_THRESHOLD_PX) {
			applyPinnedState(false);
			return;
		}
		if (scrollDelta < -SCROLL_DELTA_THRESHOLD_PX) {
			applyPinnedState(true);
		}
	};

	window.addEventListener('scroll', handleScroll, { passive: true });
	handleScroll();

	removeScrollListener = () => {
		window.removeEventListener('scroll', handleScroll);
	};
}

document.addEventListener('astro:page-load', initializeHeadroom);
