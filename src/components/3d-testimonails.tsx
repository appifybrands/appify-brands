import React, { ComponentPropsWithoutRef, useRef } from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";

interface MarqueeProps extends ComponentPropsWithoutRef<'div'> {
  className?: string;
  reverse?: boolean;
  pauseOnHover?: boolean;
  children: React.ReactNode;
  vertical?: boolean;
  repeat?: number;
}

export function Marquee({
  className,
  reverse = false,
  pauseOnHover = false,
  children,
  vertical = false,
  repeat = 4,
  ...props
}: MarqueeProps) {
  const marqueeRef = useRef<HTMLDivElement>(null);

  return (
    <div
      {...props}
      ref={marqueeRef}
      className={cn(
        'group flex overflow-hidden p-2 [--duration:40s] [--gap:1rem] [gap:var(--gap)]',
        {
          'flex-row': !vertical,
          'flex-col': vertical,
        },
        className,
      )}
    >
      {Array.from({ length: repeat }, (_, i) => (
        <div
          key={i}
          className={cn(
            'flex shrink-0 justify-around [gap:var(--gap)]',
            !vertical && 'animate-marquee flex-row',
            vertical && 'animate-marquee-vertical flex-col',
            pauseOnHover && 'group-hover:[animation-play-state:paused]',
            reverse && '[animation-direction:reverse]',
          )}
        >
          {children}
        </div>
      ))}
    </div>
  );
}

const reviewScreenshots = [
  "/demo2_assets/reviews/Screenshot 2026-04-28 171802.png",
  "/demo2_assets/reviews/Screenshot 2026-04-28 171810.png",
  "/demo2_assets/reviews/Screenshot 2026-04-28 171816.png",
  "/demo2_assets/reviews/Screenshot 2026-04-28 171822.png",
  "/demo2_assets/reviews/Screenshot 2026-04-28 171827.png",
  "/demo2_assets/reviews/Screenshot 2026-04-28 171832.png",
  "/demo2_assets/reviews/Screenshot 2026-04-28 171837.png",
  "/demo2_assets/reviews/Screenshot 2026-04-28 171843.png",
  "/demo2_assets/reviews/Screenshot 2026-04-28 171848.png",
  "/demo2_assets/reviews/Screenshot 2026-04-28 171853.png",
  "/demo2_assets/reviews/Screenshot 2026-04-28 171858.png",
  "/demo2_assets/reviews/Screenshot 2026-04-28 171903.png",
  "/demo2_assets/reviews/Screenshot 2026-04-28 171908.png",
  "/demo2_assets/reviews/Screenshot 2026-04-28 171916.png",
  "/demo2_assets/reviews/Screenshot 2026-04-28 171921.png",
  "/demo2_assets/reviews/Screenshot 2026-04-28 171933.png",
  "/demo2_assets/reviews/Screenshot 2026-04-28 171938.png",
];

const ReviewCard = ({ img }: { img: string }) => {
  return (
    <div className={cn(
      "relative w-[300px] md:w-[400px] cursor-pointer overflow-hidden rounded-2xl border p-0 transition-all duration-300",
      "border-white/10 bg-white/5 backdrop-blur-md hover:bg-white/10 hover:scale-[1.02]",
      "dark:border-white/5 dark:bg-white/[0.02] dark:hover:bg-white/[0.05]"
    )}>
      <img 
        src={img} 
        alt="Guest Review" 
        className="w-full h-auto object-contain block opacity-90 hover:opacity-100 transition-opacity" 
      />
    </div>
  );
};

export function TestimonialsSection() {
  const firstRow = reviewScreenshots.slice(0, Math.ceil(reviewScreenshots.length / 2));
  const secondRow = reviewScreenshots.slice(Math.ceil(reviewScreenshots.length / 2));

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-lg bg-transparent py-12 gap-8">
      <Marquee pauseOnHover className="[--duration:40s]">
        {firstRow.map((img, idx) => (
          <ReviewCard key={idx} img={img} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:45s]">
        {secondRow.map((img, idx) => (
          <ReviewCard key={idx} img={img} />
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-black via-black/20 to-transparent"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-black via-black/20 to-transparent"></div>
    </div>
  );
}
