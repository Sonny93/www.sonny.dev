import React from 'react';
import { createRoot } from 'react-dom/client';

// Component
import App from './App';

// Styles
import './index.scss';
import './App.scss';
import './input.scss';

const container = document.getElementById('root');
if (container) {
	const root = createRoot(container);
	root.render(
		<React.StrictMode>
			<App />
		</React.StrictMode>
	);
} else {
	throw new Error('Unable to find #root element');
}
