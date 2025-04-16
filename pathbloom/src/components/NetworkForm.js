import React, { useState } from 'react';
import BuildingDialog from './BuildingDialog';

const NetworkForm = ({ addElement,getElement,deleteConnections }) => {
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
    server: './icons/server.png'
  };

  // Handle adding a new node
  const handleAddNode = () => {
    if (!nodeName || !deviceType) return; // Ensure both name and type are selected

    const newNode = {
      id: `node-${Date.now()}`,
      data: {
        label: `${deviceType}: ${nodeName}`,
        src: iconMap[deviceType.toLowerCase()], // Use lowercase to match keys in iconMap
      },
      position: { x: Math.random() * 500, y: Math.random() * 500 },
    };
    addElement(newNode);
    setNodeName('');
    setDeviceType(''); // Reset device type after adding
  };

  return (
    <div style={{ marginBottom: '20px' }}>
      <div className='left-container'>
        <h3>Create Network Elements</h3>
        
        {/* Dropdown to select device type */}
        <div>
          <label>Device Type:</label>
          <select
            value={deviceType}
            onChange={(e) => setDeviceType(e.target.value)}
          >
            <option value="">Select Device Type</option> {/* Added placeholder option */}
            <option value="building">Building</option>
            <option value="router">Router</option>
            <option value="switch">Switch</option>
            <option value="firewall">Firewall</option>
            <option value="workstation">Workstation</option>
            <option value="Server">Server</option>
            <option value="accessPoint">Access Point</option>
          </select>
        </div>
        
        {/* Input for the name of the node */}
        <div>
          <label>Device Name:</label>
          <input
            type="text"
            value={nodeName}
            onChange={(e) => setNodeName(e.target.value)}
          />
          <button onClick={handleAddNode}>Add Device</button>
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
