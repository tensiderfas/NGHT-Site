import React from 'react';

interface LogoProps {
  className?: string;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  animated?: boolean;
}

export default function Logo({
  className = "w-8 h-8",
  fill = "currentColor",
  stroke = "none",
  strokeWidth = 1.5,
  animated = false
}: LogoProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      fill={animated ? "none" : fill}
      stroke={stroke !== "none" ? stroke : "currentColor"}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Left Crescent Arc */}
      <path
        d="M 32.6,39.5 A 25.5,25.5 0 0,0 48.4,70.5 A 21.5,21.5 0 0,1 35.1,46.1 Z"
        className={animated ? "logo-draw" : ""}
        style={{
          transition: "fill 0.5s ease, stroke 0.5s ease",
        }}
        fill={animated ? "none" : fill}
      />
      {/* Right Crescent Arc */}
      <path
        d="M 67.4,60.5 A 25.5,25.5 0 0,0 51.6,29.5 A 21.5,21.5 0 0,1 64.9,53.9 Z"
        className={animated ? "logo-draw" : ""}
        style={{
          transition: "fill 0.5s ease, stroke 0.5s ease",
        }}
        fill={animated ? "none" : fill}
      />
      {/* Central Sharp Lightning Bolt */}
      <polygon
        points="31.2,27 59.3,52.5 54.1,52.5 68.8,73 40.7,47.5 45.9,47.5"
        className={animated ? "logo-draw" : ""}
        style={{
          transition: "fill 0.5s ease, stroke 0.5s ease",
        }}
        fill={animated ? "none" : fill}
      />
    </svg>
  );
}
