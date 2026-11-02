import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { SITE_INFO } from "@/config/site";
import { AutoPlayVideo } from "@/features/ai/components/autoplay-video";
import { ImageGallery } from "@/features/ai/components/image-gallery";
import { Typewriter } from "@/features/ai/components/typewriter";
import {
  AI_VIDEOS,
  DONT_LEAVE_ME_ALONE_IMAGES,
  DONT_LEAVE_ME_ALONE_YOUTUBE_ID,
  SPOTIFY_CONCERTS_IMAGES,
  SPOTIFY_WERO_IMAGES,
} from "@/features/ai/data";
import {
  Panel,
  PanelContent,
  PanelHeader,
  PanelTitle,
} from "@/features/profile/components/panel";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({
    locale: locale as (typeof routing.locales)[number],
    namespace: "ai",
  });
  const title = t("title");
  const description = t("description");
  const languages = Object.fromEntries(
    routing.locales.map((l) => [l, `/${l}/ai`])
  );

  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}/ai`,
      languages: { ...languages, "x-default": `/${routing.defaultLocale}/ai` },
    },
    openGraph: {
      title,
      description,
      url: `/${locale}/ai`,
      type: "website",
      images: [
        {
          url: SITE_INFO.ogImage,
          width: 1200,
          height: 630,
          alt: SITE_INFO.name,
        },
      ],
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
  const t = await getTranslations("ai");
  const tBlog = await getTranslations("blog");

  return (
    <>
      <div className="screen-line-after px-4">
        <h1 className="text-3xl font-semibold">{t("title")}</h1>
      </div>

      <div className="screen-line-after p-4">
        <Typewriter
          text={t("about")}
          className="text-xl leading-snug font-medium text-balance"
        />
      </div>

      <Panel className="border-x-0">
        <AutoPlayVideo
          src={AI_VIDEOS.concerts.src}
          poster={AI_VIDEOS.concerts.poster}
        />
      </Panel>

      <Panel className="border-x-0">
        <PanelHeader>
          <PanelTitle>{t("spotifyConcerts")}</PanelTitle>
        </PanelHeader>
        <PanelContent>
          <ImageGallery images={SPOTIFY_CONCERTS_IMAGES} />
        </PanelContent>
      </Panel>

      <Panel className="border-x-0">
        <PanelHeader>
          <PanelTitle>{t("spotifyWero")}</PanelTitle>
        </PanelHeader>
        <AutoPlayVideo
          src={AI_VIDEOS.hotels.src}
          poster={AI_VIDEOS.hotels.poster}
        />
        <PanelContent>
          <ImageGallery images={SPOTIFY_WERO_IMAGES} />
        </PanelContent>
      </Panel>

      <Panel className="border-x-0">
        <PanelHeader>
          <PanelTitle>{t("dontLeaveMeAlone")}</PanelTitle>
        </PanelHeader>
        <iframe
          src={`https://www.youtube.com/embed/${DONT_LEAVE_ME_ALONE_YOUTUBE_ID}`}
          title="DON'T LEAVE ME ALONE | AI Horror Short Film (Halloween) | Seedance 2.5"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          loading="lazy"
          className="aspect-video w-full bg-black"
        />
        <PanelContent>
          <ImageGallery images={DONT_LEAVE_ME_ALONE_IMAGES} />
        </PanelContent>
      </Panel>

      <div className="flex justify-center py-4">
        <Link
          href="/"
          className="text-sm text-muted-foreground underline hover:text-foreground"
        >
          {tBlog("backToPortfolio")}
        </Link>
      </div>
    </>
  );
}
