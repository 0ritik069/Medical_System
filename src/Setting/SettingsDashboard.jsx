import React from "react";
import { useNavigate } from "react-router-dom";

const CARD_MIN_HEIGHT = 420; 

export default function SettingsDashboard() {
  const navigate = useNavigate();
  return (
    <div className="container mt-4 position-relative">
      <div className="d-flex justify-content-end align-items-center mb-3">
        <button
          className="btn btn-outline-primary fw-bold"
          style={{ minWidth: 120 }}
          onClick={() => navigate("/Admin/ManageStaff")}
        >
          Users
        </button>
      </div>
      <div className="row">
        {/* Business Setting */}
        <div className="col-md-6 mb-4">
          <div className="card shadow-sm d-flex flex-column" style={{ minHeight: CARD_MIN_HEIGHT }}>
            <div className="card-header d-flex align-items-center bg-primary text-white justify-content-between">
              <h5 className="mb-0">Business Setting</h5>
              <button className="btn btn-sm btn-light"><i className="bi bi-pencil" /></button>
            </div>
            <div className="card-body p-3 flex-grow-1">
              <form>
                <div className="row g-2 align-items-end">
                  <div className="col-2 d-flex flex-column align-items-center">
                    <div className="rounded-circle bg-light border" style={{ width: 50, height: 50 }}></div>
                  </div>
                  <div className="col-5">
                    <label className="form-label">Official Name</label>
                    <input className="form-control" type="text" />
                  </div>
                  <div className="col-5">
                    <label className="form-label">CR Number</label>
                    <input className="form-control" type="text" />
                  </div>
                  <div className="col-6">
                    <label className="form-label">Telephone 1</label>
                    <input className="form-control" type="text" />
                  </div>
                  <div className="col-6">
                    <label className="form-label">Telephone 2</label>
                    <input className="form-control" type="text" />
                  </div>
                  <div className="col-6">
                    <label className="form-label">VAT Number</label>
                    <input className="form-control" type="text" />
                  </div>
                  <div className="col-6">
                    <label className="form-label">Email</label>
                    <input className="form-control" type="email" />
                  </div>
                  <div className="col-6">
                    <label className="form-label">Branches</label>
                    <select className="form-select">
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                    </select>
                  </div>
                  <div className="col-6">
                    <label className="form-label">Specialty</label>
                    <input className="form-control" type="text" />
                  </div>
                  <div className="col-12 text-end mt-2">
                    <button className="btn btn-primary px-4">Save</button>
                  </div>
                </div>
              </form>
            </div>  
          </div>
        </div>
        {/* Finance */}
        <div className="col-md-6 mb-4">
          <div className="card shadow-sm d-flex flex-column" style={{ minHeight: CARD_MIN_HEIGHT }}>
            <div className="card-header d-flex align-items-center bg-primary text-white justify-content-between">
              <h5 className="mb-0">Finance</h5>
            </div>
            <div className="card-body p-3 flex-grow-1 d-flex flex-column justify-content-center">
              <form className="h-100 d-flex flex-column justify-content-center">
                <div className="row g-2 align-items-center mb-4">
                  <div className="col-12 d-flex align-items-center mb-2">
                    <label className="form-label me-3 mb-0">VAT</label>
                    <div className="form-check form-check-inline">
                      <input className="form-check-input" type="radio" name="vatStatus" id="vatActive" />
                      <label className="form-check-label" htmlFor="vatActive">Active</label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input className="form-check-input" type="radio" name="vatStatus" id="vatDisabled" />
                      <label className="form-check-label" htmlFor="vatDisabled">Disabled</label>
                    </div>
                    <input className="form-control ms-3" style={{ width: 120 }} type="text" placeholder="VAT Value %" />
                  </div>
                </div>
                <div className="row g-2">
                  <div className="col-6 d-flex flex-column gap-2">
                    <button className="btn btn-outline-secondary flex-fill py-2">Payment Method</button>
                    <button className="btn btn-outline-secondary flex-fill py-2">Discount Type</button>
                    <button className="btn btn-outline-secondary flex-fill py-2">Discount Limit</button>
                    <button className="btn btn-outline-secondary flex-fill py-2">Invoice Template</button>
                  </div>
                  <div className="col-6 d-flex flex-column gap-2">
                    <button className="btn btn-outline-secondary flex-fill py-2">Receipt Template</button>
                    <button className="btn btn-outline-secondary flex-fill py-2">Currency</button>
                    <button className="btn btn-outline-secondary flex-fill py-2">Service List</button>
                    <div className="flex-fill" />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        {/* Notification Center */}
        <div className="col-md-6 mb-4">
          <div className="card shadow-sm d-flex flex-column" style={{ minHeight: CARD_MIN_HEIGHT }}>
            <div className="card-header d-flex align-items-center bg-primary text-white justify-content-between">
              <h5 className="mb-0">Notification Center</h5>
              <button className="btn btn-sm btn-light"><i className="bi bi-pencil" /></button>
            </div>
            <div className="card-body p-0 flex-grow-1 d-flex flex-column">
              {/* Active Notifications heading */}
              <div className="px-3 py-2" style={{ background: '#fff', color: '#222', borderTopLeftRadius: 4, borderTopRightRadius: 4, fontWeight: 500, fontSize: '1rem' }}>
                Active Notifications
              </div>
              <div className="table-responsive flex-grow-1">
                <table className="table mb-0" style={{ minWidth: 400 }}>
                  <thead>
                    <tr style={{ background: '#1976d2', color: '#fff' }}>
                      <th style={{ verticalAlign: 'middle' }}>Type</th>
                      <th className="text-center" style={{ verticalAlign: 'middle' }}>Email</th>
                      <th className="text-center" style={{ verticalAlign: 'middle' }}>SMS</th>
                      <th className="text-center" style={{ verticalAlign: 'middle' }}>Days</th>
                    </tr>
                  </thead>
                  <tbody>
                    {['Appointment Skip','Appointment Reminder','Payment','Invoices','Birthdays','Lab Result'].map((type, idx) => (
                      <tr key={type} style={idx % 2 === 0 ? { background: '#f5f7fa' } : {}}>
                        <td style={{ verticalAlign: 'middle', fontWeight: 500 }}>{type}</td>
                        <td className="text-center align-middle"><input type="checkbox" className="form-check-input" defaultChecked /></td>
                        <td className="text-center align-middle"><input type="checkbox" className="form-check-input" defaultChecked /></td>
                        <td className="text-center align-middle"><input type="text" className="form-control form-control-sm text-center" value="5" readOnly style={{ width: 45, display: 'inline-block' }} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="text-end p-3">
                <button className="btn btn-primary px-4">Save</button>
              </div>
            </div>
          </div>
        </div>
        {/* Security */}
        <div className="col-md-6 mb-4">
          <div className="card shadow-sm d-flex flex-column" style={{ minHeight: CARD_MIN_HEIGHT }}>
            <div className="card-header d-flex align-items-center bg-primary text-white justify-content-between">
              <h5 className="mb-0">Security</h5>
              <button className="btn btn-sm btn-light"><i className="bi bi-pencil" /></button>
            </div>
            <div className="card-body p-4 flex-grow-1 d-flex flex-column justify-content-center">
              <div className="row h-100 align-items-center">
                {/* Left: 2 rows x 3 columns buttons */}
                <div className="col-7 d-flex flex-column justify-content-center">
                  <div className="row mb-2 g-2">
                    <div className="col-4"><button className="btn btn-outline-secondary w-100 py-2">Roles</button></div>
                    <div className="col-4"><button className="btn btn-outline-secondary w-100 py-2">Permission</button></div>
                    <div className="col-4"><button className="btn btn-outline-secondary w-100 py-2">Database Backup</button></div>
                  </div>
                  <div className="row g-2">
                    <div className="col-4"><button className="btn btn-outline-secondary w-100 py-2">User List</button></div>
                    <div className="col-4"><button className="btn btn-outline-secondary w-100 py-2">Appointments Filter</button></div>
                    <div className="col-4"></div>
                  </div>
                </div>
                {/* Right: checkboxes + input */}
                <div className="col-5 d-flex flex-column gap-3 justify-content-center">
                  <div className="d-flex align-items-center mb-2">
                    <input className="form-check-input me-2" type="checkbox" id="autoLogout" />
                    <label className="form-check-label me-2" htmlFor="autoLogout">Auto Logout</label>
                    <input className="form-control form-control-sm" type="text" placeholder="" style={{ maxWidth: 100 }} />
                  </div>
                  <div className="d-flex align-items-center mb-2">
                    <input className="form-check-input me-2" type="checkbox" id="uploadSizeLimit" />
                    <label className="form-check-label me-2" htmlFor="uploadSizeLimit">Upload Size Limit</label>
                    <input className="form-control form-control-sm" type="text" placeholder="" style={{ maxWidth: 100 }} />
                  </div>
                </div>
              </div>
              <div className="text-end mt-4">
                <button className="btn btn-primary px-4">Save</button>
              </div>
            </div>
          </div>
        </div>
        {/* Medical Safety */}
        <div className="col-md-6 mb-4">
          <div className="card shadow-sm d-flex flex-column" style={{ minHeight: CARD_MIN_HEIGHT }}>
            <div className="card-header d-flex align-items-center bg-primary text-white justify-content-between">
              <h5 className="mb-0">Medical Safety</h5>
            </div>
            <div className="card-body p-3 flex-grow-1">
              <div className="row g-2">
                <div className="col-6 d-flex flex-wrap gap-2">
                  <button className="btn btn-outline-secondary flex-fill">Allergy Alert</button>
                  <button className="btn btn-outline-secondary flex-fill">Medical Forms</button>
                  <button className="btn btn-outline-secondary flex-fill">Vitals</button>
                  <button className="btn btn-outline-secondary flex-fill">Rx Template</button>
                </div>
                <div className="col-6 d-flex flex-wrap gap-2">
                  <button className="btn btn-outline-secondary flex-fill">Consent Control</button>
                  <button className="btn btn-outline-secondary flex-fill">Doctor's Signature</button>
                  <button className="btn btn-outline-secondary flex-fill">Consent Forms</button>
                  <button className="btn btn-outline-secondary flex-fill">Inventory Alert</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* API's & Integration */}
        <div className="col-md-6 mb-4">
          <div className="card shadow-sm d-flex flex-column" style={{ minHeight: CARD_MIN_HEIGHT }}>
            <div className="card-header d-flex align-items-center bg-primary text-white justify-content-between">
              <h5 className="mb-0">API's & Integration (Super Admins Only)</h5>
            </div>
            <div className="card-body p-3 flex-grow-1">
              <div className="row g-2">
                <div className="col-6 d-flex flex-wrap gap-2">
                  <button className="btn btn-outline-secondary flex-fill">SMS API</button>
                  <button className="btn btn-outline-secondary flex-fill">HR Integration</button>
                  <button className="btn btn-outline-secondary flex-fill">Active Modules</button>
                  <button className="btn btn-outline-secondary flex-fill">Email Settings</button>
                  <button className="btn btn-outline-secondary flex-fill">Finance Integration</button>
                </div>
                <div className="col-6 d-flex flex-wrap gap-2">
                  <button className="btn btn-outline-secondary flex-fill">Online Appointment</button>
                  <button className="btn btn-outline-secondary flex-fill">Signature Device</button>
                  <button className="btn btn-outline-secondary flex-fill">Card Reader</button>
                  <button className="btn btn-outline-secondary flex-fill">POS Machine</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
