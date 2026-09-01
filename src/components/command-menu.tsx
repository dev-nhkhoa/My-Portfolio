"use client";

import { useCommandState } from "cmdk";
import type { LucideProps } from "lucide-react";
import {
  BriefcaseBusinessIcon,
  CircleUserIcon,
  CornerDownLeftIcon,
  LetterTextIcon,
  MessageCircleMoreIcon,
  MoonStarIcon,
  RssIcon,
  SunIcon,
  TextIcon,
  TypeIcon,
} from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import type { Post } from "@/features/blog/types/post";
import { SOCIAL_LINKS } from "@/features/profile/data/social-links";
import { useSound } from "@/hooks/use-sound";
import { useRouter } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { copyText } from "@/utils/copy";

import { Icons } from "./icons";
import { getMarkSVG, KhoaMark } from "./khoa-mark";
import { getWordmarkSVG } from "./khoa-wordmark";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";

type CommandLinkItem = {
  title: string;
  href: string;

  icon?: React.ComponentType<LucideProps>;
  iconImage?: string;
  keywords?: string[];
  openInNewTab?: boolean;
};

/** Static shape keyed by a message key; the title is resolved at render. */
type CommandLinkDef = Omit<CommandLinkItem, "title"> & { titleKey: string };

const MENU_LINKS: CommandLinkDef[] = [
  {
    titleKey: "headings.portfolio",
    href: "/",
    iconImage: "/images/brand/ak-mark.png",
  },
  {
    titleKey: "headings.blog",
    href: "/blog",
    icon: RssIcon,
  },
];

const PORTFOLIO_LINKS: CommandLinkDef[] = [
  {
    titleKey: "items.about",
    href: "/#about",
    icon: LetterTextIcon,
  },
  {
    titleKey: "items.techStack",
    href: "/#stack",
    icon: Icons.ts,
  },
  {
    titleKey: "items.experience",
    href: "/#experience",
    icon: BriefcaseBusinessIcon,
  },
  {
    titleKey: "items.projects",
    href: "/#projects",
    icon: Icons.project,
  },
  {
    titleKey: "items.awards",
    href: "/#awards",
    icon: Icons.award,
  },
  {
    titleKey: "items.certifications",
    href: "/#certs",
    icon: Icons.certificate,
  },
  {
    titleKey: "items.testimonials",
    href: "/#testimonials",
    icon: MessageCircleMoreIcon,
  },
  {
    titleKey: "items.downloadVCard",
    href: "/vcard",
    icon: CircleUserIcon,
  },
];

const SOCIAL_LINK_ITEMS: CommandLinkItem[] = SOCIAL_LINKS.map((item) => ({
  title: item.title,
  href: item.href,
  iconImage: item.icon,
  openInNewTab: true,
}));

function resolveLinks(
  defs: CommandLinkDef[],
  t: (key: string) => string
): CommandLinkItem[] {
  return defs.map(({ titleKey, ...rest }) => ({ ...rest, title: t(titleKey) }));
}

