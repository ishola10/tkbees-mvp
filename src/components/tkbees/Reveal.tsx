"use client";

import { useEffect, useRef, useState, type ElementType, type HTMLAttributes } from "react";

type RevealProps = HTMLAttributes<HTMLElement> & {
  as?: ElementType;
};

export function Reveal({ as: Tag = "div", className = "", children, ...props }: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisible(true);
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <Tag ref={ref} className={`reveal${visible ? " in" : ""} ${className}`.trim()} {...props}>
      {children}
    </Tag>
  );
}

export function useCountUp(target: number, duration = 1200) {
  const [n, setN] = useState(0);
  useEffect(() => {
    const start = Date.now();
    const timer = setInterval(() => {
      const pct = Math.min((Date.now() - start) / duration, 1);
      const ease = 1 - Math.pow(1 - pct, 4);
      setN(Math.floor(ease * target));
      if (pct >= 1) clearInterval(timer);
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration]);
  return n.toLocaleString();
}
