# Implementation Plan: Bilingual Support (English + Vietnamese)

Date: 2026-09-01

Companion to: `docs/plans/active/2026-09-01-i18n-en-vi.md` (the spec). That
document holds the *why*, scope, and decisions. This document is the *how* — an
ordered, agent-executable checklist with exact files, code, and a verification
gate after every phase. Do the phases in order; do not start a phase until the
previous phase's gate passes.

## Conventions used in this plan

- `pnpm` is the package manager. Run all commands from the repo root.
- After each phase, run the phase's **Gate**. If it fails, fix before moving on.
- All internal navigation MUST import from `src/i18n/navigation.ts`, never from
  `next/link` or `next/navigation` directly (locale prefixing depends on it).
- Locales: `en` (default), `vi`. Prefix strategy: `always` (`/en`, `/vi`).
- When seeding Vietnamese you cannot confidently author, copy the English string
  verbatim and append a trailing ` <!-- TODO(i18n) -->` (for markdown/MDX) or a
  `/* TODO(i18n) */` sibling comment (for TS). Never leave an empty string.

---

## Phase 0 — Branch and baseline

1. Create a working branch:
   ```bash
   git checkout -b feat/i18n-en-vi
   ```
2. Capture a green baseline so regressions are attributable:
   ```bash
   pnpm install
   pnpm check-types
   pnpm lint
   pnpm build
   ```

**Gate 0:** All four commands succeed on a clean tree.

---

## Phase 1 — next-intl core wiring (no route moves yet)

Goal: library installed and configured so the app still builds unchanged. No
routes move in this phase.

### 1.1 Install

```bash
pnpm add next-intl
```

### 1.2 `src/i18n/routing.ts`

```ts
import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "vi"],
  defaultLocale: "en",
  localePrefix: "always",
});

export type Locale = (typeof routing.locales)[number];
```

### 1.3 `src/i18n/navigation.ts`

```ts
import { createNavigation } from "next-intl/navigation";

import { routing } from "./routing";

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
```

### 1.4 `src/i18n/request.ts`

```ts
import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";

import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
```

### 1.5 `src/i18n/localized.ts`

```ts
import type { Locale } from "./routing";

export type Localized<T> = Record<Locale, T>;

export function resolveLocalized<T>(value: Localized<T>, locale: Locale): T {
  return value[locale];
}
```

### 1.6 Wrap `next.config.ts`

Compose the plugin around the existing config — keep every current field.

```ts
import createNextIntlPlugin from "next-intl/plugin";
import type { NextConfig } from "next";
import path from "path";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  // ...unchanged existing config (reactStrictMode, transpilePackages,
  // turbopack, devIndicators, images, rewrites)...
};

export default withNextIntl(nextConfig);
```

### 1.7 Seed placeholder message catalogs

Create minimal `src/messages/en.json` and `src/messages/vi.json` with `{}` for
now (populated in Phase 3) so `request.ts` resolves.

### 1.8 Create `src/messages/` TS support (optional but recommended)

Add `src/global.d.ts` (or extend an existing one) for type-safe messages:

```ts
import type en from "./messages/en.json";

declare module "next-intl" {
  interface AppConfig {
    Locale: (typeof import("./i18n/routing").routing.locales)[number];
    Messages: typeof en;
  }
}
```

**Gate 1:** `pnpm check-types` and `pnpm build` pass. App still serves the old
unprefixed routes (route move is Phase 2).

---

## Phase 2 — Route restructure, `[locale]` layout, middleware, redirects

Goal: the app serves under `/en` and `/vi`; legacy URLs 301 to `/en/*`; machine
routes untouched. This is the only hard-to-revert phase — commit it alone.

### 2.1 Move the app route group

```bash
git mv "src/app/(app)" "src/app/[locale]"
```

Resulting tree (localized):

