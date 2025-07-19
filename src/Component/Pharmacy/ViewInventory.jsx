// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import { baseurl } from "../../Baseurl";

// export default function ViewInventory() {
//   const { id } = useParams(); 
//   const [inventory, setInventory] = useState({});

//   useEffect(() => {
//     if (id) {
//       axios
//         .get(`${baseurl}/api/inventory/${id}`)
//         .then((res) => setInventory(res.data))
//         .catch((err) => console.error("Error fetching inventory:", err));
//     }
//   }, [id]);

//   return (
//      <div className="pc-container">
//       <div className="pc-content">
//     <div className="card p-4">
//       <h5 className="card-title">Inventory Info</h5>
//       <div className="row p20">

//         <div className="col-md-6">
//           <label className="form-label">ID</label>
//           <input
//             type="text"
//             className="form-control"
//             value={inventory.itemCode || ""}
//             disabled
//             placeholder="Item Code"
//           />
//         </div>

//         <div className="col-md-6">
//           <label className="form-label">Category</label>
//           <input
//             type="text"
//             className="form-control"
//             value={inventory.itemName || ""}
//             disabled
//             placeholder="Item Name"
//           />
//         </div>

//         <div className="col-md-6">
//           <label className="form-label">Name</label>
//           <input
//             type="text"
//             className="form-control"
//             value={inventory.category || ""}
//             disabled
//             placeholder="Category"
//           />
//         </div>

//         <div className="col-md-6">
//           <label className="form-label">Substance</label>
//           <input
//             type="number"
//             className="form-control"
//             value={inventory.quantity || ""}
//             disabled
//             placeholder="Quantity"
//           />
//         </div>

//         <div className="col-md-6">
//           <label className="form-label">Strength</label>
//           <input
//             type="text"
//             className="form-control"
//             value={inventory.unit || ""}
//             disabled
//             placeholder="Unit"
//           />
//         </div>

//         <div className="col-md-6">
//           <label className="form-label">Unit</label>
//           <input
//             type="number"
//             className="form-control"
//             value={inventory.price || ""}
//             disabled
//             placeholder="Price"
//           />
//         </div>

//         <div className="col-md-6">
//           <label className="form-label">Company</label>
//           <input
//             type="text"
//             className="form-control"
//             value={inventory.location || ""}
//             disabled
//             placeholder="Location"
//           />
//         </div>

//         <div className="col-md-6">
//           <label className="form-label">Quantity</label>
//           <input
//             type="text"
//             className="form-control"
//             value={inventory.supplier || ""}
//             disabled
//             placeholder="Supplier"
//           />
//         </div>

//         <div className="col-md-6">
//           <label className="form-label">Expiry</label>
//           <input
//             type="date"
//             className="form-control"
//             value={
//               inventory.dateAdded
//                 ? new Date(inventory.dateAdded).toISOString().split("T")[0]
//                 : ""
//             }
//             disabled
//           />
//         </div>


//  <div className="col-md-6">
//           <label className="form-label">Cost</label>
//           <input
//             type="text"
//             className="form-control"
//             value={inventory.supplier || ""}
//             disabled
//             placeholder="Supplier"
//           />
//         </div>


//          <div className="col-md-6">
//           <label className="form-label">Price</label>
//           <input
//             type="text"
//             className="form-control"
//             value={inventory.supplier || ""}
//             disabled
//             placeholder="Supplier"
//           />
//         </div>

//          <div className="col-md-6">
//           <label className="form-label">Control</label>
//           <input
//             type="text"
//             className="form-control"
//             value={inventory.supplier || ""}
//             disabled
//             placeholder="Supplier"
//           />
//         </div>
//       </div>
//     </div>
//     </div>
//     </div>
//   );
// }















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

  if (!inventory) return null;

  return (
    <div className="pc-container">
      <div className="pc-content">
        <div className="col-12">
          <div className="card table-card">
            <div className="tableHeader">
              <h5>Inventory Item Details</h5>
            </div>
            <div className="card-body">
              <div className="row p20">
                {/* Image */}
                {inventory.image && (
                  <div className="col-md-4 mb-3">
                    <img
                      src={`${baseurImage}${inventory.image}`}
                      alt={inventory.name}
                      className="img-fluid rounded"
                    />
                  </div>
                )}

                {[
                  ["ID", inventory.id],
                  ["Name", inventory.name],
                  ["Substance", inventory.substance],
                  ["Strength", inventory.strength],
                  ["Unit", inventory.unit_of_measurement],
                  ["Company", inventory.company],
                  ["Quantity", inventory.quantity],
                  ["Expiry", inventory.expiration_date],
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
                <button
                  className="btn btn-secondary me-2"
                  onClick={() => navigate(-1)}
                >
                  Back
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
