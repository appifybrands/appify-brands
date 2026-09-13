"use client";

import { useState } from "react";

export function VillaImage({
  src,
  alt,
  fallbackLabel,
}: {
  src?: string;
  alt: string;
  fallbackLabel?: string;
}) {
  const [errored, setErrored] = useState(false);
  if (!src || errored) {
    return (
      <div className="vs-img-fallback" aria-label={alt}>
        {fallbackLabel ?? "VS"}
      </div>
    );
  }
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt={alt} onError={() => setErrored(true)} />;
}
