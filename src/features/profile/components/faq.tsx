import { getLocale, getTranslations } from "next-intl/server";

import { FAQ as FAQ_ITEMS } from "@/features/profile/data/faq";
import { resolveLocalized } from "@/i18n/localized";
import type { Locale } from "@/i18n/routing";

import { Panel, PanelContent, PanelHeader, PanelTitle } from "./panel";

export async function FAQ() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("panels");

  return (
    <Panel id="faq">
      <PanelHeader>
        <PanelTitle>{t("faq")}</PanelTitle>
      </PanelHeader>

      <PanelContent>
        <dl className="flex flex-col gap-6">
          {FAQ_ITEMS.map((item) => {
            const question = resolveLocalized(item.question, locale);
            const answer = resolveLocalized(item.answer, locale);

            return (
              <div key={question} className="flex flex-col gap-2">
                <dt className="font-medium text-balance">{question}</dt>
                <dd className="text-sm text-pretty text-muted-foreground">
                  {answer}
                </dd>
              </div>
            );
          })}
        </dl>
      </PanelContent>
    </Panel>
  );
}
