"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * "My design process" — one viewport, seven steps, one shape.
 *
 * A raw square at step 01 is refined, step by step, into a perfect circle at
 * step 07: the shape *is* the process. Progress is a continuous 0–1 value, so
 * scrubbing morphs the shape smoothly; it snaps to a step on release.
 *
 * Interaction (the combination that tested best for UX):
 *  - plays itself once when the section first comes into view
 *  - the first touch / drag / key press takes control and stops the autoplay
 *  - drag the shape or the bar to scrub, click a step to jump, ←/→ to step
 *  - prefers-reduced-motion: no autoplay, no tweening — steps just change
 *
 * All per-frame work writes straight to styles through refs; React state only
 * holds the current step index, so the copy re-renders seven times at most.
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

const DWELL = 2800; // ms each step is held while autoplaying
const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const bump = (x: number, c: number, w: number) => clamp(1 - Math.abs(x - c) / w);
const pad = (n: number) => `0${n + 1}`;

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

  const s = useRef({
    p: 0,
    k: 0,
    anim: 0,
    moving: false,
    dragging: false,
    target: -1,
    chase: false,
    tp: 0,
    auto: true,
    visible: false,
    dwell: 0,
    reduced: false,
  });

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

  const animateTo = useCallback(
    (target: number, dur = 650) => {
      const st = s.current;
      cancelAnimationFrame(st.anim);
      st.chase = false;
      if (st.reduced) {
        st.moving = false;
        st.dwell = 0;
        paint(target);
        return;
      }
      const from = st.p;
      const t0 = performance.now();
      st.moving = true;
      const f = (n: number) => {
        const u = clamp((n - t0) / dur);
        const e = u < 0.5 ? 4 * u * u * u : 1 - Math.pow(-2 * u + 2, 3) / 2;
        paint(from + (target - from) * e);
        if (u < 1) st.anim = requestAnimationFrame(f);
        else {
          st.moving = false;
          st.dwell = 0;
        }
      };
      st.anim = requestAnimationFrame(f);
    },
    [paint],
  );

  const goTo = useCallback(
    (j: number) => {
      s.current.target = clamp(j, 0, 6);
      animateTo(clamp(j, 0, 6) / 6);
    },
    [animateTo],
  );

  /** First touch takes control from the autoplay. */
  const takeOver = () => {
    const st = s.current;
    st.auto = false;
    cancelAnimationFrame(st.anim);
    st.chase = false;
    st.moving = false;
  };

  /** Hover scrub: moving the mouse along the bar lands on the nearest step. */
  const hover = (e: React.PointerEvent<HTMLElement>) => {
    if (e.pointerType !== "mouse") return;
    const r = bar.current?.getBoundingClientRect();
    if (!r) return;
    const j = Math.round(clamp((e.clientX - r.left) / r.width) * 6);
    const st = s.current;
    if (j === st.target) return;
    st.target = j;
    takeOver();
    if (st.reduced) {
      paint(j / 6);
      return;
    }
    /* Chase, don't tween: restarting an eased tween on every step the cursor
       crosses made each restart begin slowly, so a quick sweep lagged behind.
       Exponential smoothing toward the latest target keeps up with any speed. */
    st.tp = j / 6;
    st.chase = true;
    st.moving = true;
  };

  const key = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      takeOver();
      goTo(s.current.k + 1);
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      takeOver();
      goTo(s.current.k - 1);
    }
  };

  useEffect(() => {
    const st = s.current;
    st.reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    paint(0);

    const io = new IntersectionObserver(([en]) => (st.visible = en.isIntersecting), { threshold: 0.55 });
    if (root.current) io.observe(root.current);

    let last = performance.now();
    let raf = 0;
    const tick = (n: number) => {
      const dt = Math.min(50, n - last);
      last = n;
      if (st.chase) {
        const d = st.tp - st.p;
        if (Math.abs(d) < 0.0008) {
          paint(st.tp);
          st.chase = false;
          st.moving = false;
          st.dwell = 0;
        } else {
          paint(st.p + d * (1 - Math.exp(-dt / 55)));
        }
      }
      if (st.auto && st.visible && !st.moving && !st.dragging && !st.reduced) {
        st.dwell += dt;
        if (st.dwell >= DWELL) {
          if (st.k < 6) animateTo((st.k + 1) / 6);
          else st.auto = false;
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      cancelAnimationFrame(st.anim);
    };
  }, [paint, animateTo]);

  const step = STEPS[k];

  return (
    <section
      id="process"
      className="proc"
      ref={root}
      tabIndex={0}
      aria-label="My design process"
      onKeyDown={key}
    >
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

      <div
        className="proc-bar"
        ref={bar}
        onPointerMove={hover}
      >
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
              onClick={() => {
                takeOver();
                goTo(j);
              }}
            />
            <span className={`proc-lbl${j === k ? " on" : ""}`} style={{ left: `${(j / 6) * 100}%` }}>
              <b>{pad(j)}</b>
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
