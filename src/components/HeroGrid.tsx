"use client";

import { useLayoutEffect, useRef } from "react";

/** Locks a hero's type to its background grid. Drop <HeroGrid /> anywhere
 * inside a hero (`.hero-fold`, `.hero-work`, `.hero-contact`); it finds the
 * hero it sits in and lays it out.
 *
 * The grid behind each hero is a plain lattice of square cells. This picks the
 * cell size and the lattice's offset, then places every piece of type on it:
 *
 *  - the page name ("SWARALI.", "ABOUT.", "WORK.", "SAY HI.") is sized so its
 *    cap height is exactly k cells, cap tops on one line and baseline on
 *    another, and tracked a hair so it is a whole number of cells wide from its
 *    first stroke to the last letter's last stroke. That width is the block;
 *    the full stop hangs just outside it, its edge on a line too;
 *  - the three labels each sit centred in one row, spanning the block, so
 *    "Based in India" ends exactly where the last letter does;
 *  - the line under the name — role + blurb on the home and about heroes, the
 *    two-line statement + paragraph on work and contact — sits after one clear
 *    row: display lines one row each, body lines half a row each, and the
 *    paragraph is a whole number of cells wide and ends on the block's edge.
 *
 * Horizontally the block is either centred and nudged one cell right (the
 * home hero, `align="center"`) or set on the column's left edge (about, work
 * and contact, `align="left"`, two cells in). Vertically it is centred in the hero on whole
 * rows and nudged one row down when there's room, always with a clear row
 * below it; if the type wouldn't fit, the name steps down a row (a quarter of
 * its height at most) before the hero grows.
 *
 * Measurements use offsetTop/Left, which ignore the reveal transforms, so it
 * can run while the type is still hidden below its clips. */

const HEROES = ".hero-fold, .hero-work, .hero-contact";
// The left-aligned heroes are one family: about, work and contact share one
// layout so nothing moves between them except the word itself. Their names
// (the text before the full stop) size the shared block.
const FAMILY = ["ABOUT", "WORK", "SAY HI"];
const TARGET = 44; // the cell the lattice was drawn at
const MIN = 38;
const MAX = 52;
const PAD = 0.08; // em of breathing room inside the name's clip box

function off(el: HTMLElement, root: HTMLElement) {
  let x = 0;
  let y = 0;
  let e: HTMLElement | null = el;
  while (e && e !== root) {
    x += e.offsetLeft;
    y += e.offsetTop;
    e = e.offsetParent as HTMLElement | null;
  }
  return { x, y };
}

function fontMetrics(font: string, text: string) {
  const ctx = document.createElement("canvas").getContext("2d");
  if (!ctx) return null;
  ctx.font = font;
  const m = ctx.measureText(text);
  return {
    A: m.fontBoundingBoxAscent / 1000,
    D: m.fontBoundingBoxDescent / 1000,
    cap: m.actualBoundingBoxAscent / 1000,
    lsb: -m.actualBoundingBoxLeft / 1000,
    rsb: (m.width - m.actualBoundingBoxRight) / 1000,
    w: m.width / 1000,
  };
}

