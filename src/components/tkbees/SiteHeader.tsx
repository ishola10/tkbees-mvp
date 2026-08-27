"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { NAV } from "@/constants/nav";
import { BrandMark } from "./BrandMark";

export function SiteHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  const go = (href: string) => {
    setMobileOpen(false);
    router.push(href);
  };

  return (
    <header className="site-header" id="siteHeader">
      <div className="container">
        <div className="main-row">
          <BrandMark />

          <nav className="header-nav" aria-label="Primary">
            {NAV.map((n) => {
              const active = pathname === n.href;
              return (
                <button
                  key={n.href}
                  className={`nav-chip${active ? " active" : ""}`}
                  type="button"
                  onClick={() => go(n.href)}
                >
                  <span className="chip-inner">{n.label}</span>
                </button>
              );
            })}
          </nav>

          <div className="header-ctas">
            <button className="header-cta-uni" type="button" onClick={() => go("/universities")}>
              For Universities
            </button>
            <button className="join-btn buzz-hover" type="button" onClick={() => go("/register")}>
              Join Now
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </button>
          </div>

          <button
            className="mobile-menu-btn"
            aria-label="Menu"
            onClick={() => setMobileOpen((o) => !o)}
          >
            {mobileOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      <div className={`mobile-menu${mobileOpen ? " open" : ""}`}>
        <div className="mobile-menu-grid">
          {NAV.map((n) => (
            <button
              key={n.href}
              className={`mob-link${pathname === n.href ? " active" : ""}`}
              type="button"
              onClick={() => go(n.href)}
            >
              {n.label}
            </button>
          ))}
          <button className="mob-link" type="button" onClick={() => go("/universities")}>For Universities</button>
          <button className="mob-link" type="button" onClick={() => go("/register")}>Join Now</button>
        </div>
      </div>
    </header>
  );
}
