import React, { useState, useEffect } from 'react';

//TODO: Fix Note Function

const NodeNoteBox = ({ nodeId, note, updateNodeNote }) => {
  const [localNote, setLocalNote] = useState(note);

  // Update local state when note changes
  useEffect(() => {
    setLocalNote(note);
  }, [note]);

  const handleNoteChange = (e) => {
    const newNote = e.target.value;
    setLocalNote(newNote); // Update local state
  };

  const handleBlur = () => {
    console.log('Saving note:', localNote);
    // Update note in parent when input loses focus
    updateNodeNote(nodeId, localNote);
  };

  return (
    <div style={{ marginBottom: '10px' }}>
      <textarea
        value={localNote}
        onChange={handleNoteChange}
        onBlur={handleBlur} 
        placeholder="Add a note"
        rows="3"
        style={{
          width: '85%',
          padding: '10px',
          borderRadius: '5px',
          border: '1px solid #ccc',
          resize: 'none',
        }}
      />
    </div>
  );
};

export default NodeNoteBox;
