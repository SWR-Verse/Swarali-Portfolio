"use client";

import { useEffect, useRef, useState } from "react";

/** "Before any of it." — a moodboard: eight prints laid straight on the page,
 * overlapping, each held down by a strip of clear tape.
 *
 * Positions are percentages of the board (`x`, `y`, `w`), and each print keeps
 * its own aspect ratio, so the whole composition scales as one piece. `z` sets
 * the stacking — later prints sit on top of earlier ones exactly as they would
 * if they had been taped down in that order. `tape` places the strip along the
 * top edge (`at` = % from the print's left, `r` = rotation in degrees).
 *
 * Drop the photos into /public/sketches with the names below. Any ratio works
 * — they are cropped to fill. Until a file exists the print shows as a blank
 * sheet of sketch paper with its name pencilled on. */
type Snap = {
  img: string;
  alt: string;
  n: string;
  x: number;
  y: number;
  w: number;
  ar: string;
  z: number;
  tape: { at: number; r: number; w?: number };
};

const SNAPS: Snap[] = [
  { img: "speaker.jpg",   alt: "Portable speaker — form studies",         n: "Speaker", x: 4,    y: 14,   w: 18.5, ar: "4 / 5",  z: 1, tape: { at: 50, r: 3 } },
  { img: "earbuds.jpg",   alt: "In-ear headphones — form studies",        n: "Earbuds", x: 23.5, y: 9,    w: 18.5, ar: "5 / 6",  z: 2, tape: { at: 50, r: -2 } },
  { img: "mouse.jpg",     alt: "Gaming mouse — ergonomic studies",        n: "Mouse",   x: 40.5, y: 16,   w: 18.5, ar: "4 / 5",  z: 3, tape: { at: 38, r: -6, w: 36 } },
  { img: "hairdryer.jpg", alt: "Hair dryer — proportion studies",         n: "Dryer",   x: 61,   y: 12,   w: 30,   ar: "16 / 9", z: 4, tape: { at: 46, r: 2, w: 28 } },
  { img: "iron.jpg",      alt: "Steam iron — soleplate and handle studies", n: "Iron",  x: 4,   y: 52,   w: 32.5, ar: "16 / 9", z: 5, tape: { at: 44, r: 4, w: 26 } },
  { img: "kettle.jpg",    alt: "Electric kettle — spout and handle studies", n: "Kettle", x: 37.5, y: 59, w: 18.5,   ar: "4 / 3",  z: 6, tape: { at: 50, r: -4, w: 42 } },
  { img: "camera.jpg",    alt: "Compact camera — grip and dial studies",  n: "Camera",  x: 56,   y: 42,   w: 22.5, ar: "5 / 6",  z: 7, tape: { at: 30, r: -5, w: 36 } },
  { img: "lamp.jpg",      alt: "Desk lamp — arm and joint studies",       n: "Lamp",    x: 79.5, y: 50,   w: 17,   ar: "4 / 5",  z: 8, tape: { at: 54, r: 5, w: 48 } },
];

function Print({ s }: { s: Snap }) {
  const [empty, setEmpty] = useState(false);
  const ref = useRef<HTMLImageElement>(null);
  /* A missing file can fail before hydration, when onError never reaches us. */
  useEffect(() => {
    const img = ref.current;
    if (img && img.complete && img.naturalWidth === 0) setEmpty(true);
  }, []);

  return (
    <figure
      className={`snap rv${empty ? " empty" : ""}`}
      style={
        {
          "--x": `${s.x}%`,
          "--y": `${s.y}%`,
          "--w": `${s.w}%`,
          "--ar": s.ar,
          "--z": s.z,
          "--ta": `${s.tape.at}%`,
          "--tr": `${s.tape.r}deg`,
          "--tw": `${s.tape.w ?? 44}%`,
        } as React.CSSProperties
      }
    >
      <div className="snap-img">
        {!empty && <img ref={ref} src={`/sketches/${s.img}`} alt={s.alt} onError={() => setEmpty(true)} />}
        <div className="snap-ph" aria-hidden={!empty}>
          <span className="n">{s.n}</span>
          <span className="f">sketches/{s.img}</span>
        </div>
      </div>
      <span className="tape" aria-hidden="true" />
    </figure>
  );
}

export default function SketchWall() {
  return (
    <div className="board">
      {SNAPS.map((s) => (
        <Print key={s.img} s={s} />
      ))}
    </div>
  );
}
