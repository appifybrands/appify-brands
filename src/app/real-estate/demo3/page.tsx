"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "@/app/my_components/real-estate-demo1/RealEstateNavbar";
import { Home, Building, Waves, MessageSquare, ArrowDown } from "lucide-react";
import { AnimatedBaskervville } from "@/app/my_components/real-estate-demo1/AnimatedBaskervville";

const demo3NavItems = [
  { id: "home", label: "Home", icon: Home, href: "#home" },
  { id: "details", label: "Details", icon: Building, href: "#property" },
  { id: "spa", label: "SPA & Pool", icon: Waves, href: "#spa" },
  { id: "gallery", label: "Testimonials", icon: MessageSquare, href: "#gallery" },
];

const images = [
    { src: "/real-estate-demo3/Demo3front.png", alt: "The Grand Estate Front View" },
    { src: "/real-estate-demo3/Demo3entrance.png", alt: "Luxurious Entrance Hall" },
    { src: "/real-estate-demo3/Demo3dining.png", alt: "Elegant Dining Area" },
    { src: "/real-estate-demo3/Demo3pool.png", alt: "Infinity Pool with Sunset View" },
    { src: "/real-estate-demo3/Demo3room.png", alt: "Master Suite" },
    { src: "/real-estate-demo3/Demo3spa.png", alt: "Private Home Spa" },
    { src: "/real-estate-demo3/Demo3restroom.png", alt: "Garden Relaxation Zone" },
];

const layoutClasses = [
    "",
    "[&>div]:!-top-[30vh] [&>div]:!left-[5vw] [&>div]:!h-[30vh] [&>div]:!w-[35vw]",
    "[&>div]:!-top-[10vh] [&>div]:!-left-[25vw] [&>div]:!h-[45vh] [&>div]:!w-[20vw]",
    "[&>div]:!left-[27.5vw] [&>div]:!h-[25vh] [&>div]:!w-[25vw]",
    "[&>div]:!top-[27.5vh] [&>div]:!left-[5vw] [&>div]:!h-[25vh] [&>div]:!w-[20vw]",
    "[&>div]:!top-[27.5vh] [&>div]:!-left-[22.5vw] [&>div]:!h-[25vh] [&>div]:!w-[30vw]",
    "[&>div]:!top-[22.5vh] [&>div]:!left-[25vw] [&>div]:!h-[15vh] [&>div]:!w-[15vw]"
];

import { CircularTestimonials } from "@/app/my_components/real-estate-demo3/CircularTestimonials";
import { SmoothScrollHero } from "@/app/my_components/real-estate-demo3/SmoothScrollHero";
import SplineScene from "@/app/my_components/real-estate-demo1/SplineScene";

const testimonialsData = [
    {
        name: "Eleanor Vance",
        designation: "Architectural Digest",
        quote: "A masterclass in modern luxury. The Haven Resort redefines what it means to blend nature with opulence.",
        src: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&q=80",
    },
    {
        name: "James Sterling",
        designation: "Billionaire Magazine",
        quote: "Unparalleled privacy and breathtaking design. It's not just a residence; it's a statement.",
        src: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=500&q=80",
    },
    {
        name: "Sophia Laurent",
        designation: "International Elite",
        quote: "From the infinity pool to the marble interiors, every detail is curated for absolute perfection.",
        src: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=500&q=80",
    }
];

