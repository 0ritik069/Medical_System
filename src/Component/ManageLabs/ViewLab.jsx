import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { baseurl, baseurImage } from "../../Baseurl";

export default function ViewLab() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [labRequest, setLabRequest] = useState(null);
  const [attachments, setAttachments] = useState([]);

  useEffect(() => {
    // First fetch lab request details
    axios
      .get(`${baseurl}getLabRequestById/${id}`)
      .then((res) => {
        if (res.data.success) {
          setLabRequest(res.data.data);
        }
      })
      .catch((err) => console.error("Fetch lab request error:", err));

    // Then fetch attachments for this lab request
    axios
      .get(`${baseurl}getLabRequestAttachmentsByLabRequestId/${id}`)
      .then((res) => {
        if (res.data.success) {
          setAttachments(res.data.data);
        }
      })
      .catch((err) => console.error("Fetch attachments error:", err));
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

  if (!labRequest) return <div>Loading...</div>;

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
                Lab Request Details
              </h5>
            </div>
            <div className="card-body" style={{ margin: "15px" }}>
              <div className="row">
                {[
                  ["Patient Name", labRequest.patient_name],
                  ["Patient Civil ID", labRequest.patient_civil_id],
                  ["Doctor Name", labRequest.doctor_name],
                  ["Lab Name", labRequest.lab_name],
                  ["Title", labRequest.title],
                  ["Description", labRequest.description],
                  ["Status", labRequest.status],
                  ["Request Date", formatDate(labRequest.request_date)],
                  ["Request Time", labRequest.request_time],
                  ["Days Since Request", labRequest.days_since_request],
                  ["Sent By", labRequest.sent_by],
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

              {/* Attachments section */}
              {attachments.length > 0 && (
                <div className="row mt-3">
                  <div className="col-12">
                    <label className="form-label">Attachments ({attachments.length})</label>
                    <div className="table-responsive">
                      <table className="table table-bordered">
                        <thead>
                          <tr>
                            <th>Attachment Name</th>
                            <th>File</th>
                            <th>Status</th>
                            <th>Uploaded At</th>
                          </tr>
                        </thead>
                        <tbody>
                          {attachments.map((attachment, index) => (
                            <tr key={attachment.attachment_id}>
                              <td>{attachment.attachment_name}</td>
                              <td>
                                {attachment.filename ? (
                                  <a href={`${baseurImage}${attachment.filename}`} target="_blank" rel="noopener noreferrer">
                                    {attachment.filename}
                                  </a>
                                ) : 'No file'}
                              </td>
                              <td>{attachment.report_status}</td>
                              <td>{formatDate(attachment.uploaded_at)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {attachments.length === 0 && labRequest.status === 'Result' && (
                <div className="row mt-3">
                  <div className="col-12">
                    <div className="alert alert-info">
                      No attachments found for this lab request.
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 