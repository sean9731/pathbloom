// src/components/Diagram.js
import React, { useRef, useEffect, useState } from 'react';
import NodeComponent from './NodeComponent';
import TrashCan from './TrashCan';
import Edge from './Edge';

const Diagram = ({
  elements,
  updateNodePosition,
  deleteNode,
  startEdge,
  selectedNodeId,
  setSelectedNodeId,
  clearSelection,
  isPingActive,
  togglePing, // ✅ Make sure this is passed from App
}) => {
  const containerRef = useRef(null);

  const containerWidth = containerRef.current?.offsetWidth || 0;
  const containerHeight = containerRef.current?.offsetHeight || 0;

  const getNodeById = (id) => elements.nodes.find((node) => node.id === id);

  const handleBlankClick = (e) => {
    const tag = e.target.tagName;
    if (tag === 'DIV' || tag === 'svg' || tag === 'line') {
      clearSelection();
    }
  };

  // Track current edge to animate ping on
  const [activePingEdgeIndex, setActivePingEdgeIndex] = useState(0);

  useEffect(() => {
    if (!isPingActive) return;

    const interval = setInterval(() => {
      setActivePingEdgeIndex((prev) => (prev + 1) % elements.edges.length);
    }, 1500); // Cycle pings every 1.5s

    return () => clearInterval(interval);
  }, [isPingActive, elements.edges.length]);

  return (
    <div
      ref={containerRef}
      onDragOver={(e) => e.preventDefault()}
      onClick={handleBlankClick}
      style={{
        height: '600px',
        width: '100%',
        position: 'relative',
        border: '1px solid #ddd',
        background: '#f0f8ff',
        overflow: 'hidden',
      }}
    >
      {/* Legend and toggle */}
      <div
        style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          backgroundColor: 'white',
          padding: '8px 12px',
          borderRadius: '8px',
          boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
          fontSize: '14px',
          zIndex: 10,
        }}
      >
        <strong>Lines:</strong> <br />
        Solid = Wired Connection <br />
        Dotted = Wireless Connection
        <br />
        <br />
        <button
          onClick={togglePing}
          style={{
            padding: '4px 10px',
            fontSize: '12px',
            borderRadius: '6px',
            border: '1px solid #aaa',
            cursor: 'pointer',
            background: '#f8f8f8',
            marginTop: '8px',
          }}
        >
          {isPingActive ? 'Stop Pings' : 'Start Pings'}
        </button>
      </div>

      {/* Edges */}
      <svg
        width="100%"
        height="100%"
        style={{ position: 'absolute', top: 0, left: 0, zIndex: 0 }}
      >
        {elements.edges.map((edge, index) => {
          const source = getNodeById(edge.sourceId)?.position;
          const target = getNodeById(edge.targetId)?.position;
          if (!source || !target) return null;

          return (
            <Edge
              key={index}
              source={{ x: source.x + 50, y: source.y + 25 }}
              target={{ x: target.x + 50, y: target.y + 25 }}
              isPingActive={isPingActive && index === activePingEdgeIndex}
            />
          );
        })}
      </svg>

      {/* Nodes */}
      {elements.nodes.map((node) => (
        <NodeComponent
          key={node.id}
          id={node.id}
          label={node.data.label}
          src={node.data.src}
          position={node.position}
          onDragEnd={updateNodePosition}
          containerWidth={containerWidth}
          containerHeight={containerHeight}
          draggable={false}
          onClick={() => {
            startEdge(node.id);
            setSelectedNodeId(node.id);
          }}
          isSelected={selectedNodeId === node.id}
        />
      ))}

      {/* Trash can */}
      <TrashCan onDrop={deleteNode} />
    </div>
  );
};

export default Diagram;
