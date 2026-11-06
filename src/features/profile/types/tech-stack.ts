export type TechStackCategory = "ai" | "designing" | "coding";

/**
 * A technology item displayed in the Tech Stack section.
 */
export type TechStack = {
  /** Unique identifier used to resolve icon files. */
  key: string;
  /** Display name of the technology. */
  title: string;
  /** Official website URL. */
  href: string;
  /** Group the technology is displayed under. */
  category: TechStackCategory;
  /** CDN URL for the technology icon. */
  iconUrl: string;
  /** If true, use theme-specific icons for dark/light mode. */
  theme?: boolean;
};
