import type { Metadata } from "next";
import { Logo } from "@/components/Logo";
import { Band } from "@/components/Band";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return (
    <div className="page" data-page="about">
      {/* HERO */}
      <section className="hero-about">
        <div className="hero-top rv">
          <span>About — 2026</span>
          <span>Product Designer</span>
          <span>Based Everywhere</span>
        </div>
        <div className="rv">
          <h1 className="page-name clip">
            <span>
              About<b className="dot">.</b>
            </span>
          </h1>
        </div>
        <div className="hero-row rv">
          <div className="hero-role clip">
            <span>
              Six years
              <br />
              of details
            </span>
          </div>
          <p className="hero-blurb">
            Research, systems and motion — three tools, one job: make the complicated thing feel like the obvious
            thing.
          </p>
        </div>
        <Band words={["Curious", "Stubborn", "Precise", "Playful", "Patient"]} />
        <div className="scrollcue">
          Scroll <span className="arw">↓</span>
        </div>
      </section>

      {/* STORY */}
      <section id="story">
        <div className="eyebrow rv">(01) The story</div>
        <div className="story-grid">
          <h2 className="story-h rv">
            <span className="clip">
              <span>I started</span>
            </span>
            <span className="clip">
              <span>with paper.</span>
            </span>
            <span className="clip">
              <span>Still do.</span>
            </span>
          </h2>
          <div className="story-side rv">
            <p>
              I&apos;m <b>Swarali</b> — a product designer who fell into interfaces sideways. I studied visual
              communication, spent a year drawing posters nobody asked for, then found the thing that actually held
              my attention: <b>products people use every day and never think about.</b>
            </p>
            <p>
              Six years later I work the same way I did then. Sketch first, question the brief, build the smallest
              real thing, put it in front of someone, watch them get confused, fix it. Repeat until it disappears.
            </p>
            <p>
              I&apos;ve shipped for <b>fintech, health and B2B SaaS</b> — from zero-to-one prototypes to design
              systems used by a dozen squads. I care about the boring parts: empty states, error copy, the third tap
              nobody tested.
            </p>
          </div>
        </div>
        <div className="portrait rv">
          <Logo />
          <div className="tag">[ Portrait / studio shot goes here ]</div>
        </div>
        <div className="about-stats rv">
          <div>
            <div className="n">6+</div>
            <div className="l">Years</div>
          </div>
          <div>
            <div className="n">40+</div>
            <div className="l">Shipped</div>
          </div>
          <div>
            <div className="n">12</div>
            <div className="l">Teams</div>
          </div>
          <div>
            <div className="n">200+</div>
            <div className="l">User interviews</div>
          </div>
        </div>
      </section>

      {/* TIMELINE — the paper band */}
      <section id="timeline" className="paperband">
        <div className="eyebrow rv">(02) The path</div>
        <h2 className="story-h rv" style={{ marginBottom: "10px" }}>
          <span className="clip">
            <span>The path</span>
          </span>
        </h2>
        <div className="tl rv-stg">
          <div className="tl-row">
            <div className="tl-yr">2024 — Now</div>
            <div>
              <div className="tl-role">Senior Product Designer</div>
              <div className="tl-co">Monovative · Remote</div>
            </div>
            <div className="tl-desc">
              Leading design on a realtime B2B platform. Owned the design system rebuild that cut hand-off time in
              half across four squads.
            </div>
          </div>
          <div className="tl-row">
            <div className="tl-yr">2022 — 2024</div>
            <div>
              <div className="tl-role">Product Designer</div>
              <div className="tl-co">Fintech Studio · Hybrid</div>
            </div>
            <div className="tl-desc">
              Dashboards, onboarding and money movement flows. Ran the research program end-to-end — 90+ interviews,
              shipped against every one.
            </div>
          </div>
          <div className="tl-row">
            <div className="tl-yr">2021 — 2022</div>
            <div>
              <div className="tl-role">UX Designer</div>
              <div className="tl-co">Health-tech Startup</div>
            </div>
            <div className="tl-desc">
              First design hire. Built the mobile app from wireframe to App Store, then wrote the guidelines so it
              stayed consistent without me.
            </div>
          </div>
          <div className="tl-row">
            <div className="tl-yr">2020 — 2021</div>
            <div>
              <div className="tl-role">Visual &amp; UI Designer</div>
              <div className="tl-co">Independent · Freelance</div>
            </div>
            <div className="tl-desc">
              Brand systems, marketing sites and the occasional identity. Learned to defend a decision out loud — the
              most useful skill I own.
            </div>
          </div>
          <div className="tl-row">
            <div className="tl-yr">2019 — 2020</div>
            <div>
              <div className="tl-role">Design Intern</div>
              <div className="tl-co">Agency · On-site</div>
            </div>
            <div className="tl-desc">
              Where I learned that &quot;make the logo bigger&quot; is usually a symptom, not the problem.
            </div>
          </div>
        </div>
      </section>

      {/* TOOLKIT */}
      <section id="toolkit">
        <div className="eyebrow rv">(03) Toolkit</div>
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

      {/* PRINCIPLES */}
      <section id="principles">
        <div className="eyebrow rv">(04) How I work</div>
        <div className="pr-grid rv-stg">
          <div className="pr">
            <div className="no">P/01</div>
            <h3>Start at the problem, not the screen</h3>
            <p>
              The first artifact is never a layout. It&apos;s a sentence everyone on the team agrees with. Get that
              wrong and the prettiest UI in the world is still the wrong answer.
            </p>
          </div>
          <div className="pr">
            <div className="no">P/02</div>
            <h3>Show it early, show it ugly</h3>
            <p>
              A rough clickable beats a perfect static every time. I&apos;d rather be corrected on day three than
              admired on day thirty.
            </p>
          </div>
          <div className="pr">
            <div className="no">P/03</div>
            <h3>Systems buy you speed</h3>
            <p>
              Tokens, components and clear naming aren&apos;t housekeeping — they&apos;re the reason the next feature
              takes a week instead of a month.
            </p>
          </div>
          <div className="pr">
            <div className="no">P/04</div>
            <h3>Motion is meaning</h3>
            <p>
              Every transition answers a question: where did that come from, what just changed, am I still in
              control. If it doesn&apos;t answer one, it shouldn&apos;t move.
            </p>
          </div>
          <div className="pr">
            <div className="no">P/05</div>
            <h3>Write it before you draw it</h3>
            <p>
              Half of what looks like a UX problem is a copy problem. Fix the words and the interface usually gets
              simpler on its own.
            </p>
          </div>
          <div className="pr">
            <div className="no">P/06</div>
            <h3>Ship, then listen</h3>
            <p>
              Launch is the middle of the process. The interesting data only shows up once real people are in there
              behaving unpredictably.
            </p>
          </div>
        </div>
      </section>

      {/* THOUGHT */}
      <section className="thought-sec">
        <div className="thought rv">
          <span className="clip">
            <span>Taste is just</span>
          </span>
          <span className="clip">
            <span className="out">attention</span>
          </span>
          <span className="clip">
            <span>paid over and</span>
          </span>
          <span className="clip">
            <span className="hl">over again.</span>
          </span>
        </div>
        <div className="thought-by rv">— A thought I design by</div>
      </section>

      <Footer
        eyebrowNo="05"
        links={[
          { href: "/", label: "Home" },
          { href: "/work", label: "Work" },
          { href: "mailto:swarali.designworks@gmail.com", label: "Email", internal: false },
        ]}
      />
    </div>
  );
}
