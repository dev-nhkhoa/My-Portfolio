"use client";

import { useEffect, useRef } from "react";

export function AutoPlayVideo({
  src,
  poster,
}: {
  src: string;
  poster: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          video.pause();
          return;
        }

        video.muted = false;
        video.play().catch(() => {
          // Browsers block unmuted autoplay before the first user interaction.
          video.muted = true;
          video.play().catch(() => {});
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={videoRef}
      src={src}
      poster={poster}
      controls
      loop
      playsInline
      preload="metadata"
      className="aspect-video w-full bg-black object-cover"
    />
  );
}
