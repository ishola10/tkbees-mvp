"use client";

import { useState } from "react";
import { UNI_BENEFITS, UNI_INTERESTS, UNI_TIERS } from "@/constants/content";
import { useUi } from "@/providers/UiProvider";
import { addPartnership } from "@/lib/hiveStore";
import { PageHero } from "../PageHero";
import { Reveal } from "../Reveal";

export function UniversitiesPage() {
  const { showToast } = useUi();
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({
    universityName: "", contactName: "", role: "", email: "", phone: "", interests: [] as string[], message: "",
  });
  const set = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }));

  if (done) {
    return (
      <div className="page-body">
        <div className="container" style={{ maxWidth: 560, textAlign: "center", padding: "4rem 1rem" }}>
          <div style={{ fontSize: "3.5rem", marginBottom: "1rem" }}>✅</div>
          <h1 className="page-hero-h1">Thank <em>You!</em></h1>
          <p className="page-hero-sub" style={{ margin: "1rem auto 0" }}>We&apos;ve received your expression of interest. Our team will be in touch within 48 hours.</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <PageHero
        kicker="🎓 University Partner Program"
        kickerColor="#F5A524"
        titleHtml={<>University <em>Partner</em> Program</>}
        sub="Bring a world-class entrepreneurship ecosystem to your campus. Partner with TKBees to empower your students."
      />
      <div className="page-body">
        <div className="container">
          <Reveal>
            <h2 className="section-h2" style={{ textAlign: "center", marginBottom: "1.5rem" }}>Why <em>Partner</em> with TKBees?</h2>
          </Reveal>
          <div className="g3" style={{ marginBottom: "3rem" }}>
            {UNI_BENEFITS.map((b) => (
              <Reveal key={b.t} className="uni-card">
                <div style={{ fontSize: "1.6rem", marginBottom: 8 }}>{b.e}</div>
                <div style={{ fontFamily: "var(--fd)", fontWeight: 800, marginBottom: 6 }}>{b.t}</div>
                <div style={{ fontSize: 13.5, color: "var(--muted)", lineHeight: 1.5 }}>{b.d}</div>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <h2 className="section-h2" style={{ textAlign: "center" }}>Partnership <em>Tiers</em></h2>
            <p className="section-sub" style={{ margin: "0 auto 1.5rem", textAlign: "center" }}>All tiers are free during our MVP phase.</p>
          </Reveal>
          <div className="g3" style={{ marginBottom: "3rem" }}>
            {UNI_TIERS.map((tier) => (
              <div key={tier.name} className="dash-card" style={tier.highlighted ? { outline: "2px solid var(--honey)" } : undefined}>
                <div className="dc-title">{tier.name}</div>
                <div style={{ fontFamily: "var(--fm)", fontWeight: 800, color: "var(--honey-dark)", fontSize: "1.4rem", margin: "8px 0 14px" }}>
                  Free <span style={{ fontSize: 11, color: "var(--dim)", fontWeight: 600 }}>/ MVP</span>
                </div>
                <ul style={{ paddingLeft: 18, color: "var(--muted)", fontSize: 13.5, lineHeight: 1.7 }}>
                  {tier.features.map((f) => <li key={f}>{f}</li>)}
                </ul>
              </div>
            ))}
          </div>
          <div className="container" style={{ maxWidth: 600, padding: 0 }}>
            <h2 className="section-h2" style={{ textAlign: "center" }}>Express <em>Interest</em></h2>
            <p className="section-sub" style={{ margin: "0 auto 1.5rem", textAlign: "center" }}>Tell us about your university and how we can work together.</p>
            <form
              className="dash-card"
              onSubmit={(e) => {
                e.preventDefault();
                if (!form.universityName || !form.contactName || !form.email || !form.role) {
                  showToast("⚠️", "Please fill in all required fields.", "");
                  return;
                }
                addPartnership(form);
                setDone(true);
                showToast("🎓", "Partnership enquiry submitted!", "");
              }}
            >
              <div className="form-group"><label className="form-lbl">University Name *</label><input className="form-inp" value={form.universityName} onChange={(e) => set("universityName", e.target.value)} placeholder="e.g. University of Lagos" /></div>
              <div className="form-2col">
                <div className="form-group"><label className="form-lbl">Contact Name *</label><input className="form-inp" value={form.contactName} onChange={(e) => set("contactName", e.target.value)} placeholder="Full name" /></div>
                <div className="form-group"><label className="form-lbl">Role *</label><input className="form-inp" value={form.role} onChange={(e) => set("role", e.target.value)} placeholder="e.g. Dean of Innovation" /></div>
              </div>
              <div className="form-2col">
                <div className="form-group"><label className="form-lbl">Email *</label><input className="form-inp" type="email" value={form.email} onChange={(e) => set("email", e.target.value)} placeholder="you@university.edu" /></div>
                <div className="form-group"><label className="form-lbl">Phone</label><input className="form-inp" type="tel" value={form.phone} onChange={(e) => set("phone", e.target.value)} placeholder="+234..." /></div>
              </div>
              <div className="form-group">
                <label className="form-lbl">What are you interested in?</label>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {UNI_INTERESTS.map((opt) => (
                    <button key={opt} type="button" className={`fchip${form.interests.includes(opt) ? " on" : ""}`} onClick={() => setForm((p) => ({ ...p, interests: p.interests.includes(opt) ? p.interests.filter((i) => i !== opt) : [...p.interests, opt] }))}>{opt}</button>
                  ))}
                </div>
              </div>
              <div className="form-group"><label className="form-lbl">Message</label><textarea className="form-inp" rows={3} value={form.message} onChange={(e) => set("message", e.target.value)} placeholder="Tell us more about your goals..." style={{ resize: "vertical" }} /></div>
              <button className="btn-primary btn-lg" type="submit" style={{ width: "100%", justifyContent: "center" }}>Submit Expression of Interest</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
