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
        border: '1px solid #ccc',
        borderRadius: '8px',
        width: '90%',
        margin: '0 auto',
        textAlign: 'center',
      }}
    >
      {element ? (
        <div>
          <h2>Selected Node Info</h2>
          <p><strong> {element.data.deviceType} {element.data.label}</strong></p>
          <p><strong>ID:</strong> {element.id}</p>
          <p><strong>Position:</strong> x: {Math.floor(element.position.x)}, y: {Math.floor(element.position.y)}</p>

          <img
            src={element.data.src}
            alt={element.data.label}
            style={{ width: '10%', height: 'auto', margin: '5px 0' }}
          />

          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <button
              onClick={handleDeleteConnections}
              style={{
                marginTop: '5px',
                padding: '3px 6px',
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
