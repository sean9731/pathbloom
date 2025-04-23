import './Diagram.css';
import React, { useRef, useEffect, useState } from 'react';
import NodeComponent from './NodeComponent';
import TrashCan from './TrashCan';
import Edge from './Edge';
import ExportButtons from './ExportButtons';

const Diagram = ({
  elements,
  updateNodePosition,
  deleteNode,
  startEdge,
  selectedNodeId,
  setSelectedNodeId,
  clearSelection,
  isPingActive,
  togglePing,  
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
      // Reset to 0 if the edges array is empty
      setActivePingEdgeIndex((prev) => (prev + 1) % elements.edges.length || 0);
    }, 1500); 

    return () => clearInterval(interval);
  }, [isPingActive, elements.edges.length]);

  // Reset ping when nodes or edges are deleted
  useEffect(() => {
    if (elements.edges.length === 0) {
      setActivePingEdgeIndex(0);
    }
  }, [elements.edges]);


  return (
    <div
      id='contentdiv'
      ref={containerRef}
      onDragOver={(e) => e.preventDefault()}
      onClick={handleBlankClick}
      style={{

        width: '100%',
        position: 'relative',
        overflow: 'visible',
      }}
    >
      <div
          style={{
          position: 'absolute',
          top: '10px',
          left: '10px',
          fontSize: '35px',
          zIndex: 10,
          opacity: '20%',
        }}>

        Data Matrix, Inc.

      </div>
      <div
        style={{
          position: 'absolute',
          top: '10px',
          right: '20px',
          backgroundColor: '#343739',
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
        {elements.edges.length > 0 && (
        <button
          onClick={togglePing}
          style={{
            padding: '4px 10px',
            fontSize: '12px',
            borderRadius: '6px',
            cursor: 'pointer',
            background: '#757574',
            marginTop: '8px',
          }}
        >
          {isPingActive ? 'Stop Pings' : 'Start Pings'}
        </button>
        )}
      </div>

      {/* Edges */}
      <svg className='svg-content'
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
      <ExportButtons containerRef={containerRef} />

    </div>
  );
};

export default Diagram;
