// src/NodeComponent.js
import React, { useState } from 'react';
import TrashCan from './TrashCan'

const NodeComponent = ({ id, label, position, onDragEnd,  onClick, containerWidth, containerHeight, src, isSelected }) => {
  const [nodePosition, setNodePosition] = useState(position);


  const handleDragStart = (e) => {
    e.dataTransfer.setData('nodeId', id); // Attach the node ID
  };

  const handleDragEnd = (e) => {
    e.preventDefault();

    const containerRect = e.target.closest('.diagram-container').getBoundingClientRect();

    let newX = e.clientX - containerRect.left - 50;
    let newY = e.clientY - containerRect.top - 25;

    if (newX < 0) newX = 0;

    if (newY < 0) newY = 0;


    setNodePosition({ x: newX, y: newY });
    onDragEnd(id, { x: newX, y: newY });
  };

  return (
    <div
      id={id}
      style={{
        position: 'absolute',
        top: `${nodePosition.y}px`,
        left: `${nodePosition.x}px`,
        width: '100px',
        height: '50px',
        cursor: 'move',
        border: isSelected ? '3px solid blue' : 'none',
        borderRadius: '8px',
        boxShadow: isSelected ? '0 0 10px rgba(0, 0, 255, 0.5)' : 'none',

      }}
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onClick={onClick}
    >

      <img
        src={src}
        alt={label}
        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
        draggable={false} 
      
      />
           
            {label}


    </div>
  );
};

export default NodeComponent;
