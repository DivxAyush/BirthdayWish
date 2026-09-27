"use client";
import React from "react";

interface EnvelopeProps {
  width?: number;
  height?: number;
  className?: string;
  isOpen?: boolean;
}

const Envelope: React.FC<EnvelopeProps> = ({
  width = 280,
  height = 200,
  className,
  isOpen = false,
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 280 200"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
    >
      <defs>
        <linearGradient id="envBodyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#F9A8D4" />
          <stop offset="100%" stopColor="#EC4899" />
        </linearGradient>
        <linearGradient id="envFlapGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#F472B6" />
          <stop offset="100%" stopColor="#DB2777" />
        </linearGradient>
        <filter id="envShadow">
          <feDropShadow dx="0" dy="6" stdDeviation="8" floodOpacity="0.25" />
        </filter>
      </defs>

      {/* Envelope body */}
      <rect
        x="10"
        y="50"
        width="260"
        height="140"
        rx="8"
        fill="url(#envBodyGrad)"
        filter="url(#envShadow)"
      />

      {/* Bottom triangle folds */}
      <path d="M10 190 L140 115 L270 190Z" fill="#DB2777" opacity="0.5" />

      {/* Left fold */}
      <path d="M10 50 L140 125 L10 190Z" fill="#F472B6" opacity="0.6" />

      {/* Right fold */}
      <path d="M270 50 L140 125 L270 190Z" fill="#F472B6" opacity="0.6" />

      {/* Envelope flap - opens up when isOpen */}
      <path
        d={
          isOpen
            ? "M10 50 L140 10 L270 50Z" // flat open state
            : "M10 50 L140 125 L270 50Z" // closed pointing down
        }
        fill="url(#envFlapGrad)"
        style={{ transition: "d 0.5s ease" }}
      />

      {/* Heart seal */}
      {!isOpen && (
        <path
          d="M140 120 C140 120 128 110 128 103 C128 97 132 93 136 93 C138 93 140 95 140 95 C140 95 142 93 144 93 C148 93 152 97 152 103 C152 110 140 120 140 120Z"
          fill="#FFF"
          opacity="0.9"
        />
      )}

      {/* Light reflection on flap */}
      <path
        d="M50 55 C80 52 120 50 160 52 C190 54 220 56 250 60"
        stroke="rgba(255,255,255,0.3)"
        strokeWidth="1.5"
        fill="none"
      />
    </svg>
  );
};

export default Envelope;
