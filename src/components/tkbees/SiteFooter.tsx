"use client";

import { usePathname, useRouter } from "next/navigation";
import { FOOTER_COLS } from "@/constants/nav";
import { BeeHex } from "./BrandMark";

export function SiteFooter() {
  const pathname = usePathname();
  const router = useRouter();

  if (pathname?.startsWith("/admin")) return null;

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: ".75rem" }}>
              <BeeHex />
              <div>
                <div style={{ fontFamily: "var(--fd)", fontWeight: 900, fontSize: "1.2rem", color: "white" }}>
                  TK<span style={{ color: "var(--honey)" }}>Bees</span>
                </div>
                <div style={{ fontSize: 9, textTransform: "uppercase", letterSpacing: ".22em", color: "rgba(255,248,236,.5)" }}>
                  Where Student Ideas Take Flight
                </div>
              </div>
            </div>
            <p>
              Where Student Ideas Take Flight. The entrepreneurship ecosystem built for university innovators.
            </p>
            <div className="footer-systems">
              <span className="systems-dot" />
              All systems pollinating
            </div>
          </div>
          <div className="footer-cols">
            {FOOTER_COLS.map((c) => (
              <div key={c.t}>
                <div className="footer-col-title">{c.t}</div>
                {c.links.map((l) => (
                  <button
                    key={l.l}
                    className="footer-link"
                    type="button"
                    onClick={() => router.push(l.h)}
                  >
                    {l.l}
                  </button>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="footer-bottom">
          <div className="footer-copy">© 2026 TKBees. All rights reserved.</div>
          <div className="footer-version">Built with ❤️ by TKBees</div>
        </div>
      </div>
    </footer>
  );
}
