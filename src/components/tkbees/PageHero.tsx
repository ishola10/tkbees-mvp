export function PageHero({
  kicker,
  kickerColor,
  title,
  titleHtml,
  sub,
  cta,
}: {
  kicker: string;
  kickerColor: string;
  title?: string;
  titleHtml?: React.ReactNode;
  sub: string;
  cta?: React.ReactNode;
}) {
  return (
    <div className="page-hero">
      <div className="container">
        <div className="page-hero-kicker" style={{ color: kickerColor }}>
          {kicker}
        </div>
        <h1 className="page-hero-h1">{titleHtml ?? title}</h1>
        <p className="page-hero-sub">{sub}</p>
        {cta ? <div style={{ marginTop: "1.25rem" }}>{cta}</div> : null}
      </div>
    </div>
  );
}
