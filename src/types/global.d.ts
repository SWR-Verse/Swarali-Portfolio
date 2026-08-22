export {};

declare global {
  interface Window {
    /** Legacy single-subscriber hook into SiteChrome's rAF loop. */
    __deckTick?: () => void;
    /** Multi-subscriber hook into SiteChrome's rAF loop. */
    __scrollTicks?: Set<() => void>;
    /** Published every frame by SiteChrome: the *smoothed* scroll offset the
     * page is actually painted at, and the skew angle currently applied to
     * `#scroll`. Anything doing scroll math must read `y` from here rather
     * than `window.scrollY` (which runs ahead of the paint), and must cancel
     * `skew` if it doesn't want to inherit the site-wide tilt. */
    __scrollFX?: { y: number; skew: number };
    /** 0–1 multiplier on the site-wide skew, written by whichever section wants
     * the page to stop tilting while it owns the viewport. 1 (or absent) is the
     * normal tilt; 0 is perfectly upright. Damping the source is different from
     * a section cancelling the skew on itself: cancelling leaves the section's
     * own background edges shearing with the rest of the page, which is still
     * visible as a tilt. */
    __skewDamp?: number;
  }
}
