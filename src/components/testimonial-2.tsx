import * as React from 'react';
import { motion, Variants } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

// --- TYPE DEFINITIONS ---
interface Testimonial {
  imgSrc: string;
  alt: string;
}

interface AnimatedTestimonialGridProps {
  testimonials: Testimonial[];
  badgeText?: string;
  title: React.ReactNode;
  description: React.ReactNode;
  ctaText: string;
  ctaHref: string;
  className?: string;
}

// --- PRE-DEFINED POSITIONS FOR THE IMAGES ---
const imagePositions = [
  // Desktop and Tablet positions - Increased sizes
  { top: '5%', left: '8%', className: 'hidden lg:block w-72' },
  { top: '12%', left: '30%', className: 'hidden md:block w-64' },
  { top: '3%', left: '52%', className: 'hidden md:block w-56' },
  { top: '8%', right: '12%', className: 'hidden lg:block w-80' },
  { top: '22%', right: '4%', className: 'hidden md:block w-64' },
  { top: '42%', right: '8%', className: 'hidden lg:block w-72' },
  { top: '48%', left: '4%', className: 'hidden md:block w-80' },
  { bottom: '3%', left: '18%', className: 'hidden lg:block w-64' },
  { bottom: '12%', left: '42%', className: 'hidden md:block w-56' },
  { bottom: '8%', right: '28%', className: 'hidden md:block w-72' },
  { bottom: '2%', right: '12%', className: 'hidden lg:block w-64' },
   // Mobile-specific positions
  { top: '8%', left: '4%', className: 'block md:hidden w-32' },
  { top: '4%', right: '8%', className: 'block md:hidden w-40' },
  { bottom: '4%', left: '8%', className: 'block md:hidden w-40' },
  { top: '8%', left: '4%', className: 'block md:hidden w-24' },
  { top: '4%', right: '8%', className: 'block md:hidden w-28' },
  { bottom: '4%', left: '8%', className: 'block md:hidden w-28' },
  { bottom: '8%', right: '4%', className: 'block md:hidden w-24' },
];


// --- ANIMATION LOGIC ---
const imageVariants: Variants = {
  initial: { opacity: 0, scale: 0.5, y: 0 },
  animate: (i: number) => ({ 
    opacity: 1, 
    scale: 1, 
    y: [0, -10 - (i % 3) * 5, 0],
    transition: { 
      opacity: { duration: 0.5, delay: (i % 5) * 0.1 },
      scale: { type: 'spring', stiffness: 260, damping: 20, delay: (i % 5) * 0.1 },
      y: {
        duration: 5 + (i % 4),
        repeat: Infinity,
        repeatType: 'reverse' as const,
        ease: 'easeInOut',
      }
    } 
  }),
};

// --- COMPONENT ---
export const AnimatedTestimonialGrid = ({
  testimonials,
  badgeText = 'Testimonials',
  title,
  description,
  ctaText,
  ctaHref,
  className,
}: AnimatedTestimonialGridProps) => {

  return (
    <section
      className={cn(
        'relative w-full max-w-7xl mx-auto py-32 sm:py-40 px-4',
        className
      )}
    >
      {/* Absolutely Positioned Images */}
      {testimonials.slice(0, 8).map((testimonial, index) => {
        const pos = imagePositions[index] || { top: '0', left: '0', right: 'auto', bottom: 'auto', className: 'hidden' };
        return (
          <motion.div
            key={index}
            className={cn('absolute rounded-lg shadow-2xl border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden', pos.className)}
            style={{ 
              top: pos.top, 
              left: pos.left,
              right: pos.right,
              bottom: pos.bottom,
            }}
            variants={imageVariants}
            initial="initial"
            animate="animate"
            whileHover={{ scale: 1.05, zIndex: 50, borderColor: 'rgba(255,255,255,0.3)' }}
            custom={index}
          >
             <img
              src={testimonial.imgSrc}
              alt={testimonial.alt}
              className="w-full h-full object-contain bg-white/10 dark:bg-black/20"
            />
          </motion.div>
        );
      })}

      {/* Central Content */}
      <div className="relative z-10 flex flex-col items-center text-center">
        {badgeText && (
          <div className="mb-4 inline-block rounded-full bg-secondary px-3 py-1 text-sm font-semibold text-secondary-foreground">
            {badgeText}
          </div>
        )}
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-foreground mb-4 max-w-3xl">
          {title}
        </h1>
        <p className="max-w-xl text-lg text-muted-foreground mb-8">
          {description}
        </p>
        <a
          href={ctaHref}
          className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-base font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        >
          {ctaText}
          <ArrowRight className="ml-2 h-5 w-5" />
        </a>
      </div>
    </section>
  );
};