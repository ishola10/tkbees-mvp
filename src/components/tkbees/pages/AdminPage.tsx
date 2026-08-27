"use client";

import { useEffect, useMemo, useState } from "react";
import { useUi } from "@/providers/UiProvider";
import { getHive } from "@/lib/hiveStore";

const ADMIN_KEY = "tkbees-admin";

export function AdminPage() {
  const { showToast } = useUi();
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [tab, setTab] = useState<"students" | "ideas" | "partnerships">("students");
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (sessionStorage.getItem(ADMIN_KEY) === "1") setAuthed(true);
  }, []);

  const hive = useMemo(() => getHive(), [tick, authed]);
  const stats = { students: hive.students.length, ideas: hive.ideas.length, partnerships: hive.partnerships.length };
  const rows = tab === "students" ? hive.students : tab === "ideas" ? hive.ideas : hive.partnerships;

  if (!authed) {
    return (
      <div className="page-body">
        <div className="container" style={{ maxWidth: 420, padding: "4rem 1rem" }}>
          <h1 className="page-hero-h1">Admin <em>Dashboard</em></h1>
          <p className="page-hero-sub" style={{ margin: "0 0 1.5rem" }}>Enter the admin password to continue.</p>
          <form
            className="dash-card"
            onSubmit={(e) => {
              e.preventDefault();
              if (password.trim().toLowerCase() === "tkbees") {
                sessionStorage.setItem(ADMIN_KEY, "1");
                setAuthed(true);
                showToast("👋", "Welcome, Admin!", "Dashboard • MVP Analytics");
              } else {
                showToast("🔒", "Invalid password", "");
              }
            }}
          >
            <div className="form-group"><label className="form-lbl">Password</label><input className="form-inp" type="password" value={password} onChange={(e) => setPassword(e.target.value)} /></div>
            <button className="btn-indigo" type="submit" style={{ width: "100%", justifyContent: "center" }}>Login</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="page-body">
      <div className="container">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16, flexWrap: "wrap", marginBottom: "1.5rem" }}>
          <div>
            <h1 className="page-hero-h1" style={{ fontSize: "2rem" }}>TKBees Admin</h1>
            <p style={{ color: "var(--muted)", fontSize: 14 }}>Dashboard • MVP Analytics</p>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button className="btn-secondary btn-sm" type="button" onClick={() => setTick((n) => n + 1)}>Refresh</button>
            <button className="btn-ghost btn-sm" type="button" style={{ color: "var(--indigo)", borderColor: "var(--border)" }} onClick={() => { sessionStorage.removeItem(ADMIN_KEY); setAuthed(false); }}>Logout</button>
          </div>
        </div>
        <div className="dash-stats" style={{ marginBottom: "1.5rem" }}>
          {([
            ["students", "Students", stats.students],
            ["ideas", "Ideas", stats.ideas],
            ["partnerships", "Partnerships", stats.partnerships],
          ] as const).map(([id, label, n]) => (
            <button key={id} type="button" className={`dstat${tab === id ? " on" : ""}`} onClick={() => setTab(id)} style={{ textAlign: "left", border: tab === id ? "2px solid var(--honey)" : "1px solid var(--border)", background: "var(--white)", borderRadius: 16, padding: "1rem 1.25rem", cursor: "pointer" }}>
              <div style={{ fontFamily: "var(--fm)", fontWeight: 800, fontSize: "1.6rem" }}>{n}</div>
              <div style={{ fontSize: 12, color: "var(--muted)" }}>{label}</div>
            </button>
          ))}
        </div>
        <div className="dash-card" style={{ overflowX: "auto" }}>
          {rows.length === 0 ? (
            <p style={{ color: "var(--muted)" }}>No data yet for {tab}.</p>
          ) : (
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
              <thead>
                <tr>
                  {Object.keys(rows[0]).map((k) => (
                    <th key={k} style={{ textAlign: "left", padding: "8px 10px", borderBottom: "1px solid var(--border)", color: "var(--dim)", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".06em", fontSize: 10 }}>{k}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => (
                  <tr key={i}>
                    {Object.values(row).map((v, j) => (
                      <td key={j} style={{ padding: "8px 10px", borderBottom: "1px solid var(--border)", verticalAlign: "top" }}>{Array.isArray(v) ? v.join(", ") : String(v ?? "")}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