```
src/app/[locale]/
  (root)/page.tsx
  (docs)/blog/page.tsx
  (docs)/blog/[slug]/page.tsx
  (docs)/blog/not-found.tsx
  (docs)/layout.tsx
  internal-project/page.tsx
  layout.tsx            # was (app)/layout.tsx
```

Leave at `src/app/` root, unmoved: `(llms)/`, `og/`, `rss/`, `vcard/`,
`sitemap.ts`, `manifest.ts`, `robots.ts`, `not-found.tsx`, and the global
`layout.tsx`.

> Note on the route-group parentheses in a `git mv` path: quote the path so the
> shell does not glob. If `git mv` complains, `mkdir -p src/app/\[locale\]` then
> move children individually.

### 2.2 Decide the `<html>` split (record in spec Decisions)

Next requires exactly one `<html>`. Chosen approach:

- **Keep** the single `<html>`/`<body>` in the global `src/app/layout.tsx` but
  make `lang` dynamic is not possible there (no locale param). Therefore:
  - Move the `<html>`/`<head>`/`<body>` shell into
    `src/app/[locale]/layout.tsx` where the `locale` param is available.
  - Reduce the global `src/app/layout.tsx` to a pass-through that returns
    `children` (required to exist by App Router, but renders no second `<html>`).

If App Router rejects a root layout without `<html>` (it currently allows it
when a nested layout provides the document shell for all rendered routes, but
the root `not-found.tsx` needs one too), fall back to: keep `<html>` in the root
layout with `lang={routing.defaultLocale}` and override per-locale via a
`<html lang>` set through the `[locale]` layout using the params. Validate the
built output has no nested `<html>` before finalizing; record the final choice
in the spec's Decisions section.

### 2.3 `src/app/[locale]/layout.tsx`

Moves the document shell + providers and validates the locale.

```tsx
import "@/styles/globals.css";

import { hasLocale, NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import Script from "next/script";

import { routing } from "@/i18n/routing";
// ...existing imports: Providers, fonts, cn, META_THEME_COLORS, USER, etc.

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  return (
    <html lang={locale} className={cn(/* font vars */)} suppressHydrationWarning>
      <head>{/* dark-mode + macOS scripts + JSON-LD (now locale-aware) */}</head>
      <body suppressHydrationWarning>
        <NextIntlClientProvider>
          <Providers>{children}</Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
```

Notes:
- `getWebSiteJsonLd()` moves here (or is called here) and reads `locale` for
  `inLanguage` (finished in Phase 6).
- `NextIntlClientProvider` with no explicit `messages` prop inherits from the
  request config — correct for App Router.

### 2.4 The `(app)` inner layout

