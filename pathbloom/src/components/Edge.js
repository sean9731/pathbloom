import React, { useState, useEffect, useRef } from 'react';

const Edge = ({ source, target, isPingActive }) => {
  const [isSolid, setIsSolid] = useState(true);
  const [pingProgress, setPingProgress] = useState(0);
  const intervalRef = useRef(null);

  const handleLineClick = () => {
    setIsSolid((prev) => !prev);
  };
  // Animate ping based on isPingActive
  useEffect(() => {

    if (isPingActive) {
      if (!intervalRef.current) {
        intervalRef.current = setInterval(() => {
          setPingProgress((prev) => (prev >= 1 ? 0 : prev + 0.01));
        }, 16); // ~60fps
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

  return (
    <>
      {/* Click hitbox */}
      <line
        x1={source.x}
        y1={source.y}
        x2={target.x}
        y2={target.y}
        stroke="transparent"
        strokeWidth="20"
        onClick={handleLineClick}
        style={{ cursor: 'pointer' }}
        opacity={0.2}
      />

      {/* Actual edge line */}
      <line
        x1={source.x}
        y1={source.y}
        x2={target.x}
        y2={target.y}
        stroke="black"
        strokeWidth="2"
        strokeDasharray={isSolid ? '0' : '5,5'}
        onClick={handleLineClick}
        style={{ cursor: 'pointer' }}
        opacity={.4}
      />

      {/* Ping animation dot */}
      {<circle cx={x} cy={y} r={5} fill="green" />}
    </>
  );
};

export default Edge;
