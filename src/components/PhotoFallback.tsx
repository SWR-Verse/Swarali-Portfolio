"use client";

import { useState } from "react";

/** A plain <img onError> handler can't be attached from a Server Component,
 * so any image that needs a graceful "file not there yet" fallback gets
 * wrapped in this tiny client component instead. */
export default function PhotoFallback({ src, alt }: { src: string; alt: string }) {
  const [hidden, setHidden] = useState(false);
  if (hidden) return null;
  return <img src={src} alt={alt} onError={() => setHidden(true)} />;
}
