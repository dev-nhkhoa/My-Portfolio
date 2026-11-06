import { InfinityIcon } from "lucide-react";
import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import React from "react";

import { Markdown } from "@/components/markdown";
import {
  CollapsibleChevronsIcon,
  CollapsibleContent,
  CollapsibleTrigger,
  CollapsibleWithContext,
} from "@/components/ui/collapsible";
import { Separator } from "@/components/ui/separator";
import { Tag } from "@/components/ui/tag";
import { SimpleTooltip } from "@/components/ui/tooltip";
import { Prose } from "@/components/ui/typography";
import { UTM_PARAMS } from "@/config/site";
import { resolveLocalized } from "@/i18n/localized";
import type { Locale } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { addQueryParams } from "@/utils/url";

import type { Experience, ExperiencePosition } from "../../types/experiences";
import { ExperienceIcon } from "./experience-position-icon";

function CompanyLogo({ experience }: { experience: Experience }) {
  const { companyLogo, companyLogoDark, companyName, theme } = experience;

  if (!companyLogo) return null;

  return (
    <div className="flex size-6 shrink-0 items-center justify-center rounded-lg border border-muted-foreground/15 bg-muted ring-1 ring-edge ring-offset-1 ring-offset-background select-none">
      <Image
        src={companyLogo}
        alt={companyName}
        width={16}
        height={16}
        quality={100}
        className={cn(
          "size-4 object-contain",
          companyLogoDark && "dark:hidden",
          !companyLogoDark && theme && "not-dark:invert"
        )}
        unoptimized
        aria-hidden
      />
      {companyLogoDark && (
        <Image
          src={companyLogoDark}
          alt={companyName}
          width={16}
          height={16}
          quality={100}
          className="hidden size-4 object-contain dark:block"
          unoptimized
          aria-hidden
        />
      )}
    </div>
  );
}

export async function ExperiencePositionItem({
  experience,
  position,
}: {
  experience: Experience;
  position: ExperiencePosition;
}) {
  const { start, end } = position.employmentPeriod;
  const isOngoing = !end;
  const t = await getTranslations("a11y");
  const connector = (await getTranslations("overview"))("jobConnector");
  const locale = (await getLocale()) as Locale;
  const title = resolveLocalized(position.title, locale);
  const description = position.description
    ? resolveLocalized(position.description, locale)
    : undefined;

  return (
    <CollapsibleWithContext defaultOpen={position.isExpanded} asChild>
      <div className="relative last:before:absolute last:before:h-full last:before:w-4 last:before:bg-background">
        <div className="relative before:absolute before:-top-1 before:-right-1 before:-bottom-1.5 before:left-7 before:-z-1 before:rounded-lg hover:before:bg-accent2">
          <CollapsibleTrigger
            aria-label={title}
            className="absolute inset-0 rounded-lg text-left select-none"
          />

          <div className="pointer-events-none relative z-1 mb-1 flex items-center gap-3">
            {experience.companyLogo ? (
              <CompanyLogo experience={experience} />
            ) : (
              <div
                className={cn(
                  "flex size-6 shrink-0 items-center justify-center rounded-lg",
                  "bg-muted text-muted-foreground",
                  "border border-muted-foreground/15 ring-1 ring-edge ring-offset-1 ring-offset-background"
                )}
                aria-hidden
              >
                <ExperienceIcon className="size-4" icon={position.icon} />
              </div>
            )}

            <div className="min-w-0 flex-1 text-balance">
              <h4 className="inline font-medium">{title}</h4>{" "}
              <span className="text-muted-foreground">
                <span className="capitalize">{connector}</span>{" "}
                {experience.companyWebsite ? (
                  <a
                    href={addQueryParams(experience.companyWebsite, UTM_PARAMS)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pointer-events-auto font-medium text-foreground underline-offset-4 hover:underline"
                  >
                    {experience.companyName}
                  </a>
                ) : (
                  <span className="font-medium text-foreground">
                    {experience.companyName}
                  </span>
                )}
              </span>
              {experience.isCurrentEmployer && (
                <SimpleTooltip content={t("currentlyWorkingHere")}>
                  <span
                    tabIndex={0}
                    className="pointer-events-auto relative ml-2 inline-flex size-4 items-center justify-center align-middle"
                  >
                    <span className="absolute inline-flex size-3 animate-ping rounded-full bg-success opacity-50" />
                    <span className="relative inline-flex size-2 rounded-full bg-success" />
                    <span className="sr-only">{t("currentlyWorkingHere")}</span>
                  </span>
                </SimpleTooltip>
              )}
            </div>

            <div
              className="shrink-0 text-muted-foreground [&_svg]:size-4"
              aria-hidden
            >
              <CollapsibleChevronsIcon />
            </div>
          </div>

          <div className="pointer-events-none relative z-1 flex items-center gap-2 pl-9 text-sm text-muted-foreground">
            {position.employmentType && (
              <>
                <dl>
                  <dt className="sr-only">{t("employmentType")}</dt>
                  <dd>{resolveLocalized(position.employmentType, locale)}</dd>
                </dl>

                <Separator
                  className="data-[orientation=vertical]:h-4"
                  orientation="vertical"
                />
              </>
            )}

            <dl>
              <dt className="sr-only">{t("employmentPeriod")}</dt>
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
        </div>

        <CollapsibleContent className="overflow-hidden duration-300 data-[state=closed]:animate-collapsible-fade-up data-[state=open]:animate-collapsible-fade-down">
          {description && (
            <Prose className="pt-2 pl-9">
              <Markdown>{description}</Markdown>
            </Prose>
          )}

          {Array.isArray(position.skills) && position.skills.length > 0 && (
            <ul className="flex flex-wrap gap-1.5 pt-2 pl-9">
              {position.skills.map((skill, index) => (
                <li key={index} className="flex">
                  <Tag>{skill}</Tag>
                </li>
              ))}
            </ul>
          )}
        </CollapsibleContent>
      </div>
    </CollapsibleWithContext>
  );
}
