"use client";

import { useEffect, useRef } from "react";
import { onScrollTick, scrollFX } from "@/lib/scrollfx";

const SOCIALS = [
  { label: "Behance", handle: "swarali_satpute", href: "https://www.behance.net/swarali_satpute" },
  { label: "LinkedIn", handle: "swarali-satpute", href: "https://www.linkedin.com/in/swarali-satpute" },
];

/** Fraction of the viewport the stage's top must pass before the copy reveals.
 * Below 1 so it fires once the band is properly on screen rather than the
 * instant its first pixel appears. */
const REVEAL_AT = 0.62;

/** Full-bleed portrait band — the signature moment after About.
 *
 * **The reveal.** Everything written in the band rises and fades in once, in a
 * top-to-bottom cascade, when the section comes into view. The cascade itself
 * is pure CSS (`.cr-anim` + per-element `transition-delay`); all this does is
 * decide the moment to add `.in`. One-way, like the site's own `.rv` reveals —
 * it doesn't replay when you scroll back up.
 *
 * There used to be a scroll-pinned sequence here — the band held still while
 * CREATIVE and the kicker were driven frame by frame off scroll position. It's
 * gone, along with the empty runway underneath that paid for the hold. The
 * section is now just its own height and scrolls like everything else.
 *
 * **No tilt.** This is the one thing still driven per frame. The site-wide
 * `skewY` on `#scroll` is cancelled on the stage, so the band stays upright
 * while the page around it keeps shearing. Skews compose exactly, so a leading
 * `skewY(-skew)` undoes the parent's shear precisely; the band is full-bleed
 * and centred, so the transform-origin mismatch works out to zero. */
export default function CreativeBand() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function tick() {
      const section = sectionRef.current;
      const stage = stageRef.current;
      if (!section || !stage || !stage.offsetParent) return;

      const { skew } = scrollFX();
      stage.style.transform = `skewY(${(-skew).toFixed(3)}deg)`;

      /* Skew-immune measurement. A skewed rectangle is a parallelogram and
         getBoundingClientRect returns its axis-aligned bounding box: the box's
         *top* is sheared by x*tan(skew), but its *centre* is not, because
         affine transforms preserve centroids. So take the centre from the rect
         and step back up by half the true layout height. */
      const r = section.getBoundingClientRect();
      const h = section.offsetHeight;
      const topInView = r.top + r.height / 2 - h / 2;
      const vh = window.innerHeight;

      /* Armed rather than one-shot: the reveal resets once the band is fully
         off screen — past the bottom edge or past the top — so it replays every
         time it comes back, scrolling either direction. Resetting only when
         nothing is visible is what keeps it from flickering mid-view, and means
         the audience never sees the wind-back. */
      if (topInView >= vh || topInView + h <= 0) {
        stage.classList.remove("in");
      } else if (topInView < vh * REVEAL_AT) {
        stage.classList.add("in");
      }
    }

    tick();
    return onScrollTick(tick);
  }, []);

  return (
    <section className="creative" ref={sectionRef} aria-label="Swarali Satpute — product designer">
      <div className="cr-stage" ref={stageRef}>
        {/* Backdrop is drawn in CSS, deliberately. `creative-bg.jpg` is the
            full studio frame — Swarali is already in it — so layering the
            cut-out on top of it rendered her twice, the second copy showing
            through as a ghost. The file stays in public/home for reference but
            must not be used behind the cut-out. */}
        <div className="cr-bg" aria-hidden="true" />

        <div className="cr-photo">
          <picture>
            <source srcSet="/home/creative-cutout.webp" type="image/webp" />
            <img src="/home/creative-cutout.png" alt="Swarali Satpute" />
          </picture>
        </div>

        <div className="cr-ui">
          <div className="cr-top cr-anim">
            <div className="cr-id">
              <div className="cr-name">Swarali Satpute</div>
              <div className="cr-role">Product Designer</div>
            </div>
            <p className="cr-claim">
              Design that speaks.
              <br />
              Visuals that convert.
            </p>
          </div>

          {/* The type block claims the gap between the header and the footer as
              a flex item, so CREATIVE lands dead centre of it — a derived
              resting position rather than a hand-tuned percentage. The kicker
              is absolutely positioned off that same centre line, so it doesn't
              push CREATIVE down by half its own height.
              Both paint *behind* the photo; see the z-index note in the
              stylesheet for how that's arranged. */}
          <div className="cr-type">
            {/* The inner span carries the hover pop, so it can have its own
                short springy transition without inheriting the long, delayed
                one the reveal puts on the parent. It's also the only thing
                here with pointer-events, which keeps the hover target tight to
                the glyphs instead of the full-width box. */}
            <div className="cr-kicker cr-anim" aria-hidden="true">
              <span>Curious &amp;</span>
            </div>
            <div className="cr-word cr-anim" aria-hidden="true">
              <span>CREATIVE</span>
            </div>
          </div>

          {/* Bottom-aligned so the big right-hand type sits on the same line
              as the last line of the bio. */}
          <div className="cr-foot">
            <div className="cr-foot-l">
              <div className="cr-socials cr-anim">
                {SOCIALS.map((s) => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer">
                    <span className="cr-net">{s.label}</span>
                    <span className="cr-handle">{s.handle}</span>
                    <span className="cr-arw" aria-hidden="true">
                      ↗
                    </span>
                  </a>
                ))}
              </div>
              <p className="cr-bio cr-anim">
                Between curiosity and craft lies the space where I design. From research and flows to systems and
                interfaces, my work revolves around clarity, structure, and intent — experiences that hold up under
                real use, and still feel human.
              </p>
            </div>
            <div className="cr-big cr-anim" aria-hidden="true">
              Objects and
              <br />
              Interfaces
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
