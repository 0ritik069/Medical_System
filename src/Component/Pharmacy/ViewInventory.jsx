
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { baseurl, baseurImage } from "../../Baseurl";

export default function ViewInventory() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [inventory, setInventory] = useState(null);

  useEffect(() => {
    axios
      .get(`${baseurl}/getDrugById/${id}`)
      .then((res) => {
        if (res.data.success) {
          setInventory(res.data.data);
        } else {
          console.error("API error:", res.data.message);
        }
      })
      .catch((err) => console.error("Fetch error:", err));
  }, [id]);

 
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  if (!inventory) return null;

  return (
    <div className="pc-container">
      <div className="pc-content">
        <div className="col-12">
          <div className="card table-card">
            <div className="tableHeader">
              <h5 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span
                  style={{ cursor: 'pointer', color: '#007bff', fontWeight: 'bold', fontSize: '1.5rem' }}
                  onClick={() => navigate(-1)}
                  title="Back"
                >
                  &larr;
                </span>
                Inventory Item Details
              </h5>
            </div>
            <div className="card-body" style={{ margin: "15px" }}>
              <div className="row justify-content-center mb-4">
                {inventory.image && (
                  <div className="col-md-4 text-center">
                    <img
                      src={`${baseurImage}${inventory.image}`}
                      alt={inventory.name}
                      className="img-fluid rounded"
                      style={{ maxHeight: "250px", objectFit: "contain" }}
                    />
                  </div>
                )}
              </div>

              <div className="row">
                {[
                  ["Name", inventory.name],
                  ["Substance", inventory.substance],
                  ["Strength", inventory.strength],
                  ["Unit", inventory.unit_of_measurement],
                  ["Company", inventory.company],
                  ["Quantity", inventory.quantity],
                  ["Expiry", formatDate(inventory.expiration_date)],
                  ["Cost", inventory.cost],
                  ["Price", inventory.price],
                  ["Control", inventory.control === 1 ? "Yes" : "No"],
                ].map(([label, value], idx) => (
                  <div className="col-md-6 mb-3" key={idx}>
                    <label className="form-label">{label}</label>
                    <input
                      type="text"
                      className="form-control"
                      value={value ?? ""}
                      disabled
                    />
                  </div>
                ))}
              </div>

              <div className="text-end">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
