import TransitionLink from "./TransitionLink";

type FootLink = { href: string; label: string; internal?: boolean };

/** One footer for every page. Pages pass only their nav links. */
export function Footer({ links }: { links: FootLink[] }) {
  return (
    <footer className="site-foot">
      <h2 className="foot-h rv">
        <span className="clip">
          <span>So&hellip;</span>
        </span>
        <span className="clip">
          <span>what are we</span>
        </span>
        <span className="clip">
          <span>
            <a href="mailto:swarali.designworks@gmail.com">making?</a>
          </span>
        </span>
      </h2>
      <div className="foot-contact">
        <a className="mailbig" href="mailto:swarali.designworks@gmail.com">
          swarali.designworks@gmail.com
        </a>
        <div className="socials">
          <a href="https://www.behance.net/swarali_satpute" target="_blank" rel="noopener noreferrer">
            Behance <span>↗</span>
          </a>
          <a href="https://www.instagram.com/swarali.designs" target="_blank" rel="noopener noreferrer">
            Instagram <span>↗</span>
          </a>
        </div>
      </div>
      <div className="foot-row rv">
        {/* Copyright hard left, links hard right, on one shared baseline. */}
        <div className="foot-note">© 2026 Swarali Satpute — All Rights Reserved.</div>
        <div className="foot-links">
          {links.map((l) =>
            l.internal === false ? (
              <a key={l.href} href={l.href}>
                {l.label}
              </a>
            ) : (
              <TransitionLink key={l.href} href={l.href}>
                {l.label}
              </TransitionLink>
            )
          )}
        </div>
      </div>
    </footer>
  );
}
