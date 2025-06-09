import React, { useState, useEffect, useRef } from 'react';

const Edge = ({ source, target, isPingActive, type, toggleConnectionType }) => {
  const [pingProgress, setPingProgress] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isPingActive) {
      if (!intervalRef.current) {
        intervalRef.current = setInterval(() => {
          setPingProgress((prev) => (prev >= 1 ? 0 : prev + 0.01));
        }, 16);
      }
    } else {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
      setPingProgress(0);
    }

    return () => {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    };
  }, [isPingActive]);

  if (!source || !target) return null;

  const x = source.x + (target.x - source.x) * pingProgress;
  const y = source.y + (target.y - source.y) * pingProgress;

  const strokeColor = type === 'lime' ? 'lime' : 'white';
  const strokeDasharray = type === 'solid' ? '0' : '5,5';

  return (
    <>
      {/* Clickable transparent line for easier hit target */}
      <line
        x1={source.x - 10}
        y1={source.y}
        x2={target.x - 10}
        y2={target.y}
        stroke="transparent"
        strokeWidth="20"
        onClick={toggleConnectionType}
        style={{ cursor: 'pointer' }}
        opacity={0.1}
      />
      {/* Visible line */}
      <line
        x1={source.x - 10}
        y1={source.y}
        x2={target.x - 10}
        y2={target.y}
        stroke={strokeColor}
        strokeWidth="2"
        strokeDasharray={strokeDasharray}
        onClick={toggleConnectionType}
        style={{ cursor: 'pointer' }}
        opacity={0.3}
      />
      {type}
      {isPingActive && (
        <circle cx={x - 10} cy={y} r={5} fill="#29FF86" />
      )}
    </>
  );
};

export default Edge;
