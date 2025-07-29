import React, { useEffect, useRef } from 'react';
import JsBarcode from 'jsbarcode';

const BarcodeGenerator = ({ value, format = 'CODE128', width = 2, height = 100 }) => {
  const barcodeRef = useRef(null);

  useEffect(() => {
    if (barcodeRef.current && value) {
      try {
        JsBarcode(barcodeRef.current, value, {
          format: format,
          width: width,
          height: height,
          displayValue: false, // Hide the text below barcode
          fontSize: 14,
          margin: 0, // No margin for clean look
          background: '#ffffff',
          lineColor: '#000000',
          marginTop: 0,
          marginBottom: 0,
          marginLeft: 0,
          marginRight: 0,
        });
      } catch (error) {
        console.error('Error generating barcode:', error);
      }
    }
  }, [value, format, width, height]);

  return (
    <div className="barcode-container" style={{ 
      display: 'inline-block',
      width: '100%'
    }}>
      <svg ref={barcodeRef} style={{ 
        display: 'block', 
        margin: '0 auto',
        backgroundColor: '#ffffff',
        width: '100%',
        height: 'auto'
      }}></svg>
    </div>
  );
};

export default BarcodeGenerator; 