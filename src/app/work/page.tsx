import type { Metadata } from "next";
import WorkRail from "@/components/WorkRail";
import PhotoFallback from "@/components/PhotoFallback";
import SketchWall from "@/components/SketchWall";
import { Footer } from "@/components/Footer";
import HeroGrid from "@/components/HeroGrid";

export const metadata: Metadata = { title: "Work" };

export default function WorkPage() {
  return (
    <div className="page" data-page="work">
      {/* HERO */}
      <section className="hero-work">
        <HeroGrid align="left" />
        <div className="hero-top rv">
          <span>Portfolio © 2026</span>
          <span>Design with intent</span>
          <span>Based in India</span>
        </div>
        <div className="rv">
          <h1 className="page-name clip">
            <span>
              Work<b className="dot">.</b>
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
      </section>

      {/* 01 — SCREEN WORK: the same card grid as "Selected work" on home */}
      <section id="screen">
        <WorkRail title="Interfaces &amp; Systems." tag="UI/UX Projects" />
      </section>

      {/* 02 — PHYSICAL WORK, in the site's dark language */}
      <section id="objects" className="objects">
        <div className="hs-head">
          <h2 className="proj-h hs-h rv">
            <span className="clip">
              <span>Objects &amp; Products.</span>
            </span>
          </h2>
          <span className="hs-tag rv">Industrial Design Projects</span>
        </div>
        <div className="pgrid">
          <div className="pcard rv">
            <div className="shot">
              <PhotoFallback src="/work/aura.jpg" alt="Aura desk lamp" />
              <div className="word">Aura</div>
              <div className="tag">[ Product photography ]</div>
            </div>
            <div>
              <div className="idx">01</div>
              <h3>Aura</h3>
              <p className="lede">
                A desk lamp that folds flat. One extruded aluminium arm, one diffuser, no visible fasteners — the
                whole thing assembles in under a minute and ships in an envelope.
              </p>
            </div>
          </div>
          <div className="pcard rv">
            <div className="shot">
              <PhotoFallback src="/work/terra.jpg" alt="Terra water purifier" />
              <div className="word">Terra</div>
              <div className="tag">[ Product photography ]</div>
            </div>
            <div>
              <div className="idx">02</div>
              <h3>Terra</h3>
              <p className="lede">
                A gravity water purifier for homes without steady power or pressure. Designed around the filter&apos;s
                real service interval, so replacing it is a thirty-second job with no tools and no manual.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 03 — SKETCHBOOK */}
      <section id="sketch">
        <div className="hs-head">
          <h2 className="proj-h hs-h rv">
            <span className="clip">
              <span>It starts here.</span>
            </span>
          </h2>
          <span className="hs-tag rv">Notes from the Sketchbook</span>
        </div>
        <p className="sk-lede rv">
          Sketching is how I think. It&rsquo;s where ideas take their first breath before finding the final thing.
        </p>
        <SketchWall />
      </section>

      <Footer
        links={[
          { href: "/", label: "Home" },
          { href: "/about", label: "About" },
          { href: "/contact", label: "Contact" },
        ]}
      />
    </div>
  );
}
