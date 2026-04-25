"use client";

import React, { useState, useEffect, useRef, useCallback, Suspense } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import styles from './SplineScene.module.css';

// Load Spline using dynamic import (no SSR)
const Spline = dynamic(() => import('@splinetool/react-spline'), {
  ssr: false,
  loading: () => <div className={styles.loader} />,
});

type SceneStatus = '3D_ACTIVE' | 'TRANSITION' | '2D_FALLBACK';

interface SplineSceneProps {
  scene: string;
}

// Simple Error Boundary to catch internal Spline runtime errors
class SplineErrorBoundary extends React.Component<{ children: React.ReactNode; onError: () => void }, { hasError: boolean }> {
  constructor(props: { children: React.ReactNode; onError: () => void }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.error('SplineErrorBoundary caught an error:', error);
    this.props.onError();
  }

  render() {
    if (this.state.hasError) {
      return null; // Let the parent SplineScene handle the fallback UI
    }
    return this.props.children;
  }
}

export default function SplineScene({ scene }: SplineSceneProps) {
  const [status, setStatus] = useState<SceneStatus>('TRANSITION');
  const [retryKey, setRetryKey] = useState(0);
  const [lastAttemptTime, setLastAttemptTime] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isUrlValid, setIsUrlValid] = useState(true);
  const [isRecovering, setIsRecovering] = useState(false);

  const lastStatusRef = useRef<SceneStatus>('TRANSITION');

  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const COOLDOWN_MS = 5000;
  const TRANSITION_DELAY_MS = 1500;

  // Stability: Prevent rapid switching loops
  const canRetry = useCallback(() => {
    const now = Date.now();
    return now - lastAttemptTime >= COOLDOWN_MS;
  }, [lastAttemptTime]);

  const switchToFallback = useCallback(() => {
    if (status === '2D_FALLBACK') return;

    lastStatusRef.current = status;
    setStatus('TRANSITION');
    setIsRecovering(false);
    setTimeout(() => {
      setStatus('2D_FALLBACK');
    }, TRANSITION_DELAY_MS);
  }, [status]);

  const handleLoad = useCallback(() => {
    console.log('Spline: 3D Loaded successfully');
    lastStatusRef.current = status;
    setStatus('3D_ACTIVE');
    setIsRecovering(false);
    setLastAttemptTime(Date.now());
  }, [status]);

  const handleError = useCallback(() => {
    console.error('Spline: 3D Error detected');
    switchToFallback();
  }, [switchToFallback]);

  const manualRetry = useCallback(() => {
    if (canRetry()) {
      lastStatusRef.current = status;
      if (status === '2D_FALLBACK') {
        setIsRecovering(true);
        // Keep status as 2D_FALLBACK while reloading in background
        setRetryKey(prev => prev + 1);
        setLastAttemptTime(Date.now());
      } else {
        setStatus('TRANSITION');
        setRetryKey(prev => prev + 1);
        setLastAttemptTime(Date.now());
      }
      setIsUrlValid(true); // Reset validation on manual retry
    }
  }, [canRetry, status]);

  // Mobile Detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Pre-flight Fetch Check & URL Validation
  useEffect(() => {
    if (isMobile) return;

    // Attempt to ping the URL to check for 404 or DNS errors (like 'designn')
    const checkUrl = async () => {
      // Synchronous checks moved here to avoid cascading render warning in effect body
      if (!scene || !scene.includes('spline.design')) {
        console.error('Spline: Invalid scene URL');
        setIsUrlValid(false);
        switchToFallback();
        return;
      }

      try {
        await fetch(scene, { method: 'HEAD', mode: 'no-cors' });
        // Note: no-cors will always return status 0, but it will throw if DNS fails or fetch fails
        setIsUrlValid(true);
      } catch (err) {
        console.error('Spline: URL Pre-flight check failed', err);
        setIsUrlValid(false);
        switchToFallback();
      }
    };

    checkUrl();
  }, [scene, switchToFallback, isMobile]);

  // Signal: Canvas visibility & WebGL Context
  useEffect(() => {
    const checkCanvas = () => {
      if (status !== '3D_ACTIVE') return;

      const canvas = containerRef.current?.querySelector('canvas');
      if (canvas) {
        canvasRef.current = canvas;

        // Signal: WebGL context lost
        const handleContextLost = (event: Event) => {
          event.preventDefault();
          console.warn('Spline: WebGL Context Lost');
          switchToFallback();
        };

        canvas.addEventListener('webglcontextlost', handleContextLost);
        return () => canvas.removeEventListener('webglcontextlost', handleContextLost);
      } else {
        // Signal: Canvas disappears
        switchToFallback();
      }
    };

    const interval = setInterval(checkCanvas, 2000);
    return () => clearInterval(interval);
  }, [status, switchToFallback]);

  // Signal: Page Visibility API & Tab Focus
  useEffect(() => {
    const handleVisibilityChange = () => {
      const visible = document.visibilityState === 'visible';

      if (visible && status === '2D_FALLBACK' && canRetry() && !isMobile) {
        console.log('Spline: Tab focused, attempting recovery...');
        manualRetry();
      }
    };

    const handleFocus = () => {
      if (status === '2D_FALLBACK' && canRetry() && !isMobile) {
        manualRetry();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('focus', handleFocus);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', handleFocus);
    };
  }, [status, canRetry, isMobile, manualRetry]);

  const activeStatus = isMobile ? '2D_FALLBACK' : status;
  const isRecoveringUI = isRecovering && !isMobile;

  return (
    <div className={styles.container} ref={containerRef}>
      {/* 3D Scene Layer */}
      {!isMobile && isUrlValid && (
        <div className={`${styles.splineWrapper} ${activeStatus === '3D_ACTIVE' ? styles.splineActive : ''}`}>
          <Suspense fallback={<div className={styles.loader} />}>
            <SplineErrorBoundary onError={handleError}>
              <Spline
                key={retryKey}
                scene={scene}
                onLoad={handleLoad}
                onError={handleError}
              />
            </SplineErrorBoundary>
          </Suspense>
        </div>
      )}

      {/* Transition Overlay (Only for initial load or non-recovery transitions) */}
      {activeStatus === 'TRANSITION' && !isRecoveringUI && (
        <div className={styles.overlay}>
          <div className={styles.messageContainer}>
            <h2 className={styles.title}>
              3D Scene is unavailable
            </h2>
            <p className={styles.subtitle}>
              Switching to 2D experience...
            </p>
            <div className={styles.loader} />
          </div>
        </div>
      )}


      {/* 2D Fallback Layer */}
      {activeStatus === '2D_FALLBACK' && (
        <div className={styles.fallbackContent}>
          <div className={styles.gridContainer}>
            {/* Book a Call Section */}
            <div className={styles.fallbackSection}>
              <div className={styles.modelImageWrapper}>
                <Image
                  src="/calendar_model_png.png"
                  alt="Calendar Model"
                  width={200}
                  height={200}
                  className={styles.modelImage}
                />
              </div>
              <h2 className={styles.sectionTitle}>BOOK A CALL</h2>
              <a
                href="https://calendly.com/appifybrands/30min"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.logoButton}
              >
                <Image
                  src="/calendly_logo.png"
                  alt="Calendly"
                  width={180}
                  height={50}
                  className={styles.logoImage}
                />
              </a>
            </div>

            {/* Send a Mail Section */}
            <div className={styles.fallbackSection}>
              <div className={styles.modelImageWrapper}>
                <Image
                  src="/mail_model_png.png"
                  alt="Mail Model"
                  width={200}
                  height={200}
                  className={styles.modelImage}
                />
              </div>
              <h2 className={styles.sectionTitle}>SEND A MAIL</h2>
              <a
                href="mailto:appifybrands@gmail.com"
                className={styles.logoButton}
              >
                <Image
                  src="/gmail_logo_png.png"
                  alt="Gmail"
                  width={180}
                  height={50}
                  className={styles.logoImage}
                />
              </a>
            </div>
          </div>

          {/* Brand Footer */}
          <a
            href="https://appifybrands.com"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.brandFooter}
          >
            <span className={styles.demoBy}>Demo By</span>
            <div className={styles.brandLogoWrapper}>
              <Image
                src="/appify_brands_logo.png"
                alt="Appify Brands"
                width={50}
                height={50}
                className={styles.brandLogo}
              />
            </div>
            <span className={styles.brandName}>Appify Brands</span>
          </a>

          {!isMobile && (
            <div className={styles.controls}>
              {isRecoveringUI && (
                <div className={styles.recoveryStatus}>
                  <div className={styles.miniLoader} />
                  <span>Enhancing your experience...</span>
                </div>
              )}
              <button
                className={`${styles.retryButton} ${isRecoveringUI ? styles.loading : ''}`}
                onClick={manualRetry}
                disabled={!canRetry() || isRecoveringUI}
              >
                {isRecoveringUI
                  ? 'Switching...'
                  : canRetry() ? 'Switch to 3D' : `Retry in few seconds...`}
              </button>
            </div>
          )}
        </div>
      )}

      {/* Watermark Protection (Only when 3D is active) */}
      {activeStatus === '3D_ACTIVE' && (
        <div className="absolute bottom-0 right-0 w-40 h-24 bg-[#050505] z-50 pointer-events-none" />
      )}
    </div>
  );
}
