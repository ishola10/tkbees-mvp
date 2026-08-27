"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { useUi } from "@/providers/UiProvider";
import { PageHero } from "../PageHero";
import { addIdea, addStudent } from "@/lib/hiveStore";
import { DISCORD_URL, STARTER_QUESTIONS } from "@/constants/content";
import { matchBuzzFaq } from "@/constants/buzzFaq";

export function RegisterPage() {
  const { showToast } = useUi();
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({
    name: "", email: "", university: "", course: "", year: "", entrepreneurType: "", bio: "", referralSource: "",
  });
  const set = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }));

  if (done) {
    return (
      <div className="page-body">
        <div className="container" style={{ maxWidth: 560, textAlign: "center", padding: "4rem 1rem" }}>
          <div style={{ fontSize: "3.5rem", marginBottom: "1rem" }}>🐝</div>
          <h1 className="page-hero-h1">Welcome to the <em>Hive!</em></h1>
          <p className="page-hero-sub" style={{ margin: "1rem auto 2rem" }}>You are now part of the TKBees community. Here are your next steps:</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, maxWidth: 360, margin: "0 auto" }}>
            <Link href="/submit-idea" className="btn-primary" style={{ justifyContent: "center" }}>Submit Your Idea →</Link>
            <a href={DISCORD_URL} target="_blank" rel="noopener noreferrer" className="btn-indigo" style={{ justifyContent: "center" }}>Join Our Discord</a>
            <Link href="/ai-coach" className="btn-secondary" style={{ justifyContent: "center" }}>Talk to AI Coach</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <PageHero kicker="🐝 Join TKBees" kickerColor="#F5A524" titleHtml={<>Join <em>TKBees</em></>} sub="Start your entrepreneurship journey today. It takes less than 2 minutes." />
      <div className="page-body">
        <div className="container" style={{ maxWidth: 560 }}>
          <form
            className="dash-card"
            onSubmit={(e) => {
              e.preventDefault();
              if (!form.name || !form.email || !form.university || !form.course || !form.year || !form.entrepreneurType) {
                showToast("⚠️", "Please fill in all required fields.", "");
                return;
              }
              addStudent(form);
              setDone(true);
              showToast("🎉", "Welcome to TKBees! 🐝", "");
            }}
          >
            <div className="form-group"><label className="form-lbl">Full Name *</label><input className="form-inp" value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="e.g. Amara Okafor" /></div>
            <div className="form-group"><label className="form-lbl">Email *</label><input className="form-inp" type="email" value={form.email} onChange={(e) => set("email", e.target.value)} placeholder="you@university.edu" /></div>
            <div className="form-group"><label className="form-lbl">University *</label><input className="form-inp" value={form.university} onChange={(e) => set("university", e.target.value)} placeholder="e.g. University of Lagos" /></div>
            <div className="form-group"><label className="form-lbl">Course / Major *</label><input className="form-inp" value={form.course} onChange={(e) => set("course", e.target.value)} placeholder="e.g. Computer Science" /></div>
            <div className="form-2col">
              <div className="form-group">
                <label className="form-lbl">Year of Study *</label>
                <select className="form-sel" value={form.year} onChange={(e) => set("year", e.target.value)}>
                  <option value="">Select year</option>
                  {["Year 1", "Year 2", "Year 3", "Year 4", "Postgraduate"].map((y) => <option key={y}>{y}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label className="form-lbl">What type of entrepreneur are you? *</label>
                <select className="form-sel" value={form.entrepreneurType} onChange={(e) => set("entrepreneurType", e.target.value)}>
                  <option value="">Select stage</option>
                  {["Idea Stage", "Early Stage", "Growing"].map((t) => <option key={t}>{t}</option>)}
                </select>
              </div>
            </div>
            <div className="form-group"><label className="form-lbl">Brief Bio</label><textarea className="form-inp" rows={3} value={form.bio} onChange={(e) => set("bio", e.target.value)} placeholder="Tell us about yourself and your entrepreneurial interests..." style={{ resize: "vertical" }} /></div>
            <div className="form-group">
              <label className="form-lbl">How did you hear about TKBees?</label>
              <select className="form-sel" value={form.referralSource} onChange={(e) => set("referralSource", e.target.value)}>
                <option value="">Select option</option>
                {["Social Media", "University", "Friend / Word of Mouth", "Event", "Search Engine", "Other"].map((r) => <option key={r}>{r}</option>)}
              </select>
            </div>
            <button className="btn-primary btn-lg" type="submit" style={{ width: "100%", justifyContent: "center" }}>Join TKBees</button>
            <p style={{ fontSize: 12, color: "var(--dim)", textAlign: "center", marginTop: 12 }}>Your information is stored securely and used only for the TKBees community.</p>
          </form>
        </div>
      </div>
    </>
  );
}

