import { getTranslations } from "next-intl/server";
import { Suspense } from "react";

import { getGitHubContributions } from "../../data/github-contributions";
import { Panel } from "../panel";
import { GitHubContributionFallback, GitHubContributionGraph } from "./graph";

export async function GitHubContributions() {
  const contributions = getGitHubContributions();
  const t = await getTranslations("a11y");

  return (
    <Panel>
      <h2 className="sr-only">{t("githubContributions")}</h2>

      <Suspense fallback={<GitHubContributionFallback />}>
        <GitHubContributionGraph contributions={contributions} />
      </Suspense>
    </Panel>
  );
}