`src/app/[locale]/layout.tsx` above replaces the document shell. The former
`(app)/layout.tsx` content (SiteHeader / main / SiteFooter / ScrollTop) becomes
an inner layout at `src/app/[locale]/(app)/layout.tsx` **only if** you keep the
`(app)` group. Simpler: fold `SiteHeader`/`main`/`SiteFooter`/`ScrollTop`
directly into the `[locale]` layout body around `{children}`, and drop the
`(app)` grouping. Choose the fold unless a distinct non-`(app)` layout is
needed (YAGNI: it isn't).

### 2.5 `setRequestLocale` in pages

Each page/segment that should render statically must call `setRequestLocale`
from its own params (layouts alone are not enough for full static rendering).
Add to `(root)/page.tsx`, `blog/page.tsx`, `blog/[slug]/page.tsx`,
`internal-project/page.tsx`:

```tsx
export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  // ...
}
```

### 2.6 `src/middleware.ts`

```ts
import createMiddleware from "next-intl/middleware";

import { routing } from "@/i18n/routing";

export default createMiddleware(routing);

export const config = {
  matcher: [
    // Run on everything except machine routes, API, Next internals, and files
    // with an extension (assets). Tune against real public/ paths.
    "/((?!api|_next|_vercel|og|rss|vcard|llms\\.txt|llms-full\\.txt|sitemap\\.xml|robots\\.txt|manifest\\.webmanifest|.*\\.md|.*\\.mdx|.*\\..*).*)",
  ],
};
```

Verify each excluded route still resolves after this phase (Gate 2).

### 2.7 Legacy 301 redirects in `next.config.ts`

Add a `redirects()` alongside the existing `rewrites()`:

```ts
async redirects() {
  return [
    { source: "/", destination: "/en", permanent: true },
    { source: "/blog", destination: "/en/blog", permanent: true },
    { source: "/blog/:slug", destination: "/en/blog/:slug", permanent: true },
    {
      source: "/internal-project",
      destination: "/en/internal-project",
      permanent: true,
    },
  ];
},
```

Guard against clashing with the existing `.mdx` rewrites (those target
`/blog.mdx/:slug`, a machine route — no conflict, but confirm order).

### 2.8 Update internal links to locale-aware navigation

Replace `next/link` `Link` and `next/navigation` `useRouter`/`usePathname`
imports with the `src/i18n/navigation` versions in components that navigate
within the site: `site-header.tsx`, `desktop-nav.tsx`, `mobile-nav.tsx`,
`nav.tsx`, `command-menu.tsx`, blog `post-item.tsx`, and any `<Link href>` to
internal routes. External `<a href>` links stay unchanged.

**Gate 2:**
- `pnpm build` passes; built output has exactly one `<html>` per page.
- `/en` and `/vi` render the homepage; `/vi` shows the app shell (strings still
  English until Phase 3).
- `curl -I localhost:1408/` → 308/301 to `/en`; same for `/blog`,
  `/blog/<known-slug>`, `/internal-project`.
- `curl` of `/rss`, `/llms.txt`, `/sitemap.xml`, `/vcard`,
  `/manifest.webmanifest` → 200, NOT redirected to `/en`.
- Commit this phase alone: `git commit -m "feat(i18n): locale routing skeleton + redirects"`.

---

## Phase 3 — UI-chrome message catalogs

Goal: every hardcoded chrome string comes from `messages/{en,vi}.json`.

### 3.1 Author `src/messages/en.json`

Namespaces and keys (author English values from the current hardcoded copy):

```jsonc
{
  "nav": { "portfolio": "Portfolio", "blog": "Blog" },
  "footer": {
    "inspiredBy": "Inspired by tailwindcss.com & ui.shadcn.com",
    "builtBy": "Built by a human. The source code is available on <github>GitHub</github>."
  },
  "commandMenu": {
    "placeholder": "Type a command or search...",
    "empty": "No results found.",
    "search": "Search",
    "headings": {
      "menu": "Menu", "portfolio": "Portfolio", "blog": "Blog",
      "components": "Components", "socialLinks": "Social Links",
      "brandAssets": "Brand Assets", "theme": "Theme"
    },
    "items": {
      "about": "About", "techStack": "Tech Stack", "experience": "Experience",
      "projects": "Projects", "awards": "Honors & Awards",
      "certifications": "Certifications", "testimonials": "Testimonials",
      "downloadVCard": "Download vCard", "light": "Light", "dark": "Dark",
      "auto": "Auto", "copyMark": "Copy Mark as SVG",
      "copyLogotype": "Copy Logotype as SVG"
    },
    "actions": {
      "runCommand": "Run Command", "goToPage": "Go to Page",
      "openLink": "Open Link", "exit": "Exit"
    },
    "toast": {
      "copiedMark": "Copied Mark as SVG",
      "copiedLogotype": "Copied Logotype as SVG"
    }
  },
  "panels": {
    "about": "About", "stack": "Stack", "experience": "Experience",
    "projects": "Projects", "awards": "Awards",
    "certifications": "Certifications", "faq": "FAQ", "blog": "Blog",
    "brand": "Brand"
  },
  "a11y": {
    "overview": "Overview", "issuedBy": "Issued by", "issuedOn": "Issued on",
    "prize": "Prize", "awardedIn": "Awarded in",
    "receivedInGrade": "Received in Grade",
    "openReferenceAttachment": "Open Reference Attachment",
    "pronounceMyName": "Pronounce my name",
    "githubContributions": "GitHub Contributions",
    "employmentType": "Employment Type",
    "employmentPeriod": "Employment Period", "present": "Present",
    "period": "Period", "openProjectLink": "Open Project Link",
    "socialLinks": "Social Links", "currentEmployer": "Current Employer",
    "testimonials": "Testimonials", "restartAnimation": "Restart animation",
    "home": "Home", "rss": "RSS",
    "dmca": "DMCA.com Protection Status"
  },
  "blog": {
    "title": "Blog",
    "description": "A collection of articles on development, design, and ideas.",
    "previous": "Previous", "next": "Next",
    "readTranslation": "Read in {language}"
  },
  "languageSwitcher": {
    "label": "Language", "en": "English", "vi": "Tiếng Việt"
  },
  "notFound": {
    "title": "Page not found",
    "description": "The page you are looking for does not exist.",
    "backHome": "Back to home"
  }
}
```

(Adjust `notFound`/blog keys to match the actual current copy in
`not-found.tsx` and `blog/not-found.tsx` when you read them.)

### 3.2 Author `src/messages/vi.json`

Same shape. Author real Vietnamese for all chrome (these are short, safe to
translate): e.g. `nav.portfolio` → `"Hồ sơ"` (or keep `"Portfolio"` if you
prefer the loanword — confirm with the user), `panels.about` → `"Giới thiệu"`,
`panels.experience` → `"Kinh nghiệm"`, `panels.projects` → `"Dự án"`,
`panels.awards` → `"Giải thưởng"`, `panels.certifications` → `"Chứng chỉ"`,
`commandMenu.placeholder` → `"Nhập lệnh hoặc tìm kiếm..."`,
`commandMenu.empty` → `"Không tìm thấy kết quả."`, etc. For any term you are
unsure about, seed English + a `TODO(i18n)` note in the PR description (JSON has
no comments — track pending items in the PR, not the file).

### 3.3 Wire components to messages

- **Server components** (`getTranslations`):
  - `site-footer.tsx` — `footer` namespace; render `builtBy` with
    `t.rich("builtBy", { github: (c) => <a ...>{c}</a> })`.
  - Panel titles in `features/profile/components/*` — `panels` namespace.
    Prefer passing the resolved title as a prop or calling `getTranslations`
    where each panel renders (these are server components).
  - `sr-only` labels across profile components — `a11y` namespace.
  - `blog/page.tsx` metadata + heading — `blog` namespace (use
    `getTranslations` inside `generateMetadata`).
- **Client components** (`useTranslations`):
  - `command-menu.tsx` — replace every literal with `commandMenu` keys;
    the `MENU_LINKS`/`PORTFOLIO_LINKS` arrays move their `title` to lookups by
    key, resolved at render with `t(...)`.
  - `mobile-nav.tsx`, `desktop-nav.tsx`/`nav.tsx` — `nav` namespace.
- **Config** `MAIN_NAV`: keep `href`, drop hardcoded `title`; store a message
  key (e.g. `titleKey: "nav.portfolio"`) and resolve at the render site, or
  build the nav array inside the component from message keys. Prefer the latter
  (YAGNI: one consumer).

**Gate 3:** `/en` shows English chrome; `/vi` shows Vietnamese chrome. Command
menu, footer, nav, panel titles, and `sr-only` labels all switch.
`pnpm check-types` + `pnpm lint` clean.

---

## Phase 4 — `Localized<T>` vertical slice: `faq.ts`

Goal: prove the data-localization pattern end-to-end (render + JSON-LD) on one
file before touching the rest.

### 4.1 Convert `src/features/profile/data/faq.ts`

```ts
import type { Localized } from "@/i18n/localized";
import { USER } from "./user";

export type FaqItem = {
  question: Localized<string>;
  answer: Localized<string>;
};

const currentCompany = USER.jobs[0]?.company ?? "VML";

export const FAQ: FaqItem[] = [
  {
    question: {
      en: `Who is ${USER.displayName}?`,
      vi: `${USER.displayName} là ai?`,
    },
    answer: {
      en: `... existing English ...`,
      vi: `... Vietnamese, or English + TODO(i18n) ...`,
    },
  },
  // ...6 items
];
```

Note `USER.displayName` etc. may themselves become localized in Phase 5; keep
the template working by resolving `USER` fields for the matching locale once
Phase 5 lands (revisit interpolation then).

### 4.2 Update the render site `faq.tsx`

```tsx
import { getLocale, getTranslations } from "next-intl/server";
import { resolveLocalized } from "@/i18n/localized";

export async function FAQ() {
  const locale = await getLocale();
  const t = await getTranslations("panels");
  return (
    <Panel id="faq">
      <PanelHeader><PanelTitle>{t("faq")}</PanelTitle></PanelHeader>
      <PanelContent>
        <dl>
          {FAQ_ITEMS.map((item) => {
            const q = resolveLocalized(item.question, locale);
            const a = resolveLocalized(item.answer, locale);
            return (/* dt=q, dd=a */);
          })}
        </dl>
      </PanelContent>
    </Panel>
  );
}
```

### 4.3 Update the schema site `getFaqJsonLd()` in `(root)/page.tsx`

Resolve the same `FAQ` array against the active locale so the emitted FAQPage
matches the rendered text exactly.

**Gate 4:** On `/en` and `/vi`, the visible FAQ text and the FAQPage JSON-LD
(inspect `<script type="application/ld+json">`) match, in the right language.
`pnpm build` clean.

---

## Phase 5 — Migrate remaining prose data + consumers

Apply the proven `Localized<T>` shape file by file. After each file, run
`pnpm check-types` (it pinpoints unconverted consumers).

### 5.1 `user.ts`

Localize `bio`, `about` (markdown), `flipSentences` (`Localized<string[]>`),
`jobTitle`, and `jobs[].title`. Keep plain: `firstName`, `lastName`,
`displayName`, `username`, `gender`, `pronouns`, `timeZone`, `address`
(consider localizing the display of address, but keep the value plain and
translate at render if needed), encoded `email`/`phoneNumber`, `website`,
`avatar`, `ogImage`, `keywords`, `dateCreated`, company names/URLs.

Consumers to update:
- `config/site.ts` (`SITE_INFO.description = USER.bio` → resolve per locale at
  use site; `SITE_INFO` is used in metadata builders — resolve there).
- root/`[locale]` layout metadata (`description`, OG), `(root)/page.tsx`
  ProfilePage JSON-LD (`description`, `jobTitle`).
- `about.tsx` (renders `USER.about` markdown), profile header/overview
  components that read `bio`/`jobTitle`/`flipSentences`.

### 5.2 `experiences.ts`

Localize position `title`, `employmentType`, `description` (markdown). Keep
plain: `id`, `companyName`, `companyLogo`, dates, `icon`, `skills[]` (skill
tokens stay as-is unless the user wants them translated — default: keep).
Consumers: `experiences/*` components resolve with `getLocale()`.

### 5.3 `projects.ts`, `awards.ts`, `certifications.ts`

Read each file, localize human-readable titles/descriptions/labels, keep
language-neutral fields plain. Update the matching `*/index.tsx` and
`*-item.tsx` consumers to resolve with the active locale.

### 5.4 Re-check FAQ interpolation

Now that `USER.jobTitle`/`displayName` handling is settled, ensure `faq.ts`
interpolates the correct locale's `USER` values (resolve `USER` fields for the
same locale when building the answer, or precompute per-locale).

