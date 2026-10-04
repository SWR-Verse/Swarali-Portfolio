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
  /* Accumulated upward travel since the last downward move — see the nav
     retraction in tick(). A counter rather than a boolean so one stray notch
     can't toggle it. */
  const navUp = useRef(0);

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

  /* ---------- smooth scroll + light layers + paperband nav flip + reveals ---------- */
  useEffect(() => {
    const scroller = document.getElementById("scroll");
    const sheen = document.getElementById("sheen");
    const pageglow = document.getElementById("pageglow");
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
      /* ---- the bottom sweep ----
         The trigger line is 86% down the viewport, and an element that has not
         revealed yet is sitting 70px BELOW where it will end up, because that
         translate is what the reveal removes. For anything near the foot of the
         document those two facts deadlock: the footer's own row lands at ~86%
         of the viewport when you are scrolled as far as the page goes, the
         pending translate pushes it past the line, and there is no scroll left
         to bring it back — so it stayed invisible for good. That is why About /
         Work / Contact and the copyright never appeared.

         Anything still hidden once the page is scrolled out is, by definition,
         as visible as it is ever going to get, so reveal it. Checked against
         the real scroll position rather than the eased one: this is a question
         about the document, not about where the animation currently is. */
      const atBottom =
        window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 4;

      document.querySelectorAll(".rv:not(.show), .rv-stg:not(.show)").forEach((el) => {
        const r = el.getBoundingClientRect();
        if (atBottom || (r.top < window.innerHeight * 0.86 && r.bottom > 0)) {
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

      if (sheen) {
        /* Exactly -scroll, with no parallax factor. Anything other than 1.0
           makes the light drift against the page as you move, which reads as
           the gradient following you. Horizontal drift is kept — it moves
           across, never with. */
        sheen.style.transform = `translate3d(${Math.sin(s.current / 1400) * 22}px,${-s.current}px,0)`;
      }
      /* Same -scroll, no drift: the page-long blooms sit at fixed points on the
         document, so they pass by as you scroll instead of following you. */
      if (pageglow) pageglow.style.transform = `translate3d(0,${-s.current}px,0)`;

      document.querySelectorAll(".band-track").forEach((b) => {
        (b as HTMLElement).style.transform = `translateX(${(-s.current * 0.32) % (b.scrollWidth / 2) - 40}px)`;
      });

      const band = document.querySelector(".paperband");
      const onPaper = band ? (() => { const r = band.getBoundingClientRect(); return r.top < 52 && r.bottom > 52; })() : false;
      navEl?.classList.toggle("onlight", onPaper);

      /* ---- the nav retracts past the hero ----
         It is fixed, so below the fold it sat on top of whatever heading
         happened to be at the top of the viewport — the logo landing inside
         SELECTED WORK or MY EXPERTISE, two pieces of display type competing at
         the same point on screen with nothing to say which one you were meant
         to read.

         Over the hero it stays put: that is the one screen with room for it,
         and it is where someone first looks for navigation. Past the hero it
         leaves, and comes back the moment you scroll up — which is when a
         person is looking for a way out of the page. Hiding it outright would
         mean the only route to About or Work is to scroll all the way back to
         the top.

         The 24px dead zone on the upward gesture stops a single wheel notch,
         or the rubber-band at the end of a trackpad flick, from flashing the
         nav back in. */
      const heroH = document.querySelector("main section")?.clientHeight ?? window.innerHeight;
      if (s.current < heroH - 80) {
        navUp.current = 0;
      } else if (s.vel < -0.4) {
        navUp.current += -s.vel;
      } else if (s.vel > 0.4) {
        navUp.current = 0;
      }
      navEl?.classList.toggle("hid", s.current >= heroH - 80 && navUp.current < 24);

      /* No `onbright` any more: the hero is dark again, so the nav's white links
         read everywhere except over the paper band, which `onlight` covers. */

      checkReveals();
      if (window.__deckTick) window.__deckTick();
      /* Skew damping is voted on fresh every frame: each section that must
         not tilt lowers it with Math.min, and the lowest vote is applied on
         the next frame. Resetting here stops one section's "1" from
         overwriting another section's "0". */
      window.__skewDamp = 1;
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
      {/* Order matters: the blooms sit behind the hero light, which paints --bg
          over the fold and fades out below it. Named `pageglow`, not `glow` —
          the case study cards already use `.glow` for their own corner light. */}
      <div className="pageglow" id="pageglow" />
      <div className="sheen" id="sheen" />
      <div className="vig" />
      <div className="grain" />

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
