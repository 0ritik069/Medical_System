import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function ViewRx() {
  const { rxId } = useParams(); // assuming route is like /Admin/ViewRx/:rxId
  const [rxData, setRxData] = useState(null);

  useEffect(() => {
    const fetchRxData = async () => {
      try {
        const res = await axios.get(`https://sisccltd.com/medical_app/api/getRxById/${rxId}`);
        if (res.data.success) {
          setRxData(res.data.data);
        }
      } catch (error) {
        console.error("Error fetching Rx data:", error);
      }
    };

    fetchRxData();
  }, [rxId]);

  if (!rxData) {
    return <div>Loading Rx Data...</div>;
  }

  return (
    <div className="pc-container">
      <div className="pc-content">
        <div className="container mt-4">
          <h5 className="mb-4">Rx Details (ID: {rxData.rxId})</h5>

          <div className="card p-3">
            <div className="row mb-3">
              <div className="col-md-6"><strong>Medicine Name:</strong> {rxData.medicineName}</div>
              <div className="col-md-6"><strong>Strength:</strong> {rxData.strength}</div>
            </div>

            <div className="row mb-3">
              <div className="col-md-6"><strong>Unit:</strong> {rxData.unit}</div>
              <div className="col-md-6"><strong>Form:</strong> {rxData.form}</div>
            </div>

            <div className="row mb-3">
              <div className="col-md-6"><strong>Route:</strong> {rxData.route}</div>
              <div className="col-md-6"><strong>Product Type:</strong> {rxData.productType}</div>
            </div>

            <div className="row mb-3">
              <div className="col-md-6"><strong>Frequency:</strong> {rxData.frequency || "N/A"}</div>
              <div className="col-md-6"><strong>Duration:</strong> {rxData.duration || "N/A"}</div>
            </div>

            <div className="row mb-3">
              <div className="col-md-12"><strong>Notes:</strong> {rxData.notes || "N/A"}</div>
            </div>

            <div className="row mb-3">
              <div className="col-md-12"><strong>Active Substances:</strong> {rxData.activeSubstances}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
