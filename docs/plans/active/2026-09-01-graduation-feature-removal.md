# Execution Plan: Remove Graduation / Invitation Feature

Date: 2026-09-01

## Status

Active

## Outcome

The time-bound graduation moment is fully removed from the site. The homepage no
longer shows the `GraduationHero`, the `/invitation` page and its route are gone,
and no graduation-only assets, scripts, or dependencies remain in the repo. The
site builds and lints clean with no orphaned imports or dead links.

Biographical facts about the user's education (FAQ answers, the VnX Academy
capstone project, the thesis blog post, the education role icon) are **retained** —
this plan removes the *event/invitation feature*, not the user's academic history.

## Context

The graduation feature was a time-bound moment built for the Van Lang University
ceremony on **10:00, Thursday 6 August 2026** (see the original build in
`docs/superpowers/specs/2026-08-01-graduation-update-design.md`). The ceremony has
passed; the feature is now stale and should be retired.

Two user-facing surfaces are being removed:

1. The homepage **`GraduationHero`** panel (countdown + photo + link to invite).
2. The **`/invitation`** page — entry door → scroll-scrubbed frame sequence →
   bilingual invitation letter → event details → calendar/maps/share actions.

### Scope classification

An audit of every `graduation`/`invitation` reference in the repo splits the
matches into two groups:

- **Group A — the event/invitation feature (REMOVE):** everything under
  `src/features/graduation/`, the `/invitation` route, the homepage hero, the
  nav entry, the sitemap route, graduation media assets, the frame/photo build
  scripts, and the `gsap` dependency.
- **Group B — biographical education content (KEEP):** the FAQ answers that
  mention graduating from Van Lang University, the "Graduation capstone" project
  in `projects.ts`, the thesis blog post, and the `GraduationCapIcon` used by the
  education role icon. These are legitimate profile/career content, not part of
  the retired feature.

This plan covers **Group A only**.

## Scope

In scope:

- Delete the entire `src/features/graduation/` directory.
- Delete the `/invitation` route (`src/app/(app)/invitation/`).
- Remove `GraduationHero` from the homepage (`src/app/(app)/(root)/page.tsx`).
- Remove the `Invitation` entry from `MAIN_NAV` (`src/config/site.ts`).
- Remove `/invitation` from the sitemap (`src/app/sitemap.ts`).
- Delete graduation-only public assets (frames, audio, optimized photos, source
  PNG).
- Delete graduation-only build scripts.
- Remove the now-unused `gsap` dependency from `package.json`.

Out of scope:

- Any Group B biographical content (FAQ, projects, blog, role icon).
- Shared utilities that graduation happened to use but other features still need:
  `use-sound`, `KhoaMark`, `dayjs`, `sonner` — all retained (verified other
  callers exist).
- The historical superpowers docs
  (`docs/superpowers/{plans,specs}/2026-08-01-graduation-*`) — left as a build
  record. Deleting them is optional cleanup, not required by this plan.

## Approach

Smallest coherent sequence, deletions first, then reference cleanup, then verify.

### 1. Delete the feature directory

Remove the whole tree:

```
src/features/graduation/
├── components/
│   ├── entry-door.tsx
│   ├── graduation-countdown.tsx
│   ├── graduation-hero.tsx
│   ├── invitation-actions.tsx
│   ├── invitation-experience.tsx
│   ├── invitation-letter.tsx
│   ├── reduced-motion-fallback.tsx
│   ├── scroll-sequence.tsx
│   ├── sequence-overlay.tsx
│   └── sound-controller.tsx
├── data/
│   └── graduation.ts
└── hooks/
    └── use-frame-sequence.ts
```

### 2. Delete the route

Remove `src/app/(app)/invitation/` (contains `page.tsx`).

### 3. Fix homepage — `src/app/(app)/(root)/page.tsx`

- Remove the import:
  `import { GraduationHero } from "@/features/graduation/components/graduation-hero";`
  (line 9).
