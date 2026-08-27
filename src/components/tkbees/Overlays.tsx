"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { NOTIFS, SEARCH_PILLS } from "@/constants/nav";
import { useUi } from "@/providers/UiProvider";
import { BeeHex } from "./BrandMark";

export function SearchOverlay() {
  const { searchOpen, closeSearch, showToast } = useUi();
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [q, setQ] = useState("");

  useEffect(() => {
    if (searchOpen) setTimeout(() => inputRef.current?.focus(), 100);
  }, [searchOpen]);

  const run = (value: string) => {
    closeSearch();
    setQ("");
    showToast("🔍", `Results for "${value}"`, "Searching resources");
    router.push("/resources");
  };

  return (
    <div className={`srch-overlay${searchOpen ? " open" : ""}`} onClick={(e) => e.target === e.currentTarget && closeSearch()}>
      <div className="srch-box">
        <div className="srch-input-wrap">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            placeholder="Search resources, events, ideas…"
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              if (e.target.value.length > 2) showToast("🔍", "Searching...", "");
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && q.trim()) run(q);
              if (e.key === "Escape") closeSearch();
            }}
          />
          <button className="srch-close" type="button" onClick={closeSearch}>✕</button>
        </div>
        <div className="srch-pills">
          {SEARCH_PILLS.map((p) => (
            <button key={p} className="srch-pill" type="button" onClick={() => run(p)}>
              {p}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export function NotificationPanel() {
  const { panel, closePanel } = useUi();
  const open = panel === "notif";
  return (
    <div className={`panel-overlay${open ? " open" : ""}`} onClick={closePanel}>
      <div className={`panel${open ? " open" : ""}`} onClick={(e) => e.stopPropagation()}>
        <div className="panel-hdr">
          <div className="panel-title">Notifications</div>
          <button className="panel-close" type="button" onClick={closePanel}>✕</button>
        </div>
        <div className="panel-body">
          {NOTIFS.map((n) => (
            <div className="notif-item" key={n.time + n.text}>
              <div className="notif-dot" style={{ background: n.dot }} />
              <div>
                <div className="notif-text" dangerouslySetInnerHTML={{ __html: n.text }} />
                <div className="notif-time">{n.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ProfilePanel() {
  const { panel, closePanel, showToast } = useUi();
  const router = useRouter();
  const open = panel === "profile";
  const go = (href: string) => {
    closePanel();
    router.push(href);
  };
  return (
    <div className={`panel-overlay${open ? " open" : ""}`} onClick={closePanel}>
      <div className={`panel${open ? " open" : ""}`} onClick={(e) => e.stopPropagation()}>
        <div className="panel-hdr">
          <div className="panel-title">My Profile</div>
          <button className="panel-close" type="button" onClick={closePanel}>✕</button>
        </div>
        <div className="panel-body">
          <div style={{ textAlign: "center" }}>
            <div className="profile-avatar-ring">
              <div className="profile-avatar-inner">AK</div>
            </div>
            <div style={{ fontFamily: "var(--fd)", fontWeight: 900, fontSize: "1.1rem", marginBottom: 3 }}>Alex Kim</div>
            <div style={{ fontSize: 12, color: "var(--dim)", marginBottom: "1rem" }}>Student · Idea Stage</div>
            <div style={{ display: "flex", justifyContent: "center", gap: "1.5rem", marginBottom: "1.25rem", paddingBottom: "1.25rem", borderBottom: "1px solid var(--border)" }}>
              {[["1", "Idea"], ["Hive", "Member"], ["AI", "Coach"]].map(([n, l]) => (
                <div className="profile-stat" key={l}>
                  <div className="profile-stat-n">{n}</div>
                  <div className="profile-stat-l">{l}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {[
              ["💡", "Submit an idea", "/submit-idea"],
              ["🤖", "AI Coach", "/ai-coach"],
              ["🐝", "Community", "/community"],
              ["📚", "Resources", "/resources"],
            ].map(([e, l, h]) => (
              <button
                key={l}
                type="button"
                onClick={() => go(h)}
                style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", borderRadius: 10, border: "none", background: "none", fontFamily: "var(--fb)", fontSize: 13.5, color: "var(--indigo)", cursor: "pointer", width: "100%", textAlign: "left" }}
                onMouseOver={(ev) => (ev.currentTarget.style.background = "var(--cream-dark)")}
                onMouseOut={(ev) => (ev.currentTarget.style.background = "none")}
              >
                <span>{e}</span>
                {l}
              </button>
            ))}
            <button
              type="button"
              style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", borderRadius: 10, border: "none", background: "rgba(255,107,107,.08)", fontFamily: "var(--fb)", fontSize: 13.5, color: "#b91c1c", cursor: "pointer", width: "100%", textAlign: "left", marginTop: ".5rem" }}
              onClick={() => {
                closePanel();
                showToast("👋", "Signed out", "Come back soon!");
              }}
            >
              🚪 Sign out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function AuthModal() {
  const { modalOpen, closeModal, authTab, setAuthTab, showToast } = useUi();
  const router = useRouter();
  const [role, setRole] = useState(0);
  const roles = [
    { icon: "🐝", lbl: "I'm a student" },
    { icon: "💡", lbl: "I have an idea" },
    { icon: "🎓", lbl: "I'm a university" },
    { icon: "🤖", lbl: "I want coaching" },
  ];

  return (
    <div className={`modal-overlay${modalOpen ? " open" : ""}`} onClick={(e) => e.target === e.currentTarget && closeModal()}>
      <div className="modal">
        <button className="modal-close" type="button" onClick={closeModal}>✕</button>
        <div style={{ textAlign: "center", marginBottom: "1rem" }}>
          <div style={{ margin: "0 auto .5rem", width: 36 }}>
            <BeeHex />
          </div>
          <div style={{ fontFamily: "var(--fd)", fontSize: "1.3rem", fontWeight: 900, color: "var(--indigo)" }}>
            TK<span style={{ color: "var(--honey)" }}>Bees</span>
          </div>
          <div style={{ fontSize: 12, color: "var(--dim)" }}>Where student ideas take flight</div>
        </div>
        <div className="modal-tabs">
          <button className={`mtab${authTab === "login" ? " active" : ""}`} type="button" onClick={() => setAuthTab("login")}>
            Sign in
          </button>
          <button className={`mtab${authTab === "signup" ? " active" : ""}`} type="button" onClick={() => setAuthTab("signup")}>
            Create account
          </button>
        </div>
        {authTab === "login" ? (
          <div>
            <div className="form-group">
              <label className="form-lbl">Email address</label>
              <input className="form-inp" type="email" placeholder="you@university.ac.uk" />
            </div>
            <div className="form-group">
              <label className="form-lbl">Password</label>
              <input className="form-inp" type="password" placeholder="••••••••" />
            </div>
            <button
              className="btn-indigo btn-lg"
              style={{ width: "100%", justifyContent: "center", marginTop: ".5rem" }}
              type="button"
              onClick={() => {
                closeModal();
                router.push("/");
                showToast("👋", "Welcome back!", "You're in the hive");
              }}
            >
              Sign in →
            </button>
          </div>
        ) : (
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".12em", color: "var(--lime)", marginBottom: ".5rem" }}>
              I&apos;m joining as…
            </div>
            <div className="role-grid">
              {roles.map((r, i) => (
                <div key={r.lbl} className={`role-opt${role === i ? " sel" : ""}`} onClick={() => setRole(i)}>
                  <span className="role-opt-icon">{r.icon}</span>
                  <div className="role-opt-lbl">{r.lbl}</div>
                </div>
              ))}
            </div>
            <div className="form-2col">
              <div className="form-group">
                <label className="form-lbl">First name</label>
                <input className="form-inp" placeholder="Alex" />
              </div>
              <div className="form-group">
                <label className="form-lbl">Last name</label>
                <input className="form-inp" placeholder="Kim" />
              </div>
            </div>
            <div className="form-group">
              <label className="form-lbl">Email</label>
              <input className="form-inp" type="email" placeholder="you@university.ac.uk" />
            </div>
            <div className="form-group">
              <label className="form-lbl">Password</label>
              <input className="form-inp" type="password" placeholder="Min. 8 characters" />
            </div>
            <button
              className="btn-primary btn-lg"
              style={{ width: "100%", justifyContent: "center", marginTop: ".5rem" }}
              type="button"
              onClick={() => {
                closeModal();
                router.push("/register");
                showToast("🎉", "You're in the hive!", "Finish registering as a student");
              }}
            >
              Create my account →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export function Toast() {
  const { toast } = useUi();
  return (
    <div className={`toast${toast.show ? " show" : ""}`}>
      <div className="toast-icon">{toast.icon}</div>
      <div>
        <div className="toast-title">{toast.title}</div>
        <div className="toast-sub">{toast.sub}</div>
      </div>
    </div>
  );
}
