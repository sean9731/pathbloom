// src/TrashCan.js
import React, { useState } from 'react';

const TrashCan = ({ onDrop }) => {
  const [isHovering, setIsHovering] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsHovering(true);
  };

  const handleDragLeave = () => {
    setIsHovering(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const nodeId = e.dataTransfer.getData('nodeId');
    if(!nodeId){
        return
    }

    onDrop(nodeId);
    setIsHovering(false);
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      style={{
        position: 'absolute',
        bottom: '20px',
        right: '20px',
        width: '80px',
        height: '80px',
        backgroundColor: isHovering ? '#ff3333' : '#ff6666',
        borderRadius: '16px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        fontWeight: 'bold',
        fontSize: '32px',
        boxShadow: isHovering
          ? '0 0 20px 5px rgba(255, 0, 0, 0.5)'
          : '0 0 10px rgba(0,0,0,0.2)',
        transform: isHovering ? 'scale(1.1)' : 'scale(1)',
        transition: 'all 0.2s ease-in-out',
        zIndex: 10,
        cursor: 'pointer',
      }}
    >
      🗑️
    </div>
  );
};

export default TrashCan;
