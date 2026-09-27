"use client";
import React from "react";

interface CakeProps {
  width?: number;
  height?: number;
  className?: string;
  candleBlown?: boolean;
}

const Cake: React.FC<CakeProps> = ({
  width = 300,
  height = 240,
  className,
  candleBlown = false,
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 300 240"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
    >
      <defs>
        <linearGradient id="cakeBodyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#E8C47A" />
          <stop offset="100%" stopColor="#C8972A" />
        </linearGradient>
        <linearGradient id="frostingGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFF8EC" />
          <stop offset="100%" stopColor="#F0DFA0" />
        </linearGradient>
        <filter id="cakeGlow">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <radialGradient id="candleGlowGrad" cx="50%" cy="100%" r="80%">
          <stop offset="0%" stopColor="#FFB830" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#FFB830" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Plate / base */}
      <rect
        x="50"
        y="218"
        width="200"
        height="8"
        rx="4"
        fill="#F5E6C8"
        opacity="0.9"
      />

      {/* Bottom cake layer */}
      <rect x="55" y="162" width="190" height="56" rx="6" fill="url(#cakeBodyGrad)" />
      <rect x="55" y="162" width="190" height="8" rx="0" fill="#C8972A" opacity="0.4" />
      <rect x="55" y="195" width="190" height="8" rx="0" fill="#C8972A" opacity="0.4" />

      {/* Middle frosting layer drips */}
      <path
        d="M55 162 C65 162 68 154 80 154 C92 154 95 162 105 162 C115 162 118 154 130 154 C142 154 145 162 155 162 C165 162 168 154 180 154 C192 154 195 162 205 162 C215 162 218 154 230 154 C242 154 245 162 245 162"
        fill="url(#frostingGrad)"
        stroke="none"
      />
      <rect x="55" y="154" width="190" height="8" rx="0" fill="url(#frostingGrad)" />

      {/* Middle cake layer */}
      <rect x="60" y="110" width="180" height="52" rx="6" fill="url(#cakeBodyGrad)" />
      <rect x="60" y="110" width="180" height="8" rx="0" fill="#C8972A" opacity="0.4" />
      <rect x="60" y="141" width="180" height="8" rx="0" fill="#C8972A" opacity="0.4" />

      {/* Top frosting drips */}
      <path
        d="M60 110 C72 110 75 100 88 100 C101 100 104 110 117 110 C130 110 133 100 146 100 C159 100 162 110 175 110 C188 110 191 100 204 100 C217 100 220 110 233 110 C240 110 240 110 240 110"
        fill="url(#frostingGrad)"
      />
      <path
        d="M60 110 C68 105 75 96 85 92 C100 88 115 106 130 104 C145 102 158 88 173 92 C185 95 193 108 205 110"
        fill="url(#frostingGrad)"
        opacity="0.8"
      />
      <rect x="60" y="92" width="180" height="20" rx="6" fill="url(#frostingGrad)" />

      {/* Frosting top decoration - mound */}
      <ellipse cx="150" cy="92" rx="70" ry="16" fill="url(#frostingGrad)" />
      <path
        d="M95 92 C95 75 115 65 135 68 C148 62 168 65 175 75 C185 72 200 78 200 88 C195 85 185 82 180 85 C170 78 158 75 150 78 C142 75 130 78 120 85 C113 82 100 85 95 92Z"
        fill="#FFF8EC"
      />

      {/* Candle */}
      <rect x="142" y="54" width="16" height="42" rx="4" fill="#FF6B9D" />
      {/* Candle stripes */}
      {[64, 72, 80].map((y) => (
        <rect key={y} x="142" y={y} width="16" height="3" fill="rgba(255,255,255,0.4)" rx="1" />
      ))}

      {/* Flame - hidden when blown */}
      {!candleBlown && (
        <g>
          {/* Glow */}
          <ellipse cx="150" cy="45" rx="20" ry="25" fill="url(#candleGlowGrad)" />
          {/* Flame outer */}
          <path
            d="M150 26 C148 32 140 38 141 48 C142 56 148 58 150 58 C152 58 158 56 159 48 C160 38 152 32 150 26Z"
            fill="#FFB830"
          />
          {/* Flame inner */}
          <path
            d="M150 33 C149 37 145 41 146 48 C147 53 149 55 150 55 C151 55 153 53 154 48 C155 41 151 37 150 33Z"
            fill="#FFF3CD"
          />
          {/* Tip */}
          <circle cx="150" cy="30" r="3" fill="white" opacity="0.8" />
        </g>
      )}

      {/* Smoke when blown */}
      {candleBlown && (
        <g opacity="0.5">
          <path
            d="M150 54 C148 48 152 44 150 38 C148 32 152 28 150 22"
            stroke="#ccc"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
          />
        </g>
      )}
    </svg>
  );
};

export default Cake;
