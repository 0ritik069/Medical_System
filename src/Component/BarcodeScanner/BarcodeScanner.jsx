import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { baseurl } from '../../Baseurl';
import Swal from 'sweetalert2';
import Quagga from 'quagga';
import BarcodeGenerator from '../BarcodeGenerator/BarcodeGenerator';

const BarcodeScanner = () => {
  const [scannedCode, setScannedCode] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [inventoryItem, setInventoryItem] = useState(null);
  const [showScanner, setShowScanner] = useState(false);
  const scannerRef = useRef(null);
  const navigate = useNavigate();

  // Clean and validate barcode
  const cleanBarcode = (barcode) => {
    if (!barcode) return '';
    // Remove spaces, dashes, and other special characters for matching
    return barcode.replace(/[\s\-_]/g, '');
  };

  const startScanner = () => {
    Quagga.init({
      inputStream: {
        name: "Live",
        type: "LiveStream",
        target: scannerRef.current,
        constraints: {
          width: 640,
          height: 480,
          facingMode: "environment"
        },
      },
      decoder: {
        readers: [
          "code_128_reader",
          "ean_reader",
          "ean_8_reader",
          "code_39_reader",
          "code_39_vin_reader",
          "codabar_reader",
          "upc_reader",
          "upc_e_reader",
          "i2of5_reader"
        ]
      }
    }, (err) => {
      if (err) {
        console.error('Quagga initialization failed:', err);
        Swal.fire({
          title: 'Scanner Error',
          text: 'Failed to initialize barcode scanner. Please check camera permissions.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
        return;
      }
      Quagga.start();
    });

    Quagga.onDetected(handleScan);
  };

  const stopScanner = () => {
    Quagga.stop();
  };

  const startScanning = () => {
    setShowScanner(true);
    setIsScanning(true);
    setScannedCode('');
    setInventoryItem(null);
    startScanner();
  };

  const stopScanning = () => {
    setShowScanner(false);
    setIsScanning(false);
    setScannedCode('');
    setInventoryItem(null);
    stopScanner();
  };

  const handleScan = async (result) => {
    const code = result.codeResult.code;
    if (code && code !== scannedCode) {
      setScannedCode(code);
      setIsScanning(false);
      stopScanner();
      
      try {
        // Search for inventory item by barcode
        const response = await axios.get(`${baseurl}getDrugs`);
        if (response.data.success) {
          const cleanedCode = cleanBarcode(code);
          const item = response.data.data.find(drug => {
            const cleanedDrugBarcode = cleanBarcode(drug.barcode);
            return cleanedDrugBarcode === cleanedCode;
          });
          
          if (item) {
            setInventoryItem(item);
            Swal.fire({
              title: 'Item Found!',
              text: `Found: ${item.name}`,
              icon: 'success',
              showCancelButton: true,
              confirmButtonText: 'View Details',
              cancelButtonText: 'Scan Another'
            }).then((result) => {
              if (result.isConfirmed) {
                navigate(`/Admin/ViewInventory/${item.id}`);
              } else {
                setScannedCode('');
                setInventoryItem(null);
                setIsScanning(true);
                startScanner();
              }
            });
          } else {
            Swal.fire({
              title: 'Item Not Found',
              text: `No inventory item found with barcode: ${code}`,
              icon: 'error',
              confirmButtonText: 'Try Again'
            });
            setScannedCode('');
            setIsScanning(true);
            startScanner();
          }
        }
      } catch (error) {
        console.error('Error searching for item:', error);
        Swal.fire({
          title: 'Error',
          text: 'Failed to search for item. Please try again.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
        setScannedCode('');
        setIsScanning(true);
        startScanner();
      }
    }
  };

  // Manual barcode input for testing
  const handleManualInput = (e) => {
    const value = e.target.value;
    if (value.length >= 8) { // Minimum barcode length
      handleScan({ codeResult: { code: value } });
    }
  };

  useEffect(() => {
    return () => {
      stopScanner();
    };
  }, []);

  return (
    <div className="pc-container">
      <div className="pc-content">
        <div className="col-12">
          <div className="card table-card">
            <div className="card-header">
              <h5 className="mb-0">Barcode Scanner</h5>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-6">
                  <div className="text-center mb-4">
                    <h6>Scan Inventory Item Barcode</h6>
                    <p className="text-muted">Point your camera at the barcode to scan</p>
                    
                    {!showScanner ? (
                      <button 
                        className="btn btn-primary btn-lg"
                        onClick={startScanning}
                      >
                        <i className="fas fa-barcode me-2"></i>
                        Start Scanning
                      </button>
                    ) : (
                      <button 
                        className="btn btn-danger btn-lg"
                        onClick={stopScanning}
                      >
                        <i className="fas fa-stop me-2"></i>
                        Stop Scanning
                      </button>
                    )}
                  </div>

                  {/* Manual Input for Testing */}
                  <div className="mb-3">
                    <label className="form-label">Manual Barcode Input (for testing):</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter barcode manually"
                      onChange={handleManualInput}
                      disabled={showScanner}
                    />
                  </div>

                  {scannedCode && (
                    <div className="alert alert-info">
                      <strong>Scanned Code:</strong> {scannedCode}
                    </div>
                  )}

                  {inventoryItem && (
                    <div className="card">
                      <div className="card-body">
                        <h6>Found Item:</h6>
                        <p><strong>Name:</strong> {inventoryItem.name}</p>
                        <p><strong>Substance:</strong> {inventoryItem.substance}</p>
                        <p><strong>Company:</strong> {inventoryItem.company}</p>
                        <p><strong>Quantity:</strong> {inventoryItem.quantity}</p>
                        <button 
                          className="btn btn-success"
                          onClick={() => navigate(`/Admin/ViewInventory/${inventoryItem.id}`)}
                        >
                          View Full Details
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                <div className="col-md-6">
                  {showScanner && (
                    <div className="text-center">
                      <div 
                        ref={scannerRef}
                        style={{
                          width: '100%',
                          height: '300px',
                          backgroundColor: '#000',
                          borderRadius: '8px',
                          overflow: 'hidden'
                        }}
                      />
                      <p className="text-muted mt-2">Point camera at barcode</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="row mt-4">
                <div className="col-12">
                  <div className="alert alert-info">
                    <h6><i className="fas fa-info-circle me-2"></i>How to use:</h6>
                    <ul className="mb-0">
                      <li>Click "Start Scanning" to activate the camera</li>
                      <li>Point your camera at the barcode on any inventory item</li>
                      <li>For testing, you can manually enter a barcode in the input field</li>
                      <li>The system will automatically search for the item</li>
                      <li>Click "View Details" to see the full item information</li>
                    </ul>
                  </div>

                  {/* Test Barcode Display */}
                  <div className="alert alert-warning">
                    <h6><i className="fas fa-barcode me-2"></i>Test Barcode:</h6>
                    <p className="mb-2">You can test the scanner with this sample barcode:</p>
                    <div className="text-center">
                      <BarcodeGenerator value="INV-20241201-143052-123-456" width={3} height={100} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BarcodeScanner; 