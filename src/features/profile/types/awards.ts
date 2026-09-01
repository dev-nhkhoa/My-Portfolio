import type { Localized } from "@/i18n/localized";

export type Award = {
  id: string;
  prize: Localized<string>;
  title: Localized<string>;
  /**
   * Award date used for sorting and display.
   * Format: "YYYY-MM" preferred (e.g., "2018-03"); "YYYY" is also accepted.
   */
  date: string;
  /**
   * School level or context label (e.g., "Grade 10", "University", "Personal Project").
   */
  grade: Localized<string>;
  /** Optional rich text description; Markdown and line breaks supported. */
  description?: Localized<string>;
  /** Optional URL to certificate, announcement, or reference material. */
  referenceLink?: string;
};
