import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from "@/lib/utils";

interface SelectorItem {
  title: string;
  description: string;
  dayImage: string;
  nightImage: string;
  icon: React.ReactNode;
}

interface InteractiveSelectorProps {
  items: SelectorItem[];
  isDark?: boolean;
}

export function InteractiveSelector({ items, isDark = false }: InteractiveSelectorProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animatedOptions, setAnimatedOptions] = useState<number[]>([]);
  
  const handleOptionClick = (index: number) => {
    if (index !== activeIndex) {
      setActiveIndex(index);
    }
  };

  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];
    setAnimatedOptions([]); // Reset on items change
    
    items.forEach((_, i) => {
      const timer = setTimeout(() => {
        setAnimatedOptions(prev => [...prev, i]);
      }, 180 * i);
      timers.push(timer);
    });
    
    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  }, [items]);

  return (
    <div className="relative flex flex-col items-center justify-center py-20 px-4 select-none overflow-hidden"> 
      <div className="options flex w-full max-w-7xl min-h-[500px] items-stretch overflow-hidden relative">
        {items.map((item, index) => (
          <div
            key={index}
            className={cn(
              "option relative flex flex-col justify-end overflow-hidden transition-all duration-700 ease-in-out cursor-pointer border-2",
              activeIndex === index ? "flex-[7] border-white z-10 shadow-2xl" : "flex-1 border-[#292929] z-1 shadow-lg",
              !animatedOptions.includes(index) && "opacity-0 translate-x-[-60px]"
            )}
            style={{
              backgroundImage: `url('${isDark ? item.nightImage : item.dayImage}')`,
              backgroundSize: activeIndex === index ? 'cover' : 'cover',
              backgroundPosition: 'center',
              transitionProperty: 'flex, border-color, opacity, transform',
              opacity: animatedOptions.includes(index) ? 1 : 0,
              transform: animatedOptions.includes(index) ? 'translateX(0)' : 'translateX(-60px)',
            }}
            onClick={() => handleOptionClick(index)}
          >
            {/* Dark Overlay */}
            <div 
              className={cn(
                "absolute inset-0 bg-black/30 transition-opacity duration-700",
                activeIndex === index ? "opacity-0" : "opacity-100"
              )} 
            />

            {/* Shadow effect */}
            <div 
              className={cn(
                "absolute left-0 right-0 bottom-0 h-40 bg-gradient-to-t from-black/80 to-transparent transition-all duration-700",
                activeIndex === index ? "opacity-100" : "opacity-0 translate-y-10"
              )}
            />
            
            {/* Label with icon and info */}
            <div className="absolute left-0 right-0 bottom-8 flex items-center justify-start h-16 z-2 pointer-events-none px-6 gap-4 w-full overflow-hidden">
              <div className="min-w-[48px] h-[48px] flex items-center justify-center rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-white shadow-lg flex-shrink-0 transition-transform duration-500 group-hover:scale-110">
                {item.icon}
              </div>
              
              <div 
                className={cn(
                  "transition-all duration-700 ease-in-out",
                  activeIndex === index ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
                )}
              >
                <div className="text-white font-black text-xl uppercase italic tracking-tighter">
                  {item.title}
                </div>
                <div className="text-white/70 text-sm font-light max-w-md">
                  {item.description}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}