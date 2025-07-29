import React from "react";
 
const FinanceSetting = () => {
  return (
    <div className="pc-container">
      <div className="pc-content">
        <div className="row">
          <div className="col-md-12">
            <div className="card mb-3" style={{ position: "relative" }}>
              <div className="personaimg text-center" />
              <div>
                <h5 className="card-title">Finance</h5>
                <form className="row g-3 p20">
                  {/* VAT Status */}
                  <div className="col-12">
                    <label className="form-label">VAT</label>
                    <br />
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="vatStatus"
                         
                        id="vatActive"
                      />
                      <label className="form-check-label" htmlFor="vatActive">
                        Active
                      </label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="vatStatus"
                        value="disabled"
                        id="vatDisabled"
                      />
                      <label className="form-check-label" htmlFor="vatDisabled">
                        Disabled
                      </label>
                    </div>
                  </div>

                  {/* VAT Value */}
                  <div className="col-12">
                    <label className="form-label">VAT Value %</label>
                    <input
                      type="number"
                      className="form-control"
                      name="vatValue"
                      placeholder="Enter VAT %"
                    />
                  </div>

                  {/* Functional Buttons */}
                  <div className="col-6">
                    <button
                      type="button"
                      className="btn btn-outline-primary w-100"
                    >
                      Payment Method
                    </button>
                  </div>
                  <div className="col-6">
                    <button
                      type="button"
                      className="btn btn-outline-primary w-100"
                    >
                      Receipt Template
                    </button>
                  </div>
                  <div className="col-6">
                    <button
                      type="button"
                      className="btn btn-outline-primary w-100"
                    >
                      Discount Type
                    </button>
                  </div>
                  <div className="col-6">
                    <button
                      type="button"
                      className="btn btn-outline-primary w-100"
                    >
                      Currency
                    </button>
                  </div>
                  <div className="col-6">
                    <button
                      type="button"
                      className="btn btn-outline-primary w-100"
                    >
                      Discount Limit
                    </button>
                  </div>
                  <div className="col-6">
                    <button
                      type="button"
                      className="btn btn-outline-primary w-100"
                    >
                      Service List
                    </button>
                  </div>
                  <div className="col-12">
                    <button
                      type="button"
                      className="btn btn-outline-primary w-100"
                    >
                      Invoice Template
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinanceSetting;
