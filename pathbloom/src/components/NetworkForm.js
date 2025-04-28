import React, { useState, useEffect } from 'react';
import BuildingDialog from './BuildingDialog';
import { createPortal } from 'react-dom';

const NetworkForm = ({ addElement, getElement, deleteConnections }) => {
  const [deviceType, setDeviceType] = useState('');
  const [nodeName, setNodeName] = useState('');
  const [customNodeName, setCustomNodeName] = useState('');
  const [showCustomOverlay, setShowCustomOverlay] = useState(false);
  const [showCustomErrorOverlay, setShowCustomErrorOverlay] =useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [file, setFile] = useState(null);

  // Handle the image file upload and preview
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === 'image/png') {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
        setFile(selectedFile);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      alert('Please upload a valid PNG file.');
    }
  };

  useEffect(() => {
    if (deviceType === 'Custom') {
      handleCustom();
    }
  }, [deviceType]);

  const iconMap = {
    building: './icons/building.png',
    router: './icons/router.png',
    switch: './icons/switch.png',
    firewall: './icons/firewall.png',
    accessPoint: './icons/access-point.png',
    workstation: './icons/workstation.png',
    server: './icons/server.png',
    modem: './icons/modem.png',
    cloud: './icons/cloud.png',
    folder: './icons/folder.png',
  };

  const handleCustom = () => {
    setShowCustomOverlay(true);
  };

  const handleAddNode = () => {
    
    if (deviceType === 'Custom' && customNodeName && previewUrl) {
      const newNode = {
        id: `node-${Date.now()}`,
        data: {
          deviceType: ` ${deviceType}`,
          label: ` ${customNodeName}`,
          src: previewUrl, 
        },
        position: { x: Math.random() * 500, y: Math.random() * 500 },
      };
      addElement(newNode);
      setShowCustomOverlay(false);
      setCustomNodeName('');
      setPreviewUrl(null); 
      setDeviceType(''); 
      setShowCustomErrorOverlay(false);
    } else if (nodeName && deviceType) {
      // Handle default node
      const newNode = {
        id: `node-${Date.now()}`,
        data: {
          deviceType: ` ${deviceType}`,
          label: ` ${nodeName}`,
          src: iconMap[deviceType.toLowerCase()], 
        },
        position: { x: Math.random() * 500, y: Math.random() * 500 },
      };
      addElement(newNode);
      setNodeName(''); 
      setDeviceType(''); 
      
      //Handle incomplete custom input
    } else if(!customNodeName || !previewUrl){
      setShowCustomErrorOverlay(true);
    }
  };

  return (
    <div style={{ marginBottom: '20px', fontFamily: 'Arial, sans-serif' }}>
      <div className='left-container'>
        <h3 style={{ fontWeight: '600', color: 'rgb(233 233 233)' }}>Create Network Elements</h3>


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
            <option value="Modem">Modem</option>
            <option value="Folder">Shared Folder</option>
            <option value="Cloud">Cloud</option>
            <option value="Custom">Custom...</option>
          </select>
        </div>

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
          >
            Add Device
          </button>
        </div>


        <div className='building-dialog'>
          <BuildingDialog getElement={getElement} deleteConnections={deleteConnections} />
        </div>
      </div>

      {/* Custom Device Overlay */}
      {showCustomOverlay &&
        createPortal(
          <div className="overlay">
            <div className="middle-box">
              <h3>Enter Custom Device Type</h3>
              <input
                type="text"
                value={customNodeName}
                onChange={(e) => setCustomNodeName(e.target.value)}
                placeholder="Custom device name"
              />
              <br />
              <br />
              <div style={{ textAlign: 'center' }}>
                <h3>Upload a PNG Icon</h3>
                <input type="file" accept="image/png" onChange={handleFileChange} />
                {previewUrl && (
                  <div style={{ marginTop: '20px' }}>
                    <p>Preview:</p>
                    <img src={previewUrl} alt="Preview" style={{ width: '100px', height: 'auto' }} />
                  </div>
                )}
              </div>
              <button onClick={() => setShowCustomOverlay(false)}>Close</button>
              <button onClick={handleAddNode}>Save</button>
              {showCustomErrorOverlay &&
                <p>Please add a valid PNG and Name.</p>
              }
            </div>
          </div>,
          document.body 
        )}
    </div>
  );
};

export default NetworkForm;
