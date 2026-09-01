import { MapPinIcon, MarsIcon, VenusIcon } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";

import { USER } from "@/features/profile/data/user";
import { resolveLocalized } from "@/i18n/localized";
import type { Locale } from "@/i18n/routing";

import { Panel, PanelContent } from "../panel";
import { CurrentLocalTimeItem } from "./current-local-time-item";
import { EmailItem } from "./email-item";
import {
  IntroItem,
  IntroItemContent,
  IntroItemIcon,
  IntroItemLink,
} from "./intro-item";
import { JobItem } from "./job-item";
import { PhoneItem } from "./phone-item";

export async function Overview() {
  const t = await getTranslations("a11y");
  const tOverview = await getTranslations("overview");
  const locale = (await getLocale()) as Locale;
  const jobConnector = tOverview("jobConnector");

  return (
    <Panel>
      <h2 className="sr-only">{t("overview")}</h2>

      <PanelContent className="space-y-2.5">
        <JobItem
          title={resolveLocalized(USER.jobs[0].title, locale)}
          company={USER.jobs[0].company}
          website={USER.jobs[0].website}
          connector={jobConnector}
        />

        <div className="grid gap-x-12 gap-y-2.5 sm:grid-cols-2">
          <JobItem
            title={resolveLocalized(USER.jobs[1].title, locale)}
            company={USER.jobs[1].company}
            website={USER.jobs[1].website}
          />

          <IntroItem>
            <IntroItemIcon>
              {USER.gender === "male" ? <MarsIcon /> : <VenusIcon />}
            </IntroItemIcon>
            <IntroItemContent aria-label={`Pronouns: ${USER.pronouns}`}>
              {USER.pronouns}
            </IntroItemContent>
          </IntroItem>

          <IntroItem>
            <IntroItemIcon>
              <MapPinIcon />
            </IntroItemIcon>
            <IntroItemContent>
              <IntroItemLink
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(USER.address)}`}
                aria-label={`Location: ${USER.address}`}
              >
                {USER.address}
              </IntroItemLink>
            </IntroItemContent>
          </IntroItem>

          <CurrentLocalTimeItem timeZone={USER.timeZone} />

          <PhoneItem phoneNumber={USER.phoneNumber} />

          <EmailItem email={USER.email} />
        </div>
      </PanelContent>
    </Panel>
  );
}
