"use client";

import { useEffect, useRef } from "react";
import { layoutTop, onScrollTick, scrollFX } from "@/lib/scrollfx";
import TransitionLink from "./TransitionLink";

type Project = {
  word: string;
  pt: string;
  cat: string;
  blurb: string;
  shot?: string;
  href?: string;
  /** Hover-glow colour for this card, and the lighter core inside it. Defaults
   * to the site's blue. Set these to a hue taken from the thumbnail: the glow
   * is a light source lying on top of the artwork, so a colour that disagrees
   * with the image reads as a wash over it rather than as light in it. */
  glow?: string;
  glowCore?: string;
};

/** `shot` is the thumbnail that fills the card. Leave it off and the card falls
 * back to its own wash — no conditional rendering, no layout shift when one
 * arrives. `href` turns the whole card into a link; without one it stays a
 * plain article, so a placeholder can't advertise a case study that isn't
 * written yet. */
const PROJECTS: Project[] = [
  {
    word: "Nine09 Connect",
    pt: "Nine09 Connect",
    cat: "E-bike Companion App",
    blurb: "Making every ride easier to navigate at a glance.",
    shot: "/work/nine09/card.jpg",
    href: "/work/nine09-connect",
    /* Sampled from the cover: its light is 22deg orange, which is most of the
       saturated light in the frame. The site's own accent sits at 35deg, so
       this stays in the same family while matching the photograph. */
    glow: "#F27F3A",
    glowCore: "#FFC8A8",
  },
  { word: "Pulse", pt: "Pulse", cat: "Mobile · Health", blurb: "Daily tracking that asks for thirty seconds, not thirty." },
  { word: "Atlas", pt: "Atlas", cat: "SaaS · Realtime", blurb: "Giving a thousand moving parts one honest status." },
  { word: "Vela", pt: "Vela", cat: "Brand · Web", blurb: "A studio identity that still works at favicon size." },
];

/** "Selected work" — four equal cards on a staggered grid.
 *
 * **Why there is any JS here at all.** #scroll carries a scroll-velocity skew
 * (up to 5deg) that shears the whole page as you move. On a single-column
 * section you never notice it; across a grid nearly two thousand pixels wide a
 * 5deg shear drops the right-hand column some seventy pixels below the left,
 * and the cards read as misaligned rather than as tilted. So this section damps
 * the skew at the source while it owns the screen — the same thing the old
 * pinned rail did, and for the same reason. Damping at the source rather than
 * counter-skewing the grid is deliberate: counter-skewing would leave the
 * section's own edges shearing against cards that sit straight, which still
 * reads as a tilt.
 *
 * Everything else is static markup. */
export default function WorkRail() {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    function tick() {
      if (!wrap!.offsetParent) return;
      const { y } = scrollFX();
      const rel = layoutTop(wrap!) - y;
      const vh = window.innerHeight;
      /* Tied to how much of the viewport the section covers, so the tilt eases
         out and back rather than snapping on at a threshold. */
      const cover =
        Math.max(0, Math.min(vh, rel + wrap!.offsetHeight) - Math.max(0, rel)) / vh;
      window.__skewDamp = 1 - Math.max(0, Math.min(1, cover));
    }

    tick();
    const off = onScrollTick(tick);
    return () => {
      off();
      window.__skewDamp = 1;
    };
  }, []);

  return (
    <div className="hs" ref={wrapRef}>
      <div className="hs-head">
        <h2 className="proj-h hs-h rv">
          <span className="clip">
            <span>Selected work.</span>
          </span>
        </h2>
      </div>

      <div className="hs-grid">
        {PROJECTS.map((p, i) => (
          <article
            className="rcard rv"
            key={p.pt}
            style={
              {
                transitionDelay: `${i * 90}ms`,
                ...(p.glow ? { "--glow": p.glow } : null),
                ...(p.glowCore ? { "--glow-core": p.glowCore } : null),
              } as React.CSSProperties
            }
          >
            {/* One rectangle. The thumbnail fills it edge to edge and the
                writing sits on the image under a scrim — there is no inner
                frame, because a plate inside a card made the artwork look
                matted rather than full-bleed. */}
            <Frame p={p} />
          </article>
        ))}
      </div>
    </div>
  );
}

/** The card's inside. Split out only so the wrapper can be an <a> when there is
 * a case study to link to and a plain <div> when there isn't — without
 * duplicating the contents in two branches. */
function Frame({ p }: { p: Project }) {
  const inner = (
    <>
      <div className="rc-media">{p.shot ? <img src={p.shot} alt="" /> : null}</div>

      <span className="go">View project</span>

      <div className="rc-foot">
        <div className="word">
          <span>{p.word}</span>
        </div>
        <p className="rc-blurb">{p.blurb}</p>
        <span className="rcat">{p.cat}</span>
      </div>
    </>
  );

  return p.href ? (
    <TransitionLink className="frame" href={p.href} aria-label={`${p.pt} — view project`}>
      {inner}
    </TransitionLink>
  ) : (
    <div className="frame">{inner}</div>
  );
}
