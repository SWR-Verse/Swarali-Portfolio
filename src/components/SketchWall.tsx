"use client";

import { useState } from "react";

type Sketch = {
  cls: string;
  img: string;
  alt: string;
  n: string;
  t: string;
  d: string;
  i: string;
};

const SPEAKER: Sketch = { cls: "w-speaker", img: "speaker.jpg", alt: "Portable speaker — form studies", n: "Speaker", t: "Portable speaker", d: "Silhouette passes and a single CMF band, tested across six bodies.", i: "01" };
const EARBUDS: Sketch = { cls: "w-earbuds", img: "earbuds.jpg", alt: "In-ear headphones — form and section studies", n: "Earbuds", t: "In-ear headphones", d: "Nozzle angle and ear-canal fit, worked out in section.", i: "02" };
const MOUSE: Sketch = { cls: "w-mouse", img: "mouse.jpg", alt: "Gaming mouse — ergonomic studies", n: "Mouse", t: "Gaming mouse", d: "Palm arch and thumb rest — grip before styling.", i: "03" };
const HAIRDRYER: Sketch = { cls: "w-hairdryer", img: "hairdryer.jpg", alt: "Hair dryer — proportion studies", n: "Dryer", t: "Hair dryer", d: "Barrel-to-handle proportion, balanced around where the weight sits.", i: "04" };
const IRON: Sketch = { cls: "w-iron", img: "iron.jpg", alt: "Steam iron — soleplate and handle studies", n: "Iron", t: "Steam iron", d: "Soleplate profile and handle clearance, drawn until the grip made sense.", i: "05" };
const KETTLE: Sketch = { cls: "w-kettle", img: "kettle.jpg", alt: "Electric kettle — spout and handle studies", n: "Kettle", t: "Electric kettle", d: "Spout angle worked out against pour control.", i: "06" };
const CAMERA: Sketch = { cls: "w-camera", img: "camera.jpg", alt: "Compact camera — grip and dial studies", n: "Camera", t: "Compact camera", d: "Grip depth and dial placement, tested one-handed.", i: "07" };
const LAMP: Sketch = { cls: "w-lamp", img: "lamp.jpg", alt: "Desk lamp — arm and joint studies", n: "Lamp", t: "Desk lamp", d: "Arm joints resolved so the head holds any angle without drifting.", i: "08" };

function Plate({ sketch }: { sketch: Sketch }) {
  const [empty, setEmpty] = useState(false);
  return (
    <figure className={`plate ${sketch.cls} rv${empty ? " empty" : ""}`}>
      <div className="ph-inner">
        <img src={`/sketches/${sketch.img}`} alt={sketch.alt} onError={() => setEmpty(true)} />
        <div className="ph">
          <div className="n">{sketch.n}</div>
          <div className="f">sketches/{sketch.img}</div>
        </div>
      </div>
      <figcaption>
        <span className="t">{sketch.t}</span>
        <span className="d">{sketch.d}</span>
        <span className="i">{sketch.i}</span>
      </figcaption>
    </figure>
  );
}

/** A structured gallery-wall layout — real columns, no rotation, no
 * absolute-positioned overlap. Each column is its own flex stack so heights
 * can vary independently (a tall hero frame next to a pair of stacked
 * smaller ones, a wide frame over a split pair), the way a framed gallery
 * wall mockup is actually laid out — deliberate, not scattered. */
export default function SketchWall() {
  return (
    <div className="wall">
      <div className="wcol wcol-a">
        <Plate sketch={SPEAKER} />
        <Plate sketch={EARBUDS} />
      </div>
      <div className="wcol wcol-b">
        <Plate sketch={MOUSE} />
      </div>
      <div className="wcol wcol-c">
        <Plate sketch={HAIRDRYER} />
        <div className="wrow">
          <Plate sketch={IRON} />
          <Plate sketch={KETTLE} />
        </div>
      </div>
      <div className="wcol wcol-d">
        <Plate sketch={CAMERA} />
        <Plate sketch={LAMP} />
      </div>
    </div>
  );
}
