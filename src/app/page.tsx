import { Band } from "@/components/Band";
import { Footer } from "@/components/Footer";
import CreativeBand from "@/components/CreativeBand";
import WorkRail from "@/components/WorkRail";
import HeroGrid from "@/components/HeroGrid";

export default function HomePage() {
  return (
    <div className="page" data-page="home">
      {/* HERO */}
      {/* `hero-fold` is exactly one viewport tall, so the fold lands on the role
          line and the marquee below it is something you scroll to find. */}
      <section className="hero-home">
        <div className="hero-fold">
          <HeroGrid />
          <div className="hero-top rv">
            <span>Portfolio © 2026</span>
            <span>Design with intent</span>
            <span>Based in India</span>
          </div>
          <div className="rv">
            <h1 className="hero-name clip">
              <span>
                Swarali<b className="dot">.</b>
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

      {/* WORK — four case-study cards (see WorkRail.tsx).
          No band colour at all — this section sits on the page background. Every
          attempt at a distinct surface here (cream, then mist, then a violet
          dusk) produced the same problem: the page's #sheen drifts behind every
          section, so a band with its own colour ends up fighting a teal-and-rose
          wash it can't see. The cards carry the section instead. */}
      <section id="work">
        <WorkRail />
      </section>

      {/* CREATIVE BAND — full-bleed signature moment: portrait over big type */}
      <CreativeBand />

      {/* EXPERTISE */}
      <section id="expertise">
        <div className="exp-head">
          <h2 className="proj-h rv">
            <span className="clip">
              <span>My expertise.</span>
            </span>
          </h2>
        </div>
        <div className="exp-list rv-stg">
          <div className="exp">
            <div className="no">01</div>
            <div className="et">Product Thinking</div>
            <div className="ed">Balancing user needs, business goals, and technical constraints.</div>
          </div>
          <div className="exp">
            <div className="no">02</div>
            <div className="et">AI-Assisted Workflows</div>
            <div className="ed">Using AI to accelerate exploration, never replace judgment.</div>
          </div>
          <div className="exp">
            <div className="no">03</div>
            <div className="et">Design Systems</div>
            <div className="ed">Creating scalable foundations that grow with products.</div>
          </div>
          <div className="exp">
            <div className="no">04</div>
            <div className="et">Interaction Design</div>
            <div className="ed">Designing experiences that feel intuitive before they&apos;re learned.</div>
          </div>
          <div className="exp">
            <div className="no">05</div>
            <div className="et">Design Strategy</div>
            <div className="ed">Aligning user needs, business goals, and technical realities.</div>
          </div>
          <div className="exp">
            <div className="no">06</div>
            <div className="et">Visual Storytelling</div>
            <div className="ed">Communicating ideas with clarity, emotion, and purpose.</div>
          </div>
        </div>
      </section>

      <Footer
        links={[
          { href: "/about", label: "About" },
          { href: "/work", label: "Work" },
          { href: "/contact", label: "Contact" },
        ]}
      />
    </div>
  );
}
