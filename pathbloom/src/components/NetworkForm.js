import React, { useState } from 'react';
import BuildingDialog from './BuildingDialog';

const NetworkForm = ({ addElement, getElement, deleteConnections }) => {
  const [deviceType, setDeviceType] = useState('');
  const [nodeName, setNodeName] = useState('');

  // Corrected paths to icons
  const iconMap = {
    building: './icons/building.png',
    router: './icons/router.png',
    switch: './icons/switch.png',
    firewall: './icons/firewall.png',
    accessPoint: './icons/access-point.png',
    workstation: './icons/workstation.png',
    server: './icons/server.png',
  };

  // Handle adding a new node
  const handleAddNode = () => {
    if (!nodeName || !deviceType) return; // Ensure both name and type are selected

    const newNode = {
      id: `node-${Date.now()}`,
      data: {
        deviceType: ` ${deviceType}`,
        label: ` ${nodeName}`,
        src: iconMap[deviceType.toLowerCase()], // Use lowercase to match keys in iconMap
      },
      position: { x: Math.random() * 500, y: Math.random() * 500 },
    };
    addElement(newNode);
    setNodeName('');
    setDeviceType(''); // Reset device type after adding
  };

  return (
    <div style={{ marginBottom: '20px', fontFamily: 'Arial, sans-serif' }}>
      <div className='left-container'>
        <h3 style={{ fontWeight: '600', color: 'rgb(233 233 233)' }}>Create Network Elements</h3>

        {/* Dropdown to select device type */}
        <div style={{ marginBottom: '15px' }}>
          <label style={{ fontWeight: '500', marginBottom: '5px', display: 'block' }}>Device Type:</label>
          <select
            value={deviceType}
            onChange={(e) => setDeviceType(e.target.value)}
            style={{
              width: '80%',
              padding: '10px',
              borderRadius: '8px',
              border: '1px solid #ccc',
              fontSize: '14px',
              color: '#555',
              transition: 'border-color 0.3s ease',
            }}
            onFocus={(e) => (e.target.style.borderColor = '#4CAF50')}
            onBlur={(e) => (e.target.style.borderColor = '#ccc')}
          >
            <option value="">Select Device Type</option>
            <option value="Building">Building</option>
            <option value="Router">Router</option>
            <option value="Switch">Switch</option>
            <option value="Firewall">Firewall</option>
            <option value="Workstation">Workstation</option>
            <option value="Server">Server</option>
            <option value="AccessPoint">Access Point</option>
          </select>
        </div>

        {/* Input for the name of the node */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ fontWeight: '500', marginBottom: '5px', display: 'block' }}>Device Name:</label>
          <input
            style={{
              width: '80%',
              padding: '10px',
              borderRadius: '8px',
              border: '1px solid #ccc',
              fontSize: '14px',
              color: '#555',
              transition: 'border-color 0.3s ease',
            }}
            type="text"
            value={nodeName}
            onChange={(e) => setNodeName(e.target.value)}
            onFocus={(e) => (e.target.style.borderColor = '#4CAF50')}
            onBlur={(e) => (e.target.style.borderColor = '#ccc')}
          />
        </div>

        {/* Add Device Button */}
        <div>
          <button
            onClick={handleAddNode}
            style={{
              padding: '12px 20px',
              marginBottom: '10px',
              backgroundColor: '#3e3c3c',
              color: 'white',
              borderRadius: '5px',
              border: 'none',
              fontSize: '16px',
              cursor: 'pointer',
              transition: 'background-color 0.3s ease',
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = '#45a049')}
            onMouseOut={(e) => (e.target.style.backgroundColor = '#4CAF50')}
          >
            Add Device
          </button>
        </div>

        {/* Building Dialog */}
        <div className='building-dialog'>
          <BuildingDialog
            getElement={getElement}
            deleteConnections={deleteConnections}
          />
        </div>
      </div>
    </div>
  );
};

export default NetworkForm;
