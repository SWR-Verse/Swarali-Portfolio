"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { layoutTop, onScrollTick, scrollFX } from "@/lib/scrollfx";

/**
 * "My design process" — one viewport, seven steps, one shape.
 *
 * A raw square at step 01 is refined, step by step, into a perfect circle at
 * step 07: the shape *is* the process.
 *
 * Driven by scroll: the section pins for a few screens and scrolling moves
 * through the steps. Each step holds for a beat (so the copy can be read) and
 * then morphs into the next. Clicking a step on the bar scrolls the page to
 * that step. Pinning is done by hand because #scroll is moved with transforms
 * (see src/lib/scrollfx.ts), the same way ThoughtScroll pins.
 */

const STEPS = [
  { name: "Dig", tag: "Get underneath the obvious." },
  { name: "Paper > Pixels", tag: "Thinking freely before thinking perfectly." },
  {
    name: "Prompt + Play",
    tag: "Research, references, conversations\n& a little AI.",
  },
  { name: "Build", tag: "Giving the idea some structure." },
  {
    name: "Break",
    tag: "Trying it. Challenging it.\nFinding what doesn’t work.",
  },
  { name: "Tune", tag: "Simplify, Sharpen, Repeat." },
  { name: "Finalize", tag: "Making every choice feel intentional." },
] as const;

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const bump = (x: number, c: number, w: number) => clamp(1 - Math.abs(x - c) / w);
const pad = (n: number) => `0${n + 1}`;
const smooth = (t: number) => t * t * (3 - 2 * t);

/* Scroll progress (0–1) → step position (0–6). Each step holds for a while
   and the morph happens in between; the first and last steps get a little
   extra room so you land on them comfortably. */
const RAMP = 6.6;
const LEAD = 0.3;
const toPos = (p: number) => {
  const raw = clamp(p * RAMP - LEAD, 0, 6);
  const k = Math.min(5, Math.floor(raw));
  const f = raw - k;
  return k + smooth(clamp((f - 0.3) / 0.4));
};
/** Inverse, for jumping: the scroll progress at the middle of step j's hold. */
const holdOf = (j: number) => clamp((j + LEAD) / RAMP);

