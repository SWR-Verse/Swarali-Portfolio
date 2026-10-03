import TransitionLink from "./TransitionLink";

type FootLink = { href: string; label: string; internal?: boolean };

export function Footer({
  links,
  next,
}: {
  links: FootLink[];
  next?: { lines: [string, string]; ctaLabel: string; ctaHref: string };
}) {
  return (
    <footer className="site-foot">
      {next && (
        <div className="next rv">
          <h3>
            <span className="clip">
              <span>{next.lines[0]}</span>
            </span>
            <span className="clip">
              <span>{next.lines[1]}</span>
            </span>
          </h3>
          <TransitionLink className="cta" href={next.ctaHref}>
            {next.ctaLabel} <span>↗</span>
          </TransitionLink>
        </div>
      )}
      <h2 className="foot-h rv" style={next ? { marginTop: "clamp(60px,9vh,110px)" } : undefined}>
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
        <div className="foot-note">© 2026 Swarali — Product Designer</div>
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