**Gate 5:** `pnpm check-types` clean (no unconverted consumer). `/en` and `/vi`
render all profile sections in the correct language. `pnpm build` clean.

---

## Phase 6 — Locale-aware SEO

### 6.1 JSON-LD `inLanguage`

- `getWebSiteJsonLd()` (now in `[locale]` layout): `inLanguage: locale`.
- ProfilePage JSON-LD in `(root)/page.tsx`: `inLanguage: locale`; `description`
  and `jobTitle` resolve from localized `USER`. Preserve `alternateName`,
  `knowsLanguage`, `sameAs`.
- FAQPage: already locale-correct from Phase 4.

### 6.2 `generateMetadata` with hreflang + canonical

Add/adjust `generateMetadata({ params })` on `[locale]/(root)/page.tsx`,
`blog/page.tsx`, `blog/[slug]/page.tsx`, `internal-project/page.tsx`:

```ts
import { getPathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

// inside generateMetadata:
const languages = Object.fromEntries(
  routing.locales.map((l) => [l, getPathname({ locale: l, href: /* this route */ })])
);
return {
  alternates: {
    canonical: getPathname({ locale, href: /* this route */ }),
    languages: { ...languages, "x-default": languages.en },
  },
  // ...title/description resolved per locale...
};
```

Keep `metadataBase`, OG, Twitter, icons from the current config; only add the
locale/alternates layer. For blog `[slug]`, `href` includes the slug.

