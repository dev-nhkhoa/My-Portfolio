import { ArrowRightIcon } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { KhoaMark } from "@/components/khoa-mark";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

export async function NotFound({ className }: { className?: string }) {
  const t = await getTranslations("notFound");

  return (
    <div
      className={cn(
        "flex h-[calc(100svh-5.5rem)] flex-col items-center justify-center",
        className
      )}
    >
      <KhoaMark className="h-28 w-auto text-border" />

      <h1 className="mt-8 mb-6 font-mono text-8xl font-medium">404</h1>

      <Button variant="default" asChild>
        <Link href="/">
          {t("backHome")}
          <ArrowRightIcon />
        </Link>
      </Button>
    </div>
  );
}
