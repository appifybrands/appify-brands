import { motion } from 'framer-motion';
import { cn } from "@/lib/utils";

interface Testimonial {
  imgSrc: string;
}

export function ResortTestimonialMarquee({ testimonials, reverse = false }: { testimonials: Testimonial[], reverse?: boolean }) {
  // Duplicate items for infinite loop
  const duplicatedTestimonials = [...testimonials, ...testimonials, ...testimonials];

  return (
    <div className="relative flex overflow-hidden py-10 select-none group">
      <motion.div
        animate={{
          x: reverse ? ["-33.33%", "0%"] : ["0%", "-33.33%"],
        }}
        transition={{
          duration: 40,
          ease: "linear",
          repeat: Infinity,
        }}
        className="flex flex-nowrap gap-8 min-w-full"
      >
        {duplicatedTestimonials.map((item, index) => (
          <div 
            key={index} 
            className="flex-shrink-0 w-[300px] md:w-[450px] aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-black/20 backdrop-blur-sm"
          >
            <img
              src={item.imgSrc}
              alt={`Review ${index}`}
              className="w-full h-full object-contain p-2 transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        ))}
      </motion.div>
      
      {/* Edge Fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black to-transparent z-10" />
    </div>
  );
}
