import React, { useState } from 'react';

const NodeComponent = ({
  id,
  label,
  type,
  position,
  onDragEnd,
  onClick,
  containerWidth,
  containerHeight,
  src,
  isSelected,
}) => {
  const [nodePosition, setNodePosition] = useState(position);

  const handleDragStart = (e) => {
    e.dataTransfer.setData('nodeId', id); // Attach the node ID
  };

  const handleDragEnd = (e) => {
    e.preventDefault();

    const container = e.target.closest('.diagram-container');
    const containerRect = container.getBoundingClientRect();
    const nodeRect = e.target.getBoundingClientRect();

    const nodeWidth = nodeRect.width;
    const nodeHeight = nodeRect.height;

    let newX = e.clientX - containerRect.left - nodeWidth / 2;
    let newY = e.clientY - containerRect.top - nodeHeight / 2;

    // Prevent going out of bounds
    newX = Math.max(0, Math.min(newX, container.offsetWidth - nodeWidth));
    newY = Math.max(0, Math.min(newY, container.offsetHeight - nodeHeight));

    setNodePosition({ x: newX, y: newY });
    onDragEnd(id, { x: newX, y: newY });
  };

  const truncatedLabel = label.length > 20 ? `${label.slice(0, 20)}...` : label;

  return (
    <div
      className="test"
      id={id}
      style={{
        position: 'absolute',
        top: `${nodePosition.y}px`,
        left: `${nodePosition.x}px`,
        width: '80px',         
        height: '50px',
        cursor: 'move',
        borderRadius: '50px',
        border: isSelected ? '2px solid rgb(146, 155, 157)' : 'none',
        boxShadow: isSelected
          ? '0 0 12px #cccccc, 0 0 6px #cccccc'
          : '0 2px 8px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center', 
        textAlign: 'center',
        transition: 'all 0.1s ease-in-out',
        background: isSelected ? 'rgba(255,255,255,0.05)' : 'transparent',
        backdropFilter: 'blur(1px)',

      }}
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onClick={onClick}
    >
      <img
        src={src}
        alt={label}
        style={{
          width: 'auto',
          height: 'auto',
          maxHeight: '100%',
          maxWidth: '100%',
          objectFit: 'contain',
        }}
        draggable={false}
      />
      <div style={{ marginTop: '5px' }}>{truncatedLabel}</div>
    </div>
  );
};

export default NodeComponent;
