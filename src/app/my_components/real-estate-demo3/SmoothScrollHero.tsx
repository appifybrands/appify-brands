"use client";
import * as React from "react";

import {
	motion,
	useMotionTemplate,
	useScroll,
	useTransform,
} from "framer-motion";

interface iISmoothScrollHeroProps {
	scrollHeight?: number;
	desktopImage?: string;
	mobileImage?: string;
	initialClipPercentage?: number;
	finalClipPercentage?: number;
    children?: React.ReactNode;
}

const SmoothScrollHeroBackground: React.FC<iISmoothScrollHeroProps> = ({
	scrollHeight = 2500,
	desktopImage,
	mobileImage,
	initialClipPercentage = 25,
	finalClipPercentage = 75,
    children,
}) => {
	const containerRef = React.useRef<HTMLDivElement>(null);
	const {scrollYProgress} = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Animate from 0 to 50% to expand the image
	const clipStart = useTransform(scrollYProgress, [0, 0.5], [initialClipPercentage, 0]);
	const clipEnd = useTransform(scrollYProgress, [0, 0.5], [finalClipPercentage, 100]);
	const clipPath = useMotionTemplate`polygon(${clipStart}% ${clipStart}%, ${clipEnd}% ${clipStart}%, ${clipEnd}% ${clipEnd}%, ${clipStart}% ${clipEnd}%)`;

	const backgroundSize = useTransform(scrollYProgress, [0, 0.5], ["170%", "100%"]);

    // Fade in text from 40% to 60%, then hold it
    const opacity = useTransform(scrollYProgress, [0.4, 0.6], [0, 1]);

	return (
        <div ref={containerRef} style={{height: `${scrollHeight}px`}} className="relative w-full bg-[#f0eee4]">
            <motion.div
                className="sticky top-0 h-screen w-full overflow-hidden"
                style={{
                    clipPath,
                    willChange: "transform, opacity, clip-path",
                }}
            >
                {/* Mobile background */}
                <motion.div
                    className="absolute inset-0 md:hidden"
                    style={{
                        backgroundImage: `url(${mobileImage || desktopImage})`,
                        backgroundSize,
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                    }}
                />
                {/* Desktop background */}
                <motion.div
                    className="absolute inset-0 hidden md:block"
                    style={{
                        backgroundImage: `url(${desktopImage})`,
                        backgroundSize,
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                    }}
                />
                
                {/* Overlay Content */}
                {children && (
                    <motion.div 
                        className="absolute inset-0 flex flex-col items-center justify-center bg-black/30 text-white p-6 text-center"
                        style={{ opacity }}
                    >
                        {children}
                    </motion.div>
                )}
            </motion.div>
        </div>
	);
};

export const SmoothScrollHero: React.FC<iISmoothScrollHeroProps> = (props) => {
	return <SmoothScrollHeroBackground {...props} />;
};
export default SmoothScrollHero;
