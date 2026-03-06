"use client";

import Image from "next/image";
import { X } from "lucide-react";
import { useState } from "react";

type ProjectGalleryProps = {
  title: string;
  description: string;
  titlePrefix?: string;
  images: string[];
  openLabel: string;
  closeLabel: string;
};

export function ProjectGallery({
  title,
  description,
  titlePrefix,
  images,
  openLabel,
  closeLabel
}: ProjectGalleryProps) {
  const [activeImage, setActiveImage] = useState<string | null>(null);

  if (!images.length) {
    return null;
  }

  return (
    <>
      <section className="mb-10">
        <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-muted">{description}</p>

        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {images.map((image, index) => {
            const alt = titlePrefix ? `${titlePrefix} ${index + 1}` : `${title} ${index + 1}`;

            return (
              <button
                key={image}
                type="button"
                onClick={() => setActiveImage(image)}
                aria-label={`${openLabel}: ${alt}`}
                className={`group overflow-hidden rounded-2xl border border-line/80 bg-black/20 text-left transition hover:border-brand/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand ${
                  index === 0 ? "md:col-span-2" : ""
                }`}
              >
                <Image
                  src={image}
                  alt={alt}
                  width={1600}
                  height={1000}
                  className={`w-full object-cover transition duration-300 group-hover:scale-[1.01] ${
                    index === 0 ? "aspect-[16/8] md:max-h-[34rem]" : "aspect-[16/10]"
                  }`}
                />
              </button>
            );
          })}
        </div>
      </section>

      {activeImage ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={closeLabel}
          onClick={() => setActiveImage(null)}
        >
          <button
            type="button"
            onClick={() => setActiveImage(null)}
            aria-label={closeLabel}
            className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-black/40 text-white transition hover:border-white/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
          <div
            className="relative max-h-[90vh] w-full max-w-6xl overflow-hidden rounded-2xl border border-white/10 bg-black/30"
            onClick={(event) => event.stopPropagation()}
          >
            <Image
              src={activeImage}
              alt={title}
              width={2200}
              height={1400}
              className="max-h-[90vh] w-full object-contain"
            />
          </div>
        </div>
      ) : null}
    </>
  );
}
