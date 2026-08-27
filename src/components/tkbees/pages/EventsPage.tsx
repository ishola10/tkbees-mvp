"use client";

import { useMemo, useState } from "react";
import { EVENTS, OPPORTUNITIES } from "@/constants/content";
import { PageHero } from "../PageHero";
import { FilterChips } from "../FilterChips";
import { Reveal } from "../Reveal";

export function EventsPage() {
  const [type, setType] = useState("All");
  const types = useMemo(() => ["All", ...Array.from(new Set(EVENTS.map((e) => e.type)))], []);
  const filtered = type === "All" ? EVENTS : EVENTS.filter((e) => e.type === type);

  return (
    <>
      <PageHero kicker="📅 Events & Opportunities" kickerColor="#F5A524" titleHtml={<>Events & <em>Opportunities</em></>} sub="Attend workshops, pitch nights, and competitions designed for student founders." />
      <div className="page-body">
        <div className="container">
          <FilterChips chips={types} onChange={setType} />
          {filtered.length === 0 ? (
            <p style={{ textAlign: "center", color: "var(--muted)", padding: "3rem 0" }}>No events match this filter. Check back soon!</p>
          ) : (
            <div className="g2" style={{ marginBottom: "3rem" }}>
              {filtered.map((ev) => (
                <div className="event-full-card" key={ev.title}>
                  <div className="event-full-card-topbar">
                    <span className="card-tag" style={{ background: "rgba(245,165,36,.12)", color: "var(--honey-dark)" }}>{ev.type}</span>
                    <span style={{ fontFamily: "var(--fm)", fontSize: 12, color: "var(--dim)" }}>{ev.date}</span>
                  </div>
                  <div className="card-title" style={{ marginTop: 10 }}>{ev.title}</div>
                  <p className="card-desc">{ev.description}</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", fontSize: 12.5, color: "var(--muted)", marginTop: 12 }}>
                    <span>🕐 {ev.time}</span>
                    <span>📍 {ev.location}</span>
                  </div>
                  {ev.registrationUrl ? (
                    <a href={ev.registrationUrl} target="_blank" rel="noopener noreferrer" className="btn-primary btn-sm" style={{ marginTop: 14 }}>Register →</a>
                  ) : null}
                </div>
              ))}
            </div>
          )}
          <Reveal>
            <h2 className="section-h2" style={{ textAlign: "center", marginBottom: "1.5rem" }}><em>Opportunities</em></h2>
          </Reveal>
          <div className="g3">
            {OPPORTUNITIES.map((o) => (
              <Reveal key={o.t} className="help-card">
                <div style={{ fontSize: "1.6rem", marginBottom: 8 }}>{o.e}</div>
                <span className="card-tag" style={{ background: "rgba(30,27,75,.08)", color: "var(--indigo)" }}>{o.type}</span>
                <div style={{ fontFamily: "var(--fd)", fontWeight: 800, fontSize: "1.1rem", margin: "10px 0 6px" }}>{o.t}</div>
                <div style={{ fontSize: 13.5, color: "var(--muted)", lineHeight: 1.5 }}>{o.d}</div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
