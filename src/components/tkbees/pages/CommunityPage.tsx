"use client";

import Link from "next/link";
import { COMMUNITY_STATS, DISCORD_URL, FEATURED_MEMBERS, GUIDELINES } from "@/constants/content";
import { PageHero } from "../PageHero";
import { Reveal, useCountUp } from "../Reveal";

function Stat({ n, suffix, lbl }: { n: number; suffix: string; lbl: string }) {
  const val = useCountUp(n);
  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ fontFamily: "var(--fm)", fontWeight: 800, fontSize: "1.6rem" }}>{val}{suffix}</div>
      <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 4 }}>{lbl}</div>
    </div>
  );
}

export function CommunityPage() {
  return (
    <>
      <PageHero
        kicker="🐝 The Hive Community"
        kickerColor="#1E1B4B"
        titleHtml={<>The <em>Hive</em> Community</>}
        sub="A vibrant community of student entrepreneurs building the future together."
      />
      <div className="page-body">
        <div className="container">
          <div style={{ textAlign: "center", marginTop: "-1.5rem", marginBottom: "2.5rem" }}>
            <a href={DISCORD_URL} target="_blank" rel="noopener noreferrer" className="btn-indigo btn-lg">Join Our Discord →</a>
          </div>
          <div className="dash-card" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(140px,1fr))", gap: "1.5rem", marginBottom: "3rem" }}>
            {COMMUNITY_STATS.map((s) => <Stat key={s.lbl} n={s.n} suffix={s.suffix} lbl={s.lbl} />)}
          </div>
          <Reveal>
            <h2 className="section-h2" style={{ textAlign: "center", marginBottom: "1.5rem" }}>Community <em>Guidelines</em></h2>
          </Reveal>
          <div className="g4" style={{ marginBottom: "3rem" }}>
            {GUIDELINES.map((g) => (
              <Reveal key={g.t} className="help-card">
                <div style={{ fontSize: "1.6rem", marginBottom: 8 }}>{g.e}</div>
                <div style={{ fontFamily: "var(--fd)", fontWeight: 800, marginBottom: 6 }}>{g.t}</div>
                <div style={{ fontSize: 13.5, color: "var(--muted)", lineHeight: 1.5 }}>{g.d}</div>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <h2 className="section-h2" style={{ textAlign: "center", marginBottom: "1.5rem" }}>Featured <em>Members</em></h2>
          </Reveal>
          <div className="g4" style={{ marginBottom: "3rem" }}>
            {FEATURED_MEMBERS.map((m) => (
              <Reveal key={m.name} className="comm-card" style={{ textAlign: "center" }}>
                <div style={{ width: 64, height: 64, borderRadius: "50%", background: "var(--honey-pale)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.6rem", margin: "0 auto 12px" }}>{m.emo}</div>
                <div style={{ fontFamily: "var(--fd)", fontWeight: 800 }}>{m.name}</div>
                <div style={{ color: "var(--honey-dark)", fontSize: 13, fontWeight: 700 }}>{m.role}</div>
                <div style={{ fontSize: 12, color: "var(--dim)", marginTop: 4 }}>{m.university}</div>
              </Reveal>
            ))}
          </div>
          <div style={{ textAlign: "center", padding: "2rem 0 1rem" }}>
            <h2 className="section-h2">Ready to Join the <em>Hive</em>?</h2>
            <p className="section-sub" style={{ margin: "0 auto 1.25rem" }}>Register as a student and get instant access to the community.</p>
            <Link href="/register" className="btn-primary btn-lg">Register Now →</Link>
          </div>
        </div>
      </div>
    </>
  );
}
