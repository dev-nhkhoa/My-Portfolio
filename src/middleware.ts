import createMiddleware from "next-intl/middleware";

import { routing } from "@/i18n/routing";

export default createMiddleware(routing);

export const config = {
  matcher: [
    // Run on all paths except API, Next internals, machine/SEO routes, and any
    // path containing a dot (static assets, .md/.mdx, sitemap.xml, etc.).
    "/((?!api|_next|_vercel|og|rss|vcard|sitemap|robots|manifest|.*\\..*).*)",
  ],
};
