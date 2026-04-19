import { useEffect, useRef, useState } from 'react';

const BOTTOM_TOLERANCE_PX = 2;
const SCROLL_DELTA_THRESHOLD_PX = 8;

function isAtBottom(y: number) {
	return (
		y + window.innerHeight >=
		document.documentElement.scrollHeight - BOTTOM_TOLERANCE_PX
	);
}

export function useHeadroom({ fixedAt }: { fixedAt: number }) {
	const [pinned, setPinned] = useState(true);
	const lastScrollY = useRef(0);

	useEffect(() => {
		lastScrollY.current = window.scrollY;

		const onScroll = () => {
			const y = window.scrollY;
			const delta = y - lastScrollY.current;
			const atBottom = isAtBottom(y);

			let nextPinned: boolean;
			if (y < fixedAt || atBottom) {
				nextPinned = true;
			} else if (delta > SCROLL_DELTA_THRESHOLD_PX) {
				nextPinned = false;
			} else if (delta < -SCROLL_DELTA_THRESHOLD_PX) {
				nextPinned = true;
			} else {
				lastScrollY.current = y;
				return;
			}

			setPinned((prev) => (prev === nextPinned ? prev : nextPinned));

			lastScrollY.current = y;
		};

		window.addEventListener('scroll', onScroll, { passive: true });
		onScroll();
		return () => window.removeEventListener('scroll', onScroll);
	}, [fixedAt]);

	return pinned;
}
