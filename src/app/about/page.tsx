import type { Metadata } from "next";
import { Band } from "@/components/Band";
import { Footer } from "@/components/Footer";
import DesignProcess from "@/components/DesignProcess";
import ThoughtScroll from "@/components/ThoughtScroll";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return (
    <div className="page" data-page="about">
      {/* HERO — identical to the landing hero (same fold, wordmark scale, role
          line, blurb and marquee); only the wordmark differs. */}
      <section className="hero-home">
        <div className="hero-fold">
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

      {/* TOOLKIT */}
      <section id="toolkit">
        <div className="kit rv-stg">
          <div className="kit-col">
            <h3>
              Design<span>.</span>
            </h3>
            <ul>
              <li>Figma</li>
              <li>Framer</li>
              <li>After Effects</li>
              <li>Rive</li>
              <li>Blender — basics</li>
              <li>Procreate</li>
            </ul>
          </div>
          <div className="kit-col">
            <h3>
              Practice<span>.</span>
            </h3>
            <ul>
              <li>Design systems</li>
              <li>Interaction &amp; motion</li>
              <li>UX research</li>
              <li>Rapid prototyping</li>
              <li>Usability testing</li>
              <li>Workshop facilitation</li>
            </ul>
          </div>
          <div className="kit-col">
            <h3>
              Enough code<span>.</span>
            </h3>
            <ul>
              <li>HTML / CSS</li>
              <li>JavaScript — reading it</li>
              <li>React — components</li>
              <li>Tailwind</li>
              <li>Git basics</li>
              <li>Design tokens</li>
            </ul>
          </div>
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
