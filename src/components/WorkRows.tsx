"use client";

import TransitionLink from "./TransitionLink";

type Project = {
  no: string;
  title: string;
  cat: string;
  sub: string;
  desc: string;
  /** Drop a file at this path and the placeholder is replaced automatically —
   *  no code change needed. Absent means "no artwork yet". */
  img?: string;
  alt?: string;
  /** Present once a project has a written case study. */
  href?: string;
};

/* The sub/desc copy below is a DRAFT, written from what the rest of the site
   already says about each project. It exists so the layout can be judged with
   real text in it rather than lorem — rewrite freely. */
const PROJECTS: Project[] = [
  {
    no: "01",
    title: "NINE09 Connect",
    cat: "Mobile · eBike app · 2025",
    sub: "Companion App",
    desc: "An eBike companion built around the ride rather than the hardware. Live range, ride history and diagnostics collapsed into one screen a rider can read at a glance, mid-journey, in daylight.",
    img: "/work/nine09/cover.jpg",
    alt: "NINE09 Connect — eBike app home screen",
    href: "/work/nine09-connect",
  },
  {
    no: "02",
    title: "Pulse",
    cat: "Mobile · Health",
    sub: "Health Tracking",
    desc: "Daily health data turned into something you act on instead of something you avoid. Trends rather than numbers, one clear next step, and nothing that shames you for opening it late.",
    img: "/work/pulse.jpg",
    alt: "Pulse — health tracking app",
  },
  {
    no: "03",
    title: "Atlas",
    cat: "SaaS · Realtime",
    sub: "Realtime Operations",
    desc: "An operations dashboard for teams who keep it open all day. Dense where the work demands it, quiet everywhere else, and still legible from across the room.",
    img: "/work/atlas.jpg",
    alt: "Atlas — realtime SaaS dashboard",
  },
  {
    no: "04",
    title: "Vela",
    cat: "Brand · Web",
    sub: "Brand & Web",
    desc: "A brand system and the site that carries it. Typography, motion and tone built to hold together across every surface the brand eventually lands on.",
    img: "/work/vela.jpg",
    alt: "Vela — brand site",
  },
];

/** "Selected work" as a stacked index: number, shot, and the writing, one
 *  project per row with a rule between them.
 *
 *  Replaces the pinned horizontal rail. That version is still on disk in
 *  WorkRail.tsx if the scroll-linked treatment is ever wanted back — it is no
 *  longer imported anywhere.
 *
 *  Missing artwork degrades rather than breaks: a project with no file at its
 *  `img` path shows a framed placeholder carrying its own name, and `onError`
 *  swaps to that same placeholder if the path is wrong. Add the real file and
 *  it appears on the next load. */
export default function WorkRows() {
  return (
    <div className="wrows">
      <div className="wrows-head rv">
        <h2 className="proj-h">
          <span className="clip">
            <span>Selected</span>
          </span>
          <span className="clip">
            <span>work.</span>
          </span>
        </h2>
      </div>

      {PROJECTS.map((p) => {
        const shot = (
          <>
            {p.img && (
              <img
                src={p.img}
                alt={p.alt ?? ""}
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            )}
            <div className="wr-ph" aria-hidden="true">
              <span>{p.title}</span>
            </div>
          </>
        );

        return (
          <article className="wrow rv" key={p.title}>
            <div className="wr-no" aria-hidden="true">
              {p.no}
            </div>

            {p.href ? (
              <TransitionLink className="wr-shot" href={p.href} aria-label={`Open the ${p.title} case study`}>
                {shot}
              </TransitionLink>
            ) : (
              <div className="wr-shot">{shot}</div>
            )}

            <div className="wr-body">
              <h3 className="wr-title">{p.title}</h3>
              <div className="wr-text">
                <div className="wr-sub">{p.sub}</div>
                <p className="wr-desc">{p.desc}</p>
                <div className="wr-cat">{p.cat}</div>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
