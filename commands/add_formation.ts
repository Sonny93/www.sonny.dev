import { frDegrees } from '#shared/lib/index';
import { Formation } from '#shared/types/index';
import { BaseCommand, flags } from '@adonisjs/core/ace';
import type { CommandOptions } from '@adonisjs/core/types/ace';
import { translate } from 'google-translate-api-x';
import { existsSync } from 'node:fs';
import { readFile, writeFile } from 'node:fs/promises';

/*

	Command to create a formation:
	- Degree type
	- Degree name
	- Result (optional)
	- School name
	- Location (optional)
	- Start date
	- End date (optional)
	- URL of the school (optional)

*/

const formationPathEn = 'locales/en/formations.json';
const formationPathFr = 'locales/fr/formations.json';

export default class AddFormation extends BaseCommand {
	static commandName = 'add:formation';
	static description = 'Commande pour ajouter une formation';

	@flags.boolean()
	declare dry: boolean; // if true, the command will not persist the formation

	static options: CommandOptions = {};

	async run() {
		const prompts = await this.askPrompts();
		const [enDegreeName, enResult] = await Promise.all([
			this.translateString(prompts.degreeName),
			this.translateString(prompts.result),
		]);

		const frFormation: Formation = prompts;
		const enFormation: Formation = {
			degreeType: prompts.degreeType,
			degreeName: enDegreeName ?? prompts.degreeName,
			result: enResult,
			schoolName: prompts.schoolName,
			startDate: prompts.startDate,
			endDate: prompts.endDate,
			url: prompts.url,
			location: prompts.location,
		};

		console.log('French');
		console.log(frFormation);
		console.log('English');
		console.log(enFormation);

		if (!this.dry) {
			await Promise.all([
				this.persitFormation(enFormation, 'en'),
				this.persitFormation(frFormation, 'fr'),
			]);
		}
	}

	async askPrompts(): Promise<Formation> {
		const degreeType = await this.prompt.choice('Type de diplôme', frDegrees);
		const degreeName = await this.prompt.ask('Nom du diplôme', {
			validate: this.validateMandatoryString,
		});
		const result = await this.prompt.ask('Résultat (facultatif)');
		const schoolName = await this.prompt.ask("Nom de l'école", {
			validate: this.validateMandatoryString,
		});
		const location = await this.prompt.ask('Lieu (facultatif)');
		const startDate = await this.prompt.ask('Date de début', {
			validate: this.validateDate,
		});
		const endDate = await this.prompt.ask('Date de fin (facultatif)', {
			validate: this.validateDate,
		});
		const url = await this.prompt.ask("URL de l'école (facultatif)", {
			validate: this.validateUrl,
		});

		return {
			degreeType,
			degreeName,
			result,
			schoolName,
			location,
			startDate,
			endDate,
			url,
		};
	}

	async persitFormation(formation: Formation, locale: 'en' | 'fr') {
		if (!existsSync(this.getLocalePath(locale))) {
			await writeFile(this.getLocalePath(locale), '[]');
		}

		const formationFile = await readFile(this.getLocalePath(locale), 'utf8');
		const formationJson = JSON.parse(formationFile ?? '[]');

		formationJson.push(formation);

		await writeFile(
			this.getLocalePath(locale),
			JSON.stringify(formationJson, null, 2)
		);
	}

	private getLocalePath(locale: 'en' | 'fr') {
		const path = locale === 'en' ? formationPathEn : formationPathFr;
		return this.app.makePath(path);
	}

	private validateDate(date: string) {
		return !Number.isNaN(new Date(date).getTime());
	}

	private validateUrl(url: string) {
		return url ? url.startsWith('https://') : true;
	}

	private validateMandatoryString(string: string) {
		return string.length > 0;
	}

	private async translateString(string?: string): Promise<string | undefined> {
		if (!string) return undefined;
		const result = await translate(string, { from: 'fr', to: 'en' });
		return result.text;
	}
}