export default function RealEstateDemo3() {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const frameCount = 240;
    const currentFrame = (index: number) =>
        `/real-estate-demo3/frames/ezgif-frame-${index.toString().padStart(3, '0')}.jpg`;

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const canvas = canvasRef.current;
        if (!canvas) return;
        const context = canvas.getContext('2d');

        // Set internal canvas resolution
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        // Preload images into memory
        const loadedImages: HTMLImageElement[] = [];
        const proxy = { frame: 0 };

        for (let i = 0; i < frameCount; i++) {
            const img = new Image();
            img.src = currentFrame(i + 1);
            loadedImages.push(img);
        }

        // Paint the first frame as soon as it loads
        loadedImages[0].onload = render;

        function render() {
            if (!context || !canvas || !loadedImages[proxy.frame]) return;
            context.clearRect(0, 0, canvas.width, canvas.height);

            const img = loadedImages[proxy.frame];

            // Simulate "object-fit: cover" for canvas drawing
            const hRatio = canvas.width / img.width;
            const vRatio = canvas.height / img.height;
            const ratio = Math.max(hRatio, vRatio);
            const centerShift_x = (canvas.width - img.width * ratio) / 2;
            const centerShift_y = (canvas.height - img.height * ratio) / 2;

            context.drawImage(img, 0, 0, img.width, img.height,
                centerShift_x, centerShift_y, img.width * ratio, img.height * ratio);
        }

        // Keep canvas scale correct on window resize
        const handleResize = () => {
            if (canvas) {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
                render();
            }
        };
        window.addEventListener('resize', handleResize);

        const handleAnchorClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const anchor = target.closest('a');
            if (!anchor) return;

            const href = anchor.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                if (href === '#home') {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                } else {
                    const targetElement = document.querySelector(href);
                    if (targetElement) {
                        targetElement.scrollIntoView({ behavior: 'smooth' });
                    }
                }
            }
        };
        document.addEventListener('click', handleAnchorClick);

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "+=6000",
                    scrub: 1, // Smoothing enabled for canvas scrubbing
                    pin: true,
                    anticipatePin: 1,
                }
            });

            // Part 1: The Cinematic Zoom (0% to 50% of the timeline)

            // 1. Zoom text massively toward the camera and fade out
            tl.to(".hero-text", {
                scale: 50,
                opacity: 0,
                ease: "power2.in",
                duration: 1,
            }, 0);

            // 2. The entire gallery fades in and scales from tiny to normal simultaneously
            tl.fromTo(".gallery-wrapper",
                { scale: 0.1, opacity: 0 },
                { scale: 1, opacity: 1, ease: "power2.inOut", duration: 1 },
                0
            );

            // 3. After the text zooms past, the gallery images continue to scale outwards
            const finalScales = [4, 5, 6, 5, 6, 8, 9];

            finalScales.forEach((scaleValue, index) => {
                tl.to(`.img-${index}`, {
                    scale: scaleValue,
                    ease: "none",
                    duration: 2,
                }, 1);
            });

            // Part 2: The Canvas Image Scrub (50% to 100% of the timeline)

            // 4. Seamless crossfade from the static image to the active canvas
            tl.to(".front-image", { opacity: 0, duration: 0.1 }, 3);
            tl.to(".video-layer", { opacity: 1, duration: 0.1 }, 3);

            // 5. Scrub through the 240 frames
            tl.to(proxy, {
                frame: frameCount - 1,
                snap: "frame", // Ensures we always ask for a whole integer frame
                ease: "none",
                duration: 3,
                onUpdate: render // Fire the canvas paint directly on update
            }, 3);

            // Frame Texts Fade In/Out during the Canvas scrub (from time 3.0 to 6.0)

            // Text 1: 3.2s to 4.0s
            tl.fromTo(".frame-text-1", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.3 }, 3.2);
            tl.to(".frame-text-1", { opacity: 0, y: -20, duration: 0.3 }, 3.8);

            // Text 2: 4.2s to 5.0s
            tl.fromTo(".frame-text-2", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.3 }, 4.2);
            tl.to(".frame-text-2", { opacity: 0, y: -20, duration: 0.3 }, 4.8);

            // Text 3: 5.2s to 6.0s
            tl.fromTo(".frame-text-3", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.3 }, 5.2);
            tl.to(".frame-text-3", { opacity: 0, y: -20, duration: 0.3 }, 5.8);

        }, containerRef);

        return () => {
            ctx.revert();
            window.removeEventListener('resize', handleResize);
            document.removeEventListener('click', handleAnchorClick);
        };
    }, []);

    return (
        <main className="bg-[#faf9f6] text-[#1a1a1a] relative">
            <Navbar items={demo3NavItems} />

            {/* GSAP Pinned Hero Section */}
            <section id="home" ref={containerRef} className="relative w-full h-screen overflow-hidden bg-[#faf9f6]">

                {/* Parallax Gallery (Hidden initially, zooms in from the center) */}
                <div className="gallery-wrapper absolute top-0 left-0 w-full h-full flex items-center justify-center pointer-events-auto">
                    {images.map(({ src, alt }, index) => (
                        <div
                            key={index}
                            className={`img-${index} absolute top-0 flex h-full w-full items-center justify-center ${layoutClasses[index]}`}
                        >
                            <div className="relative h-[25vh] w-[25vw]">
                                {index === 0 && (
                                    <canvas
                                        ref={canvasRef}
                                        className="video-layer absolute top-0 left-0 h-full w-full object-cover rounded-lg shadow-2xl opacity-0"
                                    />
                                )}
                                <img
                                    src={src}
                                    alt={alt || "Gallery image"}
                                    className={`h-full w-full object-cover rounded-lg shadow-2xl ${index === 0 ? "front-image" : ""}`}
                                />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Cinematic Text Hero (Top layer, zooms out) */}
                <div className="hero-text absolute z-50 w-full h-full flex flex-col items-center justify-center text-center pointer-events-none">
                    <span className="text-[#c9a84c] text-xs md:text-sm font-bold tracking-[0.4em] uppercase mb-4">
                        A Private Sanctuary
                    </span>
                    <h1 className="text-4xl md:text-7xl lg:text-8xl font-black tracking-tighter uppercase whitespace-nowrap px-4 drop-shadow-2xl">
                        The Haven <span className="text-[#c9a84c]">Resort</span>
                    </h1>
                </div>

                {/* Frame Sequence Overlays (Appears during canvas scrub) */}
                <div className="absolute z-50 w-full h-full flex items-center justify-center pointer-events-none">
                    <div className="frame-text-1 absolute opacity-0 text-center">
                        <h3 className="text-3xl md:text-5xl text-white font-light tracking-widest uppercase drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)]">
                            Seamless <br /><span className="text-[#c9a84c] font-bold">Indoor-Outdoor</span> Living
                        </h3>
                    </div>
                    <div className="frame-text-2 absolute opacity-0 text-center">
                        <h3 className="text-3xl md:text-5xl text-white font-light tracking-widest uppercase drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)]">
                            Uncompromising <br /><span className="text-[#c9a84c] font-bold">Attention</span> to Detail
                        </h3>
                    </div>
                    <div className="frame-text-3 absolute opacity-0 text-center">
                        <h3 className="text-3xl md:text-5xl text-white font-light tracking-widest uppercase drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)]">
                            A Masterpiece of <br /><span className="text-[#c9a84c] font-bold">Modern Design</span>
                        </h3>
                    </div>
                </div>

            </section>

            {/* Content Spacer / Outro */}
            <section id="property" className="min-h-[60vh] flex flex-col items-center justify-center px-4 py-32 text-center bg-[#f0eee4] relative z-10">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight uppercase mb-8">
                        Beyond <span className="text-[#c9a84c]">Imagination</span>
                    </h2>
                    <div className="w-20 h-[1px] bg-[#c9a84c] mx-auto mb-10" />
                    <p className="text-lg md:text-xl text-[#4a4a4a] font-light leading-relaxed max-w-2xl mx-auto mb-12">
                        Every corner of The Haven Resort is a testament to refined living.
                        From the hand-carved marble to the floor-to-ceiling glass walls,
                        perfection is the only standard.
                    </p>
                    <a
                        href="mailto:appifybrands@gmail.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center px-8 py-4 bg-[#c9a84c] text-black text-sm font-bold tracking-widest uppercase rounded-full hover:bg-[#d4b55c] transition-all duration-300"
                    >
                        Inquire Privately
                    </a>
                </div>
            </section>

            {/* Smooth Scroll Hero for the Pool */}
            <div id="spa">
                <SmoothScrollHero
                    desktopImage="/real-estate-demo3/Demo3pool.png"
                    mobileImage="/real-estate-demo3/Demo3pool.png"
                >
                    <div className="max-w-2xl mx-auto space-y-6">
                        <h2 className="text-4xl md:text-6xl font-black tracking-tight uppercase">
                            The Infinity <span className="text-[#c9a84c]">Edge</span>
                        </h2>
                        <div className="w-16 h-[2px] bg-[#c9a84c] mx-auto" />
                        <p className="text-lg md:text-xl font-light leading-relaxed">
                            Immerse yourself in crystal clear waters that blend seamlessly with the horizon. Our signature infinity pool offers an unparalleled sanctuary of relaxation, perfect for sunset gazing or morning laps.
                        </p>
                    </div>
                </SmoothScrollHero>
            </div>

            {/* Circular Testimonials Section */}
            <section id="gallery" className="py-24 bg-[#faf9f6] relative z-10 overflow-hidden">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold tracking-tight uppercase mb-4">
                            What <span className="text-[#c9a84c]">They Say</span>
                        </h2>
                        <div className="w-12 h-[1px] bg-[#c9a84c] mx-auto" />
                    </div>
                    <CircularTestimonials
                        testimonials={testimonialsData}
                        colors={{
                            name: "#1a1a1a",
                            designation: "#c9a84c",
                            testimony: "#4a4a4a",
                            arrowBackground: "#e5e7eb",
                            arrowForeground: "#1a1a1a",
                            arrowHoverBackground: "#c9a84c"
                        }}
                    />
                </div>
            </section>

            {/* Outro Section (CTA) */}
            <section className="relative z-40 w-full min-h-[50vh] flex flex-col items-center justify-center bg-[#faf9f6] text-[#1a1a1a] pt-24 pb-20">
                <div className="w-full max-w-4xl mx-auto text-center px-4">
                    <AnimatedBaskervville
                        text="LIKED THE DEMO?"
                        className="text-[#c9a84c] text-4xl md:text-6xl justify-center mb-6"
                    />
                    <p className="text-[#4a4a4a] max-w-2xl mx-auto text-lg md:text-xl leading-relaxed mb-8">
                        We design high-converting, interactive landing pages for real estate.
                    </p>
                    <p className="text-[#c9a84c] text-sm md:text-base tracking-widest font-medium uppercase">
                        Choose how you&apos;d like to connect
                    </p>
                </div>

                {/* Arrows pointing to contact options */}
                <div className="w-full flex mt-12">
                    <div className="w-1/2 flex justify-center">
                        <ArrowDown className="text-[#c9a84c] animate-bounce w-10 h-10" />
                    </div>
                    <div className="w-1/2 flex justify-center">
                        <ArrowDown className="text-[#c9a84c] animate-bounce w-10 h-10" />
                    </div>
                </div>
            </section>

            {/* Spline Footer */}
            <footer className="relative z-50 w-full h-screen bg-[#050505] overflow-hidden">
                <SplineScene scene="/scene.splinecode" />
            </footer>
        </main>
    );
}