function layout(hero: HTMLElement, align: "center" | "left") {
  const top = hero.querySelector<HTMLElement>(":scope > .hero-top");
  const h1 = hero.querySelector<HTMLElement>(".hero-name, .page-name");
  const wrap = h1?.parentElement as HTMLElement | null;
  const span = h1?.firstElementChild as HTMLElement | null;
  const dot = h1?.querySelector<HTMLElement>(".dot") ?? null;
  const row = hero.querySelector<HTMLElement>(":scope > .hero-row, :scope > .intro-row");
  if (!top || !h1 || !wrap || !span || !dot || !row) return;
  const intro = row.classList.contains("intro-row");
  const lead = row.querySelector<HTMLElement>(intro ? ":scope > .big" : ".hero-role");
  const para = row.querySelector<HTMLElement>(intro ? ":scope > p" : ".hero-blurb");
  if (!lead || !para) return;
  const labels = Array.from(top.children) as HTMLElement[];
  const textNode = Array.from(span.childNodes).find(
    (n) => n.nodeType === 3 && n.textContent?.trim(),
  );
  if (!textNode) return;

  // Back to the stylesheet's layout before measuring anything.
  hero.classList.remove("hg-on");
  for (const el of [hero, wrap, h1, span, dot, row, lead, para, ...labels]) el.removeAttribute("style");

  const hs = getComputedStyle(hero);
  const padL0 = parseFloat(hs.paddingLeft) || 0;
  const padR0 = parseFloat(hs.paddingRight) || 0;
  const W = hero.clientWidth - padL0 - padR0;
  if (W < MIN * 2) return;
  const H = hero.offsetHeight; // the height the stylesheet gives this hero
  const beforeLeft = parseFloat(getComputedStyle(hero, "::before").left) || 0;
  const paraW0 = para.offsetWidth;

  const cs = getComputedStyle(h1);
  const cssFs = parseFloat(cs.fontSize);
  const lsEm = (parseFloat(cs.letterSpacing) || 0) / cssFs;
  let text = textNode.textContent ?? "";
  if (cs.textTransform === "uppercase") text = text.toUpperCase();
  const m = fontMetrics(`${cs.fontWeight} 1000px ${cs.fontFamily}`, text);
  if (!m || !m.cap) return;
  const chars = text.length || 1;

  // Widths per px of font-size. The block runs from the first letter's first
  // ink to the last letter's last ink; the full stop hangs outside it.
  const range = document.createRange();
  range.selectNodeContents(textNode);
  const spanX = off(span, hero).x;
  const textW0 = range.getBoundingClientRect().width;
  const dotRight0 = off(dot, hero).x + dot.offsetWidth;
  const dotGapPerPx = (dotRight0 - spanX - textW0) / cssFs; // same .dot rule on every page
  const fam = align === "left";

  // Family mode measures every name on a canvas, never this page's DOM, so the
  // three pages reach exactly the same numbers. Cap height is a flat letter's
  // (H), so the round O and S overshoot the lines the way type should.
  const font = `${cs.fontWeight} 1000px ${cs.fontFamily}`;
  const famInk = (t: string) => {
    const fm = fontMetrics(font, t);
    if (!fm) return { ink: 0, hang: 0, n: 1 };
    return {
      ink: fm.w + t.length * lsEm - lsEm - fm.rsb - fm.lsb,
      hang: lsEm + fm.rsb + dotGapPerPx,
      n: t.length || 1,
    };
  };
  const famList = fam ? FAMILY.map(famInk) : [];
  const widest = famList.reduce((a, b) => (b.ink > a.ink ? b : a), { ink: 0, hang: 0, n: 1 });
  const capR = fam ? fontMetrics(font, "H")?.cap || m.cap : m.cap;
  const rem = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
  const famCapFs = Math.min(Math.max(4.5 * rem, 0.24 * window.innerWidth), 22 * rem) * 1.08;

  const inkPerPx = fam ? famInk(text).ink : textW0 / cssFs - lsEm - m.rsb - m.lsb;
  const hangPerPx = fam ? widest.hang : lsEm + m.rsb + dotGapPerPx;
  const blockInkPerPx = fam ? widest.ink : inkPerPx; // what sets the block's width
  const fsMax = fam
    ? Math.min(W / (widest.ink + widest.hang), famCapFs)
    : Math.min(W / (inkPerPx + hangPerPx), cssFs * 1.08);

  const nav = document.getElementById("nav");
  const navH = (nav?.offsetHeight ?? 0) + 8;

  // Pick the cell: the name a whole number of cells tall and, after at most a
  // hair of tracking, a whole number of cells wide. `kCap` limits its height in
  // rows when the hero would otherwise have to grow.
  // `tol` is how much the tracking may change per letter, in em: a hair
  // first, more only when a short name leaves no closer fit (on a phone,
  // "SAY HI" two rows tall is 5.3 cells wide whatever the cell size).
  const pickAt = (kCap: number, tol: number) => {
    let best: { c: number; k: number; fs: number; nb: number; nbName: number; score: number } | null =
      null;
    for (let c = MIN; c <= MAX + 1e-6; c += 0.05) {
      const k = Math.min(kCap, Math.floor((fsMax * capR) / c));
      if (k < 1) continue;
      const fs = (k * c) / capR;
      const ink = blockInkPerPx * fs;
      let nb = Math.round(ink / c);
      if (nb * c + hangPerPx * fs > W) nb -= 1;
      if (nb < 1) continue;
      // tracking change per letter — in family mode, the worst of the three
      let err = Math.abs(nb * c - ink) / (fam ? widest.n : chars);
      for (const f of famList) {
        if (f === widest) continue;
        const fi = f.ink * fs;
        err = Math.max(err, Math.abs(Math.round(fi / c) * c - fi) / f.n);
      }
      if (err > fs * tol) continue; // keep the name looking like itself
      const nbName = fam ? Math.min(nb, Math.max(1, Math.round((inkPerPx * fs) / c))) : nb;
      const score = fs - err * 6 - Math.abs(c - TARGET) * 0.6;
      if (!best || score > best.score) best = { c, k, fs, nb, nbName, score };
    }
    return best;
  };
  const pick = (kCap: number) =>
    pickAt(kCap, 0.012) ?? pickAt(kCap, 0.03) ?? pickAt(kCap, 0.06);

  // B is the block (labels + bottom row); nameB is where this page's name
  // ends — the same as B except on the shorter names of the family.
  const apply = (c: number, fs: number, B: number, nameB: number) => {
    hero.style.setProperty("--cell", `${c}px`);
    hero.style.boxSizing = "border-box";
    hero.style.paddingTop = "0px";
    hero.style.paddingBottom = `${c}px`; // one clear row under the type
    hero.style.minHeight = `${H}px`;
    hero.classList.add("hg-on");

    // Name: cap top on the line under the label row, baseline k rows lower.
    const L = fs * (capR + 2 * PAD);
    const capTopInBox = L / 2 + ((m.A - m.D) / 2) * fs - capR * fs;
    h1.style.fontSize = `${fs}px`;
    h1.style.lineHeight = `${L}px`;
    wrap.style.marginTop = `${-capTopInBox}px`;
    wrap.style.marginBottom = `${-(L - capTopInBox - capR * fs)}px`;
    span.style.marginLeft = `${-m.lsb * fs}px`;

    // Tracking, so the last letter's last stroke ends on the block's edge.
    const inkRight = (ls: number) =>
      off(span, hero).x + range.getBoundingClientRect().width - ls - m.rsb * fs;
    let ls = lsEm * fs;
    for (let i = 0; i < 3; i++) {
      h1.style.letterSpacing = `${ls}px`;
      ls += (nameB - (inkRight(ls) - (off(span, hero).x + m.lsb * fs))) / chars;
    }
    h1.style.letterSpacing = `${ls}px`;

    // The full stop: nudge its gap (within reason) so its edge lands on a line.
    const dotML = parseFloat(getComputedStyle(dot).marginLeft) || 0;
    const hang0 = off(dot, hero).x + dot.offsetWidth - inkRight(ls);
    let hang = hang0;
    const t0 = Math.round(hang0 / c);
    for (const t of [t0, t0 + 1, t0 - 1]) {
      const ml = dotML + (t * c - hang0);
      if (ml >= 0.015 * fs && ml <= 0.1 * fs) {
        dot.style.marginLeft = `${ml}px`;
        hang = t * c;
        break;
      }
    }

    // Horizontally: centre the whole name (stop included), then one cell right
    // when there's room for it on a wide screen.
    // Left-aligned heroes sit two cells in from the column's left edge (fewer
    // when the name leaves less room than that, as on a phone).
    // (In the family the room is judged on the widest name, so all three agree.)
    const hangB = fam ? hangPerPx * fs : hang;
    let pl = Math.min(2, Math.max(0, Math.floor((W - B - hangB) / c))) * c;
    if (align === "center") {
      pl = (W - B - hang) / 2;
      if (pl >= c && W >= 16 * c) pl += c; // not on phones: there it just looks off-centre
    }
    hero.style.paddingLeft = `${padL0 + pl}px`;
    hero.style.paddingRight = `${padR0 + (W - pl - B)}px`;
    wrap.style.marginRight = `${-(hang + 0.1 * fs)}px`; // let the stop out of the block
    // Lines are measured from the hero's top edge and the block's left edge.
    hero.style.setProperty("--gx", `${(((padL0 + pl - beforeLeft) % c) + c) % c}px`);

    // The line under the name: one clear row, then display lines a row each
    // and body lines half a row each. The paragraph is whole cells wide and
    // ends on the block's right edge.
    row.style.marginTop = `${c}px`;
    // A small statement (phones) would float in a full row per line; give it
    // half rows instead, which is about the line-height it was set at.
    if (intro && parseFloat(getComputedStyle(lead).fontSize) <= c * 0.55) {
      lead.style.lineHeight = `${c / 2}px`;
    }
    let paraCells = Math.ceil((paraW0 - 0.5) / c);
    // Keep the paragraph beside the statement when it can be: narrow it to the
    // whole cells left after the statement and a one-cell gap. When it has to
    // drop below instead, it may run past a short name, out to the column edge.
    const room = Math.floor((B - Math.ceil((lead.offsetWidth - 0.5) / c) * c - c) / c);
    if (room >= 6) paraCells = Math.min(paraCells, room, Math.floor(B / c));
    else paraCells = Math.min(paraCells, Math.floor((W - pl) / c));
    para.style.width = `${paraCells * c}px`;
    para.style.maxWidth = "none";

    // Middle label: start it on the nearest vertical line (only when the three
    // labels share one line; when they wrap each already starts on the left).
    if (labels.length === 3 && labels.every((l) => l.offsetTop === labels[0].offsetTop)) {
      const mid = labels[1];
      const x = off(mid, hero).x - (padL0 + pl);
      mid.style.transform = `translateX(${Math.round(x / c) * c - x}px)`;
    }

    const first = off(top, hero).y;
    const last = off(row, hero).y + row.offsetHeight;
    return Math.round((last - first) / c); // rows of type
  };

  let best = pick(Infinity);
  if (!best) return;
  let rows = apply(best.c, best.fs, best.nb * best.c, best.nbName * best.c);
  // Keep the hero's height: if the type doesn't fit under the nav, take rows
  // off the name until it does.
  for (let i = 0; i < 3; i++) {
    // nav rows + type + one clear row at the bottom must fit the hero
    const over = Math.ceil(navH / best.c) + rows + 1 - Math.floor(H / best.c);
    // Step the name down by a quarter at most; past that, let the hero grow.
    if (over <= 0 || best.k - over < Math.max(2, Math.ceil(best.k * 0.75))) break;
    const next = pick(best.k - over);
    if (!next) break;
    best = next;
    rows = apply(best.c, best.fs, best.nb * best.c, best.nbName * best.c);
  }
  const c = best.c;

  // Vertically: centre the type in the hero on whole rows, never under the
  // nav, then one row lower when there's room — always leaving at least one
  // clear row below the type, so it never sits on the hero's bottom edge.
  const rMin = Math.ceil(navH / c);
  const rMax = Math.floor(H / c) - rows - 1;
  let r0 = Math.max(rMin, Math.min(rMax, Math.round((H / c - rows) / 2)));
  if (r0 + 1 <= rMax) r0 += 1;
  hero.style.paddingTop = `${r0 * c}px`;
}

export default function HeroGrid({ align = "center" }: { align?: "center" | "left" }) {
  const anchor = useRef<HTMLSpanElement>(null);
  useLayoutEffect(() => {
    const hero = anchor.current?.closest<HTMLElement>(HEROES);
    if (!hero) return;
    let raf = 0;
    const run = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => layout(hero, align));
    };
    layout(hero, align);
    document.fonts?.ready.then(run);
    window.addEventListener("resize", run);
    // The column can change width without a window resize (a scrollbar
    // appearing, say), so watch the hero too — but only its width, since the
    // layout above changes its padding and height.
    let lastW = hero.offsetWidth;
    const ro = new ResizeObserver(() => {
      if (hero.offsetWidth !== lastW) {
        lastW = hero.offsetWidth;
        run();
      }
    });
    ro.observe(hero);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("resize", run);
    };
  }, [align]);
  return <span ref={anchor} hidden aria-hidden="true" />;
}
