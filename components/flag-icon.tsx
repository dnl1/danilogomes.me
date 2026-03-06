type FlagCode = "br" | "us";

type FlagIconProps = {
  code: FlagCode;
  className?: string;
};

export function FlagIcon({ code, className = "h-4 w-4" }: FlagIconProps) {
  if (code === "br") {
    return (
      <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
        <rect x="1" y="1" width="30" height="30" rx="15" fill="#009B3A" />
        <path d="M16 7 25 16 16 25 7 16 16 7Z" fill="#FFDF00" />
        <circle cx="16" cy="16" r="5.3" fill="#002776" />
        <path d="M11.2 14.9c1.9-1.1 5.9-1.4 9.7.1" stroke="#fff" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <defs>
        <clipPath id="flag-us-circle">
          <rect x="1" y="1" width="30" height="30" rx="15" />
        </clipPath>
      </defs>
      <g clipPath="url(#flag-us-circle)">
        <rect x="1" y="1" width="30" height="30" fill="#fff" />
        <g fill="#B22234">
          <rect x="1" y="1" width="30" height="2.31" />
          <rect x="1" y="5.62" width="30" height="2.31" />
          <rect x="1" y="10.24" width="30" height="2.31" />
          <rect x="1" y="14.86" width="30" height="2.31" />
          <rect x="1" y="19.48" width="30" height="2.31" />
          <rect x="1" y="24.1" width="30" height="2.31" />
          <rect x="1" y="28.72" width="30" height="2.31" />
        </g>
        <rect x="1" y="1" width="13" height="11.8" fill="#3C3B6E" />
        <g fill="#fff">
          <circle cx="3.5" cy="3.4" r=".7" />
          <circle cx="6.5" cy="3.4" r=".7" />
          <circle cx="9.5" cy="3.4" r=".7" />
          <circle cx="12" cy="3.4" r=".7" />
          <circle cx="5" cy="5.8" r=".7" />
          <circle cx="8" cy="5.8" r=".7" />
          <circle cx="11" cy="5.8" r=".7" />
          <circle cx="3.5" cy="8.2" r=".7" />
          <circle cx="6.5" cy="8.2" r=".7" />
          <circle cx="9.5" cy="8.2" r=".7" />
          <circle cx="12" cy="8.2" r=".7" />
          <circle cx="5" cy="10.6" r=".7" />
          <circle cx="8" cy="10.6" r=".7" />
          <circle cx="11" cy="10.6" r=".7" />
        </g>
      </g>
    </svg>
  );
}

export function getFlagCode(value: string): FlagCode | null {
  const normalized = value.trim().toLowerCase();

  if (["brazil", "brasil", "portuguese", "portugues"].includes(normalized)) {
    return "br";
  }

  if (["usa", "eua", "english", "ingles"].includes(normalized)) {
    return "us";
  }

  return null;
}
