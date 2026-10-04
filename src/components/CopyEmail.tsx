"use client";

import { useEffect, useRef, useState } from "react";

const EMAIL = "swarali.designworks@gmail.com";

/** The email address as a mailto link, with a small "Copy" button beside it.
 * The button flips to "Copied" for a moment; if the clipboard API isn't
 * available (an insecure origin, an old browser) it falls back to selecting
 * the text through a hidden textarea. */
export default function CopyEmail() {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | undefined>(undefined);
  useEffect(() => () => window.clearTimeout(timer.current), []);

  async function copy() {
    let ok = false;
    try {
      await navigator.clipboard.writeText(EMAIL);
      ok = true;
    } catch {
      const ta = document.createElement("textarea");
      ta.value = EMAIL;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      try {
        ok = document.execCommand("copy");
      } catch {
        ok = false;
      }
      ta.remove();
    }
    if (!ok) return;
    setCopied(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <div className="email-row">
      <a className="direct" href={`mailto:${EMAIL}`}>
        <i className="tk-mk dia" aria-hidden="true" />
        {EMAIL}
      </a>
      <button
        type="button"
        className={`copy-btn${copied ? " done" : ""}`}
        onClick={copy}
        aria-label={copied ? "Email address copied" : "Copy email address"}
      >
        <svg viewBox="0 0 16 16" aria-hidden="true">
          {copied ? (
            <path d="M3 8.5l3 3 7-7" />
          ) : (
            <>
              <rect x="5.5" y="5.5" width="8" height="8" rx="1.5" />
              <path d="M10.5 3.5v-.5A1.5 1.5 0 0 0 9 1.5H3A1.5 1.5 0 0 0 1.5 3v6A1.5 1.5 0 0 0 3 10.5h.5" />
            </>
          )}
        </svg>
        <span>{copied ? "Copied" : "Copy"}</span>
      </button>
      <span className="sr-only" role="status" aria-live="polite">
        {copied ? "Email address copied to clipboard" : ""}
      </span>
    </div>
  );
}
