import React from "react";
import image from "../../../src/assests/profile.jpg"
const BusinessSetting = () => {
  return (
    <div className="pc-container">
      <div className="pc-content">
        <div className="row">
          <div className="col-md-12">
            <div className="card mb-3" style={{ position: "relative" }}>
              <div className="personaimg text-center" />
              <div>
                <h5 className="card-title">Business Setting</h5>
                <div className="row">
                    <div>
                        <div className="imgBusinessSet">
                        <img src={image} alt="" />
                    </div>
                    </div>
                </div>
                <form className="row g-3 p20">
                  <div className="col-md-6">
                    <label className="form-label">Official Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="officialName"
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">CR Number</label>
                    <input
                      type="text"
                      className="form-control"
                      name="crNumber"
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Telephone 1</label>
                    <input
                      type="text"
                      className="form-control"
                      name="telephone1"
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Telephone 2</label>
                    <input
                      type="text"
                      className="form-control"
                      name="telephone2"
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">VAT Number</label>
                    <input
                      type="text"
                      className="form-control"
                      name="vatNumber"
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Email</label>
                    <input type="email" className="form-control" name="email" />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Branches</label>
                    <select className="form-select" name="branches">
                      <option value="1">1</option>
                      <option value="2">2</option>
                      {/* Add more options as needed */}
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Specialty</label>
                    <input
                      type="text"
                      className="form-control"
                      name="specialty"
                    />
                  </div>
                 
                  <div className="col-md-12 text-center">
                    <button type="submit" className="bgBtn">
                      Save
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

export default BusinessSetting;
