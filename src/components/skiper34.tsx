"use client";

import {
  motion,
  useInView,
  useMotionValue,
  useScroll,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";

const defaultImages = [
  "/demo2_assets/shnagarfimages/img_3.webp",
  "/demo2_assets/shnagarfimages/img_4.webp",
  "/demo2_assets/shnagarfimages/img_5.webp",
  "/demo2_assets/shnagarfimages/img_6.webp",
  "/demo2_assets/shnagarfimages/img_7.webp",
  "/demo2_assets/shnagarfimages/img_8.webp",
  "/demo2_assets/shnagarfimages/img_9.webp",
];

const Skiper34 = ({ images = defaultImages }: { images?: string[] }) => {
  return (
    <section className="relative flex w-full flex-col items-center gap-[10vh] px-4 py-[20vh]">
      <div className="flex flex-col items-center gap-4 text-center mb-2">
        <div className="px-4 py-1.5 rounded-full bg-black/30 backdrop-blur-md border border-white/10 shadow-lg inline-block">
          <span className="text-white/60 text-xs uppercase tracking-[0.3em] font-medium">
            The Shangarf Experience
          </span>
        </div>
        <h2 className="text-3xl md:text-5xl font-bold text-white uppercase italic tracking-tight drop-shadow-2xl">
          Where Nature Meets Luxury
        </h2>
      </div>
      {images.map((img, idx) => (
        <StickyCard_003 key={idx} imgUrl={img} />
      ))}
    </section>
  );
};

const StickyCard_003 = ({ imgUrl }: { imgUrl: string }) => {
  const vertMargin = 10;
  const container = useRef(null);
  const [maxScrollY, setMaxScrollY] = useState(Infinity);

  const filter = useMotionValue(0);
  const negateFilter = useTransform(filter, (value) => -value);

  const { scrollY } = useScroll({
    target: container,
  });
  const scale = useTransform(scrollY, [maxScrollY, maxScrollY + 10000], [1, 0]);
  const isInView = useInView(container, {
    margin: `0px 0px -${100 - vertMargin}% 0px`,
    once: true,
  });

  scrollY.on("change", (scrollY) => {
    let animationValue = 1;
    if (scrollY > maxScrollY) {
      animationValue = Math.max(0, 1 - (scrollY - maxScrollY) / 10000);
    }

    scale.set(animationValue);
    filter.set((1 - animationValue) * 100);
  });

  useEffect(() => {
    if (isInView) {
      setMaxScrollY(scrollY.get());
    }
  }, [isInView, scrollY]);

  return (
    <motion.div
      ref={container}
      className="rounded-[40px] sticky h-[200px] w-full max-w-5xl overflow-hidden bg-neutral-900 border border-white/10 shadow-2xl"
      style={{
        scale: scale,
        rotate: filter,
        height: `${100 - 2 * vertMargin}vh`,
        top: `${vertMargin}vh`,
      }}
    >
      <motion.img
        src={imgUrl}
        alt={imgUrl}
        style={{
          rotate: negateFilter,
        }}
        className="h-full w-full scale-125 object-cover"
        sizes="90vw"
      />
      {/* Premium Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
    </motion.div>
  );
};

export { Skiper34, StickyCard_003 };
