"use client";

import Image from "next/image";

interface NumberedImageListProps {
  images: string[];
}

export function NumberedImageList({ images }: NumberedImageListProps) {
  if (!images || images.length === 0) {
    return null;
  }

  const uniqueImages = Array.from(new Set(images));

  return (
    <div className="space-y-12">
      {uniqueImages.map((image, index) => (
        <div key={`${image}-${index}`} className="space-y-4">
          <div className="flex items-center gap-4">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-black text-sm font-semibold uppercase tracking-widest text-white">
              {index + 1}
            </span>
            <div className="h-px flex-1 bg-gray-200" />
          </div>
          <div
            className="relative overflow-hidden rounded-lg border border-gray-200"
            style={{ aspectRatio: "4/3" }}
          >
            <Image
              src={image}
              alt={`Gallery image ${index + 1}`}
              fill
              sizes="(max-width: 768px) 100vw, 1024px"
              className="object-cover"
              priority={index === 0}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
