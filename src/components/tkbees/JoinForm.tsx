"use client";

import { useState } from "react";
import { JOIN_ROLES } from "@/constants/nav";
import { useUi } from "@/providers/UiProvider";

export function JoinForm({ variant = "card" }: { variant?: "card" | "plain" }) {
  const { showToast } = useUi();
  const [role, setRole] = useState(JOIN_ROLES[0]);
  const [email, setEmail] = useState("");

  const form = (
    <>
      <div
        style={{
          fontSize: 10,
          fontWeight: 800,
          textTransform: "uppercase",
          letterSpacing: ".22em",
          color: "var(--lime)",
          marginBottom: ".6rem",
        }}
      >
        I&apos;m joining as…
      </div>
      <div className="join-role-grid">
        {JOIN_ROLES.map((r) => (
          <button
            key={r}
            type="button"
            className={`join-role-btn${role === r ? " active" : ""}`}
            onClick={() => setRole(r)}
          >
            {r}
          </button>
        ))}
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!email.includes("@")) {
            showToast("❌", "Invalid email", "Please enter a valid email address");
            return;
          }
          showToast("🎉", "You're on the list!", "We'll email you as a founding member");
          setEmail("");
        }}
      >
        <div className="join-email-row">
          <input
            type="email"
            className="join-email-inp"
            placeholder="your@university.ac.uk"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit" className="join-submit">
            Get my spot <span>→</span>
          </button>
        </div>
      </form>
      <div className="join-founding">
        <span
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: "var(--lime)",
            display: "inline-block",
          }}
        />
        Founding TKBees · cohort closes 1 July 2026
      </div>
    </>
  );

  if (variant === "plain") return form;
  return <div className="join-form-card">{form}</div>;
}
