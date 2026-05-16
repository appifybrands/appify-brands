"use client";

import React from 'react';

interface LoadingScreenProps {
  progress: number;
  isLoading: boolean;
}

export default function LoadingScreen({ progress, isLoading }: LoadingScreenProps) {
  return (
    <div className="brew-loader" data-hidden={!isLoading}>
      <div className="loader-logo-container">
        <h1 className="loader-title">THE BREW CUP</h1>
        <p className="loader-subtitle">EPIC TASTE & NATURE</p>
      </div>
      
      <div className="loader-progress-wrapper">
        <div 
          className="loader-progress-bar" 
          style={{ width: `${progress}%` }}
        />
      </div>
      
      <div className="loader-percentage">
        {Math.round(progress)}%
      </div>
    </div>
  );
}
