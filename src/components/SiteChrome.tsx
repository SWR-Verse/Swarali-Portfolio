"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { Logo, LogoSymbol } from "./Logo";
import Nav from "./Nav";

const FLICK_WORDS = ["PRODUCT", "RESEARCH", "STRATEGY", "SYSTEM", "IMPACT", "CRAFT", "MOTION", "FLOW", "HUMAN", "SHIP"];

/** Reveals the hero of whatever page just mounted, staggered — doesn't wait
 * on scroll position, so the first thing you see always animates in. */
function revealHero() {
  document.querySelectorAll("main section:first-of-type .rv").forEach((el, i) => {
    setTimeout(() => el.classList.add("show"), 120 + i * 110);
  });
}

export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isFirstPathname = useRef(true);
  const scrollState = useRef({ target: 0, current: 0, last: 0, vel: 0 });

  /* ---------- first paint: intro (home only, once per session) or a quick curtain reveal ---------- */
  useEffect(() => {
    const curtain = document.getElementById("curtain");
    const introEl = document.getElementById("intro");
    const wipeEl = document.getElementById("wipe");
    const flickEl = document.getElementById("flick");
    const navEl = document.getElementById("nav");

    const firstRun = pathname === "/" && !sessionStorage.getItem("swr-seen");

    if (firstRun) {
      sessionStorage.setItem("swr-seen", "1");
      curtain?.classList.add("hide");
      let fi = 0;
      const interval = setInterval(() => {
        if (flickEl) flickEl.innerHTML = FLICK_WORDS[fi % FLICK_WORDS.length] + '<span class="amp">.</span>';
        fi++;
        if (fi > FLICK_WORDS.length + 3) {
          clearInterval(interval);
          if (introEl) {
            introEl.style.transition = "opacity .3s";
            introEl.style.opacity = "0";
            setTimeout(() => { introEl.style.display = "none"; }, 300);
          }
          wipeEl?.classList.add("up");
          navEl?.classList.add("on");
          setTimeout(() => { if (wipeEl) wipeEl.style.display = "none"; }, 2600);
          revealHero();
        }
      }, 300);
      return () => clearInterval(interval);
    } else {
      if (introEl) introEl.style.display = "none";
      if (wipeEl) wipeEl.style.display = "none";
      navEl?.classList.add("on");
      const t = setTimeout(() => curtain?.classList.add("out"), 240);
      revealHero();
      return () => clearTimeout(t);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ---------- every subsequent route change: uncover the curtain, reset scroll, replay the hero ---------- */
  useEffect(() => {
    if (isFirstPathname.current) { isFirstPathname.current = false; return; }
    const curtain = document.getElementById("curtain");
    const scroller = document.getElementById("scroll");
    scrollState.current.target = 0;
    scrollState.current.current = 0;
    scrollState.current.last = 0;
    if (scroller) scroller.style.transform = "translateY(0px)";
    window.scrollTo(0, 0);
    if (curtain) {
      curtain.classList.remove("in");
      void curtain.offsetWidth;
      curtain.classList.add("out");
    }
    document.querySelectorAll(".rv, .rv-stg").forEach((el) => el.classList.remove("show"));
    requestAnimationFrame(revealHero);
  }, [pathname]);

  /* ---------- smooth scroll + sheen drift + progress bar + paperband nav flip + reveals ---------- */
  useEffect(() => {
    const scroller = document.getElementById("scroll");
    const sheen = document.getElementById("sheen");
    const prog = document.getElementById("progress");
    const navEl = document.getElementById("nav");
    if (!scroller) return;

    function setBodyHeight() {
      const h = scroller!.offsetHeight;
      document.documentElement.style.setProperty("--bodyH", h + "px");
      /* The light spans the document, so it has to be re-measured with it. */
      document.documentElement.style.setProperty("--sheenH", h + "px");
    }
    document.body.classList.add("smooth");
    setBodyHeight();
    const ro = new ResizeObserver(setBodyHeight);
    ro.observe(scroller);
    window.addEventListener("resize", setBodyHeight);
    if (document.fonts?.ready) document.fonts.ready.then(setBodyHeight);
    const settleTimer = setTimeout(setBodyHeight, 1500);

    function checkReveals() {
      document.querySelectorAll(".rv:not(.show), .rv-stg:not(.show)").forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top < window.innerHeight * 0.86 && r.bottom > 0) {
          el.classList.add("show");
          if (el.classList.contains("rv-stg")) {
            [...el.children].forEach((c, i) => {
              (c as HTMLElement).style.transitionDelay = i * 80 + "ms";
            });
          }
        }
      });
    }

    let raf = 0;
    function tick() {
      const s = scrollState.current;
      s.target = window.scrollY || window.pageYOffset;
      s.current += (s.target - s.current) * 0.09;
      s.vel = s.current - s.last;
      s.last = s.current;
      /* Sections that must not tilt damp the skew at the source rather than
         cancelling it on themselves — cancelling leaves their own background
         edges shearing with the page, which still reads as a tilt. */
      const damp = Math.max(0, Math.min(1, window.__skewDamp ?? 1));
      const skew = Math.max(-5, Math.min(5, s.vel * 0.1)) * damp;
      scroller!.style.transform = `translateY(${-s.current}px) skewY(${skew}deg)`;
      /* Publish what the page is actually painted at this frame. Subscribers
         doing scroll math must use these — window.scrollY runs ahead of the
         eased position, and getBoundingClientRect() inside #scroll is skewed
         by `skew` (a shear moves y by x*tan(skew), which is tens of pixels on
         a wide element). */
      window.__scrollFX = { y: s.current, skew };

      const max = scroller!.offsetHeight - window.innerHeight;
      if (sheen) {
        /* Exactly -scroll, with no parallax factor. Anything other than 1.0
           makes the light drift against the page as you move, which reads as
           the gradient following you. Horizontal drift is kept — it moves
           across, never with. */
        sheen.style.transform = `translate3d(${Math.sin(s.current / 1400) * 22}px,${-s.current}px,0)`;
      }
      if (prog) prog.style.width = Math.min(1, s.current / Math.max(1, max)) * 100 + "%";

      document.querySelectorAll(".band-track").forEach((b) => {
        (b as HTMLElement).style.transform = `translateX(${(-s.current * 0.32) % (b.scrollWidth / 2) - 40}px)`;
      });

      const band = document.querySelector(".paperband");
      const onPaper = band ? (() => { const r = band.getBoundingClientRect(); return r.top < 52 && r.bottom > 52; })() : false;
      navEl?.classList.toggle("onlight", onPaper);

      /* Is the nav sitting on the light end of the ramp? The ramp is measured in
         vh, so this is too — 34vh is where it passes the point at which white
         and dark ink are equally legible on it.
         Skipped over the paper band, which is opaque and hides the light. */
      navEl?.classList.toggle("onbright", !onPaper && 52 + s.current < window.innerHeight * 0.34);

      checkReveals();
      if (window.__deckTick) window.__deckTick();
      window.__scrollTicks?.forEach((fn) => fn());
      raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("resize", setBodyHeight);
      clearTimeout(settleTimer);
    };
  }, []);

  return (
    <>
      <LogoSymbol />
      {/* Order matters: the blooms sit behind the hero ramp, which is opaque
          over the hero and transparent below it. */}
      <div className="glow" />
      <div className="sheen" id="sheen" />
      <div className="vig" />
      <div className="grain" />
      <div className="progress" id="progress" />

      <div id="intro">
        <div className="flick" id="flick" />
      </div>
      <div id="wipe">
        <div className="badge">
          <Logo />
          <div className="sub">
            <i />Strategic ✳ Well-crafted ✳ Remarkable<i />
          </div>
        </div>
      </div>

      <div id="curtain">
        <Logo />
      </div>

      <Nav />

      <div id="scroll">
        <main>{children}</main>
      </div>
    </>
  );
}
