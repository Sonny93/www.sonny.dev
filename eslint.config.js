import { configApp } from '@adonisjs/eslint-config';
import pluginLingui from 'eslint-plugin-lingui';

export default configApp([
	{
		plugins: {
			lingui: pluginLingui,
		},
		rules: {
			'lingui/t-call-in-function': 'error',
		},
	},
]);
