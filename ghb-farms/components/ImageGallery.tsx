// ghb-farms/components/ImageGallery.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import type { GalleryImage } from "@/types/content";

export function ImageGallery({ images }: { images: GalleryImage[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 md:px-8">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {images.map((image, i) => (
          <button
            key={image.src}
            onClick={() => setActiveIndex(i)}
            className="relative aspect-square overflow-hidden rounded-lg"
            aria-label={`View larger image: ${image.alt}`}
          >
            <Image src={image.src} alt={image.alt} fill className="object-cover transition-transform hover:scale-105" />
          </button>
        ))}
      </div>
      {activeIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setActiveIndex(null)}
          role="dialog"
          aria-modal="true"
        >
          <button
            onClick={() => setActiveIndex(null)}
            className="absolute right-4 top-4 text-white"
            aria-label="Close image viewer"
          >
            <X className="h-8 w-8" />
          </button>
          <div className="relative h-[80vh] w-full max-w-4xl">
            <Image
              src={images[activeIndex].src}
              alt={images[activeIndex].alt}
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
}
