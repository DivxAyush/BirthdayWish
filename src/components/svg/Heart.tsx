"use client";
import React from "react";

interface HeartProps {
  width?: number;
  height?: number;
  fill?: string;
  className?: string;
  style?: React.CSSProperties;
  filter?: string;
  opacity?: number;
}

const Heart: React.FC<HeartProps> = ({
  width = 40,
  height = 40,
  fill = "#F06292",
  className,
  style,
  filter,
  opacity = 1,
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 100 90"
      className={className}
      style={style}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      opacity={opacity}
    >
      <defs>
        {filter && (
          <filter id={filter} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        )}
      </defs>
      <path
        d="M50 85 C50 85 5 55 5 28 C5 14 16 5 28 5 C36 5 43 9 50 16 C57 9 64 5 72 5 C84 5 95 14 95 28 C95 55 50 85 50 85Z"
        fill={fill}
      />
      {/* Highlight for 3D effect */}
      <ellipse cx="35" cy="25" rx="8" ry="6" fill="rgba(255,255,255,0.3)" />
    </svg>
  );
};

export default Heart;
