import './Diagram.css';
import React, { useRef, useEffect, useState } from 'react';
import NodeComponent from './NodeComponent';
import TrashCan from './TrashCan';
import Edge from './Edge';
import ExportButtons from './ExportButtons';
import BoxComponent from './BoxComponent';

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

  const [boxes, setBoxes] = useState([]);

  // Add new box
  const addBox = () => {
    setBoxes((prev) => [
      ...prev,
      {
        id: Date.now(), // Unique ID using timestamp
        position: { x: 100, y: 100 }, // Initial position of the box
        size: { width: 100, height: 100 }, // Initial size of the box
      },
    ]);
  };
  
  // Update position of the box
  const updateBoxPosition = (id, newPosition) => {
    setBoxes((prev) =>
      prev.map((box) =>
        box.id === id ? { ...box, position: newPosition } : box
      )
    );
  };
  
  // Update size of the box
  const updateBoxSize = (id, newSize) => {
    setBoxes((prev) =>
      prev.map((box) =>
        box.id === id ? { ...box, size: newSize } : box
      )
    );
  };

  const deleteBox = (id) => {
    setBoxes((prev) => prev.filter((box) => box.id !== id));
  };

  const handleDropOnTrash = (id) => {
    // Check if the ID belongs to a node or a box
    const isNode = elements.nodes.some((node) => node.id === id);
    const isBox = boxes.some((box) => box.id === id);
  
    if (isNode) {
      deleteNode(id);
    } else if (isBox) {
      console.log("delete box")
      deleteBox(id);
    }
  };


 return (
  <div
    id="contentdiv"
    ref={containerRef}
    onDragOver={(e) => e.preventDefault()}
    onClick={handleBlankClick}
    style={{
      width: '100%',
      position: 'relative',
      overflow: 'visible',
      backgroundColor:'#747474'
    }}
  >
    <div
      style={{
        position: 'absolute',
        top: '10px',
        left: '10px',
        fontSize: '35px',
        opacity: '20%',
      }}
    >
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

{/* Edges (on top of boxes, but below nodes) */}
<svg
  className="svg-content"
  width="100%"
  height="100%"
  style={{
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1, 
  }}
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

{/* Nodes (on top of edges but still below the boxes) */}
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
    style={{
      position: 'absolute',
      zIndex: 3, // Nodes are above the edges but still below the boxes
    }}
  />
))}

{/* Boxes (on the bottom layer, draggable) */}
{boxes.map((box) => (
  <BoxComponent
    key={box.id}
    id={box.id}
    position={box.position}
    size={box.size}
    onDrag={updateBoxPosition}
    onResize={updateBoxSize}
    style={{
      position: 'absolute',
      zIndex: 1, 
      pointerEvents: 'auto', 
    }}
  />
))}

    <button
      onClick={addBox}
      style={{
        position: 'absolute',
        bottom: '20px',
        right: '15%',
        padding: '8px 12px',
        backgroundColor: 'rgb(62, 60, 60)',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        zIndex: 5, 
      }}
    >
      + Add Box
    </button>

    {/* Trash can */}
    <TrashCan onDrop={handleDropOnTrash} />
    <ExportButtons containerRef={containerRef} />
  </div>
);

};

export default Diagram;
