"use client";

import { useEffect, useRef } from "react";
import { layoutTop, onScrollTick, scrollFX } from "@/lib/scrollfx";

type Project = { word: string; pt: string; cat: string; lead?: boolean };

const PROJECTS: Project[] = [
  { word: "Nebula", pt: "Nebula", cat: "Fintech · Dashboard", lead: true },
  { word: "Pulse", pt: "Pulse", cat: "Mobile · Health" },
  { word: "Atlas", pt: "Atlas", cat: "SaaS · Realtime" },
  { word: "Vela", pt: "Vela", cat: "Brand · Web" },
];

/** Scroll distance spent holding still before the cards start moving, and
 * again after they've finished, as a fraction of the stage height. The lead-in
 * is what stops the section feeling like it snatches the page — it locks,
 * you read the heading, *then* it starts travelling. */
const HOLD_IN = 0.2;
const HOLD_OUT = 0.24;
/** Vertical scroll spent per pixel of horizontal travel. Above 1 the rail
 * moves slower than your wheel, which reads as weight; below 1 it outruns you.
 * Cards this large travel a long way, so this sits just under 1 to stop the
 * section outstaying its welcome. */
const PACE = 0.85;
/** Pixels the big word drifts against its own card. Purely a depth cue. */
const DRIFT = 58;
/** Below this width the pin is dropped entirely for a native swipe rail. */
const FREE_AT = 900;

/** "Selected work" as a pinned horizontal rail.
 *
 * **Why this is transforms and not `position:sticky`.** The whole page lives
 * inside `#scroll`, which is `position:fixed` with a transform written every
 * frame. A transformed ancestor makes it the containing block for sticky
 * descendants, so `sticky` simply doesn't stick here — it has to be done the
 * same way the rest of the site does its scroll work.
 *
 * **The mechanism.** The wrapper reserves real height in the document
 * (`stage height + hold-in + travel + hold-out`), so nothing has to fake the
 * page length — SiteChrome's ResizeObserver picks it up on its own. The stage
 * inside is translated *down* by exactly how far the page has scrolled past
 * it, which holds it visually still; the track is translated *left* by the
 * progress through the middle stretch.
 *
 * **Where the smoothness comes from.** Position comes from the site's eased
 * scroll value (`__scrollFX.y`), not `window.scrollY`, so the rail is on the
 * same frame the page is painted at and inherits the same easing everything
 * else has. There's no transition on the track — the JS writes it every frame,
 * and a transition on top would fight the wheel and smear.
 *
 * The whole thing is a pure function of scroll offset, so it reverses exactly
 * when you scroll back up. */
