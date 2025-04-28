import React, { useState, useEffect, useRef } from 'react';
const BoxComponent = ({ id, position, size, onDrag, onResize, style }) => {
    const [dragging, setDragging] = useState(false);
    const [resizing, setResizing] = useState(false);
    const [dragStart, setDragStart] = useState({ mouseX: 0, mouseY: 0, boxX: 0, boxY: 0 });
    const [resizeStart, setResizeStart] = useState({ mouseX: 0, mouseY: 0, width: 0, height: 0 });
  
    const handleMouseDown = (e) => {
      if (resizing) return; // don't allow dragging if resizing
      setDragging(true);
      setDragStart({
        mouseX: e.clientX,
        mouseY: e.clientY,
        boxX: position.x,
        boxY: position.y,
      });
      e.stopPropagation();
      e.preventDefault();
    };
  
    const handleResizeMouseDown = (e) => {
      e.stopPropagation();
      setResizing(true);
      setResizeStart({
        mouseX: e.clientX,
        mouseY: e.clientY,
        width: size.width,
        height: size.height,
      });
      e.preventDefault();
    };
  
    const handleMouseMove = (e) => {
      if (dragging) {
        const dx = e.clientX - dragStart.mouseX;
        const dy = e.clientY - dragStart.mouseY;
        onDrag(id, { x: dragStart.boxX + dx, y: dragStart.boxY + dy });
      } else if (resizing) {
        const dx = e.clientX - resizeStart.mouseX;
        const dy = e.clientY - resizeStart.mouseY;
        const newWidth = Math.max(20, resizeStart.width + dx);  // minimum size 20
        const newHeight = Math.max(20, resizeStart.height + dy);
        onResize(id, { width: newWidth, height: newHeight });
      }
    };
  
    const handleMouseUp = () => {
      setDragging(false);
      setResizing(false);
    };
  
    useEffect(() => {
      if (dragging || resizing) {
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
      } else {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      }
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }, [dragging, resizing, dragStart, resizeStart]);
  
    return (
      <div
        style={{
          width: size.width,
          height: size.height,
          position: 'absolute',
          top: position.y,
          left: position.x,
          backgroundColor: 'transparent',
          border: '2px solid rgb(136, 136, 136)',
          cursor: dragging ? 'grabbing' : 'grab',
          zIndex: 1,
          ...style,
        }}
        onMouseDown={handleMouseDown}
      >
        {/* Resize handle */}
        <div
          style={{
            width: '12px',
            height: '12px',
            backgroundColor: 'rgb(85, 85, 85)',
            position: 'absolute',
            right: 0,
            bottom: 0,
            cursor: 'se-resize',
          }}
          onMouseDown={handleResizeMouseDown}
        />
      </div>
    );
  };
  

export default BoxComponent;