export function CommandMenu({ posts }: { posts: Post[] }) {
  const router = useRouter();
  const t = useTranslations("commandMenu");

  const { setTheme, resolvedTheme } = useTheme();

  const [open, setOpen] = useState(false);

  const playClick = useSound("/audio/ui-sounds/click.wav");

  useEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController;

    document.addEventListener(
      "keydown",
      (e: KeyboardEvent) => {
        if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || e.key === "/") {
          if (
            (e.target instanceof HTMLElement && e.target.isContentEditable) ||
            e.target instanceof HTMLInputElement ||
            e.target instanceof HTMLTextAreaElement ||
            e.target instanceof HTMLSelectElement
          ) {
            return;
          }

          e.preventDefault();
          setOpen((open) => !open);
        }
      },
      { signal }
    );

    return () => abortController.abort();
  }, []);

  const handleOpenLink = useCallback(
    (href: string, openInNewTab = false) => {
      setOpen(false);

      if (openInNewTab) {
        window.open(href, "_blank", "noopener");
      } else {
        router.push(href);
      }
    },
    [router]
  );

  const handleCopyText = useCallback((text: string, message: string) => {
    setOpen(false);
    copyText(text);
    toast.success(message);
  }, []);

  const createThemeHandler = useCallback(
    (theme: "light" | "dark" | "system") => () => {
      setOpen(false);
      playClick();
      setTheme(theme);

      // if (!document.startViewTransition) {
      //   setTheme(theme);
      //   return;
      // }

      // document.startViewTransition(() => setTheme(theme));
    },
    [playClick, setTheme]
  );

  const { blogLinks, componentLinks } = useMemo(
    () => ({
      blogLinks: posts
        .filter((post) => post.metadata?.category !== "components")
        .map(postToCommandLinkItem),
      componentLinks: posts
        .filter((post) => post.metadata?.category === "components")
        .map(postToCommandLinkItem),
    }),
    [posts]
  );

  const hasComponents = componentLinks.length > 0;

  const tr = (key: string) => t(key as Parameters<typeof t>[0]);
  const menuLinks = resolveLinks(MENU_LINKS, tr);
  const portfolioLinks = resolveLinks(PORTFOLIO_LINKS, tr);
  const commandMetaMap = buildCommandMetaMap(tr);

  return (
    <>
      <Button
        variant="secondary"
        className="h-8 gap-1.5 rounded-full border bg-zinc-50 px-3.5 text-muted-foreground select-none hover:bg-zinc-50 dark:bg-zinc-900 dark:hover:bg-zinc-900"
        onClick={() => setOpen(true)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 16 16"
          aria-hidden
        >
          <path
            d="M10.278 11.514a5.824 5.824 0 1 1 1.235-1.235l3.209 3.208A.875.875 0 0 1 14.111 15a.875.875 0 0 1-.624-.278l-3.209-3.208Zm.623-4.69a4.077 4.077 0 1 1-8.154 0 4.077 4.077 0 0 1 8.154 0Z"
            fill="currentColor"
            fillRule="evenodd"
            clipRule="evenodd"
          />
        </svg>

        <span className="font-sans text-sm/4 font-medium sm:hidden">
          {t("search")}
        </span>

        <CommandMenuKbd className="hidden tracking-wider sm:in-[.os-macos_&]:flex">
          ⌘K
        </CommandMenuKbd>
        <CommandMenuKbd className="hidden sm:not-[.os-macos_&]:flex">
          Ctrl K
        </CommandMenuKbd>
      </Button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder={t("placeholder")} />

        <CommandList className="min-h-80 supports-timeline-scroll:scroll-fade-y">
          <CommandEmpty>{t("empty")}</CommandEmpty>

          <CommandLinkGroup
            heading={t("headings.menu")}
            links={menuLinks}
            onLinkSelect={handleOpenLink}
          />

          <CommandSeparator />

          <CommandLinkGroup
            heading={t("headings.portfolio")}
            links={portfolioLinks}
            onLinkSelect={handleOpenLink}
          />

          <CommandSeparator />

          <CommandLinkGroup
            heading={t("headings.blog")}
            links={blogLinks}
            fallbackIcon={TextIcon}
            onLinkSelect={handleOpenLink}
          />

          {hasComponents ? (
            <>
              <CommandSeparator />

              <CommandLinkGroup
                heading={t("headings.components")}
                links={componentLinks}
                fallbackIcon={Icons.react}
                onLinkSelect={handleOpenLink}
              />
            </>
          ) : null}

          <CommandSeparator />

          <CommandLinkGroup
            heading={t("headings.socialLinks")}
            links={SOCIAL_LINK_ITEMS}
            onLinkSelect={handleOpenLink}
          />

          <CommandSeparator />

          <CommandGroup heading={t("headings.brandAssets")}>
            <CommandItem
              onSelect={() => {
                handleCopyText(
                  getMarkSVG(resolvedTheme === "light" ? "#000" : "#fff"),
                  t("toast.copiedMark")
                );
              }}
            >
              <KhoaMark className="size-6" />
              {t("items.copyMark")}
            </CommandItem>

            <CommandItem
              onSelect={() => {
                handleCopyText(
                  getWordmarkSVG(resolvedTheme === "light" ? "#000" : "#fff"),
                  t("toast.copiedLogotype")
                );
              }}
            >
              <TypeIcon />
              {t("items.copyLogotype")}
            </CommandItem>
          </CommandGroup>

          <CommandSeparator />

          <CommandGroup heading={t("headings.theme")}>
            <CommandItem
              keywords={["theme"]}
              onSelect={createThemeHandler("light")}
            >
              <SunIcon />
              {t("items.light")}
            </CommandItem>
            <CommandItem
              keywords={["theme"]}
              onSelect={createThemeHandler("dark")}
            >
              <MoonStarIcon />
              {t("items.dark")}
            </CommandItem>
            <CommandItem
              keywords={["theme"]}
              onSelect={createThemeHandler("system")}
            >
              <Icons.contrast />
              {t("items.auto")}
            </CommandItem>
          </CommandGroup>
        </CommandList>

        <CommandMenuFooter
          metaMap={commandMetaMap}
          enterActionLabels={{
            command: t("actions.runCommand"),
            page: t("actions.goToPage"),
            link: t("actions.openLink"),
          }}
          exitLabel={t("actions.exit")}
        />
      </CommandDialog>
    </>
  );
}

