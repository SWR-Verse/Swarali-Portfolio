"use client";

import { useState } from "react";

const PLATES = [
  { cls: "p1", img: "speaker.jpg", alt: "Portable speaker — form studies", n: "Speaker", t: "Portable speaker", d: "Silhouette passes and a single CMF band, tested across six bodies.", i: "01" },
  { cls: "p2", img: "earbuds.jpg", alt: "In-ear headphones — form and section studies", n: "Earbuds", t: "In-ear headphones", d: "Nozzle angle and ear-canal fit, worked out in section.", i: "02" },
  { cls: "p3", img: "mouse.jpg", alt: "Gaming mouse — ergonomic studies", n: "Mouse", t: "Gaming mouse", d: "Palm arch and thumb rest — grip before styling.", i: "03" },
  { cls: "p4", img: "hairdryer.jpg", alt: "Hair dryer — proportion studies", n: "Dryer", t: "Hair dryer", d: "Barrel-to-handle proportion, balanced around where the weight sits.", i: "04" },
  { cls: "p5", img: "iron.jpg", alt: "Steam iron — soleplate and handle studies", n: "Iron", t: "Steam iron", d: "Soleplate profile and handle clearance, drawn until the grip made sense.", i: "05" },
];

function Plate({ plate }: { plate: (typeof PLATES)[number] }) {
  const [empty, setEmpty] = useState(false);
  return (
    <figure className={`plate ${plate.cls} rv${empty ? " empty" : ""}`}>
      <div className="ph-inner">
        <img src={`/sketches/${plate.img}`} alt={plate.alt} onError={() => setEmpty(true)} />
        <div className="ph">
          <div className="n">{plate.n}</div>
          <div className="f">sketches/{plate.img}</div>
        </div>
      </div>
      <figcaption>
        <span className="t">{plate.t}</span>
        <span className="d">{plate.d}</span>
        <span className="i">{plate.i}</span>
      </figcaption>
    </figure>
  );
}

export default function SketchWall() {
  return (
    <div className="wall">
      {PLATES.map((p) => (
        <Plate key={p.cls} plate={p} />
      ))}
    </div>
  );
}
