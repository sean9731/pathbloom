import React from 'react';
import NodeNoteBox from './NodeNoteBox';
import { useState,useEffect } from 'react';

const BuildingDialog = ({ getElement, deleteConnections, updateNodeNote, setRename }) => {
  const element = getElement?.();
  const [newName, setNewName] = useState();


  const handleDeleteConnections = () => {
    if (element) {
      deleteConnections(element.id);
    }
  };

  const handleRename = () => {
    if (element && newName?.trim()) {
      setRename(element.id, newName.trim());
      setNewName('');
    }
  };

  const truncatedLabel =
    element?.data?.label?.length > 70
      ? `${element.data.label.slice(0, 70)}...`
      : element?.data?.label;

   const [note, setNote] = useState(element?.note || '');

  useEffect(() => {
    if (element) {
      setNote(element.note);
    }
  }, [element]); 


  return (
    <div className="dialog">
      {element ? (
        <div style={{color: '#fff', margin:'0px'}}>
          <h2 style={{color: '#fff', margin:'0px'}}>Selected Node Info</h2>
          <p style={{margin: "5px"}}>
            <strong>{element.data.deviceType}: </strong>
            {truncatedLabel}
          </p>
          <div style={{width: 'auto', height: '50px', paddingBottom: '2px'}}>
            <img
            src={element.data.src}
            alt={element.data.label}
            style={{height:'100%', overflow: 'hidden'}}
          />
          </div>
          <NodeNoteBox
            nodeId={element.id}
            note={note} 
            updateNodeNote={updateNodeNote}
          />

            <input
              type="text"
              value={newName || ''}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Enter new name"
              style={{ marginBottom: '5px', width: '85%', borderRadius: '5px', border: 'none',padding: "5px" }}
            />
            <div style={{ display: 'flex', justifyContent:'space-around', paddingTop: '5px',}}>
            <button  style={{width:'30%' }}onClick={handleRename}>
              Rename
            </button>
         
            <button
              onClick={handleDeleteConnections}
              style={{
                paddingBottom: '5px', 
                backgroundColor: '#ff4d4f',
                border: 'none',
                width:'30%' 
              }}
            >
              Delete Connections
            </button>
          </div>
        </div>
      ) : (
        <p>No node selected.</p>
      )}
    </div>
  );
};


export default BuildingDialog;
