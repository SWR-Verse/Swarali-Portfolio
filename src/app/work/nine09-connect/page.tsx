import type { Metadata } from "next";
import CaseZoom from "@/components/CaseZoom";
import TransitionLink from "@/components/TransitionLink";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "NINE09 Connect",
  description:
    "Redesigning the home screen of the NINE09 Connect eBike app — hierarchy, glanceability and a single clear priority.",
};

const B = "/work/nine09";

const ITER1 = ["i1r1a", "i1r1b", "i1r1c", "i1r2a", "i1r2b", "i1r2c"];
const ITER2 = ["i2r1a", "i2r1b", "i2r1c", "i2r2a", "i2r2b", "i2r2c"];

const PROBLEMS = [
  ["i-clutter", "Cluttered layout", "Overloaded with options — hard to spot primary actions like range, trip and lock."],
  ["i-hier", "Weak visual hierarchy", "Everything carries the same weight, so nothing reads as most important."],
  ["i-nav", "Navigation ambiguity", "Bottom icons are small and not self-explanatory — confusing for new users."],
  ["i-load", "Information overload", "Tries to cover every function at once instead of prioritising critical ride details."],
  ["i-brush", "Outdated design language", "The look doesn't reflect the premium, innovative character of the product."],
];

function Icon({ id, size = 22 }: { id: string; size?: number }) {
  return (
    <svg className="cs-ic" style={{ width: size, height: size }} aria-hidden="true">
      <use href={`#${id}`} />
    </svg>
  );
}

function Screen({ name, tag, good }: { name: string; tag?: string; good?: boolean }) {
  return (
    <div className="cs-shot" data-cszoom={`${B}/${name}.jpg`}>
      {tag ? <span className={good ? "tag good" : "tag"}>{tag}</span> : null}
      <img src={`${B}/${name}.jpg`} alt={`NINE09 Connect screen — ${name}`} />
    </div>
  );
}

