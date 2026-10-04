import type { Metadata } from "next";
import WorkDeck from "@/components/WorkDeck";
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

      {/* 01 — SCREEN WORK */}
      <section id="screen">
        <div className="chap">
          <h2 className="rv">
            <span className="clip">
              <span>Things</span>
            </span>
            <span className="clip">
              <span>you use.</span>
            </span>
          </h2>
          <div className="count rv">Four projects · 2023–2026</div>
        </div>
        <WorkDeck />
      </section>

      {/* 02 — PHYSICAL WORK, paper band */}
      <section id="objects" className="paperband">
        <div className="chap">
          <h2 className="rv">
            <span className="clip">
              <span>Things</span>
            </span>
            <span className="clip">
              <span>you hold.</span>
            </span>
          </h2>
          <div className="count rv" style={{ color: "var(--paper-muted)" }}>
            Two objects · 2021–2023
          </div>
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
              <div className="spec">
                <div>
                  <span className="k">Materials</span>
                  <span className="v">Anodised aluminium, cast acrylic</span>
                </div>
                <div>
                  <span className="k">Process</span>
                  <span className="v">Foam models → SLA → tooling</span>
                </div>
                <div>
                  <span className="k">Year</span>
                  <span className="v">2023</span>
                </div>
              </div>
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
              <div className="spec">
                <div>
                  <span className="k">Materials</span>
                  <span className="v">Moulded ABS, ceramic core</span>
                </div>
                <div>
                  <span className="k">Process</span>
                  <span className="v">Field study → CAD → user testing</span>
                </div>
                <div>
                  <span className="k">Year</span>
                  <span className="v">2021</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 03 — SKETCHBOOK */}
      <section id="sketch">
        <div className="chap">
          <h2 className="rv">
            <span className="clip">
              <span>Before</span>
            </span>
            <span className="clip">
              <span>any of it.</span>
            </span>
          </h2>
          <div className="count rv">Sketchbook · ongoing</div>
        </div>
        <p className="sk-lede rv">
          Every project on this page started here. Sketching is how I think — fast, wrong, and cheap to throw away.
          Form, proportion, grip, then the parts nobody photographs.
        </p>
        <SketchWall />
      </section>

      <Footer
        links={[
          { href: "/", label: "Home" },
          { href: "/about", label: "About" },
          { href: "/contact", label: "Contact" },
        ]}
        next={{ lines: ["Want the", "long version?"], ctaLabel: "Get in touch", ctaHref: "/contact" }}
      />
    </div>
  );
}
