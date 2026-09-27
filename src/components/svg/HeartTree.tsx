"use client";
import React from "react";

interface HeartTreeProps {
  className?: string;
  showHearts?: boolean;
}

const HeartTree: React.FC<HeartTreeProps> = ({
  className,
  showHearts = false,
}) => {
  // Heart positions distributed in a heart shape
  const heartPositions = [
    // Top center
    { cx: 250, cy: 80, r: 18, fill: "#F06292", delay: 0.1 },
    { cx: 220, cy: 100, r: 15, fill: "#E91E8C", delay: 0.2 },
    { cx: 280, cy: 100, r: 14, fill: "#F5A623", delay: 0.15 },
    // Upper left
    { cx: 140, cy: 130, r: 20, fill: "#F06292", delay: 0.3 },
    { cx: 165, cy: 115, r: 16, fill: "#FF8A65", delay: 0.25 },
    { cx: 115, cy: 155, r: 17, fill: "#E91E8C", delay: 0.4 },
    { cx: 90, cy: 180, r: 19, fill: "#F5A623", delay: 0.5 },
    { cx: 130, cy: 160, r: 14, fill: "#F06292", delay: 0.35 },
    // Upper right
    { cx: 360, cy: 130, r: 20, fill: "#E91E8C", delay: 0.3 },
    { cx: 335, cy: 115, r: 16, fill: "#F5A623", delay: 0.25 },
    { cx: 385, cy: 155, r: 17, fill: "#F06292", delay: 0.4 },
    { cx: 410, cy: 180, r: 19, fill: "#FF8A65", delay: 0.5 },
    { cx: 370, cy: 160, r: 14, fill: "#E91E8C", delay: 0.35 },
    // Middle left
    { cx: 80, cy: 210, r: 22, fill: "#F06292", delay: 0.6 },
    { cx: 105, cy: 230, r: 18, fill: "#F5A623", delay: 0.55 },
    { cx: 70, cy: 240, r: 15, fill: "#E91E8C", delay: 0.65 },
    { cx: 100, cy: 260, r: 20, fill: "#FF8A65", delay: 0.7 },
    { cx: 130, cy: 245, r: 16, fill: "#F06292", delay: 0.6 },
    // Middle right
    { cx: 420, cy: 210, r: 22, fill: "#E91E8C", delay: 0.6 },
    { cx: 395, cy: 230, r: 18, fill: "#F06292", delay: 0.55 },
    { cx: 430, cy: 240, r: 15, fill: "#F5A623", delay: 0.65 },
    { cx: 400, cy: 260, r: 20, fill: "#E91E8C", delay: 0.7 },
    { cx: 370, cy: 245, r: 16, fill: "#FF8A65", delay: 0.6 },
    // Lower middle left
    { cx: 140, cy: 275, r: 19, fill: "#F5A623", delay: 0.8 },
    { cx: 170, cy: 290, r: 17, fill: "#F06292", delay: 0.75 },
    { cx: 155, cy: 310, r: 15, fill: "#E91E8C", delay: 0.85 },
    { cx: 190, cy: 270, r: 21, fill: "#FF8A65", delay: 0.8 },
    // Lower middle right
    { cx: 360, cy: 275, r: 19, fill: "#E91E8C", delay: 0.8 },
    { cx: 330, cy: 290, r: 17, fill: "#F5A623", delay: 0.75 },
    { cx: 345, cy: 310, r: 15, fill: "#F06292", delay: 0.85 },
    { cx: 310, cy: 270, r: 21, fill: "#FF8A65", delay: 0.8 },
    // Bottom middle
    { cx: 215, cy: 305, r: 22, fill: "#F06292", delay: 0.9 },
    { cx: 250, cy: 315, r: 24, fill: "#E91E8C", delay: 0.95 },
    { cx: 285, cy: 305, r: 22, fill: "#F5A623", delay: 0.9 },
    { cx: 230, cy: 330, r: 18, fill: "#FF8A65", delay: 1.0 },
    { cx: 270, cy: 330, r: 18, fill: "#F06292", delay: 1.0 },
    // Extra fill hearts
    { cx: 200, cy: 140, r: 16, fill: "#E91E8C", delay: 0.45 },
    { cx: 300, cy: 140, r: 16, fill: "#F5A623", delay: 0.45 },
    { cx: 250, cy: 160, r: 14, fill: "#F06292", delay: 0.5 },
    { cx: 175, cy: 200, r: 18, fill: "#FF8A65", delay: 0.65 },
    { cx: 325, cy: 200, r: 18, fill: "#F06292", delay: 0.65 },
    { cx: 210, cy: 235, r: 16, fill: "#E91E8C", delay: 0.75 },
    { cx: 290, cy: 235, r: 16, fill: "#F5A623", delay: 0.75 },
    { cx: 250, cy: 255, r: 19, fill: "#F06292", delay: 0.85 },
    { cx: 250, cy: 200, r: 17, fill: "#FF8A65", delay: 0.7 },
  ];

  return (
    <svg
      viewBox="0 0 500 520"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="treeGlow" cx="50%" cy="35%" r="50%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
          <stop offset="60%" stopColor="#FFF5EE" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#FAE8DC" stopOpacity="0" />
        </radialGradient>
        <filter id="heartGlow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="1" dy="2" stdDeviation="3" floodOpacity="0.2" />
        </filter>
        <radialGradient id="sunburstGrad" cx="50%" cy="35%" r="55%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#FAE8DC" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Sunburst rays from center glow */}
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i * 30 * Math.PI) / 180;
        const x2 = 250 + Math.cos(angle) * 280;
        const y2 = 200 + Math.sin(angle) * 280;
        return (
          <line
            key={i}
            x1="250"
            y1="200"
            x2={x2}
            y2={y2}
            stroke="rgba(255,255,255,0.5)"
            strokeWidth="1"
          />
        );
      })}

      {/* Glow background circle */}
      <circle cx="250" cy="200" r="220" fill="url(#sunburstGrad)" />

      {/* Tree trunk */}
      <rect x="240" y="370" width="20" height="130" rx="10" fill="#5C3A3A" />

      {/* Main branches - forming heart shape */}
      {/* Left branch up */}
      <path
        d="M250 370 C245 340 230 310 200 280 C175 255 145 240 120 220 C95 200 80 175 85 145 C90 120 110 105 135 110"
        stroke="#5C3A3A"
        strokeWidth="8"
        fill="none"
        strokeLinecap="round"
      />
      {/* Right branch up */}
      <path
        d="M250 370 C255 340 270 310 300 280 C325 255 355 240 380 220 C405 200 420 175 415 145 C410 120 390 105 365 110"
        stroke="#5C3A3A"
        strokeWidth="8"
        fill="none"
        strokeLinecap="round"
      />
      {/* Left sub-branches */}
      <path
        d="M180 290 C165 270 150 260 135 255"
        stroke="#5C3A3A"
        strokeWidth="5"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M160 270 C145 250 135 230 130 210"
        stroke="#5C3A3A"
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M135 245 C120 225 110 205 105 185"
        stroke="#5C3A3A"
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M110 210 C95 195 90 175 92 155"
        stroke="#5C3A3A"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M110 210 C100 200 85 195 75 190"
        stroke="#5C3A3A"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />
      {/* Right sub-branches */}
      <path
        d="M320 290 C335 270 350 260 365 255"
        stroke="#5C3A3A"
        strokeWidth="5"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M340 270 C355 250 365 230 370 210"
        stroke="#5C3A3A"
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M365 245 C380 225 390 205 395 185"
        stroke="#5C3A3A"
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M390 210 C405 195 410 175 408 155"
        stroke="#5C3A3A"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M390 210 C400 200 415 195 425 190"
        stroke="#5C3A3A"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />
      {/* Center top branches */}
      <path
        d="M250 370 C250 345 248 320 250 295"
        stroke="#5C3A3A"
        strokeWidth="6"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M248 320 C240 305 228 292 215 282"
        stroke="#5C3A3A"
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M248 320 C258 305 272 292 285 282"
        stroke="#5C3A3A"
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M250 295 C243 275 232 255 220 240"
        stroke="#5C3A3A"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M250 295 C257 275 268 255 280 240"
        stroke="#5C3A3A"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M250 295 C250 265 250 235 248 210"
        stroke="#5C3A3A"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />
      {/* Top */}
      <path
        d="M248 210 C240 190 230 165 225 140"
        stroke="#5C3A3A"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M248 210 C258 190 268 165 273 140"
        stroke="#5C3A3A"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M225 140 C215 125 210 110 215 95"
        stroke="#5C3A3A"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M273 140 C283 125 288 110 283 95"
        stroke="#5C3A3A"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M248 160 C248 140 250 120 250 105"
        stroke="#5C3A3A"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />

      {/* Hearts - only shown when showHearts=true */}
      {showHearts &&
        heartPositions.map((h, i) => (
          <g key={i} filter="url(#heartGlow)">
            <path
              d={`M${h.cx} ${h.cy + h.r * 0.9} 
                  C${h.cx} ${h.cy + h.r * 0.9} ${h.cx - h.r * 1.9} ${h.cy + h.r * 0.4} 
                  ${h.cx - h.r * 1.9} ${h.cy - h.r * 0.4}
                  C${h.cx - h.r * 1.9} ${h.cy - h.r * 1.0} ${h.cx - h.r * 0.9} ${h.cy - h.r * 1.3}
                  ${h.cx} ${h.cy - h.r * 0.5}
                  C${h.cx + h.r * 0.9} ${h.cy - h.r * 1.3} ${h.cx + h.r * 1.9} ${h.cy - h.r * 1.0}
                  ${h.cx + h.r * 1.9} ${h.cy - h.r * 0.4}
                  C${h.cx + h.r * 1.9} ${h.cy + h.r * 0.4} ${h.cx} ${h.cy + h.r * 0.9} ${h.cx} ${h.cy + h.r * 0.9}Z`}
              fill={h.fill}
              filter="url(#softShadow)"
            />
            {/* Highlight */}
            <ellipse
              cx={h.cx - h.r * 0.4}
              cy={h.cy - h.r * 0.15}
              rx={h.r * 0.35}
              ry={h.r * 0.25}
              fill="rgba(255,255,255,0.4)"
            />
          </g>
        ))}

      {/* Central glow overlay */}
      <circle
        cx="250"
        cy="220"
        r="160"
        fill="url(#treeGlow)"
        opacity={showHearts ? 0.6 : 0.4}
      />

      {/* Ground/reflection line */}
      <rect x="170" y="498" width="160" height="4" rx="2" fill="rgba(200,160,140,0.4)" />
      <rect x="200" y="502" width="100" height="2" rx="1" fill="rgba(200,160,140,0.2)" />
    </svg>
  );
};

export default HeartTree;
