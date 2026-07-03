const INDICATOR_SELECTOR = '#nav-active-indicator';
const ACTIVE_LINK_SELECTOR = '.nav-link[aria-current="page"]';

function positionIndicator(): void {
	const indicator = document.querySelector<HTMLElement>(INDICATOR_SELECTOR);
	if (indicator === null) return;

	const activeLink = document.querySelector<HTMLElement>(ACTIVE_LINK_SELECTOR);
	if (activeLink === null) {
		indicator.style.opacity = '0';
		return;
	}

	const container = indicator.parentElement;
	if (container === null) return;

	const containerRect = container.getBoundingClientRect();
	const linkRect = activeLink.getBoundingClientRect();
	const centerX = linkRect.left + linkRect.width / 2 - containerRect.left;

	if (indicator.dataset.initialized !== 'true') {
		indicator.style.transition = 'none';
		indicator.style.left = `${centerX}px`;
		indicator.getBoundingClientRect();
		indicator.style.transition = '';
		indicator.dataset.initialized = 'true';
	} else {
		indicator.style.left = `${centerX}px`;
	}

	indicator.style.opacity = '1';
}

document.addEventListener('astro:page-load', positionIndicator);
window.addEventListener('resize', positionIndicator);
