# Implementation Plan: Remove Graduation / Invitation Feature

Date: 2026-09-01
Companion spec: `docs/plans/active/2026-09-01-graduation-feature-removal.md`

## Purpose

Agent-executable, step-by-step instructions to fully implement the removal spec.
Every deletion, edit, command, and verification is spelled out with exact paths,
exact string matches, and expected results. Execute the steps in order. Do not
skip verification gates.

## Preconditions

1. Working directory: `/Users/nhkhoa/Desktop/ALL/codes/My-Portfolio`.
2. Git status is clean (or only this plan is uncommitted). Confirm with
   `git status --short`.
3. Create a feature branch before any change:

   ```bash
   git checkout -b chore/remove-graduation-feature
   ```

4. Package manager is `pnpm` (repo uses `pnpm-lock.yaml`).

## Ground rules for the agent

- Only touch Group A (the event/invitation feature). Never edit Group B
  biographical content: `src/features/profile/data/faq.ts`,
  `src/features/profile/data/projects.ts`,
  `src/features/profile/components/experiences/experience-position-icon.tsx`,
  `src/features/blog/content/integrating-agentic-rag-and-llm-into-educational-ecommerce.mdx`.
- Do NOT remove shared utilities: `src/hooks/use-sound.ts`,
  `src/components/khoa-mark.tsx`, `dayjs`, `sonner`. They have non-graduation
  callers.
- Prefer the file/deletion tools. Use `git rm` for tracked deletions so the
  removal is staged consistently.
- After each editing step, do not re-read the file to confirm — the edit tool
  errors if the match fails.

## Step 1 — Delete the feature directory

Remove the entire graduation feature tree (10 components, 1 hook, 1 data file):

```bash
git rm -r src/features/graduation
```

Expected: 12 files staged for deletion. If any path is untracked, fall back to
`rm -rf src/features/graduation`.

## Step 2 — Delete the `/invitation` route

```bash
git rm -r "src/app/(app)/invitation"
```

Expected: `src/app/(app)/invitation/page.tsx` removed.

## Step 3 — Edit the homepage

File: `src/app/(app)/(root)/page.tsx`

### 3a. Remove the import (currently line 9)

Exact old string:

```
import { GraduationHero } from "@/features/graduation/components/graduation-hero";
```

Delete this line entirely (including its trailing newline). The surrounding
imports (`SITE_INFO` above, `About` below) remain.

### 3b. Remove the render block (currently lines 48-49)

Exact old string (note the leading indentation is 8 spaces):

```tsx
        <GraduationHero />
        <Separator />

        <ProfileCover />
```

Replace with:

```tsx
        <ProfileCover />
```

Result: `<ProfileCover />` becomes the first child inside
`<div className="mx-auto md:max-w-3xl">`. Do not touch the `Separator` helper
definition at the bottom of the file — it is still used by every other section.

## Step 4 — Edit the nav config

File: `src/config/site.ts`

Remove the `Invitation` entry from `MAIN_NAV`. Exact old string:

```ts
  {
    title: "Blog",
    href: "/blog",
  },
  {
    title: "Invitation",
    href: "/invitation",
  },
  // {
```

Replace with:

```ts
  {
    title: "Blog",
    href: "/blog",
  },
  // {
```

This leaves `Portfolio` and `Blog` as the active entries and preserves the
commented-out `Components` entry that follows.

## Step 5 — Edit the sitemap

File: `src/app/sitemap.ts`

Remove `/invitation` from the `routes` array. Exact old string:

```ts
  const routes = ["", "/blog", "/invitation", "/internal-project"].map(
```

Replace with:

```ts
  const routes = ["", "/blog", "/internal-project"].map(
```

## Step 6 — Delete public assets

```bash
git rm -r public/graduation
git rm -r public/audio/graduation
git rm -r public/images/graduation
git rm public/images/me-graduate.png
```

Notes:

- `public/graduation/frames/` holds ~120 `frame-*.webp` files.
- `public/audio/graduation/` is an empty directory (the referenced `cheer.wav`
  and `whoosh.wav` were never committed). If `git rm` reports it as unknown
  because it is empty/untracked, remove it with `rm -rf public/audio/graduation`.
