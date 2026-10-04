import type { Metadata } from "next";
import { Band } from "@/components/Band";
import { Footer } from "@/components/Footer";
import DesignProcess from "@/components/DesignProcess";
import ThoughtScroll from "@/components/ThoughtScroll";
import HeroGrid from "@/components/HeroGrid";

export const metadata: Metadata = { title: "About" };

const TOOLKIT = [
  {
    title: "Practice",
    mark: "dia",
    area: "pr",
    items: [
      "UX Research",
      "Sketching & Ideation",
      "Wireframing & User Flows",
      "Design Systems",
      "Rapid Prototyping",
      "Interaction & Motion",
      "Industrial Design",
      "CMF & Materials",
    ],
  },
  {
    title: "Tools",
    mark: "dia",
    area: "to",
    items: ["Figma", "Framer", "Fusion 360", "Rhino", "Blender", "KeyShot", "Adobe CC"],
  },
  {
    title: "AI + Experiments",
    mark: "dia",
    area: "ai",
    items: ["Generative AI · Prompting", "AI-Assisted Design & Prototyping", "Rapid Concept Development"],
  },
  {
    title: "Enough Code",
    mark: "dia",
    area: "co",
    items: ["HTML / CSS", "AI-Assisted Development", "Interactive Web Prototyping"],
  },
];

export default function AboutPage() {
  return (
    <div className="page" data-page="about">
      {/* HERO — identical to the landing hero (same fold, wordmark scale, role
          line, blurb and marquee); only the wordmark differs. */}
      <section className="hero-home">
        <div className="hero-fold">
          <HeroGrid align="left" />
          <div className="hero-top rv">
            <span>Portfolio © 2026</span>
            <span>Design with intent</span>
            <span>Based in India</span>
          </div>
          <div className="rv">
            <h1 className="hero-name clip">
              <span>
                About<b className="dot">.</b>
              </span>
            </h1>
          </div>
          <div className="hero-row rv">
            <div className="hero-role clip">
              <span>Product Designer</span>
            </div>
            <p className="hero-blurb">
              Some experiences are held. Others are felt.
              <br />
              I design both. <b className="star">✦</b>
            </p>
          </div>
        </div>
        <Band words={["Product", "Research", "Strategy", "System", "Impact"]} />
      </section>

      {/* STORY */}
      <section id="story">
        <div className="story-grid">
          <div className="story-left rv">
            <h2 className="story-h story-h-plain">
              <span className="clip"><span>Because</span></span>
              <span className="clip"><span>Good</span></span>
              <span className="clip"><span>Design is</span></span>
              <span className="clip"><span><b>Still Human.</b></span></span>
            </h2>
          </div>
          <div className="story-side rv">
            <p>
              I don&apos;t believe design begins with a screen, a prompt, or a tool. It begins with{" "}
              <b>understanding people.</b>
            </p>
            <p>
              Every decision I make is intentional. From the first question to the final interaction,{" "}
              <b>design isn&apos;t what you make, it&apos;s how you think.</b>
            </p>
            <a className="cta-btn" href="/resume.pdf" target="_blank" rel="noopener noreferrer">
              Resume <span>↗</span>
            </a>
          </div>
        </div>
      </section>

      {/* DESIGN PROCESS — one viewport: a square refined into a circle */}
      <DesignProcess />

      {/* TOOLKIT — bento grid of four minimal boxes */}
      <section id="toolkit" className="tk">
        <h2 className="proj-h hs-h tk-h rv">
          <span className="clip">
            <span>Design toolkit.</span>
          </span>
        </h2>
        <div className="tk-grid rv-stg">
          {TOOLKIT.map((g) => (
            <div className={`tk-box tk-${g.area}`} key={g.title}>
              <div className="tk-top">
                <span className="tk-title">
                  <i className={`tk-mk ${g.mark}`} aria-hidden="true" />
                  {g.title}
                  <b className="tk-dot" aria-hidden="true" />
                </span>
              </div>
              <ul>
                {g.items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* THOUGHT — pinned, scroll-driven */}
      <ThoughtScroll />

      <Footer
        links={[
          { href: "/", label: "Home" },
          { href: "/work", label: "Work" },
          { href: "/contact", label: "Contact" },
        ]}
      />
    </div>
  );
}
