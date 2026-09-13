"use client";
import React, {
  useEffect,
  useRef,
  useState,
  useMemo,
  useCallback,
} from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface Testimonial {
  quote: string;
  name: string;
  designation: string;
  src: string;
}

interface CircularTestimonialsProps {
  testimonials: Testimonial[];
  autoplay?: boolean;
  className?: string;
}

function calculateGap(width: number) {
  const minWidth = 1024;
  const maxWidth = 1456;
  const minGap = 100;
  const maxGap = 200;
  if (width <= minWidth) return minGap;
  if (width >= maxWidth)
    return Math.max(minGap, maxGap + 0.06018 * (width - maxWidth));
  return minGap + (maxGap - minGap) * ((width - minWidth) / (maxWidth - minWidth));
}

export const CircularTestimonials = ({
  testimonials,
  autoplay = true,
  className,
}: CircularTestimonialsProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [containerWidth, setContainerWidth] = useState(1200);

  const imageContainerRef = useRef<HTMLDivElement>(null);
  const autoplayIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const testimonialsLength = useMemo(() => testimonials.length, [testimonials]);
  const activeTestimonial = useMemo(
    () => testimonials[activeIndex],
    [activeIndex, testimonials]
  );

  useEffect(() => {
    function handleResize() {
      if (imageContainerRef.current) {
        setContainerWidth(imageContainerRef.current.offsetWidth);
      }
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (autoplay) {
      autoplayIntervalRef.current = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % testimonialsLength);
      }, 5000);
    }
    return () => {
      if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current);
    };
  }, [autoplay, testimonialsLength]);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % testimonialsLength);
    if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current);
  }, [testimonialsLength]);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + testimonialsLength) % testimonialsLength);
    if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current);
  }, [testimonialsLength]);

  function getImageStyle(index: number): React.CSSProperties {
    const gap = calculateGap(containerWidth);
    const maxStickUp = 40;
    const offset = (index - activeIndex + testimonialsLength) % testimonialsLength;

    const isActive = index === activeIndex;
    const isLeft = (activeIndex - 1 + testimonialsLength) % testimonialsLength === index;
    const isRight = (activeIndex + 1) % testimonialsLength === index;

    if (isActive) {
      return {
        zIndex: 10,
        opacity: 1,
        transform: `translateX(0px) translateY(0px) scale(1) rotateY(0deg)`,
      };
    }
    if (isLeft) {
      return {
        zIndex: 5,
        opacity: 0.6,
        transform: `translateX(-${gap}px) translateY(-${maxStickUp}px) scale(0.8) rotateY(25deg)`,
      };
    }
    if (isRight) {
      return {
        zIndex: 5,
        opacity: 0.6,
        transform: `translateX(${gap}px) translateY(-${maxStickUp}px) scale(0.8) rotateY(-25deg)`,
      };
    }
    return {
      zIndex: 1,
      opacity: 0,
      transform: `translateX(0px) translateY(100px) scale(0.5) rotateY(0deg)`,
    };
  }

  return (
    <div className={cn("w-full max-w-7xl mx-auto px-6 py-2", className)}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Images Perspective Container */}
        <div className="relative h-[400px] md:h-[500px] w-full flex items-center justify-center perspective-1000" ref={imageContainerRef}>
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.src}
              className="absolute w-full max-w-[350px] aspect-[4/5] transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)]"
              style={getImageStyle(index)}
            >
              <img
                src={testimonial.src}
                alt={testimonial.name}
                className="w-full h-full object-cover rounded-[32px] shadow-2xl border border-white/10"
              />
              <div className="absolute inset-0 rounded-[32px] bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
            </div>
          ))}
        </div>

        {/* Content Section */}
        <div className="flex flex-col justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-6"
            >
              <div>
                <div className="px-4 py-1.5 rounded-full bg-black/30 backdrop-blur-md border border-white/10 shadow-lg inline-block mb-4">
                  <motion.span
                    className="text-amber-500/90 text-xs font-semibold tracking-[0.3em] uppercase block"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    {activeTestimonial.designation}
                  </motion.span>
                </div>
                <h3 className="text-4xl md:text-5xl lg:text-6xl font-black text-white italic tracking-tighter uppercase leading-none drop-shadow-2xl">
                  {activeTestimonial.name}
                </h3>
              </div>

              <div className="relative bg-black/30 backdrop-blur-md px-6 py-8 rounded-3xl border border-white/10 shadow-2xl">
                <p className="text-lg md:text-xl text-white/90 font-light leading-relaxed tracking-tight">
                  {activeTestimonial.quote.split(" ").map((word, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, filter: "blur(8px)" }}
                      animate={{ opacity: 1, filter: "blur(0px)" }}
                      transition={{ duration: 0.4, delay: 0.01 * i }}
                      className="inline-block mr-1.5"
                    >
                      {word}
                    </motion.span>
                  ))}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex gap-4 mt-12">
            <button
              onClick={handlePrev}
              className="w-14 h-14 rounded-full flex items-center justify-center border border-white/10 bg-white/5 backdrop-blur-xl text-white transition-all hover:bg-white/10 hover:scale-110 active:scale-95 group"
              aria-label="Previous"
            >
              <ArrowLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
            </button>
            <button
              onClick={handleNext}
              className="w-14 h-14 rounded-full flex items-center justify-center border border-white/10 bg-white/5 backdrop-blur-xl text-white transition-all hover:bg-white/10 hover:scale-110 active:scale-95 group"
              aria-label="Next"
            >
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CircularTestimonials;