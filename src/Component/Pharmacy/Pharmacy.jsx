import axios from "axios";
import React, { useEffect, useState } from "react";
import { baseurl, baseurImage } from "../../Baseurl";
import Swal from "sweetalert2";
import { useNavigate, NavLink } from "react-router-dom";


export default function Pharmacy() {
  const [activeTab, setActiveTab] = useState("tab1");
  const [modalOpen, setModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [viewItem, setViewItem] = useState(null);
  const [data, setData] = useState({});
  const [imageFile, setImageFile] = useState(null);
  const [drugs, setDrugs] = useState([]);
  const [rxList, setRxList] = useState([]);
  const [searchRx, setSearchRx] = useState("");
  const [searchDrug, setSearchDrug] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [editId, setEditId] = useState(null);
  const [viewData, setViewData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [categoryList, setCategoryList] = useState([]);
  const [categoryData, setCategoryData] = useState({});
  const [categories, setCategories] = useState([]); 


  const navigate = useNavigate();

  const itemsPerPage = 10;

  useEffect(() => {
    getdata();
    getRxList();
    fetchCategories(); 
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${baseurl}getAllCategories`);
      if (res.data.success && Array.isArray(res.data.data)) {
        setCategories(res.data.data);
      }
    } catch (err) {
      console.error("Failed to fetch categories", err);
    }
  };

  const getdata = async () => {
    try {
      const response = await axios.get(`${baseurl}getDrugs`);
      if (response.data?.success) {
        setDrugs(response.data.data);
      }
    } catch (error) {
      alert("Error fetching drugs.");
    }
  };

  const getRxList = async () => {
    try {
      const res = await axios.get(`${baseurl}getAllRxList`);
      if (res.data?.success) {
        setRxList(res.data.data);
      }
    } catch (err) {
      alert("Error fetching Rx list.");
    }
  };

  const handlechange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const apihitnav = async () => {
    if (activeTab === "tab1") {

      try {
        const formData = new FormData();
        const fields = [
          "name",
          "substance",
          "unit_of_measurement",
          "company",
          "quantity",
          "category",
          "strength",
          "expiration_date",
          "cost",
          "price",
        ];

        for (const key of fields) {
          if (!data[key]) {
            alert(`Please enter ${key}`);
            return;
          }
          formData.append(key, data[key]);
        }

        if (!editId && !imageFile) {
          alert("Please upload an image.");
          return;
        }

        if (imageFile) formData.append("image", imageFile);

        const apiURL = editId
          ? `${baseurl}updateDrug/${editId}`
          : `${baseurl}addDrug`;

        const method = editId ? "put" : "post";

        const response = await axios[method](apiURL, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        if (response.data?.success) {
          setModalOpen(false);
          setEditId(null);
          setData({});
          setImageFile(null);
          getdata();
          Swal.fire("Success!", editId ? "Drug updated" : "Drug added", "success");
        }
      } catch (err) {
        alert("Error while saving drug.");
      }
    } else if (activeTab === "tab2") {
      await addRxMedicine();
    }
  };

  const addRxMedicine = async () => {
    try {
      const requiredFields = [
        "medicine_name",
        "strength",
        "unit",
        "pharmaceutical_form",
        "frequency",
        "duration",
        "notes",
        "route",
        "product_type",
        "active_substances",
      ];

      for (let field of requiredFields) {
        if (!data[field]) {
          alert(`Please enter ${field}`);
          return;
        }
      }

      const response = await axios.post(`${baseurl}addRxMedicine`, data);

      if (response.data?.success) {
        setModalOpen(false);
        setData({});
        getRxList();
        Swal.fire("Success!", "Rx Medicine added", "success");
      } else {
        Swal.fire("Error", "Failed to add Rx Medicine", "error");
      }
    } catch (error) {
      alert("Error while adding Rx medicine.");
    }
  };

  const deleteRxMedicine = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const res = await axios.delete(`${baseurl}deleteRxMedicine/${id}`);
        if (res.data?.success) {
          getRxList();
          Swal.fire("Deleted!", "Rx medicine has been deleted.", "success");
        } else {
          Swal.fire("Error!", "Failed to delete Rx medicine.", "error");
        }
      } catch (err) {
        Swal.fire("Error!", "An error occurred while deleting Rx medicine.", "error");
      }
    }
  };


  const deleteDrug = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const res = await axios.delete(`${baseurl}deleteDrug/${id}`);
        if (res.data?.success) {
          getdata();
          Swal.fire("Deleted!", "Drug has been deleted.", "success");
        } else {
          Swal.fire("Error!", "Failed to delete drug.", "error");
        }
      } catch (error) {
        Swal.fire("Error!", "An error occurred while deleting.", "error");
      }
    }
  };


  const filteredDrugs = drugs.filter((item) =>
    item.name?.toLowerCase().includes(searchDrug.toLowerCase())
  );

  const filteredRxList = rxList.filter((item) =>
    item.medicineName?.toLowerCase().includes(searchRx.toLowerCase())
  );

  const totalPagesDrugs = Math.ceil(filteredDrugs.length / itemsPerPage);
  const totalPagesRx = Math.ceil(filteredRxList.length / itemsPerPage);

  const paginatedDrugs = filteredDrugs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const paginatedRxList = filteredRxList.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const truncateStyle = {
    maxWidth: "150px",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  };

  // Helper to get category name by id
  const getCategoryName = (id) => {
    const cat = categories.find((c) => String(c.id) === String(id));
    return cat ? cat.name : id;
  };


  return (
    <div className="pc-container">
      <div className="pc-content">
        <div className="container mt-4">
          {activeTab === "tab1" && (
            <div className="d-flex justify-content-between align-items-center mb-3">

            </div>
          )}


          {/* {activeTab === "tab2" && (
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div>
                <button className="btn btn-primary me-2" onClick={() => setModalOpen(true)}>
                  Add Rx Medicine
                </button>
              </div>
            </div>   
          )} */}


          <div className="mb-3">
            <button
              className={`btn me-2 ${activeTab === "tab1" ? "btn-primary" : "btn-outline-primary"}`}
              onClick={() => {
                setActiveTab("tab1");
                setSearchDrug("");
                setCurrentPage(1);
              }}
            >
              Inventory
            </button>
            <button
              className={`btn ${activeTab === "tab2" ? "btn-primary" : "btn-outline-primary"}`}
              onClick={() => {
                setActiveTab("tab2");
                setSearchRx("");
                setCurrentPage(1);
              }}
            >
              Rx Standard List
            </button>
          </div>

          <div className="card table-card">
            <div className="card-body pt-3">
              <div className="table-responsive">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <div style={{ width: "300px",  margin: "15px" }}>
                    <input
                      type="text"
                      className="form-control "
                      placeholder="Search by medicine name"
                      value={activeTab === "tab1" ? searchDrug : searchRx}
                      onChange={(e) => {
                        activeTab === "tab1"
                          ? setSearchDrug(e.target.value)
                          : setSearchRx(e.target.value);
                        setCurrentPage(1);
                      }}
                    />
                  </div>


                 <div className="d-flex gap-2" style={{ margin: "15px" }}>
                    {activeTab === "tab1" && (
                      <>
                        <button className="btn btn-primary" onClick={() => navigate("/Admin/AddInventory")}>
                          Add Inventory
                        </button>
                        <button className="btn btn-primary" onClick={() => navigate("/Admin/Category")}>
                          Categories
                        </button>
                      </>
                    )}
                    {activeTab === "tab2" && (
                      <button className="btn btn-primary" onClick={() => navigate("/Admin/AddRxList")}>
                        Add Rx Medicine
                      </button>
                    )}
                  </div>
                </div>



                {activeTab === "tab1" ? (
                  <>
                    <table className="table">
                      <thead>
                        <tr>
                          <th>Photo</th>
                          <th>ID</th>
                          <th>Category</th>
                          <th>Name</th>
                          <th>Substance</th>
                          <th>Strength</th>
                          <th>Unit</th>
                          <th>Company</th>
                          <th>Quantity</th>
                          <th>Expiry</th>
                          <th>Cost</th>
                          <th>Price</th>
                          <th>Control</th>
                          <th>Barcode</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {paginatedDrugs.map((item, index) => (
                          <tr key={index}>
                            <td>
                              {item.image ? (
                                <img src={`${baseurImage}${item.image}`} alt="Drug" width="40" />


                              ) : (
                                ""
                              )}
                            </td>
                            <td>{item.id}</td>
                            <td>{getCategoryName(item.category)}</td>
                            <td>{item.name}</td>
                            <td style={truncateStyle} title={item.substance}>{item.substance}</td>

                            <td>{item.strength}</td>
                            <td>{item.unit_of_measurement}</td>
                            <td>{item.company}</td>
                            <td>{item.quantity}</td>
                            <td>{new Date(item.expiration_date).toLocaleDateString("en-GB")}</td>
                            <td>{item.cost}</td>
                            <td>{item.price}</td>
                            <td>{item.control === 1 ? "Yes" : "No"}</td>
                            <td>{item.barcode}</td>
                            <td>
                              <NavLink
                                to={`/Admin/ViewInventory/${item.id}`}
                                className="avtar avtar-xs btn-link-secondary viewIcon"
                              >
                                <i className="ti ti-eye f-20" />
                                <span>View</span>
                              </NavLink>

                              <div
                                onClick={() => navigate("/Admin/EditInventory", { state: { drug: item } })}
                                style={{ cursor: "pointer" }}
                                className="avtar avtar-xs btn-link-secondary editIcon"
                              >
                                <i className="ti ti-edit f-20" />
                                <span>Edit</span>
                              </div>

                              <div
                                style={{ cursor: "pointer" }}
                                className="avtar avtar-xs btn-link-secondary deleteIcon"
                                onClick={() => deleteDrug(item.id)}
                              >
                                <i className="ti ti-trash f-20" />
                                <span>Delete</span>
                              </div>
                            </td>

                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <div className="d-flex justify-content-end mt-3">
                      <Pagination currentPage={currentPage} totalPages={totalPagesDrugs} setCurrentPage={setCurrentPage} />
                    </div>


                  </>
                ) : (
                  <>
                    <table className="table table-hover">
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Medicine</th>
                          <th>Strength</th>
                          <th>Unit</th>
                          <th>Form</th>
                          <th>Route</th>
                          <th>Substance</th>
                          <th>Type</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {paginatedRxList.map((item, index) => (
                          <tr key={index}>
                            <td>{item.rxId}</td>
                            <td>{item.medicineName}</td>
                            <td>{item.strength}</td>
                            <td>{item.unit}</td>
                            <td style={truncateStyle} title={item.form}>{item.form}</td>
                            <td>{item.route}</td>
                            <td style={truncateStyle} title={item.activeSubstances}>{item.activeSubstances}</td>
                            <td>{item.productType}</td>
                            <td>
                              <NavLink
                                to={`/Admin/ViewRx/${item.rxId}`} // Send rxId in the URL path
                                className="avtar avtar-xs btn-link-secondary viewIcon"
                              >
                                <i className="ti ti-eye f-20" />
                                <span>View</span>
                              </NavLink>


                              <div
                                onClick={() => deleteRxMedicine(item.rxId)}
                                style={{ cursor: "pointer" }}
                                className="avtar avtar-xs btn-link-secondary deleteIcon"
                              >
                                <i className="ti ti-trash f-20" />
                                <span>Delete</span>
                              </div>
                            </td>

                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <div className="d-flex justify-content-end mt-3">
                      <Pagination currentPage={currentPage} totalPages={totalPagesRx} setCurrentPage={setCurrentPage} />
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {viewModalOpen && viewItem && (
            <div className="modal show" style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}>
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Drug Details</h5>
                    <button type="button" className="btn-close" onClick={() => setViewModalOpen(false)}></button>
                  </div>
                  <div className="modal-body">
                    {activeTab === "tab1" ? (
                      <>
                        <p><strong>Name:</strong> {viewItem.name}</p>
                        <p><strong>Substance:</strong> {viewItem.substance}</p>
                        <p><strong>Company:</strong> {viewItem.company}</p>
                        <p><strong>Strength:</strong> {viewItem.strength}</p>
                        <p><strong>Cost:</strong> {viewItem.cost}</p>
                        <p><strong>Price:</strong> {viewItem.price}</p>
                        <p><strong>Expiry:</strong> {new Date(viewItem.expiration_date).toLocaleDateString("en-GB")}</p>
                        <img src={`${baseurImage}${viewItem.image}`} alt="drug" width="100%" />
                      </>
                    ) : (
                      <>
                        <p><strong>Medicine Name:</strong> {viewItem.medicineName}</p>
                        <p><strong>Strength:</strong> {viewItem.strength}</p>
                        <p><strong>Unit:</strong> {viewItem.unit}</p>
                        <p><strong>Pharmaceutical Form:</strong> {viewItem.form}</p>
                        <p><strong>Frequency:</strong> {viewItem.frequency}</p>
                        <p><strong>Duration:</strong> {viewItem.duration}</p>
                        <p><strong>Notes:</strong> {viewItem.notes}</p>
                        <p><strong>Route:</strong> {viewItem.route}</p>
                        <p><strong>Product Type:</strong> {viewItem.productType}</p>
                        <p><strong>Active Substances:</strong> {viewItem.activeSubstances}</p>
                      </>
                    )}
                  </div>

                </div>
              </div>
            </div>
          )}

          <div className={`modal ${modalOpen ? "show" : ""}`} style={{ display: modalOpen ? "block" : "none", backgroundColor: "rgba(0,0,0,0.5)" }}>
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">{editId ? "Edit Drug" : "Add Item"}</h5>
                  <button type="button" className="btn-close" onClick={() => setModalOpen(false)}></button>
                </div>
                <div className="modal-body">
                  <div className="container">
                    <form>
                      <div className="row">
                        {activeTab === "tab1" ? (
                          <>
                            {["name", "substance", "unit_of_measurement", "company", "quantity", "category", "strength", "expiration_date", "cost", "price"].map((field, idx) => (
                              <div className="col-md-4 mb-3" key={idx}>
                                <label>{field.replace("_", " ").toUpperCase()}</label>
                                <input
                                  type={field === "expiration_date" ? "date" : "text"}
                                  name={field}
                                  value={data[field] || ""}
                                  className="form-control"
                                  onChange={handlechange}
                                />
                              </div>
                            ))}
                            <div className="col-md-4 mb-3">
                              <label>Image</label>
                              <input
                                type="file"
                                name="image"
                                className="form-control"
                                onChange={(e) => setImageFile(e.target.files[0])}
                              />
                            </div>
                          </>
                        ) : (
                          <>
                            {[
                              "medicine_name",
                              "strength",
                              "unit",
                              "pharmaceutical_form",
                              "frequency",
                              "duration",
                              "notes",
                              "route",
                              "product_type",
                              "active_substances",
                            ].map((field, idx) => (
                              <div className="col-md-6 mb-3" key={idx}>
                                <label>{field.replace("_", " ").toUpperCase()}</label>
                                <input
                                  type="text"
                                  name={field}
                                  value={data[field] || ""}
                                  className="form-control"
                                  onChange={handlechange}
                                />
                              </div>
                            ))}
                          </>
                        )}
                      </div>
                    </form>

                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setModalOpen(false)}>
                    Close
                  </button>
                  <button type="button" className="btn btn-primary" onClick={apihitnav}>
                    {editId ? "Update Drug" : "Add Drug"}
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

function Pagination({ currentPage, totalPages, setCurrentPage }) {
  return (
    <div className="d-flex align-items-center gap-3">
      <button
        className="btn btn-sm btn-outline-primary"
        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        disabled={currentPage === 1}
      >
        &lt;&lt;
      </button>
      <span>{currentPage}</span>
      <button
        className="btn btn-sm btn-outline-primary"
        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
        disabled={currentPage === totalPages}
      >
        &gt;&gt;
      </button>
    </div>
  );
}
