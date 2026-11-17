"use client";

import { useEffect, useRef, useState } from "react";

/** A plain <img onError> handler can't be attached from a Server Component,
 * so any image that needs a graceful "file not there yet" fallback gets
 * wrapped in this tiny client component instead.
 *
 * The mount check matters: a missing file can fail before React hydrates, in
 * which case onError never reaches us and the browser's broken-image box and
 * alt text would sit on the card. */
export default function PhotoFallback({ src, alt }: { src: string; alt: string }) {
  const [hidden, setHidden] = useState(false);
  const ref = useRef<HTMLImageElement>(null);
  useEffect(() => {
    const img = ref.current;
    if (img && img.complete && img.naturalWidth === 0) setHidden(true);
  }, []);
  if (hidden) return null;
  return <img ref={ref} src={src} alt={alt} onError={() => setHidden(true)} />;
}