export default function DesignProcess() {
  const [k, setK] = useState(0);

  const root = useRef<HTMLElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  const sq = useRef<HTMLDivElement>(null);
  const hat = useRef<HTMLDivElement>(null);
  const dsh = useRef<HTMLDivElement>(null);
  const grid = useRef<HTMLDivElement>(null);
  const shn = useRef<HTMLDivElement>(null);
  const fill = useRef<HTMLDivElement>(null);
  const mk = useRef<HTMLDivElement>(null);

  const wrap = useRef<HTMLDivElement>(null);
  const s = useRef({ p: 0, k: 0 });

  /** Writes every visual that depends on progress. `p` is 0–1. */
  const paint = useCallback((p: number) => {
    const st = s.current;
    st.p = p;
    const r = p * 50;
    const q = sq.current;
    if (!q) return;
    q.style.borderRadius = `${r}%`;
    q.style.transform = `rotate(${(1 - p) * -9}deg) scale(${0.82 + 0.18 * p})`;
    q.style.boxShadow = `0 0 ${p * p * 130}px rgba(242,167,65,${p * p * 0.6})`;
    if (hat.current) hat.current.style.opacity = String(clamp(1 - p * 4));
    if (dsh.current) dsh.current.style.opacity = String(Math.min(1, bump(p, 0.17, 0.17) * 1.2));
    if (grid.current) grid.current.style.opacity = String(bump(p, 0.5, 0.2));
    if (fill.current) fill.current.style.width = `${p * 100}%`;
    if (mk.current) {
      mk.current.style.left = `${p * 100}%`;
      mk.current.style.borderRadius = `${r}%`;
      mk.current.style.transform = `rotate(${(1 - p) * 45}deg)`;
    }
    const nk = Math.round(p * 6);
    if (nk !== st.k) {
      st.k = nk;
      setK(nk);
    }
  }, []);

  /** Clicking a step scrolls the page to it; the scroll then draws it. */
  const jump = (j: number) => {
    const w = wrap.current;
    if (!w) return;
    const travel = Math.max(1, w.offsetHeight - window.innerHeight);
    window.scrollTo(0, layoutTop(w) + travel * holdOf(j));
  };

  useEffect(() => {
    const w = wrap.current;
    const stage = root.current;
    if (!w || !stage) return;
    paint(0);

    /* chase the scroll so a wheel notch glides instead of jumping */
    let sp = -1;
    let last = performance.now();

    function tick() {
      if (!w!.offsetParent) return;
      const { y } = scrollFX();
      const vh = window.innerHeight;
      const travel = Math.max(1, w!.offsetHeight - vh);
      const into = y - layoutTop(w!);

      /* hold the section in the viewport while the wrapper scrolls past */
      stage!.style.transform = `translate3d(0,${clamp(into, 0, travel).toFixed(2)}px,0)`;
      const rel = -into;
      const cover = Math.max(0, Math.min(vh, rel + w!.offsetHeight) - Math.max(0, rel)) / vh;
      /* no tilt here at all: damp as soon as the section starts to cover the screen */
      window.__skewDamp = Math.min(window.__skewDamp ?? 1, 1 - clamp(cover * 3));

      const now = performance.now();
      const dt = Math.min(64, now - last);
      last = now;
      const target = toPos(clamp(into / travel)) / 6;
      sp = sp < 0 ? target : sp + (target - sp) * (1 - Math.exp(-dt / 110));
      if (Math.abs(sp - s.current.p) > 0.00005) paint(sp);
    }

    tick();
    const off = onScrollTick(tick);
    window.addEventListener("resize", tick);
    return () => {
      off();
      window.removeEventListener("resize", tick);
      window.__skewDamp = 1;
    };
  }, [paint]);

  const step = STEPS[k];

  return (
    <div className="proc-pin" ref={wrap}>
    <section id="process" className="proc" ref={root} aria-label="My design process">
      <div className="proc-top rv">
        <h2 className="proj-h hs-h proc-title">
          <span className="clip">
            <span>My design process.</span>
          </span>
        </h2>
        <span className="proc-count" aria-hidden="true">
          <b>{pad(k)}</b> / 07
        </span>
      </div>

      <div className="proc-in rv">
        <div className="proc-copy" key={k} aria-live="polite">
          <div className="proc-num">{pad(k)}</div>
          <h3 className="proc-h">{step.name}.</h3>
          <p className="proc-sub">{step.tag}</p>
        </div>

        <div className="proc-art">
          <div className="proc-shape">
            <div className="proc-box" aria-hidden="true">
              <i /><i /><i /><i /><i /><i /><i /><i />
            </div>
            <div className="proc-sq" ref={sq} aria-hidden="true">
              <div className="proc-hat" ref={hat} />
              <div className="proc-dsh" ref={dsh} />
              <div className="proc-grid" ref={grid} />
              <div className="proc-shn" ref={shn} />
              <span className="proc-snum">{pad(k)}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="proc-bar" ref={bar}>
        <div className="proc-line">
          <div className="proc-fill" ref={fill} />
        </div>
        <div className="proc-mk" ref={mk} aria-hidden="true" />
        {STEPS.map((x, j) => (
          <div key={x.name}>
            <button
              type="button"
              className={`proc-stop${j < k ? " past" : ""}${j === k ? " on" : ""}`}
              style={{ left: `${(j / 6) * 100}%` }}
              aria-label={`Step ${j + 1}: ${x.name}`}
              onClick={() => jump(j)}
            />
            <span className={`proc-lbl${j === k ? " on" : ""}`} style={{ left: `${(j / 6) * 100}%` }}>
              <b>{pad(j)}</b>
            </span>
          </div>
        ))}
      </div>
    </section>
    </div>
  );
}
