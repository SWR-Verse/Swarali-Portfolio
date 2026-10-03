"use client";

import { useEffect, useRef } from "react";
import { layoutTop, onScrollTick, scrollFX } from "@/lib/scrollfx";

/**
 * THE THOUGHT — "Design is thoughtfulness made tangible."
 *
 * Pinned for ~3 screens of scroll. THOUGHTFULNESS starts as a tall stack of
 * outlined, faint copies (the idea is still intangible), the copies fold into
 * one solid word, "Design is / made / TANGIBLE." arrive around it, and the whole
 * block fades out as the pin releases.
 *
 * Pinning is done by hand: #scroll is moved with translateY by SiteChrome, so
 * `position: sticky` has nothing to stick to. The stage is counter-translated
 * by however far the wrapper has scrolled, using the eased scroll offset the
 * rest of the site is painted at (see src/lib/scrollfx.ts).
 */

const COPIES = 9; // 4 above, the real word, 4 below
const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
const sine = (t: number) => 0.5 - Math.cos(Math.PI * t) / 2;

export default function ThoughtScroll() {
  const wrap = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const block = useRef<HTMLDivElement>(null);
  const stack = useRef<HTMLDivElement>(null);
  const r1 = useRef<HTMLDivElement>(null);
  const r3 = useRef<HTMLDivElement>(null);
  const r4 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const w = wrap.current;
    const st = stage.current;
    const stk = stack.current;
    if (!w || !st || !stk) return;
    const copies = Array.from(stk.children) as HTMLElement[];
    const mid = (COPIES - 1) / 2;
    /* Visual progress is chased, not read directly: a wheel notch moves the
       page in a burst, and every value below would jump with it. The pin
       itself still uses the exact offset so the stage never drifts. */
    let sp = -1;
    let sInto = 0;
    let last = performance.now();

    function tick() {
      if (!w!.offsetParent) return;
      const { y } = scrollFX();
      const vh = window.innerHeight;
      const travel = Math.max(1, w!.offsetHeight - vh);
      const into = y - layoutTop(w!);
      const now = performance.now();
      const dt = Math.min(64, now - last);
      last = now;
      const k = 1 - Math.exp(-dt / 140);
      if (sp < 0) {
        sp = clamp(into / travel);
        sInto = into;
      } else {
        sp += (clamp(into / travel) - sp) * k;
        sInto += (into - sInto) * k;
      }
      const p = sp;

      /* hold the stage in the viewport while the wrapper scrolls past */
      st!.style.transform = `translate3d(0,${clamp(into, 0, travel).toFixed(2)}px,0)`;
      /* no page tilt while this is pinned (same trick as the work rail) */
      const rel = layoutTop(w!) - y;
      const cover = Math.max(0, Math.min(vh, rel + w!.offsetHeight) - Math.max(0, rel)) / vh;
      window.__skewDamp = 1 - clamp(cover);

      /* 1 · the stack folds into one word (0 → .5) */
      const e = easeInOut(clamp(p / 0.5));
      const fs = stk!.offsetHeight;
      copies.forEach((d, j) => {
        const o = j - mid;
        const isMid = j === mid;
        d.style.transform = `translate(calc(-50% + ${(o * (1 - e) * fs * 0.05).toFixed(1)}px),${(o * (1 - e) * fs * 0.92).toFixed(1)}px)`;
        if (isMid) {
          const s = clamp((p - 0.5) * 4); // outline → solid
          d.style.color = `rgba(231,234,242,${s.toFixed(3)})`;
          d.style.webkitTextStroke = `1.5px rgba(${Math.round(169 + 62 * e)},${Math.round(176 + 58 * e)},${Math.round(192 + 50 * e)},${(1 - s).toFixed(3)})`;
          d.style.opacity = "1";
        } else {
          d.style.opacity = Math.max(0, (1 - e) * (0.62 - Math.abs(o) * 0.1)).toFixed(2);
        }
      });

      /* 2 · the rest of the sentence arrives (.38 → .82), eased so each line
         settles rather than stopping dead */
      const a = easeOut(clamp((p - 0.38) / 0.3));
      const b = easeOut(clamp((p - 0.52) / 0.3));
      if (r1.current) {
        r1.current.style.opacity = a.toFixed(3);
        r1.current.style.transform = `translate3d(0,${((1 - a) * 26).toFixed(2)}px,0)`;
      }
      if (r3.current) {
        r3.current.style.opacity = a.toFixed(3);
        r3.current.style.transform = `translate3d(0,${((1 - a) * -26).toFixed(2)}px,0)`;
      }
      if (r4.current) {
        r4.current.style.opacity = b.toFixed(3);
        r4.current.style.transform = `translate3d(0,${((1 - b) * 22).toFixed(2)}px,0)`;
      }

      /* 3 · the block eases in and out of existence.
         In: a long, gentle sine ramp that starts while the section is still
         coming up the screen and finishes just after the pin, with a small
         rise and grow. No blur on the way in: blurring type this size repaints
         the whole block every frame, which is what made it stutter.
         Out: (.84 → 1) as the pin releases, with a soft blur. Scrolling back up
         plays the "in" in reverse, so the repeated THOUGHTFULNESS dissolves. */
      const inn = sine(clamp((sInto + 0.9 * vh) / (0.9 * vh + 0.18 * travel)));
      const out = easeInOut(clamp((p - 0.84) / 0.16));
      if (block.current) {
        block.current.style.opacity = Math.min(inn, 1 - out).toFixed(3);
        block.current.style.filter = out > 0.01 ? `blur(${(out * 8).toFixed(1)}px)` : "none";
        const sc = 1 - (1 - inn) * 0.035 - out * 0.04;
        block.current.style.transform = `translate3d(0,${((1 - inn) * 36).toFixed(2)}px,0) scale(${sc.toFixed(4)})`;
      }
    }

    tick();
    const off = onScrollTick(tick);
    window.addEventListener("resize", tick);
    return () => {
      off();
      window.removeEventListener("resize", tick);
      window.__skewDamp = 1;
    };
  }, []);

  return (
    <div className="tp" ref={wrap} aria-label="Design is thoughtfulness made tangible.">
      <div className="tp-stage" ref={stage}>
        <div className="tp-block" ref={block}>
          <div className="tp-l1" ref={r1}>Design is</div>
          <div className="tp-stack" ref={stack}>
            {Array.from({ length: COPIES }, (_, j) => (
              <div
                key={j}
                className="tp-word"
                aria-hidden={j === (COPIES - 1) / 2 ? undefined : true}
              >
                thoughtfulness
              </div>
            ))}
          </div>
          <div className="tp-l3" ref={r3}>
            <span>made</span>
          </div>
          <div className="tp-l4" ref={r4}>tangible.</div>
        </div>
      </div>
    </div>
  );
}
