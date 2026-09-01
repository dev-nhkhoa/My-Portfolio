import { getTranslations } from "next-intl/server";

import { CollapsibleList } from "@/components/collapsible-list";

import { PROJECTS } from "../../data/projects";
import { Panel, PanelHeader, PanelTitle } from "../panel";
import { ProjectItem } from "./project-item";

export async function Projects() {
  const t = await getTranslations("panels");

  return (
    <Panel id="projects">
      <PanelHeader>
        <PanelTitle>
          {t("projects")}
          <sup className="ml-1 font-mono text-sm text-muted-foreground select-none">
            ({PROJECTS.length})
          </sup>
        </PanelTitle>
      </PanelHeader>

      <CollapsibleList
        items={PROJECTS}
        max={4}
        renderItem={(item) => <ProjectItem project={item} />}
      />
    </Panel>
  );
}
