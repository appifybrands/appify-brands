"use client";

import HeroSequence from "./HeroSequence";

export default function HeroSequenceClient({ startEnabled }: { startEnabled: boolean }) {
  return <HeroSequence startEnabled={startEnabled} />;
}