- Do NOT delete `public/audio/ui-sounds/` (`click.wav`, `unlock.wav`) — used by
  the command menu, theme toggle, and slide-to-unlock demo.
- Do NOT delete anything else under `public/images/`.

## Step 7 — Delete build scripts

```bash
git rm scripts/extract-frames.sh scripts/optimize-graduation-photo.mts
```

These are graduation-only (frame extraction + photo optimization). Verify no
`package.json` script references them (Step 9 confirms the grep is clean).

## Step 8 — Remove the `gsap` dependency

File: `package.json`

The only importer was `scroll-sequence.tsx` (now deleted). Remove the `gsap`
line from `dependencies`. Exact old string (verify the exact version pin before
editing; it was `"gsap": "^3.15.0",`):

```json
    "gsap": "^3.15.0",
```

Delete that line. Then refresh the lockfile:

```bash
pnpm install
```

Expected: `gsap` removed from `pnpm-lock.yaml`; no other dependency changes.

## Step 9 — Verification gates

Run these in order. All must pass before committing.

### 9a. No Group A references remain

```bash
grep -rniE 'features/graduation|/invitation|GraduationHero|GRADUATION_EVENT|ScrollSequence|InvitationLetter|InvitationExperience' src
```

Expected: **no matches**.

### 9b. Only Group B graduation mentions survive

```bash
grep -rniE 'graduation' src
```

Expected matches ONLY in: `src/features/profile/data/faq.ts`,
`src/features/profile/data/projects.ts`,
`src/features/profile/components/experiences/experience-position-icon.tsx`,
`src/features/blog/content/integrating-agentic-rag-and-llm-into-educational-ecommerce.mdx`.
If any other file matches, stop and investigate.

### 9c. No gsap references remain

```bash
grep -rn 'gsap' src package.json
```

Expected: **no matches**.

### 9d. Type + build

```bash
pnpm build
```

Expected: successful build, no "module not found" or unused-import errors.

### 9e. Lint

```bash
pnpm lint
```

Expected: clean.

### 9f. Runtime smoke check (optional but recommended)

Start the dev server and confirm with the browser tools:

- Homepage `/` renders with `ProfileCover` as the first section (no hero panel,
  no countdown).
- Header nav shows only `Portfolio` and `Blog` (no `Invitation`).
- Navigating to `/invitation` renders the 404 / not-found page.

## Step 10 — Commit

```bash
git add -A
git commit -m "chore(graduation): remove graduation invitation feature

Remove the time-bound Van Lang graduation moment now that the ceremony has
passed: the homepage GraduationHero, the /invitation route and experience, the
shared graduation feature module, media assets, build scripts, and the now-unused
gsap dependency. Biographical education content (FAQ, capstone project, thesis
blog, role icon) is retained.

Co-Authored-By: Claude <noreply@anthropic.com>"
```

Do not push or open a PR unless the user asks.

## Rollback

The entire change is one commit on `chore/remove-graduation-feature`. To undo:

```bash
git revert <commit-sha>
# or, before commit:
git checkout -- . && git clean -fd
```

## File-change manifest (summary)

Deleted:

- `src/features/graduation/` (12 files)
- `src/app/(app)/invitation/page.tsx`
- `public/graduation/` (~120 frames)
- `public/audio/graduation/` (empty dir)
- `public/images/graduation/` (3 webp)
- `public/images/me-graduate.png`
- `scripts/extract-frames.sh`
- `scripts/optimize-graduation-photo.mts`

Edited:

- `src/app/(app)/(root)/page.tsx` (remove import + render block)
- `src/config/site.ts` (remove nav entry)
- `src/app/sitemap.ts` (remove route)
- `package.json` (remove `gsap`)
- `pnpm-lock.yaml` (regenerated by `pnpm install`)

Untouched (Group B / shared — must remain):

- `src/features/profile/data/faq.ts`
- `src/features/profile/data/projects.ts`
- `src/features/profile/components/experiences/experience-position-icon.tsx`
- `src/features/blog/content/integrating-agentic-rag-and-llm-into-educational-ecommerce.mdx`
- `src/hooks/use-sound.ts`, `src/components/khoa-mark.tsx`
- `public/audio/ui-sounds/`
