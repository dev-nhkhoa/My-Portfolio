import dayjs from "dayjs";
import type { MetadataRoute } from "next";

import { SITE_INFO } from "@/config/site";
import { getAllPosts } from "@/features/blog/data/posts";
import { routing } from "@/i18n/routing";

/** Build a locale URL, e.g. ("/blog", "vi") -> "https://.../vi/blog". */
function localeUrl(route: string, locale: string) {
  return `${SITE_INFO.url}/${locale}${route}`;
}

/** hreflang alternates map for a given route across all locales. */
function languageAlternates(route: string) {
  return Object.fromEntries(
    routing.locales.map((locale) => [locale, localeUrl(route, locale)])
  );
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/blog", "/internal-project"];

  const routeEntries: MetadataRoute.Sitemap = staticRoutes.flatMap((route) =>
    routing.locales.map((locale) => ({
      url: localeUrl(route, locale),
      lastModified: dayjs().toISOString(),
      alternates: { languages: languageAlternates(route) },
    }))
  );

  const postEntries: MetadataRoute.Sitemap = getAllPosts().flatMap((post) => {
    const route = `/blog/${post.slug}`;
    return routing.locales.map((locale) => ({
      url: localeUrl(route, locale),
      lastModified: dayjs(post.metadata.updatedAt).toISOString(),
      alternates: { languages: languageAlternates(route) },
    }));
  });

  return [...routeEntries, ...postEntries];
}
