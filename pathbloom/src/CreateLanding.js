// src/App.js
import React, { useState, useEffect } from 'react'; // ✅ Added useEffect
import Diagram from './components/Diagram';
import NetworkForm from './components/NetworkForm';
import './CreateLanding.css';

const CreateLanding = () => {
  const [elements, setElements] = useState({
    nodes: [],
    edges: [], 
  });

  const [selectedNodeId, setSelectedNodeId] = useState(null);
  const [edgeStart, setEdgeStart] = useState(null);

  // Add Internet node once on load
  useEffect(() => {
    setElements((prev) => {
      const hasInternet = prev.nodes.some((node) => node.id === 'internet-node');
      if (hasInternet) return prev;

      return {
        ...prev,
        nodes: [
          ...prev.nodes,
          {
            id: 'internet-node',
            data: {
              label: 'Internet',
              src: './icons/internet.png',
            },
            position: { x: 50, y: 50 },
          },
        ],
      };
    });
  }, []);

  const addEdge = (sourceId, targetId) => {
    setElements((prev) => ({
      ...prev,
      edges: [...prev.edges, { sourceId, targetId }],
    }));
  };

  const startEdge = (nodeId) => {
    if (!edgeStart) {
      setEdgeStart(nodeId);
      setSelectedNodeId(nodeId); // Select node on first click
    } else {
      if (edgeStart !== nodeId) {
        addEdge(edgeStart, nodeId); // Connect nodes
      }
      setEdgeStart(null);
      setSelectedNodeId(null); // Clear selection after edge creation
    }
  };

  const getElement = () => {
    return elements.nodes.find((node) => node.id === selectedNodeId) || null;
  };

  const addElement = (newElement) => {
    setElements((prevElements) => ({
      ...prevElements, 
      nodes: [...prevElements.nodes, newElement],
    }));
  };

  const updateNodePosition = (id, newPosition) => {
    setElements((prevElements) => ({
      ...prevElements, 
      nodes: prevElements.nodes.map((node) =>
        node.id === id ? { ...node, position: newPosition } : node
      ),
    }));
  };

  const deleteNode = (id) => {
    setElements((prevElements) => ({
      ...prevElements,
      nodes: prevElements.nodes.filter((node) => node.id !== id),
      edges: prevElements.edges.filter(
        (edge) => edge.sourceId !== id && edge.targetId !== id
      ),
    }));
  };

  const deleteConnections = (nodeId) => {
    setElements((prev) => ({
      ...prev,
      edges: prev.edges.filter(
        (edge) => edge.sourceId !== nodeId && edge.targetId !== nodeId
      ),
    }));
  };

  const clearSelection = () => {
    setEdgeStart(null);
    setSelectedNodeId(null);
  };

  const [isPingActive, setIsPingActive] = useState(false);

  const togglePing = () => {
    setIsPingActive((prev) => !prev);
  };

  return (
    <div className="App">
      <h1>PathBloom Network Diagram</h1>

      <div className="content-container">
        <div className="network-form-container">
          <NetworkForm 
            addElement={addElement}
            getElement={getElement}
            deleteConnections={deleteConnections}
          />
        </div>
        <div className="diagram-container">
          <Diagram 
            elements={elements} 
            updateNodePosition={updateNodePosition}  
            deleteNode={deleteNode}
            deleteConnections={deleteConnections}
            startEdge={startEdge}
            selectedNodeId={selectedNodeId}
            setSelectedNodeId={setSelectedNodeId}
            clearSelection={clearSelection}
            isPingActive={isPingActive}
            togglePing={togglePing} 
          />
        </div>
      </div>
    </div>
  );
};

export default CreateLanding;
