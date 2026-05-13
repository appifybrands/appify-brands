"use client";

import Rive from '@rive-app/react-canvas';

export default function CafeBaristaSection() {
  return (
    <section className="barista-section">
      <div className="barista-container">
        <div className="barista-rive-wrapper">
          <Rive 
            src="/cafe_demo1_assets/rive_files/barista_section.riv"
            stateMachines="State Machine 1"
            style={{ width: '100%', height: '100%' }}
          />
        </div>
      </div>
    </section>
  );
}


