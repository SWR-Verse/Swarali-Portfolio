"use client";

import { useEffect, useRef } from "react";

const PROJECTS = [
  { no: "01", word: "Nebula", img: "/work/nebula.jpg", alt: "Nebula — fintech dashboard", pt: "Nebula", cat: "Fintech · Dashboard · 2026" },
  { no: "02", word: "Pulse", img: "/work/pulse.jpg", alt: "Pulse — health app", pt: "Pulse", cat: "Mobile · Health · 2025" },
  { no: "03", word: "Atlas", img: "/work/atlas.jpg", alt: "Atlas — realtime SaaS", pt: "Atlas", cat: "SaaS · Realtime · 2024" },
  { no: "04", word: "Vela", img: "/work/vela.jpg", alt: "Vela — brand site", pt: "Vela", cat: "Brand · Web · 2023" },
];

/** Cards stacked on top of one another. The deck reserves extra scroll height
 * (.deck-stage); while that range is passing through the viewport, the stack
 * holds its position on screen and cycles with scroll progress. A single
 * continuous formula handles entry, pin+cycle, and release — nothing jumps,
 * and it reverses cleanly scrolling back up. */
export default function WorkDeck() {
  const stageRef = useRef<HTMLDivElement>(null);
  const deckRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const dotRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const stage = stageRef.current;
    const deck = deckRef.current;
    if (!stage || !deck) return;
    const cards = cardRefs.current.filter((c): c is HTMLDivElement => c !== null);
    const dots = dotRefs.current.filter((d): d is HTMLSpanElement => d !== null);
    const PIN = 130;

    function sizeStage() {
      const h = deck!.offsetHeight || 560;
      const target = h + (cards.length - 1) * window.innerHeight * 0.62;
      if (Math.abs((parseFloat(stage!.style.height) || 0) - target) > 2) {
        stage!.style.height = target + "px";
      }
    }
    sizeStage();

    function renderDeck(front: number) {
      cards.forEach((c, i) => {
        const pos = (i - front + cards.length) % cards.length;
        c.style.zIndex = String(cards.length - pos);
        c.style.transform = `translateY(${pos * 16}px) scale(${1 - pos * 0.045})`;
        c.style.opacity = pos < 3 ? String(1 - pos * 0.3) : "0";
      });
      dots.forEach((d, i) => d.classList.toggle("on", i === front));
    }

    function tick() {
      if (!stage!.offsetParent) return;
      sizeStage();
      const r = stage!.getBoundingClientRect();
      const range = Math.max(1, r.height - deck!.offsetHeight);
      const extra = Math.min(range, Math.max(0, PIN - r.top));
      deck!.style.transform = extra ? `translateY(${extra}px)` : "";
      const progress = extra / range;
      renderDeck(Math.min(cards.length - 1, Math.floor(progress * cards.length)));
    }

    renderDeck(0);
    window.__deckTick = tick;
    return () => {
      if (window.__deckTick === tick) delete window.__deckTick;
    };
  }, []);

  return (
    <div className="deck-stage" ref={stageRef}>
      <div className="deck rv" ref={deckRef}>
        {PROJECTS.map((p, i) => (
          <div
            className="dcard"
            key={p.pt}
            ref={(el) => {
              cardRefs.current[i] = el;
            }}
          >
            <div className="frame">
              <img src={p.img} alt={p.alt} onError={(e) => e.currentTarget.remove()} />
              <div className="no">{p.no}</div>
              <div className="word">{p.word}</div>
              <div className="meta">
                <div className="pt">{p.pt}</div>
                <div className="cat">{p.cat}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="deck-dots">
        {PROJECTS.map((p, i) => (
          <span
            key={p.pt}
            className={i === 0 ? "on" : undefined}
            ref={(el) => {
              dotRefs.current[i] = el;
            }}
          />
        ))}
      </div>
      <div className="deck-hint rv">Scroll to move through the deck</div>
    </div>
  );
}
