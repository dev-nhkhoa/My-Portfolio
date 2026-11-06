import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import React from "react";

import { UTM_PARAMS } from "@/config/site";
import { resolveLocalized } from "@/i18n/localized";
import type { Locale } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { addQueryParams } from "@/utils/url";

import { CLIENTS } from "../../data/clients";
import type { Client } from "../../types/clients";
import { Panel, PanelHeader, PanelTitle } from "../panel";

function ClientLogo({ client }: { client: Client }) {
  return (
    <div className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-muted-foreground/15 bg-muted ring-1 ring-edge ring-offset-1 ring-offset-background select-none">
      <Image
        src={client.logo}
        alt={client.name}
        width={28}
        height={28}
        quality={100}
        className={cn(
          "size-7 object-contain",
          client.logoDark && "dark:hidden"
        )}
        unoptimized
        aria-hidden
      />
      {client.logoDark && (
        <Image
          src={client.logoDark}
          alt={client.name}
          width={28}
          height={28}
          quality={100}
          className="hidden size-7 object-contain dark:block"
          unoptimized
          aria-hidden
        />
      )}
    </div>
  );
}

export async function Clients() {
  const t = await getTranslations("panels");
  const locale = (await getLocale()) as Locale;

  return (
    <Panel id="clients">
      <PanelHeader>
        <PanelTitle>{t("clients")}</PanelTitle>
      </PanelHeader>

      <ul className="grid gap-4 p-4 sm:grid-cols-2">
        {CLIENTS.map((client) => (
          <li
            key={client.id}
            className="flex flex-col gap-4 rounded-xl border border-edge bg-muted/40 p-4"
          >
            <div className="flex items-center gap-3">
              <ClientLogo client={client} />

              <div className="min-w-0">
                <h3 className="leading-snug font-medium text-balance">
                  {client.website ? (
                    <a
                      href={addQueryParams(client.website, UTM_PARAMS)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline-offset-4 hover:underline"
                    >
                      {client.name}
                    </a>
                  ) : (
                    client.name
                  )}
                </h3>
                {client.reviewer && (
                  <p className="text-sm text-muted-foreground">
                    {client.reviewer}
                  </p>
                )}
              </div>
            </div>

            <p className="text-sm text-balance">
              {resolveLocalized(client.description, locale)}
            </p>

            {client.review && (
              <blockquote className="border-l-2 border-edge pl-3 text-sm text-balance text-muted-foreground">
                {resolveLocalized(client.review, locale)}
              </blockquote>
            )}
          </li>
        ))}
      </ul>
    </Panel>
  );
}