export default function Nine09CasePage() {
  return (
    <div className="page" data-page="case">
      <Sprite />
      <CaseZoom>
        {/* ---------- COVER ---------- */}
        <section className="cs-cover">
          <img src={`${B}/cover.jpg`} alt="NINE09 Connect — home screen design" />
        </section>

        <section className="cs-metasec">
          <dl className="cs-meta rv">
            <div>
              <dt>Role</dt>
              <dd>UI/UX Designer</dd>
            </div>
            <div>
              <dt>Scope</dt>
              <dd>Home screen redesign</dd>
            </div>
            <div>
              <dt>Platform</dt>
              <dd>iOS &amp; Android</dd>
            </div>
            <div>
              <dt>Focus</dt>
              <dd>Hierarchy &amp; glanceability</dd>
            </div>
          </dl>
        </section>

        {/* ---------- 01 OVERVIEW ---------- */}
        <section>
          <div className="cs-slabel rv">
            <span className="n">01</span>
            <span>Overview</span>
            <span className="bar" />
          </div>
          <div className="cs-ov">
            <div className="rv">
              <p className="cs-lead">
                My role was to redesign the home screen of the <span style={{ color: "var(--cs)" }}>NINE09 Connect</span>{" "}
                eBike app — a cleaner, more intuitive interface that puts battery status, ride details and controls
                within instant reach.
              </p>
              <p className="cs-lead" style={{ marginTop: 20, color: "var(--muted)" }}>
                Across two rounds of iteration, I focused on usability and navigation while keeping the experience
                simple and visually appealing.
              </p>
            </div>
            <div className="cs-ovside rv">
              <div className="r">
                <div className="k">Product</div>
                <div className="v">NINE09 Connect</div>
              </div>
              <div className="r">
                <div className="k">Bike model</div>
                <div className="v">Triton CX01</div>
              </div>
              <div className="r">
                <div className="k">Deliverable</div>
                <div className="v">Redesigned home screen</div>
              </div>
              <div className="r">
                <div className="k">Explorations</div>
                <div className="v">12 screens · 2 rounds</div>
              </div>
            </div>
          </div>

          <div className="cs-rail">
            {[
              ["Step 01", "Audit", "Break down what fails on the existing screen"],
              ["Step 02", "Explore", "Six layouts weighing bike imagery against data"],
              ["Step 03", "Refine", "Six more — rider's viewpoint, grouped actions"],
              ["Step 04", "Resolve", "One screen, three actions, zero clutter"],
            ].map(([n, t, d]) => (
              <div className="st rv" key={t}>
                <div className="n">{n}</div>
                <div className="t">{t}</div>
                <div className="d">{d}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ---------- 02 PROBLEM ---------- */}
        <section>
          <div className="cs-slabel rv">
            <span className="n">02</span>
            <span>The problem</span>
            <span className="bar" />
          </div>
          <h2 className="cs-h rv">
            Everything shouts,
            <br />
            so nothing is heard.
          </h2>
          <div className="cs-prob">
            <div className="rv">
              <div className="cs-probshot">
                <Screen name="before" tag="Before" />
                <div className="cs-cap">Existing home screen</div>
              </div>
            </div>
            <div className="cs-plist">
              {PROBLEMS.map(([ic, title, copy]) => (
                <div className="cs-pitem rv" key={title}>
                  <div className="ibox">
                    <Icon id={ic} />
                  </div>
                  <div>
                    <div className="hd">
                      <span className="idx" />
                      <h3 className="cs-t">{title}</h3>
                    </div>
                    <p className="cs-body">{copy}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- 03 WHY ---------- */}
        <section className="cs-why">
          <div className="cs-slabel rv">
            <span className="n">03</span>
            <span>Why the home screen matters</span>
            <span className="bar" />
          </div>
          <p className="cs-lead rv" style={{ maxWidth: "42ch" }}>
            The central hub of the app — and the first touchpoint{" "}
            <span style={{ color: "var(--cs)" }}>every single time</span> a rider opens it.
          </p>
          <div className="cs-whygrid">
            <div className="cs-wcard rv">
              <div className="top">
                <div className="ico">
                  <Icon id="i-hub" />
                </div>
                <div className="no">01</div>
              </div>
              <h3 className="cs-t">Primary information hub</h3>
              <p className="cs-body">Range, battery and lock status — read instantly, no digging.</p>
            </div>
            <div className="cs-wcard rv">
              <div className="top">
                <div className="ico">
                  <Icon id="i-bolt" />
                </div>
                <div className="no">02</div>
              </div>
              <h3 className="cs-t">Decisions on the go</h3>
              <p className="cs-body">Quick choices while riding means fewer distractions and safer journeys.</p>
            </div>
            <div className="cs-wcard rv">
              <div className="top">
                <div className="ico">
                  <Icon id="i-rep" />
                </div>
                <div className="no">03</div>
              </div>
              <h3 className="cs-t">Highest-traffic screen</h3>
              <p className="cs-body">Seen most often, so small inefficiencies compound into real frustration.</p>
            </div>
            <div className="cs-wcard span2 rv">
              <div className="ico">
                <Icon id="i-badge" />
              </div>
              <div className="txt">
                <h3 className="cs-t">Brand representation</h3>
                <p className="cs-body">
                  Its design and usability directly reflect the innovation, reliability and premium nature of the
                  e-bike brand.
                </p>
              </div>
              <div className="no">04</div>
            </div>
            <div className="cs-wcard rv">
              <div className="top">
                <div className="ico">
                  <Icon id="i-shield" />
                </div>
                <div className="no">05</div>
              </div>
              <h3 className="cs-t">Foundation for trust</h3>
              <p className="cs-body">Structure makes riders feel in control of the bike and its ecosystem.</p>
            </div>
          </div>
        </section>

        {/* ---------- 04 APPROACH ---------- */}
        <section>
          <div className="cs-slabel rv">
            <span className="n">04</span>
            <span>Design approach</span>
            <span className="bar" />
          </div>
          <h2 className="cs-h rv">
            Clear. Intuitive.
            <br />
            <span className="cs-grad">Rider&#8209;centric.</span>
          </h2>
          <div className="cs-appr">
            {[
              ["i-target", "01", "Prioritize essentials", "Surface range, trip and lock status first — the three things a rider checks before moving."],
              ["i-route", "02", "Simplify navigation", "Icons and actions that explain themselves, with room to breathe and be tapped."],
              ["i-spark", "03", "Modernize the feel", "A clean, consistent, premium design language that matches the bike itself."],
            ].map(([ic, no, title, copy]) => (
              <div className="cs-acard rv" key={no}>
                <div className="in">
                  <span className="glow" />
                  <div className="rowtop">
                    <div className="ico">
                      <Icon id={ic} size={24} />
                    </div>
                    <span className="i">{no}</span>
                  </div>
                  <h3>{title}</h3>
                  <p className="cs-body">{copy}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ---------- 05 ITERATIONS ONE ---------- */}
        <section>
          <div className="cs-slabel rv">
            <span className="n">05</span>
            <span>Iterations · Round one</span>
            <span className="bar" />
          </div>
          <div className="cs-iterhead">
            <h2 className="cs-h rv" style={{ marginBottom: 0 }}>
              Bike first,
              <br />
              data second
            </h2>
            <span className="cs-chip rv">6 explorations</span>
          </div>
          <div className="cs-grid3">
            {ITER1.map((n) => (
              <div className="rv" key={n}>
                <Screen name={n} />
              </div>
            ))}
          </div>
          <div className="cs-notes">
            <div className="cs-ncard think rv">
              <h3>
                <span className="dot" />
                Thinking behind the screens
              </h3>
              <ul>
                <li>Tested layouts weighing data against bike visuals.</li>
                <li>Explored hierarchy of range, trip, battery and mode.</li>
                <li>Tried bottom-navigation variations for clarity.</li>
                <li>Balanced functional info with product showcase.</li>
              </ul>
            </div>
            <div className="cs-ncard fail rv">
              <h3>
                <span className="dot" />
                Why these didn&apos;t work
              </h3>
              <ul>
                <li>Bike image dominated, squeezing out the data.</li>
                <li>Key ride info still lacked clear priority.</li>
                <li>Bottom navigation stayed crowded and confusing.</li>
                <li>Screens felt cluttered with too many elements.</li>
                <li>Missed the rider&apos;s need for quick, distraction-free access.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* ---------- 06 ITERATIONS TWO ---------- */}
        <section>
          <div className="cs-slabel rv">
            <span className="n">06</span>
            <span>Iterations · Round two</span>
            <span className="bar" />
          </div>
          <div className="cs-iterhead">
            <h2 className="cs-h rv" style={{ marginBottom: 0 }}>
              Closer to the
              <br />
              rider&apos;s view
            </h2>
            <span className="cs-chip rv">6 explorations</span>
          </div>
          <div className="cs-grid3">
            {ITER2.map((n) => (
              <div className="rv" key={n}>
                <Screen name={n} />
              </div>
            ))}
          </div>
          <div className="cs-notes">
            <div className="cs-ncard think rv">
              <h3>
                <span className="dot" />
                Thinking behind the screens
              </h3>
              <ul>
                <li>Shifted from the full bike to the handle and dashboard — the rider&apos;s actual viewpoint.</li>
                <li>Introduced swipe-to-unlock for a more modern, tactile feel.</li>
                <li>Grouped range, battery %, mode and trip time into compact cards.</li>
                <li>Brought unlock actions upfront instead of burying them.</li>
                <li>Tightened visual consistency and colour balance.</li>
              </ul>
            </div>
            <div className="cs-ncard fail rv">
              <h3>
                <span className="dot" />
                Why these didn&apos;t work
              </h3>
              <ul>
                <li>Still action-heavy — too many unlock options up front.</li>
                <li>Swipe gestures aren&apos;t instantly intuitive for everyone.</li>
                <li>Metric cards felt cramped; data competed for space.</li>
                <li>Bottom navigation stayed busy and repetitive.</li>
                <li>Functional, but no single metric led the screen.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* ---------- 07 FINAL ---------- */}
        <section className="cs-final" id="final">
          <div className="cs-slabel rv">
            <span className="n">07</span>
            <span>Final design</span>
            <span className="bar" />
          </div>
          <h2 className="cs-h rv" style={{ textAlign: "center" }}>
            One screen.
            <br />
            <span className="cs-grad">Everything that matters.</span>
          </h2>
          <div className="cs-fstage">
            <div className="cs-fcol l">
              <div className="cs-callout rv">
                <b>Bike switcher</b>Dropdown to move between multiple eBikes.
              </div>
              <div className="cs-callout rv">
                <b>Grouped actions</b>Unlock battery and unlock bike sit together — findable without overwhelming the
                screen.
              </div>
            </div>
            <div className="cs-fflat rv" data-cszoom={`${B}/final.jpg`}>
              <img src={`${B}/final.jpg`} alt="Final NINE09 Connect home screen" />
            </div>
            <div className="cs-fcol r">
              <div className="cs-callout rv">
                <b>Real connection</b>A close-up of the bike shows the live link between display and app.
              </div>
              <div className="cs-callout rv">
                <b>Clear information</b>Key information presented plainly, without clutter.
              </div>
            </div>
          </div>
          <p className="cs-fnote rv">
            A simplified layout lets riders check the essentials <span>at a glance</span> — improving safety and
            usability.
          </p>
        </section>

        {/* ---------- DEVICE ---------- */}
        <section className="cs-showcase">
          <span className="cs-floor" />
          <div className="cs-stage">
            <div className="cs-device rv" data-cszoom={`${B}/final.jpg`}>
              <span className="btn v b1" />
              <span className="btn v b2" />
              <span className="btn v b3" />
              <span className="btn p b4" />
              <div className="rim">
                <div className="scr">
                  <span className="island" />
                  <img src={`${B}/final.jpg`} alt="Final home screen shown on device" />
                  <span className="home" />
                  <span className="glare" />
                </div>
              </div>
            </div>
            <div className="cs-reflect" aria-hidden="true">
              <img src={`${B}/final.jpg`} alt="" />
            </div>
          </div>
        </section>

        {/* ---------- 08 BEFORE / AFTER ---------- */}
        <section>
          <div className="cs-slabel rv">
            <span className="n">08</span>
            <span>Before &amp; after</span>
            <span className="bar" />
          </div>
          <div className="cs-ba">
            <div className="col rv">
              <Screen name="before" tag="Before" />
              <div className="cs-cap">Competing for attention</div>
            </div>
            <div className="cs-arrow rv">
              <svg viewBox="0 0 24 24">
                <path d="M4 12h15M13 6l6 6-6 6" />
              </svg>
              <span>Redesign</span>
            </div>
            <div className="col rv">
              <Screen name="final" tag="After" good />
              <div className="cs-cap">One clear priority</div>
            </div>
          </div>
          <div className="cs-deltas">
            {[
              ["i-eye", "Hierarchy", "Range now leads the screen instead of competing with five equal-weight cards."],
              ["i-layers", "Actions", "Scattered controls consolidated into one grouped row of three."],
              ["i-check", "Navigation", "Bottom bar reduced and spaced, with the active state clearly marked."],
            ].map(([ic, k, v]) => (
              <div className="cs-delta rv" key={k}>
                <div className="iw">
                  <Icon id={ic} size={17} />
                </div>
                <div>
                  <div className="k">{k}</div>
                  <div className="v">{v}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ---------- TAGLINE ---------- */}
        <section className="cs-tagline">
          <div className="t rv">
            Everything a rider needs.
            <br />
            <span className="cs-grad">Nothing they don&apos;t.</span>
          </div>
          <div className="s rv">NINE09 Connect — Home screen redesign</div>
          <div className="rv" style={{ marginTop: 40 }}>
            <TransitionLink className="cs-back" href="/work">
              <span>←</span> Back to work
            </TransitionLink>
          </div>
        </section>
      </CaseZoom>

      <Footer
        eyebrowNo="09"
        eyebrowLabel="Elsewhere"
        links={[
          { href: "/", label: "Home" },
          { href: "/work", label: "Work" },
          { href: "/about", label: "About" },
          { href: "/contact", label: "Contact" },
        ]}
        next={{ lines: ["Want the", "whole story?"], ctaLabel: "Get in touch", ctaHref: "/contact" }}
      />
    </div>
  );
}

/** Icon definitions, referenced by <use href="#id"> above. */
function Sprite() {
  return (
    <svg style={{ display: "none" }} aria-hidden="true">
      <defs>
        <symbol id="i-clutter" viewBox="0 0 24 24">
          <rect x="3" y="3" width="7" height="7" rx="1.5" />
          <rect x="14" y="3" width="7" height="4" rx="1.5" />
          <rect x="14" y="10" width="7" height="4" rx="1.5" />
          <rect x="3" y="13" width="4" height="8" rx="1.5" />
          <rect x="10" y="17" width="11" height="4" rx="1.5" />
        </symbol>
        <symbol id="i-hier" viewBox="0 0 24 24">
          <path d="M4 6h16M4 12h16M4 18h16" />
        </symbol>
        <symbol id="i-nav" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="9" />
          <path d="m15.5 8.5-2.1 5-5 2.1 2.1-5z" />
        </symbol>
        <symbol id="i-load" viewBox="0 0 24 24">
          <path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M18.4 5.6l-2.8 2.8M8.4 15.6l-2.8 2.8" />
          <circle cx="12" cy="12" r="2.6" />
        </symbol>
        <symbol id="i-brush" viewBox="0 0 24 24">
          <path d="M4 20s2-1 2-3a2 2 0 1 1 3 2c-.6 1.4-2.6 1.4-5 1Z" />
          <path d="M9.5 15.5 19 6a2.1 2.1 0 0 0-3-3l-9.5 9.5" />
        </symbol>
        <symbol id="i-hub" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="2.5" />
          <circle cx="12" cy="12" r="8.5" />
          <path d="M12 3.5v3M12 17.5v3M3.5 12h3M17.5 12h3" />
        </symbol>
        <symbol id="i-bolt" viewBox="0 0 24 24">
          <path d="M13 3 5 13h6l-1 8 8-10h-6z" />
        </symbol>
        <symbol id="i-rep" viewBox="0 0 24 24">
          <path d="M4 9a7 7 0 0 1 12-4l3 3M20 15a7 7 0 0 1-12 4l-3-3" />
          <path d="M19 3v5h-5M5 21v-5h5" />
        </symbol>
        <symbol id="i-badge" viewBox="0 0 24 24">
          <path d="M12 3 4.5 6v6c0 4.4 3.1 8.2 7.5 9 4.4-.8 7.5-4.6 7.5-9V6z" />
          <path d="m9 12 2.2 2.2L15.5 10" />
        </symbol>
        <symbol id="i-shield" viewBox="0 0 24 24">
          <path d="M12 3 5 6.2v5.3c0 4.2 2.9 7.9 7 9.5 4.1-1.6 7-5.3 7-9.5V6.2z" />
        </symbol>
        <symbol id="i-target" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="8.5" />
          <circle cx="12" cy="12" r="4.5" />
          <circle cx="12" cy="12" r="1.1" fill="currentColor" stroke="none" />
        </symbol>
        <symbol id="i-route" viewBox="0 0 24 24">
          <circle cx="6" cy="18" r="2.6" />
          <circle cx="18" cy="6" r="2.6" />
          <path d="M8.6 18h5.1a3.5 3.5 0 0 0 0-7H10a3.5 3.5 0 0 1 0-7h5.4" />
        </symbol>
        <symbol id="i-spark" viewBox="0 0 24 24">
          <path d="m12 3 2.1 5.4L19.5 10l-5.4 1.6L12 17l-2.1-5.4L4.5 10l5.4-1.6z" />
          <path d="M18.5 15.5 19.3 18l2.2.8-2.2.8-.8 2.4-.8-2.4-2.2-.8 2.2-.8z" />
        </symbol>
        <symbol id="i-check" viewBox="0 0 24 24">
          <path d="m5 12.5 4.5 4.5L19 7" />
        </symbol>
        <symbol id="i-eye" viewBox="0 0 24 24">
          <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" />
          <circle cx="12" cy="12" r="3" />
        </symbol>
        <symbol id="i-layers" viewBox="0 0 24 24">
          <path d="m12 3 9 5-9 5-9-5z" />
          <path d="m3 13 9 5 9-5" />
        </symbol>
      </defs>
    </svg>
  );
}
