import Image from "next/image";
import { getTranslations } from "next-intl/server";
import React from "react";

import { SimpleTooltip } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

import { TECH_STACK } from "../data/tech-stack";
import type { TechStackCategory } from "../types/tech-stack";
import { Panel, PanelContent, PanelHeader, PanelTitle } from "./panel";

const CATEGORIES: TechStackCategory[] = ["ai", "designing", "coding"];

export async function TeckStack() {
  const t = await getTranslations("panels");
  const tCategories = await getTranslations("stackCategories");

  return (
    <Panel id="stack">
      <PanelHeader>
        <PanelTitle>{t("stack")}</PanelTitle>
      </PanelHeader>

      <PanelContent
        className={cn(
          "[--pattern-foreground:var(--color-zinc-950)]/5 dark:[--pattern-foreground:var(--color-white)]/5",
          "bg-[radial-gradient(var(--pattern-foreground)_1px,transparent_0)] bg-size-[10px_10px] bg-center",
          "bg-zinc-950/0.75 dark:bg-white/0.75"
        )}
      >
        <div className="space-y-5">
          {CATEGORIES.map((category) => (
            <div key={category} className="space-y-3">
              <h3 className="font-mono text-sm text-muted-foreground">
                {tCategories(category)}
              </h3>
              <ul className="flex flex-wrap gap-4 select-none">
                {TECH_STACK.filter((tech) => tech.category === category).map(
                  (tech) => {
                    return (
                      <li key={tech.key} className="flex">
                        <SimpleTooltip content={tech.title}>
                          <a
                            href={tech.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={tech.title}
                            className="transition-transform hover:scale-110"
                          >
                            <Image
                              src={tech.iconUrl}
                              alt={`${tech.title} icon`}
                              width={32}
                              height={32}
                              unoptimized
                              className={cn(
                                "h-8 w-8 object-contain",
                                tech.theme && "dark:invert"
                              )}
                            />
                            <span className="sr-only">{tech.title}</span>
                          </a>
                        </SimpleTooltip>
                      </li>
                    );
                  }
                )}
              </ul>
            </div>
          ))}
        </div>
      </PanelContent>
    </Panel>
  );
}
