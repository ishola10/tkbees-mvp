"use client";

import { useState } from "react";

export function FilterChips({
  chips,
  onChange,
  style,
}: {
  chips: string[];
  onChange?: (chip: string) => void;
  style?: React.CSSProperties;
}) {
  const [active, setActive] = useState(chips[0]);
  return (
    <div className="filter-strip" style={style}>
      {chips.map((f) => (
        <button
          key={f}
          className={`fchip${active === f ? " on" : ""}`}
          onClick={() => {
            setActive(f);
            onChange?.(f);
          }}
        >
          {f}
        </button>
      ))}
    </div>
  );
}
