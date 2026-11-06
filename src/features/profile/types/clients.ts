import type { Localized } from "@/i18n/localized";

export type Client = {
  id: string;
  name: string;
  /** Logo URL (absolute or under /public). Shown in light mode. */
  logo: string;
  /** Optional dark-mode variant of the logo. */
  logoDark?: string;
  /** Client website; the client name links here when set. */
  website?: string;
  /** Person who wrote the review, e.g. "Jane Doe, Marketing Lead". */
  reviewer?: string;
  /** What I did for this client. */
  description: Localized<string>;
  /** Only set with a review the client has actually given. */
  review?: Localized<string>;
};
