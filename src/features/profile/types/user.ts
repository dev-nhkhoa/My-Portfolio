import type { Localized } from "@/i18n/localized";

export type User = {
  firstName: string;
  lastName: string;
  /** Preferred public-facing name */
  displayName: string;
  /** Handle/username used in links or mentions */
  username: string;
  /** e.g. "male", "female", "non-binary" */
  gender: string;
  /** e.g. "he/him", "she/her", "they/them" */
  pronouns: string;
  bio: Localized<string>;
  /** Short phrases rotated in UI (e.g., homepage flip effect) */
  flipSentences: Localized<string[]>;
  /** General location for display */
  address: string;
  /** E.164 format, base64 encoded (https://t.io.vn/base64-string-converter) */
  phoneNumber: string;
  /** base64 encoded (https://t.io.vn/base64-string-converter) */
  email: string;
  /** Personal/homepage URL */
  website: string;
  /** Primary/current role shown on profile */
  jobTitle: Localized<string>;
  /** Work history entries */
  jobs: {
    title: Localized<string>;
    company: string;
    website: string;
  }[];
  /** Rich about section; supports Markdown */
  about: Localized<string>;
  /** Public URL to avatar image */
  avatar: string;
  /** Open Graph image URL for social sharing */
  ogImage: string;
  /** Audio URL for name pronunciation */
  namePronunciationUrl: string;
  /** SEO keywords list for metadata */
  keywords: string[];
  /** Time zone in IANA format (e.g., "Asia/Ho_Chi_Minh") */
  timeZone: string;
  /** Profile/site start date in YYYY-MM-DD */
  dateCreated: string;
};
