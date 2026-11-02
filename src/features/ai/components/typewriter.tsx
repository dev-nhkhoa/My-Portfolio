"use client";

import { animate } from "motion";
import { useEffect, useRef } from "react";

import { cn } from "@/lib/utils";

const MS_PER_CHAR = 45;

export function Typewriter({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const typedRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const typed = typedRef.current;
    if (!typed || matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const controls = animate(0, text.length, {
      duration: (text.length * MS_PER_CHAR) / 1000,
      delay: 0.3,
      ease: "linear",
      onUpdate: (value) => {
        typed.textContent = text.slice(0, Math.round(value));
      },
    });

    return () => controls.stop();
  }, [text]);

  return (
    <p aria-label={text} className={cn("relative", className)}>
      <span aria-hidden className="invisible">
        {text}
      </span>
      <span aria-hidden className="absolute inset-0">
        <span ref={typedRef}>{text}</span>
        <span className="ml-0.5 inline-block h-[1em] w-0.5 translate-y-[0.15em] animate-pulse bg-current" />
      </span>
    </p>
  );
}
