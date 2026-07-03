const TOGGLE_SELECTOR = '#nav-menu-toggle';
const PANEL_SELECTOR = '#nav-menu-panel';
const NAV_SELECTOR = '#site-nav';
const FOCUSABLE_SELECTOR =
	'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

let removeListeners: (() => void) | undefined;

function initializeNavMenu(): void {
	removeListeners?.();
	removeListeners = undefined;

	const toggle = document.querySelector<HTMLButtonElement>(TOGGLE_SELECTOR);
	const panel = document.querySelector<HTMLElement>(PANEL_SELECTOR);
	const navBar = document.querySelector<HTMLElement>(NAV_SELECTOR);
	if (toggle === null || panel === null || navBar === null) return;

	const closeMenu = (options: { returnFocus?: boolean } = {}): void => {
		if (toggle.getAttribute('aria-expanded') !== 'true') return;
		toggle.setAttribute('aria-expanded', 'false');
		panel.dataset.open = 'false';
		panel.inert = true;
		navBar.dataset.menuOpen = 'false';
		document.body.style.removeProperty('overflow');
		if (options.returnFocus !== false) toggle.focus();
	};

	const openMenu = (): void => {
		toggle.setAttribute('aria-expanded', 'true');
		panel.dataset.open = 'true';
		panel.inert = false;
		navBar.dataset.menuOpen = 'true';
		navBar.dataset.pinned = 'true';
		document.body.style.overflow = 'hidden';
		panel.querySelector<HTMLElement>(FOCUSABLE_SELECTOR)?.focus();
	};

	const handleToggleClick = (): void => {
		if (toggle.getAttribute('aria-expanded') === 'true') closeMenu();
		else openMenu();
	};

	const handleKeydown = (event: KeyboardEvent): void => {
		if (event.key !== 'Escape') return;
		if (toggle.getAttribute('aria-expanded') !== 'true') return;
		closeMenu();
	};

	const handlePanelLinkClick = (event: MouseEvent): void => {
		if ((event.target as HTMLElement).closest('a') !== null)
			closeMenu({ returnFocus: false });
	};

	toggle.addEventListener('click', handleToggleClick);
	document.addEventListener('keydown', handleKeydown);
	panel.addEventListener('click', handlePanelLinkClick);

	removeListeners = () => {
		toggle.removeEventListener('click', handleToggleClick);
		document.removeEventListener('keydown', handleKeydown);
		panel.removeEventListener('click', handlePanelLinkClick);
		document.body.style.removeProperty('overflow');
	};
}

document.addEventListener('astro:page-load', initializeNavMenu);
document.addEventListener('astro:before-swap', () => removeListeners?.());
