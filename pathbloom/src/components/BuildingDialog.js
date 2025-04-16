import React from 'react';

const BuildingDialog = ({ getElement, deleteConnections }) => {
  const element = getElement?.();

  const handleDeleteConnections = () => {
    if (element) {
      deleteConnections(element.id);
    }
  };

  return (
    <div
      className="dialog"
      style={{
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        width: '280px',
        margin: '0 auto',
        textAlign: 'center',
      }}
    >
      {element ? (
        <div>
          <h2>Selected Node Info</h2>
          <p><strong>Label:</strong> {element.data.label}</p>
          <p><strong>ID:</strong> {element.id}</p>
          <p><strong>Position:</strong> x: {element.position.x}, y: {element.position.y}</p>

          <img
            src={element.data.src}
            alt={element.data.label}
            style={{ width: '100px', height: 'auto', margin: '12px 0' }}
          />

          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <button
              onClick={handleDeleteConnections}
              style={{
                marginTop: '10px',
                padding: '6px 12px',
                borderRadius: '6px',
                backgroundColor: '#ff4d4f',
                color: '#fff',
                border: 'none',
                cursor: 'pointer',
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
