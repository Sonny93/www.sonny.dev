import logger from '@adonisjs/core/services/logger';
import type { HttpContext } from '@adonisjs/core/http';
import type { NextFn } from '@adonisjs/core/types/http';
import BaseInertiaMiddleware from '@adonisjs/inertia/inertia_middleware';

import { DEFAULT_LOCALE, SUPPORTED_LOCALES } from '#shared/consts/i18n';

function resolveServerLocale(ctx: HttpContext): string {
	const plainCookie = ctx.request.plainCookie('locale', { encoded: false });

	const cookie = ctx.request.cookie('locale');

	const localeCookie = plainCookie ?? cookie;

	if (localeCookie) {
		logger.debug(`Locale cookie found: ${localeCookie}`);
	} else {
		logger.debug('No locale cookie found in request');
	}

	if (localeCookie && SUPPORTED_LOCALES.includes(localeCookie)) {
		return localeCookie;
	}

	const acceptLanguage = ctx.request.header('accept-language');

	if (acceptLanguage) {
		const languages = acceptLanguage

			.split(',')

			.map((lang: string) => lang.split(';')[0].trim().toLowerCase());

		for (const lang of languages) {
			const base = lang.split('-')[0];

			if (SUPPORTED_LOCALES.includes(base as any)) {
				logger.debug(`Locale from Accept-Language: ${base}`);

				return base;
			}
		}
	}

	logger.debug(`Using default locale: ${DEFAULT_LOCALE}`);

	return DEFAULT_LOCALE;
}

export default class InertiaMiddleware extends BaseInertiaMiddleware {
	share(ctx: HttpContext) {
		const { session } = ctx;

		return {
			errors: ctx.inertia.always(this.getValidationErrors(ctx)),
			flash: ctx.inertia.always({
				error: session?.flashMessages.get('error'),
				success: session?.flashMessages.get('success'),
			}),
			locale: resolveServerLocale(ctx),
		};
	}

	async handle(ctx: HttpContext, next: NextFn) {
		await this.init(ctx);
		const output = await next();
		this.dispose(ctx);
		return output;
	}
}

declare module '@adonisjs/inertia/types' {
	type MiddlewareSharedProps =
		import('@adonisjs/inertia/types').InferSharedProps<InertiaMiddleware>;
	export interface SharedProps extends MiddlewareSharedProps {}
}
