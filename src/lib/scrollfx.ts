/** Shared helpers for anything doing scroll math inside `#scroll`.
 *
 * The site runs a custom eased scroll: SiteChrome writes
 * `translateY(-y) skewY(skew)` onto `#scroll` every frame. Two consequences
 * that bite every scroll-driven component:
 *
 *  1. `window.scrollY` is the *target*, not what's painted. Reading it makes a
 *     component race ahead of the page by up to a few hundred milliseconds.
 *  2. `getBoundingClientRect()` is measured in painted space, so the skew
 *     shears every rect's top by `x * tan(skew)` — tens of pixels on a wide
 *     element, swinging around as you scroll.
 *
 * So: positions come from `layoutTop()`, and the scroll offset comes from
 * `scrollFX()`. Never from rects, never from `window.scrollY`.
 */

/** Layout offset of `el` from the top of the scroller, walking the
 * offsetParent chain. Pure layout — transforms are invisible to it, which is
 * exactly why it's stable while the page is skewing. */
export function layoutTop(el: HTMLElement): number {
  let y = 0;
  let node: HTMLElement | null = el;
  while (node) {
    y += node.offsetTop;
    node = node.offsetParent as HTMLElement | null;
  }
  return y;
}

/** The smoothed scroll offset the page is actually painted at this frame, and
 * the skew currently applied to `#scroll`. Falls back to the raw scroll
 * position before SiteChrome's loop has published anything. */
export function scrollFX(): { y: number; skew: number } {
  if (typeof window === "undefined") return { y: 0, skew: 0 };
  return window.__scrollFX ?? { y: window.scrollY || window.pageYOffset || 0, skew: 0 };
}

/** Subscribe to SiteChrome's single rAF loop. Returns an unsubscribe fn.
 * Everything shares one loop so components can't each spawn their own. */
export function onScrollTick(fn: () => void): () => void {
  (window.__scrollTicks ??= new Set()).add(fn);
  return () => {
    window.__scrollTicks?.delete(fn);
  };
}
