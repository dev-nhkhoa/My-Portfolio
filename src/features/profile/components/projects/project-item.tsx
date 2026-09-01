import { InfinityIcon, LinkIcon } from "lucide-react";
import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import React from "react";

import { Icons } from "@/components/icons";
import { Markdown } from "@/components/markdown";
import {
  CollapsibleChevronsIcon,
  CollapsibleContent,
  CollapsibleTrigger,
  CollapsibleWithContext,
} from "@/components/ui/collapsible";
import { Tag } from "@/components/ui/tag";
import { SimpleTooltip } from "@/components/ui/tooltip";
import { Prose } from "@/components/ui/typography";
import { UTM_PARAMS } from "@/config/site";
import { resolveLocalized } from "@/i18n/localized";
import type { Locale } from "@/i18n/routing";
import { addQueryParams } from "@/utils/url";

import type { Project } from "../../types/projects";

export async function ProjectItem({
  className,
  project,
}: {
  className?: string;
  project: Project;
}) {
  const { start, end } = project.period;
  const isOngoing = !end;
  const t = await getTranslations("a11y");
  const locale = (await getLocale()) as Locale;
  const title = resolveLocalized(project.title, locale);
  const description = project.description
    ? resolveLocalized(project.description, locale)
    : undefined;

  return (
    <CollapsibleWithContext defaultOpen={project.isExpanded} asChild>
      <div className={className}>
        <div className="flex items-center hover:bg-accent2">
          {project.logo ? (
            project.logoDark ? (
              <>
                <Image
                  src={project.logo}
                  alt={title}
                  width={32}
                  height={32}
                  quality={100}
                  className="mx-4 flex size-6 shrink-0 rounded-md select-none dark:hidden"
                  unoptimized
                  aria-hidden="true"
                />
                <Image
                  src={project.logoDark}
                  alt={title}
                  width={32}
                  height={32}
                  quality={100}
                  className="mx-4 hidden size-6 shrink-0 rounded-md select-none dark:flex"
                  unoptimized
                  aria-hidden="true"
                />
              </>
            ) : (
              <Image
                src={project.logo}
                alt={title}
                width={32}
                height={32}
                quality={100}
                className="mx-4 flex size-6 shrink-0 select-none"
                unoptimized
                aria-hidden="true"
              />
            )
          ) : (
            <div
              className="mx-4 flex size-6 shrink-0 items-center justify-center rounded-lg border border-muted-foreground/15 bg-muted text-muted-foreground ring-1 ring-edge ring-offset-1 ring-offset-background select-none"
              aria-hidden="true"
            >
              <Icons.project className="size-4" />
            </div>
          )}

          <div className="flex-1 border-l border-dashed border-edge">
            <CollapsibleTrigger className="flex w-full items-center gap-4 p-4 pr-2 text-left select-none">
              <div className="flex-1">
                <h3 className="mb-1 leading-snug font-medium text-balance">
                  {title}
                </h3>

                <dl className="text-sm text-muted-foreground">
                  <dt className="sr-only">{t("period")}</dt>
                  <dd className="flex items-center gap-0.5">
                    <span>{start}</span>
                    <span className="font-mono">—</span>
                    {isOngoing ? (
                      <>
                        <InfinityIcon
                          className="size-4.5 translate-y-[0.5px]"
                          aria-hidden
                        />
                        <span className="sr-only">{t("present")}</span>
                      </>
                    ) : (
                      <span>{end}</span>
                    )}
                  </dd>
                </dl>
              </div>

              <SimpleTooltip content={t("openProjectLink")}>
                <a
                  className="relative flex size-6 shrink-0 items-center justify-center text-muted-foreground after:absolute after:-inset-2 hover:text-foreground"
                  href={addQueryParams(project.link, UTM_PARAMS)}
                  target="_blank"
                  rel="noopener"
                >
                  <LinkIcon className="pointer-events-none size-4" />
                  <span className="sr-only">{t("openProjectLink")}</span>
                </a>
              </SimpleTooltip>

              <div
                className="shrink-0 text-muted-foreground [&_svg]:size-4"
                aria-hidden
              >
                <CollapsibleChevronsIcon />
              </div>
            </CollapsibleTrigger>
          </div>
        </div>

        <CollapsibleContent className="group overflow-hidden duration-300 data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
          <div className="border-t border-edge shadow-inner">
            <div className="space-y-4 p-4 duration-300 group-data-[state=closed]:animate-fade-out group-data-[state=open]:animate-fade-in">
              {description && (
                <Prose>
                  <Markdown>{description}</Markdown>
                </Prose>
              )}

              {project.skills.length > 0 && (
                <ul className="flex flex-wrap gap-1.5">
                  {project.skills.map((skill, index) => (
                    <li key={index} className="flex">
                      <Tag>{skill}</Tag>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </CollapsibleContent>
      </div>
    </CollapsibleWithContext>
  );
}
