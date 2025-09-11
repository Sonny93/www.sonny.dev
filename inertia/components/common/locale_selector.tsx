import { useLingui } from '@lingui/react';
import {
  dynamicActivate,
  locales,
  persistLocale,
  type Locale,
} from '~/lib/i18n';

export function LocaleSelector() {
  const { i18n } = useLingui();

  const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const nextLocale = e.target.value as Locale;
    await dynamicActivate(nextLocale);
    persistLocale(nextLocale);
  };

  return (
    <div className="relative inline-block">
      <select
        value={i18n.locale}
        onChange={handleChange}
        className="
          appearance-none
          px-4 py-2
          pr-10
          rounded-lg
          bg-slate-800
          text-white
          border border-slate-700
          focus:(outline-none border-purple-500 ring-2 ring-purple-300)
          transition-colors
          shadow
          cursor-pointer
        "
      >
        {Object.entries(locales).map(([value, label]) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
      <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
        <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
          <path
            d="M7 10l5 5 5-5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </div>
  );
}
