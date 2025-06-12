// src/App.js
import React, { useState, useCallback } from 'react';
import Diagram from './components/Diagram';
import NetworkForm from './components/NetworkForm';
import './CreateLanding.css';
import { Link } from 'react-router-dom';

const CreateLanding = () => {
  const [elements, setElements] = useState(() => ({
    nodes: [
      {
        id: 'internet-node',
        data: {
          label: 'Internet',
          src: './icons/internet.png',
        },
        note: '',
        position: { x: 50, y: 50 },
      },
    ],
    edges: [],
    note: '',
  }));

  const [selectedNodeId, setSelectedNodeId] = useState(null);
  const [edgeStart, setEdgeStart] = useState(null);
  const [isPingActive, setIsPingActive] = useState(false);

  const addEdge = (sourceId, targetId) => {
    setElements((prev) => {
      const edgeExists = prev.edges.some(
        (edge) =>
          (edge.sourceId === sourceId && edge.targetId === targetId) ||
          (edge.sourceId === targetId && edge.targetId === sourceId)
      );
      if (edgeExists) {
        console.log('Edge already exists between these nodes.');
        return prev;
      }
      const newEdge = { sourceId, targetId };
      return {
        ...prev,
        edges: [...prev.edges, newEdge],
      };
    });
  };

  const startEdge = (nodeId) => {
    if (!edgeStart) {
      setEdgeStart(nodeId);
      setSelectedNodeId(nodeId);
    } else {
      if (edgeStart !== nodeId) {
        addEdge(edgeStart, nodeId);
      }
      setEdgeStart(null);
      setSelectedNodeId(null);
    }
  };

  const getElement = useCallback(() => {
    return elements.nodes.find((node) => node.id === selectedNodeId) || null;
  }, [elements.nodes, selectedNodeId]);

  const addElement = (newElement) => {
    setElements((prev) => ({
      ...prev,
      nodes: [...prev.nodes, newElement],
    }));
  };

  const updateNodePosition = (id, newPosition) => {
    setElements((prev) => ({
      ...prev,
      nodes: prev.nodes.map((node) =>
        node.id === id ? { ...node, position: newPosition } : node
      ),
    }));
  };

  const deleteNode = (id) => {
    setElements((prev) => ({
      ...prev,
      nodes: prev.nodes.filter((node) => node.id !== id),
      edges: prev.edges.filter(
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

  const togglePing = () => {
    setIsPingActive((prev) => !prev);
  };

  const updateNodeNote = (id, newNote) => {
    setElements((prev) => ({
      ...prev,
      nodes: prev.nodes.map((node) =>
        node.id === id ? { ...node, note: newNote } : node
      ),
    }));
  };

  const saveDiagram = async () => {
    const diagramData = {
      nodes: elements.nodes,
      edges: elements.edges,
    };

    const blob = new Blob([JSON.stringify(diagramData, null, 2)], {
      type: 'application/json',
    });

    if (window.showSaveFilePicker) {
      try {
        const fileHandle = await window.showSaveFilePicker({
          suggestedName: 'diagram.json',
          types: [
            {
              description: 'JSON Files',
              accept: { 'application/json': ['.json'] },
            },
          ],
        });
        const writable = await fileHandle.createWritable();
        await writable.write(blob);
        await writable.close();
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.error('Save failed:', error);
        }
      }
    } else {
      const filename = prompt('Enter a name for your diagram:', 'diagram');
      if (!filename) return;
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `${filename}.json`;
      link.click();
    }
  };

const uploadDiagram = (event) => {
  const file = event.target.files[0];
  if (file && file.type === 'application/json') {
    const reader = new FileReader();
    reader.onload = () => {
      const diagramData = JSON.parse(reader.result);
      console.log('Uploaded nodes:', diagramData.nodes);

      const internetNodeFromUpload = diagramData.nodes.find(
        (node) => node.id === 'internet-node'
      );

      const otherNodes = diagramData.nodes.filter(
        (node) => node.id !== 'internet-node'
      );

      const internetNode = internetNodeFromUpload
        ? {
            ...internetNodeFromUpload,
            position: internetNodeFromUpload.position || { x: 50, y: 50 },
          }
        : {
            id: 'internet-node',
            data: {
              label: 'Internet',
              src: './icons/internet.png',
            },
            note: '',
            position: { x: 50, y: 50 },
          };

      setElements({
        nodes: [internetNode, ...otherNodes],
        edges: diagramData.edges,
        note: diagramData.note || '',
      });
      

    };
    reader.readAsText(file);
  } else {
    alert('Please upload a valid diagram JSON file.');
  }
};

const setRename = (nodeId, newLabel) => {
  setElements((prev) => ({
    ...prev,
    nodes: prev.nodes.map((node) =>
      node.id === nodeId
        ? {
            ...node,
            data: {
              ...node.data,
              label: newLabel,
            },
          }
        : node
    ),
  }));
};

  return (
    <div className="App">
      <div className="headercontainer">
        <h1>PathBloom Network Diagram</h1>

        <div className="header-buttons-left">
          <button className="save-button" onClick={saveDiagram}>
            Save Diagram
          </button>
          <input
            className="upload-button"
            type="file"
            accept=".json"
            onChange={uploadDiagram}
          />
        </div>
        <div className="header-buttons">
          <Link to="/login" className="header-button">
            Login
          </Link>
          <Link to="/register" className="header-button">
            Register
          </Link>
        </div>
      </div>
      <div className="content-container">
        <div className="network-form-container">
          <NetworkForm
            addElement={addElement}
            getElement={getElement}
            deleteConnections={deleteConnections}
            setRename={setRename}
            updateNodeNote={updateNodeNote}
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
            setElements={setElements}
          />
        </div>
      </div>
    </div>
  );
};

export default CreateLanding;