### 6.3 `sitemap.ts`

For each localizable page, emit both `/en/...` and `/vi/...` URLs, each with an
`alternates.languages` map. Machine routes stay single entries. Reference the
existing `routes` array and expand it across `routing.locales`.

**Gate 6:** Built `<html lang>` is `en`/`vi` correctly; each localized page's
`<head>` has `hreflang` alternates + `x-default` + a locale canonical; sitemap
lists both-locale URLs. `pnpm build` clean.

---

## Phase 7 — Blog locale pairing

### 7.1 Extend types — `src/features/blog/types/post.ts`

```ts
export type PostMetadata = {
  // ...existing...
  locale: "en" | "vi";
  translationKey?: string;
};
```

### 7.2 Frontmatter edits

- `integrating-agentic-rag-and-llm-into-educational-ecommerce.mdx`:
  add `locale: "en"`, `translationKey: "vnx-academy-agentic-rag"`.
- `tich-hop-agentic-rag-llm-vao-ecommerce-giao-duc.mdx`:
  add `locale: "vi"`, `translationKey: "vnx-academy-agentic-rag"`.
- `ai-ecommerce-case-study.mdx`: add `locale: "en"` (no `translationKey`).

### 7.3 `posts.ts`

- `normalizeMetadata`: default `locale` to `"en"` when absent (don't throw).
- `getAllPosts(locale?: Locale)`: when `locale` provided, filter
  `post.metadata.locale === locale`; keep sort logic.
- Add:
  ```ts
  export function getTranslation(post: Post, target: Locale) {
    if (!post.metadata.translationKey) return undefined;
    return getMDXData(dir).find(
      (p) =>
        p.metadata.translationKey === post.metadata.translationKey &&
        p.metadata.locale === target
    );
  }
  ```
- `getPostBySlug` unchanged (slug remains globally unique).

### 7.4 Consumers

- `blog/page.tsx`: `getAllPosts(locale)` (locale from params).
- `blog/[slug]/page.tsx`: render the post; compute the other-locale translation
  via `getTranslation` and pass to the header for a switch link; localize
  prev/next neighbour labels.
- `command-menu.tsx`: filter blog links by active locale (pass filtered posts
  in from the server `site-header.tsx`, which already calls `getAllPosts()` —
  change to `getAllPosts(locale)`).
- `site-header.tsx`: read locale (`getLocale()`), pass locale-filtered posts to
  `CommandMenu`.

**Gate 7:** `/en/blog` lists only EN posts; `/vi/blog` lists only VI posts; the
paired post shows a working "Read in Tiếng Việt / English" link; command menu
blog list matches the active locale. `pnpm build` clean.

---

## Phase 8 — Language switcher

### 8.1 `src/components/language-switcher.tsx` (client)

```tsx
"use client";

import { useLocale, useTranslations } from "next-intl";

import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

export function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations("languageSwitcher");

  function switchTo(next: string) {
    const hash = typeof window !== "undefined" ? window.location.hash : "";
    router.replace(`${pathname}${hash}`, { locale: next });
  }
  // render a toggle / dropdown using t("en"), t("vi"); highlight `locale`
}
```

- Preserve the `#hash` (section anchors like `/#about`).
- Blog-post special case: if on `/[locale]/blog/[slug]` and a `translationKey`
  counterpart exists, navigate to the counterpart slug rather than the same slug
  under the other locale. Pass the counterpart slug in as a prop from the server
  post page (the switcher is client-side and cannot read MDX). If no counterpart,
  fall back to `/[locale]/blog`.

### 8.2 Mount in `site-header.tsx`

Place `<LanguageSwitcher />` next to `<ToggleTheme />`.

**Gate 8:** Switching locale keeps the current path + hash; on a paired blog
post it lands on the translated article. `pnpm check-types` + `pnpm lint` clean.

---

## Phase 9 — Localize not-found pages

- Read `src/app/not-found.tsx` and `src/app/[locale]/(docs)/blog/not-found.tsx`;
  replace hardcoded copy with `getTranslations("notFound")` keys.
- The global `src/app/not-found.tsx` renders outside a locale segment; it cannot
  use request-locale messages reliably. Render it in the default locale (`en`)
  copy, or provide a minimal static bilingual message. Record the choice.

**Gate 9:** Blog 404 under `/vi/blog/does-not-exist` renders Vietnamese;
localized 404 copy is correct. `pnpm build` clean.

---

## Phase 10 — Full verification and cleanup

1. `pnpm check-types` — clean.
2. `pnpm lint` — clean.
3. `pnpm format:check` — clean (run `pnpm format:write` if needed).
4. `pnpm build` — clean.
5. Manual smoke:
   - `/en` and `/vi` homepage: chrome + all profile sections in the right
     language; FAQ text matches JSON-LD.
   - Language switcher preserves path + hash; blog pairing works.
   - `curl -I` legacy `/`, `/blog`, `/blog/:slug`, `/internal-project` → 301 to
     `/en/*`.
   - `curl` `/rss`, `/llms.txt`, `/sitemap.xml`, `/vcard`,
     `/manifest.webmanifest` → 200, no locale redirect.
   - View source: one `<html>`, correct `lang`, hreflang + x-default present.
6. Grep for stragglers: search `src/app/[locale]` and `src/features` /
   `src/components` for remaining bare English literals in JSX text nodes and
   `sr-only` spans; convert any missed ones.
7. Update the spec's Progress checkboxes and Decisions (html split, nav term
   choices), then move both the spec and this plan to `docs/plans/completed/`
   per the lifecycle in `docs/plans/README.md`.

**Gate 10:** All checks green; smoke passes; no stray literals; docs moved.

---

## Suggested commit sequence

1. `feat(i18n): add next-intl core config and helpers` (Phase 1)
2. `feat(i18n): locale routing skeleton, [locale] layout, redirects` (Phase 2)
3. `feat(i18n): message catalogs and localized UI chrome` (Phase 3)
4. `feat(i18n): localize FAQ data (render + schema)` (Phase 4)
5. `feat(i18n): localize remaining profile prose data` (Phase 5)
6. `feat(i18n): locale-aware SEO (jsonld, hreflang, sitemap)` (Phase 6)
7. `feat(i18n): blog locale pairing and filtering` (Phase 7)
8. `feat(i18n): language switcher` (Phase 8)
9. `feat(i18n): localize not-found pages` (Phase 9)
10. `chore(i18n): final verification and docs` (Phase 10)

## Open items to confirm with the user during implementation

- Whether to translate nav loanwords (`Portfolio`) or keep them.
- Whether skill tokens in `experiences.ts`/`projects.ts` should be translated
  (default: keep as-is).
- Global `not-found.tsx` language strategy (default-locale copy vs. bilingual).
