export type PostMetadata = {
  title: string;
  description: string;
  image?: string;
  category?: string;
  icon?: string;
  new?: boolean;
  pinned?: boolean;
  draft?: boolean;
  tags?: string[];
  createdAt: string;
  updatedAt: string;
  font?: string;
  /** Locale this post is written in. Defaults to "en" when absent. */
  locale: "en" | "vi";
  /** Shared id linking a post to its translations across locales. */
  translationKey?: string;
};

export type Post = {
  /** Parsed frontmatter metadata from the MDX file. */
  metadata: PostMetadata;
  /** Slug derived from the MDX filename (without extension). */
  slug: string;
  /** MDX content body without frontmatter. */
  content: string;
};
