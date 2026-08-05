"use client";

import { usePathname } from "next/navigation";
import { Logo } from "./Logo";
import TransitionLink from "./TransitionLink";

const LINKS = [
  { href: "/about", label: "About" },
  { href: "/work", label: "Work" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  const pathname = usePathname();
  return (
    <nav id="nav">
      <TransitionLink href="/" aria-label="SWR — home">
        <Logo />
      </TransitionLink>
      <div className="nlinks">
        {LINKS.map((l) => (
          <TransitionLink key={l.href} href={l.href} className={pathname === l.href ? "active" : undefined}>
            {l.label}
          </TransitionLink>
        ))}
      </div>
    </nav>
  );
}
