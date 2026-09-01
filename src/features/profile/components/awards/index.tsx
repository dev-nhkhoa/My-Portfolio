import dayjs from "dayjs";
import { getTranslations } from "next-intl/server";

import { CollapsibleList } from "@/components/collapsible-list";

import { AWARDS } from "../../data/awards";
import { Panel, PanelHeader, PanelTitle } from "../panel";
import { AwardItem } from "./award-item";

const SORTED_AWARDS = [...AWARDS].sort((a, b) => {
  return dayjs(b.date).diff(dayjs(a.date));
});

export async function Awards() {
  const t = await getTranslations("panels");

  return (
    <Panel id="awards">
      <PanelHeader>
        <PanelTitle>
          {t("awards")}
          <sup className="ml-1 font-mono text-sm font-medium text-muted-foreground select-none">
            ({AWARDS.length})
          </sup>
        </PanelTitle>
      </PanelHeader>

      <CollapsibleList
        items={SORTED_AWARDS}
        max={8}
        keyExtractor={(item) => item.id}
        renderItem={(item) => <AwardItem award={item} />}
      />
    </Panel>
  );
}
