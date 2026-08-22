"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";

/** Click-to-enlarge for case study screens. Any element carrying
 * data-cszoom="/path.jpg" opens that image full size.
 *
 * The overlay is portalled to <body> on purpose: the site's smooth scroll
 * puts a transform on #scroll, and a transformed ancestor makes
 * position:fixed resolve against that ancestor instead of the viewport. */
export default function CaseZoom({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [src, setSrc] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    function onClick(e: MouseEvent) {
      const hit = (e.target as HTMLElement | null)?.closest?.("[data-cszoom]");
      if (hit) setSrc(hit.getAttribute("data-cszoom"));
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setSrc(null);
    }

    el.addEventListener("click", onClick);
    window.addEventListener("keydown", onKey);
    return () => {
      el.removeEventListener("click", onClick);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = src ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [src]);

  return (
    <div ref={ref}>
      {children}
      {mounted && src
        ? createPortal(
            <div className="cs-lb" onClick={() => setSrc(null)}>
              <span className="x">Close ✕</span>
              <img src={src} alt="Enlarged screen" />
            </div>,
            document.body
          )
        : null}
    </div>
  );
}
