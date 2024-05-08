// RotatingLines.tsx
import React from 'react';
import './RotatingLines.css';

interface RotatingLinesProps {
  visible: boolean;
  height: string;
  width: string;
  color: string; // Add the color property to the interface
  strokeWidth: string;
}

const RotatingLines: React.FC<RotatingLinesProps> = ({ visible, height, width, color, strokeWidth }) => {
  return (
    <svg
      className={`rotating-lines${visible ? ' visible' : ''}`}
      height={height}
      width={width}
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid"
    >
      <circle cx="50" cy="50" fill="none" stroke={color} strokeWidth={strokeWidth} r="35" strokeDasharray="164.93361431346415 56.97787143782138">
        <animateTransform
          attributeName="transform"
          type="rotate"
          repeatCount="indefinite"
          dur="1s"
          keyTimes="0;1"
          values="0 50 50;360 50 50"
        />
      </circle>
    </svg>
  );
};

export default RotatingLines;
