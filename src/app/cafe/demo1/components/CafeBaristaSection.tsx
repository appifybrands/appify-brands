"use client";

import Rive from '@rive-app/react-canvas';
import { useEffect, useRef } from 'react';

export default function CafeBaristaSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Canvas touch interactions are now handled natively via CSS pointer-events: none on mobile
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


