"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedBaskervvilleProps {
  text: string;
  className?: string;
  as?: React.ElementType;
  animateTrigger?: boolean;
  style?: React.CSSProperties;
}

export function AnimatedBaskervville({
  text,
  className,
  as: Component = "h2",
  animateTrigger,
  style,
}: AnimatedBaskervvilleProps) {
  // Split the text into words, then into characters.
  // This allows us to keep words together (preventing line breaks in the middle of a word)
  // while still animating character by character.
  const words = text.split(" ");

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const child = {
    hidden: {
      opacity: 0,
      y: 50,
      filter: "blur(4px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring" as const,
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <Component
      className={cn("flex flex-wrap overflow-visible py-2", className)}
      style={{ fontFamily: '"Baskervville", serif', fontVariantNumeric: "lining-nums", ...style }}
    >
      <motion.span
        variants={container}
        initial="hidden"
        whileInView={animateTrigger === undefined ? "visible" : undefined}
        animate={animateTrigger !== undefined ? (animateTrigger ? "visible" : "hidden") : undefined}
        viewport={{ once: true, margin: "-100px" }}
        className="flex flex-wrap w-full justify-center"
      >
        {words.map((word, wordIndex) => (
          <span key={wordIndex} className="inline-flex mr-[0.3em] overflow-visible">
            {word.split("").map((char, charIndex) => (
              <motion.span
                key={charIndex}
                variants={child}
                className="inline-block cursor-default"
                whileHover={{
                  y: -10,
                  scale: 1.1,
                  color: "var(--gold)",
                  rotate: Math.random() * 10 - 5,
                  transition: { type: "spring" as const, stiffness: 400, damping: 10 },
                }}
              >
                {char}
              </motion.span>
            ))}
          </span>
        ))}
      </motion.span>
    </Component>
  );
}
