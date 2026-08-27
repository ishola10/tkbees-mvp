"use client";

import { useMemo, useState } from "react";
import { RESOURCES } from "@/constants/content";
import { PageHero } from "../PageHero";
import { FilterChips } from "../FilterChips";

export function ResourcesPage() {
  const [search, setSearch] = useState("");
  const [cat, setCat] = useState("All");
  const categories = useMemo(() => ["All", ...Array.from(new Set(RESOURCES.map((r) => r.category)))], []);
  const filtered = RESOURCES.filter((r) => {
    const q = search.toLowerCase();
    const matchSearch = !q || r.title.toLowerCase().includes(q) || r.description.toLowerCase().includes(q);
    return matchSearch && (cat === "All" || r.category === cat);
  });

  return (
    <>
      <PageHero kicker="📚 Resource Library" kickerColor="#F5A524" titleHtml={<>Resource <em>Library</em></>} sub="Curated tools, guides, and playbooks to help you build your startup from scratch." />
      <div className="page-body">
        <div className="container">
          <div style={{ position: "relative", maxWidth: 480, marginBottom: "1.25rem" }}>
            <input className="form-inp" placeholder="Search resources..." value={search} onChange={(e) => setSearch(e.target.value)} style={{ paddingLeft: 42 }} />
            <svg style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "var(--muted)" }} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
            </svg>
          </div>
          <FilterChips chips={categories} onChange={setCat} />
          {filtered.length === 0 ? (
            <p style={{ textAlign: "center", color: "var(--muted)", padding: "4rem 0" }}>No resources found. Try a different search or category.</p>
          ) : (
            <div className="g3">
              {filtered.map((r) => (
                <a key={r.title} className="kb-card" href={r.url} target="_blank" rel="noopener noreferrer">
                  <div className="kb-hex-accent hex" style={{ background: r.color }} />
                  <div className="kb-hex-icon hex"><span style={{ fontSize: "1.3rem" }}>{r.emo}</span></div>
                  <div className="kb-tag">{r.category}</div>
                  <div className="kb-title">{r.title}</div>
                  <div className="card-desc" style={{ marginTop: 8 }}>{r.description}</div>
                  <div className="kb-meta">
                    <span className="kb-cta">Open →</span>
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