export function SubmitIdeaPage() {
  const { showToast } = useUi();
  const [done, setDone] = useState(false);
  const [pitchName, setPitchName] = useState("");
  const [form, setForm] = useState({
    studentEmail: "", ideaName: "", problem: "", targetAudience: "", solution: "", stage: "", industry: "", teamSize: "1", supportNeeded: [] as string[],
  });
  const set = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }));
  const stages = ["Just an idea", "Working on it", "Have early users"];
  const industries = ["Fintech", "Edtech", "Healthtech", "Agritech", "E-commerce", "SaaS", "Social Impact", "Logistics", "Entertainment", "Other"];
  const supportOptions = ["Mentorship", "Co-founder", "Funding", "Technical Help", "Marketing"];

  if (done) {
    return (
      <div className="page-body">
        <div className="container" style={{ maxWidth: 560, textAlign: "center", padding: "4rem 1rem" }}>
          <div style={{ fontSize: "3.5rem", marginBottom: "1rem" }}>🚀</div>
          <h1 className="page-hero-h1">Idea <em>Submitted!</em></h1>
          <p className="page-hero-sub" style={{ margin: "1rem auto 2rem" }}>Your startup idea is now in our system. Our team will review it and connect you with the right resources.</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center" }}>
            <Link href="/ai-coach" className="btn-indigo" style={{ justifyContent: "center" }}>Talk to AI Coach →</Link>
            <Link href="/resources" className="btn-secondary" style={{ justifyContent: "center" }}>Browse Resources</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <PageHero kicker="💡 Submit Your Idea" kickerColor="#C6F432" titleHtml={<>Submit Your <em>Idea</em></>} sub="Share your startup idea and get matched with the right support." />
      <div className="page-body">
        <div className="container" style={{ maxWidth: 640 }}>
          <form
            className="dash-card"
            onSubmit={(e) => {
              e.preventDefault();
              if (!form.studentEmail || !form.ideaName || !form.problem || !form.solution || !form.stage || !form.industry) {
                showToast("⚠️", "Please fill in all required fields.", "");
                return;
              }
              addIdea({ ...form, pitchDeckName: pitchName || undefined });
              setDone(true);
              showToast("🚀", "Idea submitted!", "");
            }}
          >
            <div className="form-group"><label className="form-lbl">Your Email *</label><input className="form-inp" type="email" value={form.studentEmail} onChange={(e) => set("studentEmail", e.target.value)} placeholder="you@university.edu" /></div>
            <div className="form-group"><label className="form-lbl">Idea Name *</label><input className="form-inp" value={form.ideaName} onChange={(e) => set("ideaName", e.target.value)} placeholder="e.g. CampusPay" /></div>
            <div className="form-group"><label className="form-lbl">Problem Being Solved *</label><textarea className="form-inp" rows={3} value={form.problem} onChange={(e) => set("problem", e.target.value)} placeholder="What problem does your idea solve?" style={{ resize: "vertical" }} /></div>
            <div className="form-group"><label className="form-lbl">Target Audience</label><input className="form-inp" value={form.targetAudience} onChange={(e) => set("targetAudience", e.target.value)} placeholder="e.g. University students in Nigeria" /></div>
            <div className="form-group"><label className="form-lbl">Solution Description *</label><textarea className="form-inp" rows={3} value={form.solution} onChange={(e) => set("solution", e.target.value)} placeholder="Describe your solution in detail..." style={{ resize: "vertical" }} /></div>
            <div className="form-2col">
              <div className="form-group">
                <label className="form-lbl">Stage *</label>
                <select className="form-sel" value={form.stage} onChange={(e) => set("stage", e.target.value)}>
                  <option value="">Select stage</option>
                  {stages.map((s) => <option key={s}>{s}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label className="form-lbl">Industry *</label>
                <select className="form-sel" value={form.industry} onChange={(e) => set("industry", e.target.value)}>
                  <option value="">Select industry</option>
                  {industries.map((s) => <option key={s}>{s}</option>)}
                </select>
              </div>
            </div>
            <div className="form-group"><label className="form-lbl">Team Size</label><input className="form-inp" type="number" min={1} max={20} value={form.teamSize} onChange={(e) => set("teamSize", e.target.value)} /></div>
            <div className="form-group">
              <label className="form-lbl">What support do you need?</label>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {supportOptions.map((s) => (
                  <button key={s} type="button" className={`fchip${form.supportNeeded.includes(s) ? " on" : ""}`} onClick={() => setForm((p) => ({ ...p, supportNeeded: p.supportNeeded.includes(s) ? p.supportNeeded.filter((x) => x !== s) : [...p.supportNeeded, s] }))}>{s}</button>
                ))}
              </div>
            </div>
            <div className="form-group">
              <label className="form-lbl">Pitch Deck (optional)</label>
              <input className="form-inp" type="file" accept=".pdf,.ppt,.pptx" onChange={(e) => setPitchName(e.target.files?.[0]?.name ?? "")} />
              {pitchName ? <p style={{ fontSize: 12, color: "var(--dim)", marginTop: 6 }}>{pitchName}</p> : null}
            </div>
            <button className="btn-lime btn-lg" type="submit" style={{ width: "100%", justifyContent: "center" }}>Submit Idea</button>
          </form>
        </div>
      </div>
    </>
  );
}

type ChatMsg = { role: "user" | "assistant"; content: string };

export function AiCoachPage() {
  const [messages, setMessages] = useState<ChatMsg[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const send = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || busy) return;
    setBusy(true);
    setMessages((prev) => [...prev, { role: "user", content: trimmed }]);
    setInput("");
    const reply = matchBuzzFaq(trimmed).answer;
    window.setTimeout(() => {
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
      setBusy(false);
      inputRef.current?.focus();
    }, 400);
  };

  return (
    <>
      <PageHero
        kicker="🤖 AI Startup Coach"
        kickerColor="#1E1B4B"
        titleHtml={<>AI Startup <em>Coach</em></>}
        sub="Powered by AI • Your personal entrepreneurship advisor"
      />
      <div className="page-body">
        <div className="container" style={{ maxWidth: 800 }}>
          {messages.length === 0 ? (
            <div style={{ textAlign: "center", padding: "1rem 0 2rem" }}>
              <div style={{ fontSize: "2.5rem", marginBottom: 8 }}>✨</div>
              <h2 className="section-h2" style={{ fontSize: "1.8rem" }}>Welcome to AI Startup Coach</h2>
              <p className="section-sub" style={{ margin: "0 auto 1.5rem" }}>Ask me anything about starting a business, validating ideas, building MVPs, or finding customers.</p>
              <div className="g2">
                {STARTER_QUESTIONS.map((q) => (
                  <button key={q} type="button" className="help-card" style={{ textAlign: "left", width: "100%" }} onClick={() => send(q)}>
                    <div style={{ fontSize: 12, color: "var(--honey-dark)", fontWeight: 700, marginBottom: 6 }}>✦ Prompt</div>
                    <div style={{ fontFamily: "var(--fd)", fontWeight: 800 }}>{q}</div>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 16 }}>
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <button type="button" className="btn-ghost btn-sm" style={{ color: "var(--indigo)", borderColor: "var(--border)" }} onClick={() => setMessages([])}>Clear chat</button>
              </div>
              {messages.map((m, i) => (
                <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start" }}>
                  <div className="dash-card" style={{ maxWidth: "80%", padding: "12px 16px", background: m.role === "user" ? "var(--honey-pale)" : "var(--white)" }}>
                    <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".12em", color: "var(--dim)", marginBottom: 6 }}>{m.role === "user" ? "You" : "Coach"}</div>
                    <div style={{ fontSize: 14, lineHeight: 1.55, whiteSpace: "pre-wrap" }}>{m.content.replace(/\*\*(.+?)\*\*/g, "$1")}</div>
                  </div>
                </div>
              ))}
              {busy ? <div style={{ fontSize: 13, color: "var(--dim)" }}>Thinking...</div> : null}
            </div>
          )}
          <form
            className="dash-card"
            style={{ display: "flex", gap: 10, alignItems: "center" }}
            onSubmit={(e) => { e.preventDefault(); send(input); }}
          >
            <input
              ref={inputRef}
              className="form-inp"
              placeholder="Ask about your startup idea..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={busy}
            />
            <button className="btn-primary" type="submit" disabled={busy || !input.trim()}>Send</button>
          </form>
          <p style={{ fontSize: 12, color: "var(--dim)", marginTop: 10 }}>AI Coach is for guidance only. Connect with our community for human mentorship.</p>
        </div>
      </div>
    </>
  );
}
