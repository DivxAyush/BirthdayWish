"use client";
import React from "react";

interface BalloonProps {
  color?: string;
  highlightColor?: string;
  width?: number;
  height?: number;
  className?: string;
  style?: React.CSSProperties;
}

const Balloon: React.FC<BalloonProps> = ({
  color = "#FF6B9D",
  highlightColor,
  width = 80,
  height = 120,
  className,
  style,
}) => {
  const hl = highlightColor ?? "rgba(255,255,255,0.4)";
  const id = `balloon-${color.replace("#", "")}`;

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 80 120"
      className={className}
      style={style}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
    >
      <defs>
        <radialGradient id={`${id}-grad`} cx="35%" cy="30%" r="65%">
          <stop offset="0%" stopColor={hl} />
          <stop offset="60%" stopColor={color} />
          <stop offset="100%" stopColor={color} stopOpacity="0.8" />
        </radialGradient>
        <filter id={`${id}-shadow`}>
          <feDropShadow dx="0" dy="4" stdDeviation="4" floodOpacity="0.2" />
        </filter>
      </defs>

      {/* Balloon body */}
      <ellipse
        cx="40"
        cy="42"
        rx="30"
        ry="36"
        fill={`url(#${id}-grad)`}
        filter={`url(#${id}-shadow)`}
      />

      {/* Knot */}
      <path
        d="M38 76 C37 80 36 82 38 84 C40 86 42 84 41 80 Z"
        fill={color}
      />

      {/* String */}
      <path
        d="M39 84 C38 92 42 98 39 104 C36 110 41 116 40 120"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
        opacity="0.7"
      />

      {/* Highlight */}
      <ellipse cx="30" cy="28" rx="8" ry="10" fill="rgba(255,255,255,0.25)" />
    </svg>
  );
};

export default Balloon;
