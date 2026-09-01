import { getTranslations } from "next-intl/server";
import React from "react";

import { EXPERIENCES } from "../../data/experiences";
import { Panel, PanelHeader, PanelTitle } from "../panel";
import { ExperienceItem } from "./experience-item";

export async function Experiences() {
  const t = await getTranslations("panels");

  return (
    <Panel id="experience">
      <PanelHeader>
        <PanelTitle>{t("experience")}</PanelTitle>
      </PanelHeader>

      <div className="pr-2 pl-4">
        {EXPERIENCES.map((experience) => (
          <ExperienceItem key={experience.id} experience={experience} />
        ))}
      </div>
    </Panel>
  );
}
