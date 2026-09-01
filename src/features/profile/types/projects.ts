import type { Localized } from "@/i18n/localized";

export type Project = {
  /** Stable unique identifier (used as list key/anchor). */
  id: string;
  title: Localized<string>;
  /**
   * Project period for display and sorting.
   * Use "MM.YYYY" format. Omit `end` for ongoing projects.
   */
  period: {
    /** Start date (e.g., "05.2025"). */
    start: string;
    /** End date; leave undefined for "Present". */
    end?: string;
  };
  /** Public URL (site, repository, demo, or video). */
  link: string;
  /** Tags/technologies for chips or filtering. */
  skills: string[];
  /** Optional rich description; Markdown and line breaks supported. */
  description?: Localized<string>;
  /** Logo image URL (absolute or path under /public). Shown in light mode. */
  logo?: string;
  /** Optional dark-mode variant of the logo. When set, `logo` is used for light
   * mode and this for dark mode. */
  logoDark?: string;
  /** Whether the project card is expanded by default in the UI. */
  isExpanded?: boolean;
};
