import fs from "node:fs";
import path from "node:path";

export const profileAssets = {
  cv: {
    href: "/files/cv/danilo-gomes-cv-2026.pdf",
    downloadName: "danilo-gomes-cv-2026.pdf"
  },
  photo: {
    href: "/images/profile/profile.jpg",
    publicPath: path.join(process.cwd(), "public", "images", "profile", "profile.jpg")
  }
} as const;

export function hasProfilePhoto() {
  return fs.existsSync(profileAssets.photo.publicPath);
}
