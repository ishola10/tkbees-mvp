"use client";

import { useRouter } from "next/navigation";
import { FEATURES, PAIN_POINTS, STEPS, TESTIMONIALS } from "@/constants/content";
import { Reveal, useCountUp } from "../Reveal";

function HexGrid({ rows, cols }: { rows: number; cols: number }) {
  const paths: string[] = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const x = 60 + c * 78 + (r % 2 ? 39 : 0);
      const y = 60 + r * 68;
      paths.push(`M${x} ${y} l45 26 l0 52 l-45 26 l-45 -26 l0 -52 Z`);
    }
  }
  return (
    <g fill="none" stroke="currentColor" strokeWidth="2">
      {paths.map((d) => (
        <path key={d} d={d} />
      ))}
    </g>
  );
}

export function HomePage() {
  const router = useRouter();
  const students = useCountUp(500);
  const ideas = useCountUp(50);
  const unis = useCountUp(10);
  const mentors = useCountUp(20);

  return (
    <>
      <section className="hero grain relative">
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
          {Array.from({ length: 14 }, (_, i) => (
            <span
              key={i}
              className="pollen"
              style={{
                left: `${(i * 73) % 100}%`,
                bottom: `${(i * 17) % 30}%`,
                animationDelay: `${(i * 0.7) % 7}s`,
                opacity: 0.5,
              }}
            />
          ))}
        </div>
        <div className="container">
          <div className="hero-grid-layout">
            <div>
              <Reveal className="hero-eyebrow">
                <span className="hero-eyebrow-lime">✦</span> The #1 University Startup Ecosystem
              </Reveal>
              <Reveal as="h1" className="hero-h1">
                Where Student Ideas{" "}
                <em style={{ position: "relative" }}>
                  Take Flight
                  <svg viewBox="0 0 200 22" className="hero-underline" aria-hidden="true" preserveAspectRatio="none">
                    <path d="M2 14 C 50 4, 150 4, 198 14" stroke="#C6F432" strokeWidth="8" fill="none" strokeLinecap="round" />
                  </svg>
                </em>
              </Reveal>
              <Reveal as="p" className="hero-sub">
                The entrepreneurship ecosystem that helps university students turn brilliant ideas into real startups. Get mentorship, resources, and a community of builders.
              </Reveal>
              <Reveal className="hero-ctas">
                <button className="btn-indigo btn-lg buzz-hover" type="button" onClick={() => router.push("/register")}>
                  Join as Student
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </button>
                <button className="btn-secondary btn-lg" type="button" onClick={() => router.push("/universities")}>
                  Partner with Us
                </button>
              </Reveal>
              <Reveal className="hero-stats" style={{ gridTemplateColumns: "repeat(4, minmax(0, 1fr))", maxWidth: 560 }}>
                <div>
                  <div className="hstat-val">{students}+</div>
                  <div className="hstat-lbl">Students</div>
                </div>
                <div>
                  <div className="hstat-val">{ideas}+</div>
                  <div className="hstat-lbl">Ideas submitted</div>
                </div>
                <div>
                  <div className="hstat-val">{unis}+</div>
                  <div className="hstat-lbl">Universities</div>
                </div>
                <div>
                  <div className="hstat-val">{mentors}+</div>
                  <div className="hstat-lbl">Mentors</div>
                </div>
              </Reveal>
            </div>
            <div style={{ position: "relative" }}>
              <div className="hero-img-wrap">
                <img
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=900&q=85&fit=crop"
                  alt="Students collaborating"
                  style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
                />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg,rgba(30,27,75,0.45),rgba(30,27,75,0.15))" }} />
                <div className="hero-live-badge">
                  <span style={{ position: "relative", display: "flex", width: 8, height: 8 }}>
                    <span className="ping" style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "var(--indigo)", opacity: 0.6 }} />
                    <span style={{ position: "relative", width: 8, height: 8, borderRadius: "50%", background: "var(--indigo)" }} />
                  </span>
                  The hive is live
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pillars-wrap">
        <div className="container">
          <Reveal>
            <div className="section-kicker" style={{ color: "var(--honey-dark)" }}>The Problem</div>
            <h2 className="section-h2">Brilliant Ideas Deserve Better <em>Support</em></h2>
            <p className="section-sub">Every year, thousands of game-changing ideas stay trapped in lecture halls and group chats.</p>
          </Reveal>
          <div className="g3" style={{ marginTop: "2rem" }}>
            {PAIN_POINTS.map((p) => (
              <Reveal key={p.t} className="help-card">
                <div style={{ fontSize: "2rem", marginBottom: ".5rem" }}>{p.e}</div>
                <div style={{ fontFamily: "var(--fd)", fontWeight: 800, fontSize: "1.15rem", marginBottom: 6 }}>{p.t}</div>
                <div style={{ fontSize: 14, color: "var(--muted)", lineHeight: 1.55 }}>{p.d}</div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="kb-wrap">
        <div className="container">
          <Reveal>
            <div className="section-kicker" style={{ color: "var(--honey-dark)" }}>The Solution</div>
            <h2 className="section-h2">Everything You Need to <em>Launch</em></h2>
            <p className="section-sub">TKBees provides a complete ecosystem — from idea validation to your first paying customer.</p>
          </Reveal>
          <div className="g3" style={{ marginTop: "2rem" }}>
            {FEATURES.map((f) => (
              <Reveal key={f.t} className="card">
                <div className="card-body">
                  <div style={{ fontSize: "1.6rem", marginBottom: 8 }}>{f.e}</div>
                  <div className="card-title">{f.t}</div>
                  <div className="card-desc">{f.d}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bootcamp-wrap">
        <svg viewBox="0 0 600 600" style={{ position: "absolute", right: "-10rem", top: "-5rem", width: 640, height: 640, opacity: 0.06, color: "var(--cream)" }} aria-hidden="true">
          <HexGrid rows={7} cols={7} />
        </svg>
        <div className="container">
          <Reveal>
            <div className="hero-eyebrow" style={{ background: "var(--honey)", color: "var(--indigo)", marginBottom: "1.25rem" }}>How it works</div>
            <h2 style={{ fontFamily: "var(--fd)", fontSize: "clamp(32px,4.5vw,62px)", fontWeight: 900, lineHeight: 0.95, marginBottom: "1rem" }}>
              Three Steps to <em style={{ fontStyle: "italic", color: "var(--honey)" }}>Liftoff</em>
            </h2>
          </Reveal>
          <div className="g3" style={{ marginTop: "2rem" }}>
            {STEPS.map((s) => (
              <Reveal key={s.num} className="step-card">
                <div style={{ display: "flex", alignItems: "center", gap: ".5rem", marginBottom: ".4rem" }}>
                  <span className="step-num">{s.num}</span>
                </div>
                <div className="step-title">{s.t}</div>
                <div className="step-desc">{s.d}</div>
              </Reveal>
            ))}
          </div>
          <div style={{ marginTop: "2.5rem" }}>
            <button className="btn-primary" type="button" onClick={() => router.push("/register")}>Get Started Now →</button>
          </div>
        </div>
      </section>

      <section className="join-wrap">
        <div className="container">
          <div className="join-grid">
            <Reveal>
              <div style={{ fontSize: 10.5, fontWeight: 800, textTransform: "uppercase", letterSpacing: ".22em", marginBottom: "1rem" }}>Community</div>
              <h2 className="join-h2">Join the <em>Hive</em></h2>
              <p className="join-sub">Connect with hundreds of student entrepreneurs in our Discord community. Share ideas, find co-founders, and get real-time feedback.</p>
            </Reveal>
            <Reveal style={{ display: "flex", alignItems: "center" }}>
              <button className="btn-lime btn-lg" type="button" onClick={() => router.push("/community")}>Explore Community →</button>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="service-rail">
        <div className="container" style={{ textAlign: "center" }}>
          <Reveal>
            <div className="section-kicker" style={{ color: "var(--honey-dark)" }}>Events</div>
            <h2 className="section-h2">Upcoming <em>Events</em></h2>
            <p className="section-sub" style={{ margin: "0 auto" }}>Pitch nights, workshops, hackathons, and networking events designed to accelerate student startups.</p>
            <div style={{ marginTop: "1.5rem" }}>
              <button className="btn-indigo" type="button" onClick={() => router.push("/events")}>View All Events →</button>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="talent-section">
        <div className="container">
          <div className="dash-card" style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "1.5rem", justifyContent: "space-between" }}>
            <div>
              <div className="section-kicker" style={{ color: "var(--honey-dark)" }}>Universities</div>
              <h2 className="section-h2" style={{ fontSize: "clamp(28px,3vw,42px)" }}>University <em>Partner</em> Program</h2>
              <p className="section-sub">Bring the TKBees entrepreneurship ecosystem to your campus. Free for MVP partners — help your students build real startups.</p>
            </div>
            <button className="btn-primary" type="button" onClick={() => router.push("/universities")}>Learn More →</button>
          </div>
        </div>
      </section>

      <section className="testimonials-wrap">
        <div className="container">
          <Reveal style={{ marginBottom: "3rem" }}>
            <div className="section-kicker" style={{ color: "var(--honey-dark)" }}>Testimonials</div>
            <h2 className="section-h2">What Founders <em>Say</em></h2>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: "1.25rem" }}>
            {TESTIMONIALS.map((t) => (
              <Reveal as="figure" className="testimonial-card" key={t.name}>
                <div className="testimonial-quote-mark" style={{ color: t.clr }}>&quot;</div>
                <blockquote className="testimonial-blockquote">{t.q}</blockquote>
                <figcaption className="testimonial-figcaption">
                  <div>
                    <div className="testimonial-name">{t.name}</div>
                    <div className="testimonial-role">{t.role}</div>
                  </div>
                </figcaption>
                <span className="testimonial-hex-bg hex" style={{ background: t.clr }} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="join-wrap">
        <svg viewBox="0 0 600 600" style={{ position: "absolute", left: "-8rem", top: "-8rem", width: 700, height: 700, opacity: 0.12, color: "var(--indigo)" }} aria-hidden="true">
          <HexGrid rows={8} cols={8} />
        </svg>
        <div className="container" style={{ textAlign: "center", position: "relative" }}>
          <Reveal>
            <h2 className="join-h2">Ready to Build Something <em>Amazing?</em></h2>
            <p className="join-sub" style={{ margin: "0 auto 2rem" }}>Join hundreds of university students already turning their ideas into startups.</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center" }}>
              <button className="btn-lime btn-lg" type="button" onClick={() => router.push("/register")}>Join TKBees Today →</button>
              <button className="btn-ghost btn-lg" type="button" onClick={() => router.push("/ai-coach")}>Try AI Coach Free</button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
