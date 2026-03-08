"use client";

import { Volume2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

type MusicPreviewVolumeContextValue = {
  volume: number;
  setVolume: (value: number) => void;
  activePreviewId: string | null;
  setActivePreviewId: (value: string | null) => void;
};

const MusicPreviewVolumeContext = createContext<MusicPreviewVolumeContextValue | null>(null);

type MusicPreviewVolumeProviderProps = {
  children: ReactNode;
  showControl?: boolean;
};

export function MusicPreviewVolumeProvider({ children, showControl = true }: MusicPreviewVolumeProviderProps) {
  const [volume, setVolumeState] = useState(0.7);
  const [activePreviewId, setActivePreviewId] = useState<string | null>(null);
  const t = useTranslations("MusicPage");

  const value = useMemo(
    () => ({
      volume,
      setVolume: (next: number) => {
        const safeValue = Number.isFinite(next) ? Math.min(1, Math.max(0, next)) : 0.7;
        setVolumeState(safeValue);
      },
      activePreviewId,
      setActivePreviewId
    }),
    [activePreviewId, volume]
  );

  return (
    <MusicPreviewVolumeContext.Provider value={value}>
      {children}
      {showControl ? (
        <aside className="fixed bottom-4 left-1/2 z-30 w-[calc(100%-2rem)] max-w-sm -translate-x-1/2 rounded-xl border border-line/80 bg-bg/95 p-3 shadow-soft backdrop-blur">
          <label className="flex items-center gap-3 text-sm text-fg">
            <Volume2 className="h-4 w-4 shrink-0" aria-hidden="true" />
            <span className="sr-only">{t("volume")}</span>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={(event) => value.setVolume(Number(event.target.value))}
              className="w-full accent-brand"
              aria-label={t("volume")}
            />
            <span className="w-10 text-right font-mono text-xs text-muted">{Math.round(volume * 100)}%</span>
          </label>
        </aside>
      ) : null}
    </MusicPreviewVolumeContext.Provider>
  );
}

export function useMusicPreviewVolume() {
  const context = useContext(MusicPreviewVolumeContext);

  if (!context) {
    throw new Error("useMusicPreviewVolume must be used within MusicPreviewVolumeProvider");
  }

  return context;
}
