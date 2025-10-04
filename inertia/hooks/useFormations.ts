import { Formation } from '#shared/types/index';
import { useLingui } from '@lingui/react';
import { useEffect, useState } from 'react';

export function useFormations(): Formation[] {
	const { i18n } = useLingui();
	const [formations, setFormations] = useState<Formation[]>([]);

	useEffect(() => {
		const loadFormations = async () => {
			try {
				const locale = i18n.locale || 'en';
				const formationsModule = await import(
					`../../locales/${locale}/formations.json`
				);
				setFormations(formationsModule.default || []);
			} catch (error) {
				console.error('Erreur lors du chargement des formations:', error);
				setFormations([]);
			}
		};

		loadFormations();
	}, [i18n.locale]);

	return formations;
}
