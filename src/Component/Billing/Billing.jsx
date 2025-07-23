import React from "react";

export default function Billing() {
  const [openmodal, setOpenmodal] = React.useState(false);
  const invoices = [
  {
    id: "INV32",
    patient: "JoyBay",
    phone: "123123",
    services: "S32-S44-555",
    amount: "300BHD",
    discount: "50",
    vat: "35BHD",
    paid: "0",
    balance: "385BHD",
  },
  // Repeat entries as needed...
];

const handleclick = () => {
  setOpenmodal(true)
}
const handleclose = () => {
  setOpenmodal(false)}



  return (
  
      <div className="pc-container">
        <div className="pc-content ">
          <div className="p-4">
      {/* Header Buttons */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <button className="btn btn-primary me-2" onClick={handleclick}>New Invoice</button>
          <button className="btn btn-outline-primary me-2">Batch Payment</button>
          <button className="btn btn-outline-primary">Advance Payment</button>
        </div>
        <div>
          {/* <button className="btn btn-outline-primary me-2"> */}
            {/* <i className="bi bi-funnel-fill"></i> */}
          {/* </button> */}
          {/* <button className="btn btn-dark"> */}
            {/* <i className="bi bi-upload"></i> */}
          {/* </button> */}
        </div>
      </div>

      {/* Invoice Table */}
     <div className="col-12">
    <div className="card table-card">
      <div className="card-header">
        <div className="d-sm-flex align-items-center justify-content-between">
          <h5 className="mb-3 mb-sm-0">UnPaid Invoices</h5>
          {/* <div><a href="../admins/course-teacher-apply.html" className="btn btn-outline-secondary">Apply Teacher List</a> <a href="../admins/course-teacher-add.html" className="btn btn-primary">Add Teacher</a></div> */}
        </div>
      </div>
      <div className="card-body pt-3">
        <div className="table-responsive">
          <table className="table table-hover" id="pc-dt-simple">
            <thead>
              <tr>
                <th>ID</th>
                <th>Patient </th>
                <th>Phone</th>
                <th>Services Codes</th>
                <th>Amount</th>
                <th>Discount</th>
                <th>VAT</th>
                <th>Paid</th>
                <th>Balance</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
              
                <td>INV32</td>
                <td>Jaybay</td>
                <td>123145632</td>
                <td>32-44-92-58</td>
                <td>300BDH</td>
                <td>50</td>
                <td>385BDH</td>
                <td>0</td>
                <td>385BDH</td>
                <td><a href="#" className="avtar avtar-xs btn-link-secondary"><i className="ti ti-eye f-20" /> </a><a href="#" className="avtar avtar-xs btn-link-secondary"><i className="ti ti-edit f-20" /> </a><a href="#" className="avtar avtar-xs btn-link-secondary"><i className="ti ti-trash f-20" /></a>
                </td>
              </tr>
              <tr>
              
                <td>INV32</td>
                <td>Jaybay</td>
                <td>123145632</td>
                <td>32-44-92-58</td>
                <td>300BDH</td>
                <td>50</td>
                <td>385BDH</td>
                <td>0</td>
                <td>385BDH</td>
                <td><a href="#" className="avtar avtar-xs btn-link-secondary"><i className="ti ti-eye f-20" /> </a><a href="#" className="avtar avtar-xs btn-link-secondary"><i className="ti ti-edit f-20" /> </a><a href="#" className="avtar avtar-xs btn-link-secondary"><i className="ti ti-trash f-20" /></a>
                </td>
              </tr>
              <tr>
              
                <td>INV32</td>
                <td>Jaybay</td>
                <td>123145632</td>
                <td>32-44-92-58</td>
                <td>300BDH</td>
                <td>50</td>
                <td>385BDH</td>
                <td>0</td>
                <td>385BDH</td>
                <td><a href="#" className="avtar avtar-xs btn-link-secondary"><i className="ti ti-eye f-20" /> </a><a href="#" className="avtar avtar-xs btn-link-secondary"><i className="ti ti-edit f-20" /> </a><a href="#" className="avtar avtar-xs btn-link-secondary"><i className="ti ti-trash f-20" /></a>
                </td>
              </tr>
              <tr>
              
                <td>INV32</td>
                <td>Jaybay</td>
                <td>123145632</td>
                <td>32-44-92-58</td>
                <td>300BDH</td>
                <td>50</td>
                <td>385BDH</td>
                <td>0</td>
                <td>385BDH</td>
                <td><a href="#" className="avtar avtar-xs btn-link-secondary"><i className="ti ti-eye f-20" /> </a><a href="#" className="avtar avtar-xs btn-link-secondary"><i className="ti ti-edit f-20" /> </a><a href="#" className="avtar avtar-xs btn-link-secondary"><i className="ti ti-trash f-20" /></a>
                </td>
              </tr>
              <tr>
              
                <td>INV32</td>
                <td>Jaybay</td>
                <td>123145632</td>
                <td>32-44-92-58</td>
                <td>300BDH</td>
                <td>50</td>
                <td>385BDH</td>
                <td>0</td>
                <td>385BDH</td>
                <td><a href="#" className="avtar avtar-xs btn-link-secondary"><i className="ti ti-eye f-20" /> </a><a href="#" className="avtar avtar-xs btn-link-secondary"><i className="ti ti-edit f-20" /> </a><a href="#" className="avtar avtar-xs btn-link-secondary"><i className="ti ti-trash f-20" /></a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
    </div>
        </div>
          {openmodal && (
        <div className="modal show d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add Invoice</h5>
                <button type="button" className="btn-close" onClick={() => handleclose()}></button>
              </div>
              <div className="modal-body">
                {/* Add your form or content here */}
                      <div className="row mb-3">
              <div className="col-md-4">
                <label className="form-label">Invoice ID</label>
                <input type="text" className="form-control" />
              </div>
              <div className="col-md-4">
                <label className="form-label">Patient</label>
                <input type="text" className="form-control" />
              </div>
              <div className="col-md-4">
                <label className="form-label">Services</label>
                <input type="text" className="form-control" />
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-4">
                <label className="form-label">Issue Date</label>
                <input type="date" className="form-control" />
              </div>
              <div className="col-md-4">
                <label className="form-label">Discount</label>
                <input type="text" className="form-control" />
              </div>
              <div className="col-md-4">
                <label className="form-label">VAT Amount</label>
                <input type="date" className="form-control" />
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-4">
                <label className="form-label">Total Value</label>
                <input type="text" className="form-control" />
              </div>
                <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={() => handleclose()}>Close</button>
              <button type="button" className="btn btn-primary">Save changes</button>
            </div>
            </div>
           
              </div>
            </div>
          </div>
        </div>
      )}
      </div>
    
   
  );
}
