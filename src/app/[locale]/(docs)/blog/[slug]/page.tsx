import dayjs from "dayjs";
import { getTableOfContents } from "fumadocs-core/content/toc";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { BlogPosting as PageSchema, WithContext } from "schema-dts";

import { InlineTOC } from "@/components/inline-toc";
import { MDX } from "@/components/mdx";
import { Button } from "@/components/ui/button";
import { Prose } from "@/components/ui/typography";
import { SITE_INFO } from "@/config/site";
import { PostKeyboardShortcuts } from "@/features/blog/components/post-keyboard-shortcuts";
import { LLMCopyButtonWithViewOptions } from "@/features/blog/components/post-page-actions";
import { PostShareMenu } from "@/features/blog/components/post-share-menu";
import {
  findNeighbour,
  getAllPosts,
  getPostBySlug,
  getTranslation,
} from "@/features/blog/data/posts";
import type { Post } from "@/features/blog/types/post";
import { USER } from "@/features/profile/data/user";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    locale: post.metadata.locale,
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return notFound();
  }

  const { title, description, image, createdAt, updatedAt, tags } =
    post.metadata;
  const postUrl = `/${locale}${getPostUrl(post)}`;
  const ogImage = getAbsoluteUrl(
    image || `/og/simple?title=${encodeURIComponent(title)}`
  );

  return {
    title,
    description,
    keywords: tags,
    alternates: {
      canonical: postUrl,
    },
    openGraph: {
      url: postUrl,
      type: "article",
      publishedTime: dayjs(createdAt).toISOString(),
      modifiedTime: dayjs(updatedAt).toISOString(),
      images: {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: title,
      },
    },
    twitter: {
      card: "summary_large_image",
      images: [ogImage],
    },
  };
}

function getPageJsonLd(post: Post): WithContext<PageSchema> {
  const postUrl = getPostAbsoluteUrl(post);
  const image = getPostImageAbsoluteUrl(post);

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.metadata.title,
    description: post.metadata.description,
    image,
    url: postUrl,
    mainEntityOfPage: postUrl,
    datePublished: dayjs(post.metadata.createdAt).toISOString(),
    dateModified: dayjs(post.metadata.updatedAt).toISOString(),
    articleSection: post.metadata.category,
    keywords: post.metadata.tags,
    author: {
      "@type": "Person",
      name: USER.displayName,
      identifier: USER.username,
      url: SITE_INFO.url,
      image: getAbsoluteUrl(USER.avatar),
    },
    publisher: {
      "@type": "Organization",
      name: SITE_INFO.name,
      url: SITE_INFO.url,
      logo: getAbsoluteUrl(USER.avatar),
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}) {
  const { locale, slug } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const toc = getTableOfContents(post.content);

  const allPosts = getAllPosts(post.metadata.locale);
  const { previous, next } = findNeighbour(allPosts, slug);
  const t = await getTranslations("blog");

  const otherLocale = post.metadata.locale === "en" ? "vi" : "en";
  const translation = getTranslation(post, otherLocale);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getPageJsonLd(post)).replace(/</g, "\\u003c"),
        }}
      />

      <PostKeyboardShortcuts basePath="/blog" previous={previous} next={next} />

      <div className="flex items-center justify-between p-2 pl-4">
        <Button
          className="h-7 gap-2 rounded-lg px-0 font-mono text-muted-foreground"
          variant="link"
          asChild
        >
          <Link href="/blog">
            <ArrowLeftIcon />
            {t("title")}
          </Link>
        </Button>

        <div className="flex items-center gap-2">
          <LLMCopyButtonWithViewOptions
            markdownUrl={`${getPostUrl(post)}.mdx`}
            isComponent={post.metadata.category === "components"}
          />

          <PostShareMenu url={getPostUrl(post)} />

          {previous && (
            <Button variant="secondary" size="icon-sm" asChild>
              <Link href={`/blog/${previous.slug}`}>
                <ArrowLeftIcon />
                <span className="sr-only">{t("previous")}</span>
              </Link>
            </Button>
          )}

          {next && (
            <Button variant="secondary" size="icon-sm" asChild>
              <Link href={`/blog/${next.slug}`}>
                <span className="sr-only">{t("next")}</span>
                <ArrowRightIcon />
              </Link>
            </Button>
          )}
        </div>
      </div>

      <div className="screen-line-before screen-line-after">
        <div
          className={cn(
            "h-8",
            "before:absolute before:-left-[100vw] before:-z-1 before:h-full before:w-[200vw]",
            "before:bg-[repeating-linear-gradient(315deg,var(--pattern-foreground)_0,var(--pattern-foreground)_1px,transparent_0,transparent_50%)] before:bg-size-[10px_10px] before:[--pattern-foreground:var(--color-edge)]/56"
          )}
        />
      </div>

      <Prose className="px-4" font={post.metadata.font}>
        <h1 className="screen-line-after mb-6 font-semibold">
          {post.metadata.title}
        </h1>

        <p className="lead mt-6 mb-6">{post.metadata.description}</p>

        {translation && (
          <p className="mt-6 mb-6 text-sm">
            <Link
              className="text-muted-foreground underline hover:text-foreground"
              href={`/blog/${translation.slug}`}
              locale={otherLocale}
            >
              {t("readTranslation", {
                language: otherLocale === "vi" ? "Tiếng Việt" : "English",
              })}
            </Link>
          </p>
        )}

        <InlineTOC items={toc} />

        <div>
          <MDX code={post.content} />
        </div>
      </Prose>

      <div className="screen-line-before h-4 w-full" />
    </>
  );
}

function getPostUrl(post: Post) {
  return `/blog/${post.slug}`;
}

function getPostAbsoluteUrl(post: Post) {
  return `${SITE_INFO.url}${getPostUrl(post)}`;
}

function getAbsoluteUrl(url: string) {
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }

  return `${SITE_INFO.url}${url.startsWith("/") ? url : `/${url}`}`;
}

function getPostImageAbsoluteUrl(post: Post) {
  const image =
    post.metadata.image ||
    `/og/simple?title=${encodeURIComponent(post.metadata.title)}`;

  return getAbsoluteUrl(image);
}
