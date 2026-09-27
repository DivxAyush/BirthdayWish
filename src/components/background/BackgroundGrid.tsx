"use client";
import React, { useEffect, useRef } from "react";

interface BackgroundGridProps {
  variant?: "pink" | "dark" | "peach";
  className?: string;
}

const BackgroundGrid: React.FC<BackgroundGridProps> = ({
  variant = "pink",
  className,
}) => {
  const configs = {
    pink: {
      bg: "radial-gradient(ellipse at 50% 30%, #F0357A 0%, #E01E6B 40%, #C0155A 100%)",
      gridColor: "rgba(255,255,255,0.07)",
      glowColor: "rgba(255, 180, 200, 0.15)",
    },
    dark: {
      bg: "radial-gradient(ellipse at 30% 70%, #4A1A7A 0%, #2D1054 50%, #1A0A2E 100%)",
      gridColor: "rgba(255,255,255,0.04)",
      glowColor: "rgba(150, 80, 200, 0.1)",
    },
    peach: {
      bg: "radial-gradient(ellipse at 50% 40%, #FFFFFF 0%, #FFF5EE 30%, #FAE8DC 100%)",
      gridColor: "rgba(200, 150, 130, 0.12)",
      glowColor: "rgba(255, 200, 180, 0.3)",
    },
  };

  const config = configs[variant];
  const gridSize = 48;

  return (
    <div
      className={`absolute inset-0 overflow-hidden ${className ?? ""}`}
      style={{ background: config.bg }}
    >
      {/* Grid SVG */}
      <svg
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        style={{ opacity: 1 }}
      >
        <defs>
          <pattern
            id={`grid-${variant}`}
            width={gridSize}
            height={gridSize}
            patternUnits="userSpaceOnUse"
          >
            <path
              d={`M ${gridSize} 0 L 0 0 0 ${gridSize}`}
              fill="none"
              stroke={config.gridColor}
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#grid-${variant})`} />
      </svg>

      {/* Glow overlays */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 60% 40% at 50% 20%, ${config.glowColor}, transparent)`,
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 40% 30% at 70% 70%, ${config.glowColor}, transparent)`,
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 40% 30% at 30% 80%, ${config.glowColor}, transparent)`,
        }}
      />
    </div>
  );
};

export default BackgroundGrid;
