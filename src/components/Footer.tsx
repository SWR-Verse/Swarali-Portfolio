import TransitionLink from "./TransitionLink";

type FootLink = { href: string; label: string; internal?: boolean };

export function Footer({
  eyebrowNo,
  eyebrowLabel = "Let's talk",
  links,
  next,
}: {
  eyebrowNo: string;
  eyebrowLabel?: string;
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
      <div className="eyebrow rv" style={next ? { marginTop: "clamp(60px,9vh,110px)" } : undefined}>
        ({eyebrowNo}) {eyebrowLabel}
      </div>
      <h2 className="foot-h rv">
        <span className="clip">
          <span>Let&apos;s</span>
        </span>
        <span className="clip">
          <span>make</span>
        </span>
        <span className="clip">
          <span>
            <a href="mailto:swarali.designworks@gmail.com">something↗</a>
          </span>
        </span>
      </h2>
      <div className="foot-contact">
        <a className="mailbig" href="mailto:swarali.designworks@gmail.com">
          swarali.designworks@gmail.com
        </a>
        <div className="socials">
          <a href="#" target="_blank" rel="noopener">
            LinkedIn <span>↗</span>
          </a>
          <a href="#" target="_blank" rel="noopener">
            Dribbble <span>↗</span>
          </a>
          <a href="#" target="_blank" rel="noopener">
            Behance <span>↗</span>
          </a>
          <a href="#" target="_blank" rel="noopener">
            Instagram <span>↗</span>
          </a>
        </div>
      </div>
      <div className="foot-row rv">
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
        <div className="foot-note">© 2026 Swarali — Product Designer</div>
      </div>
    </footer>
  );
}
