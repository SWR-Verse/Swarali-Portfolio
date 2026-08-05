"use client";

import { useRouter } from "next/navigation";
import type { AnchorHTMLAttributes, MouseEvent, ReactNode } from "react";

/** Every internal navigation passes through the same curtain moment: cover,
 * swap the route underneath, uncover. Plain <Link> would swap instantly with
 * no cover, so internal nav goes through this instead. */
export default function TransitionLink({
  href,
  children,
  ...rest
}: { href: string; children: ReactNode } & AnchorHTMLAttributes<HTMLAnchorElement>) {
  const router = useRouter();

  function onClick(e: MouseEvent<HTMLAnchorElement>) {
    if (e.metaKey || e.ctrlKey || e.shiftKey || rest.target === "_blank") return;
    e.preventDefault();
    const curtain = document.getElementById("curtain");
    if (!curtain) {
      router.push(href);
      return;
    }
    curtain.classList.remove("hide", "out");
    void curtain.offsetWidth;
    curtain.classList.add("in");
    setTimeout(() => router.push(href), 620);
  }

  return (
    <a href={href} onClick={onClick} {...rest}>
      {children}
    </a>
  );
}
