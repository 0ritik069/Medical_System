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
//       <h5 className="card-title">Rx Standard Info</h5>
//       <div className="row p20">

//         <div className="col-md-6">
//           <label className="form-label">Medicine</label>
//           <input
//             type="text"
//             className="form-control"
//             value={inventory.itemCode || ""}
//             disabled
//             placeholder="Item Code"
//           />
//         </div>

//         <div className="col-md-6">
//           <label className="form-label">Strength</label>
//           <input
//             type="text"
//             className="form-control"
//             value={inventory.itemName || ""}
//             disabled
//             placeholder="Item Name"
//           />
//         </div>

     

//         <div className="col-md-6">
//           <label className="form-label">Unit</label>
//           <input
//             type="number"
//             className="form-control"
//             value={inventory.quantity || ""}
//             disabled
//             placeholder="Quantity"
//           />
//         </div>

  

//         <div className="col-md-6">
//           <label className="form-label">Form</label>
//           <input
//             type="number"
//             className="form-control"
//             value={inventory.price || ""}
//             disabled
//             placeholder="Price"
//           />
//         </div>

      

//         <div className="col-md-6">
//           <label className="form-label">Route</label>
//           <input
//             type="text"
//             className="form-control"
//             value={inventory.supplier || ""}
//             disabled
//             placeholder="Supplier"
//           />
//         </div>

//         <div className="col-md-6">
//           <label className="form-label">Substance</label>
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

//          <div className="col-md-6">
//           <label className="form-label">Substance</label>
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

//         <div className="col-md-6">
//           <label className="form-label">Type</label>
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
import { baseurl } from "../../Baseurl";

export default function ViewRx() {
  const { id: rxId } = useParams();
  const navigate = useNavigate();
  const [rx, setRx] = useState(null);

  useEffect(() => {
    axios
      .get(`${baseurl}getRxById/${rxId}`)
      .then((res) => {
        setRx(res.data.data);
      })
      .catch((err) => console.error("Error fetching Rx data:", err));
  }, [rxId]);

  if (!rx) return <div>Loading...</div>;

  return (
    <div className="pc-container">
      <div className="pc-content">
        <div className="col-12">
          <div className="card table-card">
            <div className="tableHeader">
              <h5>Rx Standard Info</h5>
            </div>
            <div className="card-body">
              <div className="row p20">
                {[
                  ["Medicine Name", rx.medicineName],
                  ["Strength", rx.strength],
                  ["Unit", rx.unit],
                  ["Form", rx.form],
                  ["Route", rx.route],
                  ["Active Substances", rx.activeSubstances],
                  ["Type", rx.productType],
                  ["Frequency", rx.frequency],
                  ["Duration", rx.duration],
                  ["Notes", rx.notes],
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
