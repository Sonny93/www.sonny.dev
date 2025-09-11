import { i18n } from '@lingui/core';
import { I18nProvider } from '@lingui/react';
import { PropsWithChildren, useEffect } from 'react';
import { dynamicActivate, resolveInitialLocale } from '~/lib/i18n';
import '../css/app.css';

export function BaseLayout({ children }: PropsWithChildren) {
  useEffect(() => {
    const initial = resolveInitialLocale();
    dynamicActivate(initial);
  }, []);
  return <I18nProvider i18n={i18n}>{children}</I18nProvider>;
}
