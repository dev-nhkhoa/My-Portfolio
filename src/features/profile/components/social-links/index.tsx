import { getTranslations } from "next-intl/server";
import React from "react";

import { SOCIAL_LINKS } from "../../data/social-links";
import { Panel } from "../panel";
import { SocialLinkItem } from "./social-link-item";

export async function SocialLinks() {
  const t = await getTranslations("a11y");

  return (
    <Panel>
      <h2 className="sr-only">{t("socialLinks")}</h2>

      <div className="relative">
        <div className="pointer-events-none absolute inset-0 -z-1 grid grid-cols-1 gap-4 max-sm:hidden sm:grid-cols-2">
          <div className="border-r border-edge"></div>
          <div className="border-l border-edge"></div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {SOCIAL_LINKS.map((link, index) => {
            return <SocialLinkItem key={index} {...link} />;
          })}
        </div>
      </div>
    </Panel>
  );
}
