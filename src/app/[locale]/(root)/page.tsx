import dayjs from "dayjs";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import type { ProfilePage as PageSchema, WithContext } from "schema-dts";

import { SITE_INFO } from "@/config/site";
import { About } from "@/features/profile/components/about";
import { Awards } from "@/features/profile/components/awards";
import { Blog } from "@/features/profile/components/blog";
import { Brand } from "@/features/profile/components/brand";
import { Certifications } from "@/features/profile/components/certifications";
import { Experiences } from "@/features/profile/components/experiences";
import { GitHubContributions } from "@/features/profile/components/github-contributions";
import { Overview } from "@/features/profile/components/overview";
import { ProfileCover } from "@/features/profile/components/profile-cover";
import { ProfileHeader } from "@/features/profile/components/profile-header";
import { Projects } from "@/features/profile/components/projects";
import { SocialLinks } from "@/features/profile/components/social-links";
import { TeckStack } from "@/features/profile/components/teck-stack";
import { TestimonialsMarquee } from "@/features/profile/components/testimonials-marquee";
import { SOCIAL_LINKS } from "@/features/profile/data/social-links";
import { USER } from "@/features/profile/data/user";
import { resolveLocalized } from "@/i18n/localized";
import { type Locale, routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const languages = Object.fromEntries(
    routing.locales.map((l) => [l, `/${l}`])
  );

  return {
    alternates: {
      canonical: `/${locale}`,
      languages: { ...languages, "x-default": `/${routing.defaultLocale}` },
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getPageJsonLd(locale)).replace(
            /</g,
            "\\u003c"
          ),
        }}
      />

      <div className="mx-auto md:max-w-3xl">
        <ProfileCover />
        <ProfileHeader />
        <Separator />

        <Overview />
        <Separator />

        <SocialLinks />
        <Separator />

        <About />
        <Separator />

        <GitHubContributions />
        <Separator />

        {/* <TestimonialsMarquee />
        <Separator /> */}

        <TeckStack />
        <Separator />

        <Blog />
        <Separator />

        <Experiences />
        <Separator />

        <Projects />
        <Separator />

        <Awards />
        <Separator />

        <Certifications />
        <Separator />

        <Brand />
        <Separator />
      </div>
    </>
  );
}

function getPageJsonLd(locale: Locale): WithContext<PageSchema> {
  const [currentJob] = USER.jobs;

  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    url: SITE_INFO.url,
    dateCreated: dayjs(USER.dateCreated).toISOString(),
    dateModified: dayjs().toISOString(),
    mainEntity: {
      "@type": "Person",
      name: USER.displayName,
      // Both orthographies must resolve to the same entity, so searches for
      // either spelling reach this profile.
      alternateName: ["Trương Nguyễn Anh Khoa", USER.username, "nhkhoa"],
      identifier: USER.username,
      url: SITE_INFO.url,
      image: `${SITE_INFO.url}${USER.avatar}`,
      description: resolveLocalized(USER.bio, locale),
      jobTitle: resolveLocalized(USER.jobTitle, locale),
      // sameAs is the identity claim that lets search and AI engines resolve
      // every external profile to this one person.
      sameAs: SOCIAL_LINKS.map((link) => link.href),
      ...(currentJob && {
        worksFor: {
          "@type": "Organization",
          name: currentJob.company,
          ...(currentJob.website && { url: currentJob.website }),
        },
      }),
      alumniOf: {
        "@type": "CollegeOrUniversity",
        name: "Van Lang University",
        url: "https://vlu.edu.vn/",
      },
      address: {
        "@type": "PostalAddress",
        addressLocality: "Ho Chi Minh City",
        addressCountry: "VN",
      },
      nationality: {
        "@type": "Country",
        name: "Vietnam",
      },
      knowsAbout: [
        "AI workflow automation",
        "Agentic RAG",
        "Large Language Models",
        "n8n",
        "LangChain",
        "Make.com",
        "TypeScript",
        "Next.js",
        "Prompt engineering",
      ],
      knowsLanguage: ["Vietnamese", "English"],
    },
  };
}

function Separator({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative flex h-8 w-full border-x border-edge",
        "before:absolute before:-left-[100vw] before:-z-1 before:h-8 before:w-[200vw]",
        "before:bg-[repeating-linear-gradient(315deg,var(--pattern-foreground)_0,var(--pattern-foreground)_1px,transparent_0,transparent_50%)] before:bg-size-[10px_10px] before:[--pattern-foreground:var(--color-edge)]/56",
        className
      )}
    />
  );
}
