import type { Locale } from "./routing";

export type Localized<T> = Record<Locale, T>;

export function resolveLocalized<T>(value: Localized<T>, locale: Locale): T {
  return value[locale];
}
