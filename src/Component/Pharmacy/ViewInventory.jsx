import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { baseurImage } from "../../Baseurl";

export default function InventoryView() {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = location.state || {};

  const [inventory, setInventory] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      axios
        .get(`https://sisccltd.com/medical_app/api/getDrugById/${id}`)
        .then((res) => {
          if (res.data.success) {
            setInventory(res.data.data);
          } else {
            console.error("Failed to fetch inventory data");
          }
        })
        .catch((err) => {
          console.error("Error fetching inventory data:", err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [id]);

  if (loading) return <p className="text-center mt-4">Loading...</p>;
  if (!inventory) return <p className="text-center mt-4">No inventory data found!</p>;

  return (
    <div className="container mt-4">
      <h4 className="mb-3">Inventory Item View</h4>

      <div className="card p-4">
        <div className="mb-3">
          <strong>Name:</strong> {inventory.name}
        </div>
        <div className="mb-3">
          <strong>Category:</strong> {inventory.category}
        </div>
        <div className="mb-3">
          <strong>Substance:</strong> {inventory.substance}
        </div>
        <div className="mb-3">
          <strong>Strength:</strong> {inventory.strength}
        </div>
        <div className="mb-3">
          <strong>Unit of Measurement:</strong> {inventory.unit_of_measurement}
        </div>
        <div className="mb-3">
          <strong>Company:</strong> {inventory.company}
        </div>
        <div className="mb-3">
          <strong>Quantity:</strong> {inventory.quantity}
        </div>
        <div className="mb-3">
          <strong>Expiration Date:</strong> {new Date(inventory.expiration_date).toLocaleDateString()}
        </div>
        <div className="mb-3">
          <strong>Cost:</strong> ₹{inventory.cost}
        </div>
        <div className="mb-3">
          <strong>Price:</strong> ₹{inventory.price}
        </div>
        <div className="mb-3">
          <strong>Control:</strong> {inventory.control === 1 ? "Yes" : "No"}
        </div>
        <div className="mb-3">
          <strong>Image:</strong><br />
          <img
            src={`${baseurImage}/drug/${inventory.image}`}
            alt={inventory.name}
            style={{ maxWidth: "150px", height: "auto" }}
          />
        </div>
      </div>

      <button className="btn btn-secondary mt-3" onClick={() => navigate(-1)}>
        ← Back
      </button>
    </div>
  );
}
