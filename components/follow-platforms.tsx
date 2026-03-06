import type { IconType } from "react-icons";

export type FollowPlatformItem = {
  name: string;
  href: string;
  icon: IconType;
};

type FollowPlatformsProps = {
  title: string;
  description: string;
  platforms: FollowPlatformItem[];
  className?: string;
};

export function FollowPlatforms({ title, description, platforms, className = "" }: FollowPlatformsProps) {
  return (
    <section className={`rounded-2xl border border-line/80 bg-black/20 p-6 ${className}`.trim()}>
      <div className="max-w-3xl">
        <p className="font-mono text-sm text-brand">{title}</p>
        <p className="mt-3 text-sm leading-7 text-muted">{description}</p>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        {platforms.map((platform) => {
          const Icon = platform.icon;

          return (
            <a
              key={platform.name}
              href={platform.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${title}: ${platform.name}`}
              className="group inline-flex items-center gap-3 rounded-xl border border-line/80 bg-black/20 px-4 py-3 text-sm text-fg transition duration-200 hover:scale-[1.02] hover:border-brand/80 hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-line/70 bg-black/30 text-brand transition duration-200 group-hover:border-brand/80 group-hover:text-fg">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="font-medium">{platform.name}</span>
            </a>
          );
        })}
      </div>
    </section>
  );
}
