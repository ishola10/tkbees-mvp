"use client";

import Link from "next/link";

export function BeeHex({ size = 36 }: { size?: number }) {
  return (
    <svg className="brand-hex-svg" viewBox="0 0 36 40" width={size} height={size * (40 / 36)} aria-hidden="true">
      <path d="M18 1.5 L34 10 L34 30 L18 38.5 L2 30 L2 10 Z" fill="#1E1B4B" stroke="#F5A524" strokeWidth="2" />
      <ellipse cx="13" cy="16" rx="6" ry="3.4" fill="#C6F432" opacity="0.95" />
      <ellipse cx="23" cy="16" rx="6" ry="3.4" fill="#C6F432" opacity="0.95" />
      <rect x="14.5" y="18.5" width="7" height="11" rx="3" fill="#F5A524" />
      <rect x="14.5" y="22" width="7" height="1.4" fill="#1E1B4B" />
      <rect x="14.5" y="25" width="7" height="1.4" fill="#1E1B4B" />
    </svg>
  );
}

export function BrandMark({ invert = false }: { invert?: boolean }) {
  return (
    <Link href="/" className="brand-mark">
      <BeeHex />
      <div>
        <div className="brand-name" style={invert ? { color: "#fff" } : undefined}>
          TK<span>Bees</span>
        </div>
        <div className="brand-sub" style={invert ? { color: "rgba(255,248,236,.5)" } : undefined}>
          The Knowledge Bees
        </div>
      </div>
    </Link>
  );
}
