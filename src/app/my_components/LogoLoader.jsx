"use client";

import Image from "next/image";

export default function LogoLoader() {
  return (
    <>
      <style>{`
        .loader-container {
          position: fixed;
          inset: 0;
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--bg-primary, #0d1825);
        }
        @keyframes logo-premium {
          0%   { transform: rotate(0deg) scale(0.9);    opacity: 0;   filter: blur(10px); }
          20%  { transform: rotate(5deg) scale(1.05);  opacity: 1;   filter: blur(0px);  }
          50%  { transform: rotate(180deg) scale(1.1); opacity: 0.8; filter: blur(2px);  }
          80%  { transform: rotate(355deg) scale(1.05); opacity: 1;   filter: blur(0px);  }
          100% { transform: rotate(360deg) scale(0.9);  opacity: 0;   filter: blur(10px); }
        }
        .logo-spin {
          animation: logo-premium 2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
      `}</style>
      <div className="loader-container">
        <Image
          src="/appify_brands_glow_logo2.png"
          alt="Appify Brands Logo"
          width={100}
          height={100}
          className="logo-spin"
        />
      </div>
    </>
  );
}
