import { useEffect, useState } from 'react';

type Theme = 'light' | 'dark' | 'system';

export function ThemeToggle() {
	const [theme, setTheme] = useState<Theme>('system');
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);

		const savedTheme = localStorage.getItem('theme') as Theme;
		if (savedTheme) {
			setTheme(savedTheme);
			applyTheme(savedTheme);
		} else {
			setTheme('system');
			applyTheme('system');
		}
	}, []);

	useEffect(() => {
		const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

		const handleSystemThemeChange = () => {
			if (theme === 'system') {
				applyTheme('system');
			}
		};

		mediaQuery.addEventListener('change', handleSystemThemeChange);

		return () => {
			mediaQuery.removeEventListener('change', handleSystemThemeChange);
		};
	}, [theme]);

	const applyTheme = (newTheme: Theme) => {
		const root = document.documentElement;

		if (newTheme === 'system') {
			const systemPrefersDark = window.matchMedia(
				'(prefers-color-scheme: dark)'
			).matches;
			if (systemPrefersDark) {
				root.classList.add('dark');
			} else {
				root.classList.remove('dark');
			}
		} else if (newTheme === 'dark') {
			root.classList.add('dark');
		} else {
			root.classList.remove('dark');
		}
	};

	const toggleTheme = () => {
		let newTheme: Theme;

		if (theme === 'light') {
			newTheme = 'dark';
		} else if (theme === 'dark') {
			newTheme = 'system';
		} else {
			newTheme = 'light';
		}

		setTheme(newTheme);
		applyTheme(newTheme);
		localStorage.setItem('theme', newTheme);
	};

	if (!mounted) {
		return null;
	}

	const getIcon = () => {
		if (theme === 'light') {
			return <div className="i-heroicons-sun w-5 h-5 text-yellow-500" />;
		} else if (theme === 'dark') {
			return (
				<div className="i-heroicons-moon w-5 h-5 text-gray-700 dark:text-yellow-500" />
			);
		} else {
			return (
				<div className="i-heroicons-computer-desktop w-5 h-5 text-blue-500" />
			);
		}
	};

	return (
		<button
			onClick={toggleTheme}
			className="fixed top-4 right-4 p-3 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-200 border border-gray-200 dark:border-gray-700"
			aria-label={`Thème actuel: ${theme}`}
		>
			{getIcon()}
		</button>
	);
}
