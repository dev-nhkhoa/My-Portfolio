import { getLocale, getTranslations } from "next-intl/server";

import { Markdown } from "@/components/markdown";
import { Prose } from "@/components/ui/typography";
import { USER } from "@/features/profile/data/user";
import { resolveLocalized } from "@/i18n/localized";
import type { Locale } from "@/i18n/routing";

import { Panel, PanelContent, PanelHeader, PanelTitle } from "./panel";

export async function About() {
  const t = await getTranslations("panels");
  const locale = (await getLocale()) as Locale;

  return (
    <Panel id="about">
      <PanelHeader>
        <PanelTitle>{t("about")}</PanelTitle>
      </PanelHeader>

      <PanelContent>
        <Prose>
          <Markdown>{resolveLocalized(USER.about, locale)}</Markdown>
        </Prose>
      </PanelContent>
    </Panel>
  );
}
