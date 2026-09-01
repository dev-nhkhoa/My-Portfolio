"use client";

import { Volume2Icon } from "lucide-react";
import { useTranslations } from "next-intl";

import { useSound } from "@/hooks/use-sound";
import { cn } from "@/lib/utils";

export function PronounceMyName({
  className,
  namePronunciationUrl,
}: {
  className?: string;
  namePronunciationUrl: string;
}) {
  const play = useSound(namePronunciationUrl);
  const t = useTranslations("a11y");

  return (
    <button
      className={cn(
        "relative text-muted-foreground transition-[color,scale] select-none hover:text-foreground active:scale-[0.9]",
        "after:absolute after:-inset-1",
        className
      )}
      onClick={() => play()}
    >
      <Volume2Icon className="size-[0.6em]" />
      <span className="sr-only">{t("pronounceMyName")}</span>
    </button>
  );
}
