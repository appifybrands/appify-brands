"use client";

import Rive from '@rive-app/react-canvas';
import { useEffect, useRef } from 'react';

export default function CafeBaristaSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleTouch = (e: TouchEvent) => {
      // Passive listener allows the event to be passed to the browser for scrolling
    };

    // Find the canvas element inside the Rive component
    const canvas = container.querySelector('canvas');
    if (canvas) {
      canvas.addEventListener('touchstart', handleTouch, { passive: true });
      canvas.addEventListener('touchmove', handleTouch, { passive: true });
    }

    return () => {
      if (canvas) {
        canvas.removeEventListener('touchstart', handleTouch);
        canvas.removeEventListener('touchmove', handleTouch);
      }
    };
  }, []);

  return (
    <section className="barista-section">
      <div className="barista-container">
        <div className="barista-rive-wrapper" ref={containerRef}>
          <Rive 
            src="/cafe_demo1_assets/rive_files/barista_section.riv"
            stateMachines="State Machine 1"
            style={{ width: '100%', height: '100%', touchAction: 'pan-y' }}
          />
        </div>
      </div>
    </section>
  );
}


