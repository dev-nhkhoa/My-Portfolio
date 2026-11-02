import Image from "next/image";

import type { AiImage } from "../data";

export function ImageGallery({ images }: { images: AiImage[] }) {
  return (
    <div className="columns-2 gap-2 sm:columns-3">
      {images.map(({ file, alt, width, height }) => (
        <div
          key={file}
          className="relative mb-2 break-inside-avoid select-none [&_img]:rounded-xl"
        >
          <Image
            src={`/ai/img/${file}.webp`}
            alt={alt}
            width={width}
            height={height}
            sizes="(min-width: 768px) 224px, 50vw"
          />
          <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-black/10 ring-inset dark:ring-white/10" />
        </div>
      ))}
    </div>
  );
}
