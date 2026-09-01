export type SocialLink = {
  /** Icon image URL (absolute or path under /public) shown beside the title. Used for light mode. */
  icon: string;
  /** Optional dark-mode variant. When set, `icon` is used for light mode and this for dark mode. */
  iconDark?: string;
  /** Invert the icon colors in dark mode (for monochrome black icons without a dark variant). */
  invertOnDark?: boolean;
  title: string;
  /** Optional handle/username or subtitle displayed under the title. */
  description?: string;
  /** External profile URL opened when the item is clicked. */
  href: string;

  padding?: boolean;
};
