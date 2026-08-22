"use client";

import TransitionLink from "./TransitionLink";

type Project = {
  no: string;
  word: string;
  img: string;
  alt: string;
  pt: string;
  cat: string;
  /** Present once a project has a written case study. */
  href?: string;
};

const PROJECTS: Project[] = [
  { no: "01", word: "NINE09", img: "/work/nine09/cover.jpg", alt: "NINE09 Connect — eBike app home screen", pt: "NINE09 Connect", cat: "Mobile · eBike app · 2025", href: "/work/nine09-connect" },
  { no: "02", word: "Pulse", img: "/work/pulse.jpg", alt: "Pulse — health app", pt: "Pulse", cat: "Mobile · Health · 2025" },
  { no: "03", word: "Atlas", img: "/work/atlas.jpg", alt: "Atlas — realtime SaaS", pt: "Atlas", cat: "SaaS · Realtime · 2024" },
  { no: "04", word: "Vela", img: "/work/vela.jpg", alt: "Vela — brand site", pt: "Vela", cat: "Brand · Web · 2023" },
];

/** The four screen projects, laid out as the same two-up staggered grid the
 * home page uses for "Selected work" — no pinning, no per-frame JS, no
 * scroll-linked transforms. It's the dark-theme twin of `.grid`/`.card`.
 *
 * The entire card is the anchor rather than a link tucked inside it, so the
 * whole box is one hit target and the hover state can't disagree with what's
 * actually clickable. The circular arrow is decorative — it's a visual cue for
 * a card-wide affordance, which is why it carries no label and is hidden from
 * assistive tech; the accessible name lives on the anchor. */
export default function WorkDeck() {
  return (
    <div className="wgrid rv-stg">
      {PROJECTS.map((p, i) => (
        <TransitionLink
          key={p.pt}
          className="wcard"
          href={p.href ?? "/work"}
          aria-label={p.href ? `Open the ${p.pt} case study` : `${p.pt} — ${p.cat}`}
        >
          <div className={i === 0 ? "frame lead" : "frame"}>
            <img src={p.img} alt="" onError={(e) => e.currentTarget.remove()} />
            <div className="word">{p.word}</div>
            <div className="no">{p.no}</div>
            <span className="go" aria-hidden="true">
              ↗
            </span>
          </div>
          <div className="meta">
            <div className="pt">{p.pt}</div>
            <div className="cat">{p.cat}</div>
          </div>
        </TransitionLink>
      ))}
    </div>
  );
}
