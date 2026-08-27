"use client";

import { useEffect, useRef, useState } from "react";
import { matchBuzzFaq } from "@/constants/buzzFaq";

type Msg = { role: "user" | "buzz"; text: string; quickReplies?: string[] };

function formatBuzzText(text: string) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/^- (.+)$/gm, "<li>$1</li>")
    .replace(/(<li>.*<\/li>\n?)+/g, (match) => `<ul>${match}</ul>`)
    .replace(/\n/g, "<br>");
}

function getBuzzResponse(text: string) {
  return matchBuzzFaq(text);
}

export function Chatbot() {
  const [open, setOpen] = useState(false);
  const [history, setHistory] = useState<Msg[]>([]);
  const [typing, setTyping] = useState(false);
  const [unread, setUnread] = useState(1);
  const [value, setValue] = useState("");
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const t = setTimeout(() => {
      if (!open) setUnread(1);
    }, 4000);
    return () => clearTimeout(t);
  }, [open]);

  useEffect(() => {
    if (listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [history, typing]);

  const greet = () => {
    setHistory([
      {
        role: "buzz",
        text: `Hi there! I'm **Buzz** 🐝, the TKBees assistant.\n\nI can help you join the hive, submit an idea, use the AI Coach, browse resources, find events, or partner as a university. What would you like to know?`,
        quickReplies: ["What is TKBees?", "How do I join?", "What is the AI Coach?"],
      },
    ]);
  };

  const toggle = () => {
    setOpen((o) => {
      const next = !o;
      if (next) {
        setUnread(0);
        if (history.length === 0) greet();
        setTimeout(() => inputRef.current?.focus(), 350);
      }
      return next;
    });
  };

  const reply = (text: string) => {
    if (typing) return;
    setHistory((h) => [...h, { role: "user", text }]);
    const response = getBuzzResponse(text);
    setTyping(true);
    const delay = 700 + Math.min(text.length * 10, 800);
    setTimeout(() => {
      setTyping(false);
      setHistory((h) => [...h, { role: "buzz", text: response.answer, quickReplies: response.quickReplies }]);
    }, delay);
  };

  const send = () => {
    const text = value.trim();
    if (!text || typing) return;
    setValue("");
    if (inputRef.current) inputRef.current.style.height = "auto";
    reply(text);
  };

  return (
    <>
      <button className={`chat-launcher${open ? " open" : ""}`} onClick={toggle} aria-label="Chat with Buzz" type="button">
        <div className="chat-launcher-pulse" />
        <span className="chat-launcher-icon">🐝</span>
        {unread > 0 && !open ? <span className="chat-unread-badge">{unread}</span> : null}
      </button>

      <div className={`chat-window${open ? " open" : ""}`} role="dialog" aria-label="TKBees chat with Buzz">
        <div className="chat-hdr">
          <div className="chat-bee-avatar">
            🐝
            <div className="chat-bee-status" />
          </div>
          <div className="chat-hdr-info">
            <div className="chat-hdr-name">Buzz</div>
            <div className="chat-hdr-status">
              <span className="chat-hdr-dot" />
              TKBees assistant · always online
            </div>
          </div>
          <div className="chat-hdr-actions">
            <button className="chat-hdr-btn" type="button" title="Clear chat" onClick={greet}>↺</button>
            <button className="chat-hdr-btn" type="button" title="Close" onClick={toggle}>✕</button>
          </div>
        </div>

        <div className="chat-topics">
          {["What is TKBees?", "How do I join?", "What is the AI Coach?", "Submit an idea", "Upcoming events"].map((t) => (
            <button key={t} className="chat-topic-btn" type="button" onClick={() => reply(t)}>
              {t}
            </button>
          ))}
        </div>

        <div className="chat-messages" ref={listRef}>
          {history.map((msg, i) =>
            msg.role === "user" ? (
              <div className="chat-msg user" key={i}>
                <div className="chat-msg-avatar">AK</div>
                <div className="chat-bubble">{msg.text}</div>
              </div>
            ) : (
              <div className="chat-msg" key={i}>
                <div className="chat-msg-avatar">🐝</div>
                <div>
                  <div className="chat-bubble" dangerouslySetInnerHTML={{ __html: formatBuzzText(msg.text) }} />
                  {msg.quickReplies && i === history.length - 1 ? (
                    <div className="chat-quick-replies">
                      {msg.quickReplies.map((r) => (
                        <button key={r} className="qr-chip" type="button" onClick={() => reply(r)}>
                          {r}
                        </button>
                      ))}
                    </div>
                  ) : null}
                </div>
              </div>
            )
          )}
          {typing ? (
            <div className="chat-typing">
              <div className="chat-msg-avatar">🐝</div>
              <div className="typing-bubble">
                <div className="typing-dot" />
                <div className="typing-dot" />
                <div className="typing-dot" />
              </div>
            </div>
          ) : null}
        </div>

        <div className="chat-input-wrap">
          <textarea
            ref={inputRef}
            className="chat-input"
            placeholder="Ask Buzz anything…"
            rows={1}
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              e.target.style.height = "auto";
              e.target.style.height = `${Math.min(e.target.scrollHeight, 100)}px`;
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                send();
              }
            }}
          />
          <button className="chat-send-btn" type="button" disabled={typing} onClick={send} aria-label="Send message">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M22 2L11 13" />
              <path d="M22 2L15 22l-4-9-9-4 20-7z" />
            </svg>
          </button>
        </div>
        <div className="chat-branding">Powered by TKBees</div>
      </div>
    </>
  );
}