export default function WorkRail() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const wrap = wrapRef.current;
    const stage = stageRef.current;
    const view = viewRef.current;
    const track = trackRef.current;
    if (!wrap || !stage || !view || !track) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const narrow = window.matchMedia(`(max-width:${FREE_AT}px)`);

    /* Measured once per layout change rather than per frame — scrollWidth is a
       forced reflow, and reading it 60 times a second is exactly the kind of
       thing that makes a rail like this stutter. */
    let travel = 0;
    let holdIn = 0;
    let span = 0;
    let free = true;

    function measure() {
      free = narrow.matches || reduce.matches;
      if (free) {
        wrap!.style.height = "";
        stage!.style.transform = "";
        track!.style.transform = "";
        wrap!.classList.add("is-free");
        return;
      }
      wrap!.classList.remove("is-free");
      const stageH = stage!.offsetHeight;
      travel = Math.max(0, track!.scrollWidth - view!.clientWidth);
      holdIn = stageH * HOLD_IN;
      span = travel * PACE;
      wrap!.style.height = `${stageH + holdIn + span + stageH * HOLD_OUT}px`;
    }

    function tick() {
      if (!stage!.offsetParent) return;
      const { y, skew } = scrollFX();
      const wrapTop = layoutTop(wrap!);
      const vh = window.innerHeight;

      /* Reveal is armed rather than one-shot: it resets once the section is
         fully off screen either way, so it replays whenever you come back. */
      const rel = wrapTop - y;
      const wrapH = wrap!.offsetHeight;
      if (rel >= vh || rel + wrapH <= 0) stage!.classList.remove("in");
      else if (rel < vh * 0.8) stage!.classList.add("in");

      /* Kill the site-wide tilt while this section owns the screen.
         Damping it at the source rather than cancelling it on the stage is
         deliberate: cancelling would leave the paper band's own top and bottom
         edges shearing with the rest of the page, which still reads as a tilt
         even though the cards sit straight. Tied to how much of the viewport
         the section covers, so it eases out and back rather than snapping —
         the section is far taller than the viewport, so this is 0 for the
         whole of the pin. */
      const cover = Math.max(0, Math.min(vh, rel + wrapH) - Math.max(0, rel)) / vh;
      window.__skewDamp = 1 - Math.max(0, Math.min(1, cover));

      if (free) {
        /* Still cancel the tilt — the pin is off here, the upright stage isn't. */
        stage!.style.transform = `skewY(${(-skew).toFixed(3)}deg)`;
        return;
      }

      const maxShift = wrap!.offsetHeight - stage!.offsetHeight;
      const shift = Math.max(0, Math.min(maxShift, y - wrapTop));
      /* Pinning is just "move down by however far we've scrolled past". No
         magic — and because it's clamped rather than latched with a flag, it
         unpins on the way back up without any state to get stuck in.
         The leading skewY(-skew) undoes the site-wide shear on #scroll, so this
         section alone stays upright. It has to come first: skews compose
         exactly, so applying the inverse before the translate cancels the
         parent's shear rather than adding to it. The stage is centred and
         near-full-width, so its transform-origin lines up with the page's and
         the cancellation leaves no vertical offset behind. */
      stage!.style.transform = `skewY(${(-skew).toFixed(3)}deg) translate3d(0,${shift.toFixed(2)}px,0)`;

      const p = span > 0 ? Math.max(0, Math.min(1, (shift - holdIn) / span)) : 0;
      track!.style.transform = `translate3d(${(-p * travel).toFixed(2)}px,0,0)`;

      /* Counter-drift on the big word: it lags the card it sits in by a few
         pixels, which is what gives the rail depth instead of reading as one
         flat sheet sliding. It lives on an inner span so it can't collide with
         the hover scale on .word — two writers on one transform would mean the
         last one wins and the hover would look broken. */
      const cx = view!.clientWidth / 2;
      wordRefs.current.forEach((w) => {
        if (!w) return;
        const card = w.closest(".rcard") as HTMLElement | null;
        if (!card) return;
        const mid = card.offsetLeft + card.offsetWidth / 2 - p * travel;
        const n = Math.max(-1.6, Math.min(1.6, (mid - cx) / cx));
        w.style.transform = `translate3d(${(n * -DRIFT).toFixed(2)}px,0,0)`;
      });
    }

    measure();
    tick();

    const ro = new ResizeObserver(measure);
    ro.observe(track);
    window.addEventListener("resize", measure);
    narrow.addEventListener("change", measure);
    reduce.addEventListener("change", measure);
    const off = onScrollTick(tick);

    return () => {
      off();
      window.__skewDamp = 1;
      ro.disconnect();
      window.removeEventListener("resize", measure);
      narrow.removeEventListener("change", measure);
      reduce.removeEventListener("change", measure);
    };
  }, []);

  return (
    <div className="hs" ref={wrapRef}>
      <div className="hs-stage" ref={stageRef}>
        <div className="hs-head">
          <h2 className="proj-h">
            <span className="clip">
              <span>Selected</span>
            </span>
            <span className="clip">
              <span>work.</span>
            </span>
          </h2>
        </div>

        <div className="hs-view" ref={viewRef}>
          <div className="hs-track" ref={trackRef}>
            {PROJECTS.map((p, i) => (
              /* Caption lives inside the frame rather than in a row beneath it.
                 Two reasons: the row underneath was repeating the same word
                 already set in 4rem type in the middle of the card, and it cost
                 ~56px of the height budget that the cards themselves are
                 competing for. */
              <article className="rcard" key={p.pt} style={{ transitionDelay: `${120 + i * 90}ms` }}>
                <div className={p.lead ? "frame lead" : "frame"}>
                  <div className="word">
                    <span
                      ref={(el) => {
                        wordRefs.current[i] = el;
                      }}
                    >
                      {p.word}
                    </span>
                  </div>
                  <div className="rcat">{p.cat}</div>
                  <span className="go" aria-hidden="true">
                    ↗
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
