"use client";

import { useEffect, useCallback } from "react";

export default function ParticlesComponent() {
  const initParticles = useCallback((isDark: boolean) => {
    // cleanup old canvas
    const oldCanvas = document.querySelector("#particles-js canvas");
    if (oldCanvas) oldCanvas.remove();

    // @ts-expect-error -- particlesJS is a global script
    if (window.pJSDom?.length > 0) {
      // @ts-expect-error -- particlesJS is a global script
      window.pJSDom.forEach((p) => p.pJS.fn.vendors.destroypJS());
      // @ts-expect-error -- particlesJS is a global script
      window.pJSDom = [];
    }

    const colors = isDark
      ? {
          particles: "#C0C8CA", // --mist
          lines: "#AAB7B7",     // --sage
          accent: "#C0C8CA",
        }
      : {
          particles: "#1A2D42", // --navy
          lines: "#2E4156",     // --steel
          accent: "#1A2D42",
        };

    // @ts-expect-error -- particlesJS is a global script
    if (typeof window.particlesJS === "undefined") return;

    // @ts-expect-error -- particlesJS is a global script
    window.particlesJS("particles-js", {
      particles: {
        number: { value: 100, density: { enable: true, value_area: 800 } },
        color: { value: colors.particles },
        shape: { type: "circle", stroke: { width: 0, color: colors.accent } },
        opacity: {
          value: isDark ? 0.7 : 0.9,
          random: false,
          anim: { enable: true, speed: 1, opacity_min: 0.3 },
        },
        size: {
          value: 3,
          random: true,
          anim: { enable: true, speed: 1, size_min: 1 },
        },
        line_linked: {
          enable: true,
          distance: 170,
          color: colors.lines,
          opacity: isDark ? 0.4 : 0.7, // Increased for light mode visibility
          width: 1.5,
        },
        move: { enable: true, speed: 2, random: false, out_mode: "out" },
      },
      interactivity: {
        detect_on: "window", // Listens to global mouse events
        events: {
          onhover: { enable: true, mode: "grab" },
          onclick: { enable: true, mode: "push" },
          resize: true,
        },
        modes: {
          grab: { distance: 250, line_linked: { opacity: 0.8 } },
          push: { particles_nb: 4 },
          repulse: { distance: 200, duration: 0.4 },
        },
      },
      retina_detect: true,
    });
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js";
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      const html = document.documentElement;
      const detectDark = () =>
        html.classList.contains("dark") ||
        html.getAttribute("data-theme") === "dark" ||
        window.matchMedia("(prefers-color-scheme: dark)").matches;

      // init first load
      initParticles(detectDark());

      // observe changes
      const observer = new MutationObserver(() => initParticles(detectDark()));
      observer.observe(html, {
        attributes: true,
        attributeFilter: ["class", "data-theme"],
      });
    };

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, [initParticles]);

  return (
    <div
      id="particles-js"
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 0, opacity: 0.6 }}
    />
  );
}
