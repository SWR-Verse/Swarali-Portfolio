import type { ReactNode } from "react";

/** The horizontal keyword strip under a hero. One long line, moved by scroll
 * position (see SiteChrome's raf loop) rather than a CSS marquee — repeated
 * enough times that it never visibly runs out while scrolling. */
export function Band({ words, repeat = 9 }: { words: string[]; repeat?: number }) {
  const seq = Array.from({ length: repeat }, () => words).flat();
  const nodes: ReactNode[] = [];
  seq.forEach((w, i) => {
    nodes.push(<span key={`w${i}`}>{w}</span>);
    nodes.push(<em key={`e${i}`}>✳</em>);
  });
  return (
    <div className="band">
      <div className="band-track">{nodes}</div>
    </div>
  );
}
