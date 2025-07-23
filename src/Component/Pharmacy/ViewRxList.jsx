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
              <h5 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span
                  style={{ cursor: 'pointer', color: '#007bff', fontWeight: 'bold', fontSize: '1.5rem' }}
                  onClick={() => navigate(-1)}
                  title="Back"
                >
                  &larr;
                </span>
                Rx Standard Info
              </h5>
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

             
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
