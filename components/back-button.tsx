"use client";

import { ArrowLeft } from "lucide-react";
import type { Route } from "next";
import { useRouter } from "next/navigation";

type BackButtonProps = {
  label: string;
  fallbackHref?: Route;
};

export function BackButton({ label, fallbackHref = "/" }: BackButtonProps) {
  const router = useRouter();

  function handleClick() {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
      return;
    }

    router.push(fallbackHref);
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={label}
      title={label}
      className="mb-8 inline-flex h-10 w-10 items-center justify-center rounded-full border border-line/80 bg-black/20 text-muted transition hover:border-brand/80 hover:text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
    >
      <ArrowLeft className="h-4 w-4" aria-hidden="true" />
    </button>
  );
}
