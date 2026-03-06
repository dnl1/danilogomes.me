import Image from "next/image";
import { Download, FileText } from "lucide-react";
import { hasProfilePhoto, profileAssets } from "@/lib/profile-assets";

type ProfileAssetsCardProps = {
  title: string;
  description: string;
  viewLabel: string;
  downloadLabel: string;
  photoAlt: string;
  className?: string;
};

export function ProfileAssetsCard({
  title,
  description,
  viewLabel,
  downloadLabel,
  photoAlt,
  className = ""
}: ProfileAssetsCardProps) {
  const showPhoto = hasProfilePhoto();

  return (
    <section className={`rounded-2xl border border-line/80 bg-black/20 p-5 ${className}`}>
      <div className="grid gap-5 md:grid-cols-[220px_1fr] md:items-center">
        <div className="overflow-hidden rounded-2xl border border-line/80 bg-[radial-gradient(circle_at_top,_rgba(255,153,102,0.35),_transparent_45%),linear-gradient(160deg,_rgba(75,86,210,0.35),_rgba(10,11,15,0.95))]">
          {showPhoto ? (
            <Image
              src={profileAssets.photo.href}
              alt={photoAlt}
              width={800}
              height={800}
              className="aspect-square h-full w-full object-cover"
              priority
            />
          ) : (
            <div className="flex aspect-square items-end justify-start p-5">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/70">profile.asset</p>
                <p className="mt-2 text-3xl font-bold tracking-tight text-white">DG</p>
              </div>
            </div>
          )}
        </div>

        <div>
          <p className="font-mono text-xs text-brand">{title}</p>
          <p className="mt-3 text-sm leading-7 text-muted">{description}</p>

          <div className="mt-5 flex flex-wrap gap-3">
            <a
              href={profileAssets.cv.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-line bg-black/30 px-4 py-2 text-sm transition hover:border-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
            >
              <FileText className="h-4 w-4" aria-hidden="true" />
              <span>{viewLabel}</span>
            </a>
            <a
              href={profileAssets.cv.href}
              download={profileAssets.cv.downloadName}
              className="inline-flex items-center gap-2 rounded-lg border border-line bg-black/30 px-4 py-2 text-sm transition hover:border-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
            >
              <Download className="h-4 w-4" aria-hidden="true" />
              <span>{downloadLabel}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
