import { getTranslations } from "next-intl/server";

import { Markdown } from "@/components/markdown";
import { Prose } from "@/components/ui/typography";
import { USER } from "@/features/profile/data/user";

import { Panel, PanelContent, PanelHeader, PanelTitle } from "./panel";

export async function About() {
  const t = await getTranslations("panels");

  return (
    <Panel id="about">
      <PanelHeader>
        <PanelTitle>{t("about")}</PanelTitle>
      </PanelHeader>

      <PanelContent>
        <Prose>
          <Markdown>{USER.about}</Markdown>
        </Prose>
      </PanelContent>
    </Panel>
  );
}