- Remove the render block and its trailing separator (lines 48-49):

  ```tsx
  <GraduationHero />
  <Separator />
  ```

  The next block (`<ProfileCover />`) becomes the first child of the container.

### 4. Fix nav — `src/config/site.ts`

Remove the `Invitation` object from `MAIN_NAV` (lines 26-29):

```ts
{
  title: "Invitation",
  href: "/invitation",
},
```

### 5. Fix sitemap — `src/app/sitemap.ts`

Drop `"/invitation"` from the `routes` array (line 13):

```ts
const routes = ["", "/blog", "/internal-project"].map(/* ... */);
```

### 6. Delete public assets

```
public/graduation/                 # 120 frame-*.webp files
public/audio/graduation/           # empty dir (cheer.wav / whoosh.wav never shipped)
public/images/graduation/          # me-graduate-640/960/1200.webp
public/images/me-graduate.png      # 14 MB source, only consumed by the optimizer script
```

### 7. Delete build scripts

```
scripts/extract-frames.sh
scripts/optimize-graduation-photo.mts
```

### 8. Remove dependency

Remove `gsap` from `package.json` dependencies — the only importer was
`scroll-sequence.tsx`. Re-run the package manager to update the lockfile.

## Risks And Recovery

- **Risk: orphaned imports after deletion.** Mitigation: `GRADUATION_EVENT`,
  `GraduationHero`, `ScrollSequence`, `InvitationLetter`, etc. have callers only
  within the graduation feature or the three integration points listed above
  (confirmed via codegraph blast-radius). After edits, `tsc`/build surfaces any
  missed reference.
- **Risk: dead link to `/invitation`.** Mitigation: the only links are the nav
  entry, the sitemap route, and the `GraduationHero` "See invitation" link — all
  removed by this plan.
- **Risk: removing a shared dependency.** Mitigation: `gsap` grep returns exactly
  one importer (`scroll-sequence.tsx`). `use-sound`, `KhoaMark`, `dayjs`, and
  `sonner` each have confirmed non-graduation callers and are NOT touched.
- **No test coverage exists** for any removed symbol, so no tests break — but this
  also means the build + a manual smoke check are the real safety net.
- **Recovery:** the change is a single commit on a branch; `git revert` restores
  the feature and assets wholesale if the retirement needs to be undone.

## Progress

- [ ] Delete `src/features/graduation/`.
- [ ] Delete `src/app/(app)/invitation/`.
- [ ] Edit `src/app/(app)/(root)/page.tsx` (import + render block).
- [ ] Edit `src/config/site.ts` (nav entry).
- [ ] Edit `src/app/sitemap.ts` (route entry).
- [ ] Delete graduation public assets (4 paths).
- [ ] Delete graduation build scripts (2 files).
- [ ] Remove `gsap` from `package.json` + refresh lockfile.
- [ ] Verify: build, lint, and manual smoke check.

## Decisions

- 2026-09-01: Keep Group B biographical education content (FAQ, capstone project,
  thesis blog, `GraduationCapIcon`). The request targets the invitation/event
  feature, not the user's academic history.
- 2026-09-01: Keep `use-sound`, `KhoaMark`, `dayjs`, `sonner` — each has callers
  outside the graduation feature. Only `gsap` (single graduation importer) is
  removed.
- 2026-09-01: Leave historical superpowers docs in place as a build record;
  deleting them is optional and out of scope.

## Validation

- Focused proof: `grep -rniE 'graduation|/invitation' src` returns only Group B
  matches (FAQ, projects, blog, role icon) — no feature/route/import references.
- Integration or end-to-end proof: `pnpm build` completes with no missing-module
  or unused-import errors; homepage renders starting at `ProfileCover`; navigating
  to `/invitation` returns the 404 page; nav no longer shows "Invitation".
- Repository-required checks: `pnpm lint` clean; sitemap output no longer lists
  `/invitation`.

## Result

Complete after implementation. Record the verified outcome, limitations, and
follow-up before moving the plan to `docs/plans/completed/`.
