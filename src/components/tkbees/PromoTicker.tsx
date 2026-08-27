import { TICKER_ITEMS } from "@/constants/nav";

export function PromoTicker() {
  const items = [...TICKER_ITEMS, ...TICKER_ITEMS];
  return (
    <div className="ticker-bar">
      <div className="ticker-inner a-ticker">
        {items.map((item, i) => (
          <span className="ticker-item" key={`${item}-${i}`}>
            <span className="ticker-dot" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