function CommandLinkGroup({
  heading,
  links,
  fallbackIcon,
  onLinkSelect,
}: {
  heading: string;
  links: CommandLinkItem[];
  fallbackIcon?: React.ComponentType<LucideProps>;
  onLinkSelect: (href: string, openInNewTab?: boolean) => void;
}) {
  return (
    <CommandGroup heading={heading}>
      {links.map((link) => {
        const Icon = link?.icon ?? fallbackIcon ?? React.Fragment;

        return (
          <CommandItem
            key={link.href}
            keywords={link.keywords}
            onSelect={() => onLinkSelect(link.href, link.openInNewTab)}
          >
            {link?.iconImage ? (
              <Image
                className="rounded-sm"
                src={link.iconImage}
                alt={link.title}
                width={16}
                height={16}
                unoptimized
              />
            ) : (
              <Icon />
            )}
            {link.title}
          </CommandItem>
        );
      })}
    </CommandGroup>
  );
}

type CommandKind = "command" | "page" | "link";

type CommandMetaMap = Map<
  string,
  {
    commandKind: CommandKind;
  }
>;

function buildCommandMetaMap(t: (key: string) => string): CommandMetaMap {
  const commandMetaMap: CommandMetaMap = new Map();

  commandMetaMap.set(t("items.downloadVCard"), { commandKind: "command" });

  commandMetaMap.set(t("items.light"), { commandKind: "command" });
  commandMetaMap.set(t("items.dark"), { commandKind: "command" });
  commandMetaMap.set(t("items.auto"), { commandKind: "command" });

  commandMetaMap.set(t("items.copyMark"), { commandKind: "command" });
  commandMetaMap.set(t("items.copyLogotype"), { commandKind: "command" });

  SOCIAL_LINK_ITEMS.forEach((item) => {
    commandMetaMap.set(item.title, {
      commandKind: "link",
    });
  });

  return commandMetaMap;
}

function CommandMenuFooter({
  metaMap,
  enterActionLabels,
  exitLabel,
}: {
  metaMap: CommandMetaMap;
  enterActionLabels: Record<CommandKind, string>;
  exitLabel: string;
}) {
  const selectedCommandKind = useCommandState(
    (state) => metaMap.get(state.value)?.commandKind ?? "page"
  );

  return (
    <>
      <div className="flex h-10" />

      <div className="absolute inset-x-0 bottom-0 flex h-10 items-center justify-between gap-2 border-t bg-zinc-100/30 px-4 text-xs font-medium dark:bg-zinc-800/30">
        <KhoaMark className="size-6 text-muted-foreground" aria-hidden />

        <div className="flex shrink-0 items-center gap-2">
          <span>{enterActionLabels[selectedCommandKind]}</span>
          <CommandMenuKbd>
            <CornerDownLeftIcon />
          </CommandMenuKbd>
          <Separator
            orientation="vertical"
            className="data-[orientation=vertical]:h-4"
          />
          <span className="text-muted-foreground">{exitLabel}</span>
          <CommandMenuKbd>Esc</CommandMenuKbd>
        </div>
      </div>
    </>
  );
}

function CommandMenuKbd({ className, ...props }: React.ComponentProps<"kbd">) {
  return (
    <kbd
      className={cn(
        "pointer-events-none flex h-5 min-w-6 items-center justify-center gap-1 rounded-sm bg-black/5 px-1 font-sans text-[13px] font-normal text-muted-foreground shadow-[inset_0_-1px_2px] shadow-black/10 select-none dark:bg-white/10 dark:shadow-white/10 dark:text-shadow-xs [&_svg:not([class*='size-'])]:size-3",
        className
      )}
      {...props}
    />
  );
}

function postToCommandLinkItem(post: Post): CommandLinkItem {
  const isComponent = post.metadata?.category === "components";

  return {
    title: post.metadata.title,
    href: isComponent ? `/components/${post.slug}` : `/blog/${post.slug}`,
    keywords: isComponent ? ["component"] : undefined,
  };
}
