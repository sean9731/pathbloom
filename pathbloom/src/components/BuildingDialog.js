import React from 'react';


const BuildingDialog = ({ getElement, deleteConnections }) => {
  const element = getElement?.();

  const handleDeleteConnections = () => {
    if (element) {
      deleteConnections(element.id);
    }
  };

  const truncatedLabel =
  element?.data?.label?.length > 70
    ? `${element.data.label.slice(0, 70)}...`
    : element?.data?.label;


  return (
    <div
      className="dialog"
      style={{
        border: '1px solid #ccc',
        borderRadius: '8px',
        width: '90%',
        margin: '0 auto',
        textAlign: 'center',
        maxWidth: '300px'
      }}
    >
      {element ? (
        <div>
          <h2>Selected Node Info</h2>
          <p
          style={{ 
            wordWrap: 'break-word',
            overflowWrap: 'break-word',
            maxWidth: '100%',
            padding: '0 10px',}}
          ><strong> {element.data.deviceType} {truncatedLabel}</strong></p>
          <p><strong>Position:</strong> x: {Math.floor(element.position.x)}, y: {Math.floor(element.position.y)}</p>

          <img
            src={element.data.src}
            alt={element.data.label}
            style={{ width: '20%', height: 'auto', margin: '5px 0', overflow: 'hidden'}}
          />

          <div style={{ display: 'flex', justifyContent: 'center', paddingBottom: '5px' }}>
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
