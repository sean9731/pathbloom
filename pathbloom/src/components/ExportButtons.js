import React from 'react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

const ExportButtons = ({ containerRef }) => {


  const exportToJPG = () => {
    if (!containerRef.current) {
      console.error("Diagram container is not available.");
      return;
    }

    const container = containerRef.current;

    const containerWidth = container.scrollWidth;
    const containerHeight = container.scrollHeight;

    html2canvas(container, {
      scale: 2,
      width: containerWidth,
      height: containerHeight,
        useCORS: true,
      ignoreElements: (element) => {
        const shouldIgnore =
          element.classList?.contains('trash-can') || element.tagName === 'BUTTON';

        if (shouldIgnore) {
          console.log('Ignoring element in JPG export:', element);
        }

        return shouldIgnore;
      },
    }).then((canvas) => {
      const dataUrl = canvas.toDataURL('image/jpeg', 1.0);

      var today = new Date();
      var s = today.getSeconds()    
      var m = today.getMinutes()
      var h = today.getHours() 
      today = h%12 + '-' + m + '-' + s;
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download =`diagram_${today}.jpg`;
      link.click();
    });
  };


const exportToPDF = () => {
    if (!containerRef.current) {
      console.error("Diagram container is not available.");
      return;
    }
  
    const container = containerRef.current;
  
    html2canvas(container, {
      scale: 2,
      ignoreElements: (element) => {
        const shouldIgnore =
          element.classList?.contains('trash-can') || element.tagName === 'BUTTON' ||
          element.closest('.trash-can') || 
          element === container.querySelector('.trash-can');
  
        if (shouldIgnore) {
          console.log('Ignoring element in PDF export:', element);
        }
  
        return shouldIgnore;
      },
    }).then((canvas) => {
      const pdf = new jsPDF('landscape');  
      const imgData = canvas.toDataURL('image/png');
      
      const pageWidth = pdf.internal.pageSize.width;
      const pageHeight = pdf.internal.pageSize.height;
  
      // Image scaling: set width to fit within page width with some padding
      const imgWidth = pageWidth - 20; 
      const imgHeight = (canvas.height * imgWidth) / canvas.width; // Maintain aspect ratio
  
      // Check if the image height exceeds the page height
      if (imgHeight > pageHeight - 20) {  
     
        const imgHeight = pageHeight - 20;
        const imgWidth = (canvas.width * imgHeight) / canvas.height;
      }
  
      // Center the image horizontally
      const xOffset = (pageWidth - imgWidth) / 2;
      const yOffset = (pageHeight - imgHeight) / 2;

      
    
      pdf.addImage(imgData, 'PNG', xOffset,yOffset , imgWidth, imgHeight);  // Adding the image with new positioning and scaling
      var today = new Date();
      var s = today.getSeconds()    
      var m = today.getMinutes()
      var h = today.getHours() 
      today = h%12 + '-' + m + '-' + s;
      
      
      pdf.save(`diagram_${today}.pdf`);
    });
  };
  

  return (
    <div>
      <button
        onClick={exportToJPG}
        style={{
          padding: '5px 10px',
          backgroundColor: '#3e3c3c',
          marginRight: '5px',
          position: 'absolute',
          bottom: '20px',
          left: '20px',
          width: '70px',
          height: '70px',
          borderRadius: '16px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'white',
          fontWeight: 'bold',
          zIndex: 10,
          cursor: 'pointer',
        }}
      >
        Export to JPG
      </button>

      <button
        onClick={exportToPDF}
        style={{
          padding: '5px 10px',
          backgroundColor: '#3e3c3c',
          marginRight: '10px',
          position: 'absolute',
          bottom: '20px',
          left: '100px',
          width: '70px',
          height: '70px',
          borderRadius: '16px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'white',
          fontWeight: 'bold',
          zIndex: 10,
          cursor: 'pointer',
        }}
      >
        Export to PDF
      </button>
    </div>
  );
};

export default ExportButtons;
