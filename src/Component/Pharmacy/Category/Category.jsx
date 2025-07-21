import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseurl } from "../../../Baseurl";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function Category() {
  const [categoryData, setCategoryData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [viewItem, setViewItem] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ name: "", description: "" });
  const [editId, setEditId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

  const getCategory = async () => {
    try {
      const res = await axios.get(`${baseurl}/getAllCategories`);
      setCategoryData(res.data.data || []);
    } catch (error) {
      console.error("Error fetching categories:", error);
      Swal.fire("Error", "Failed to load categories", "error");
    }
  };

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This category will be deleted permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        await axios.delete(`${baseurl}/deleteCategory/${id}`);
        Swal.fire("Deleted!", "Category has been deleted.", "success");
        getCategory();
      } catch (error) {
        console.error("Delete failed", error);
        Swal.fire("Error", "Something went wrong!", "error");
      }
    }
  };

  const handleAddEdit = async (e) => {
    e.preventDefault();
    try {
      if (editMode) {
        await axios.put(`${baseurl}/updateCategory/${editId}`, formData);
        Swal.fire("Success", "Category updated successfully", "success");
      } else {
        await axios.post(`${baseurl}/addCategories`, formData);
        Swal.fire("Success", "Category added successfully", "success");
      }
      resetForm();
      getCategory();
    } catch (error) {
      console.error("Submit failed", error);
      Swal.fire("Error", "Something went wrong!", "error");
    }
  };

  const handleEdit = (item) => {
    setFormData({ name: item.name, description: item.description || "" });
    setEditId(item.id);
    setEditMode(true);
    setModalOpen(true);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setFormData({ name: "", description: "" });
    setEditMode(false);
    setEditId(null);
    setModalOpen(false);
  };

  useEffect(() => {
    getCategory();
  }, []);

 
  const filteredCategories = categoryData.filter((category) =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
   <div className="pc-container">
  <div className="pc-content">
    <div className="row">
      <div className="col-12">
        <div className="col-12 searchParent">
          <h5 className="" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span
              style={{ cursor: 'pointer', color: '#007bff', fontWeight: 'bold', fontSize: '1.5rem' }}
              onClick={() => navigate(-1)}
              title="Back"
            >
              &larr;
            </span>
            Category List
          </h5>
        </div>

        <div className="table-card patientCardHeader">
          <div className="d-flex justify-content-between align-items-center mb-3">
            
            {/* Search Input */}
            <div style={{ width: "300px", margin: "15px" }}>
              <input
                type="text"
                placeholder="Search by name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="form-control"
              />
            </div>

            {/* Action Buttons */}
            <div className="d-flex align-items-center gap-2" style={{ margin: "15px" }}>
              <button className="btn btn-primary" onClick={() => setModalOpen(true)}>
                Add Category
              </button>
            </div>

          </div>
              <table className="table">
                <thead>
                  <tr className="text-center">
                    <th>Sr No.</th>
                    <th>Category Name</th>
                    <th>Description</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCategories.length > 0 ? (
                    filteredCategories.map((item, index) => (
                      <tr key={item.id} className="text-center">
                        <td>{index + 1}</td>
                        <td>{item.name}</td>
                        <td>{item.description || "N/A"}</td>
                        <td>
                          <div className="d-flex justify-content-center gap-2">
                            <div
                              className="avtar avtar-xs viewIcon"
                              style={{ cursor: "pointer" }}
                              onClick={() => {
                                setViewItem(item);
                                setViewModalOpen(true);
                              }}
                            >
                              <i className="ti ti-eye f-20" />
                              <span className="ms-1">View</span>
                            </div>
                            <div
                              className="avtar avtar-xs btn-link-secondary editIcon"
                              style={{ cursor: "pointer" }}
                              onClick={() => handleEdit(item)}
                            >
                              <i className="ti ti-edit f-20" />
                              <span className="ms-1">Edit</span>
                            </div>
                            <div
                              className="avtar avtar-xs btn-link-secondary deleteIcon"
                              style={{ cursor: "pointer" }}
                              onClick={() => handleDelete(item.id)}
                            >
                              <i className="ti ti-trash f-20" />
                              <span className="ms-1">Delete</span>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="text-center">
                        No categories found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {modalOpen && (
        <div
          className="modal fade show"
          style={{
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "block",
          }}
        >
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{editMode ? "Edit Category" : "Add Category"}</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={resetForm}
                ></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleAddEdit}>
                  <div className="mb-3">
                    <label>Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3">
                    <label>Description</label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      required
                      className="form-control"
                    />
                  </div>
                  <div className="d-flex justify-content-end">
                    <button
                      type="button"
                      className="btn btn-secondary me-2"
                      onClick={resetForm}
                    >
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-primary">
                      {editMode ? "Update" : "Add"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View Modal */}
      {viewModalOpen && viewItem && (
        <div
          className="modal fade show"
          style={{
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "block",
          }}
        >
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Category Details</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => {
                    setViewModalOpen(false);
                    setViewItem(null);
                  }}
                ></button>
              </div>
              <div className="modal-body">
                <p>
                  <strong>Name:</strong> {viewItem.name}
                </p>
                <p>
                  <strong>Description:</strong> {viewItem.description || "N/A"}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal CSS */}
      <style>{`
        .custom-modal {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background-color: rgba(0,0,0,0.4);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 9999;
          overflow-y: auto;
        }
        .modal-content {
          background: #fff;
          border-radius: 8px;
          width: 100%;
          max-width: 500px;
        }
        .avtar {
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .btn-link-secondary {
          color: #007bff;
        }
        .btn-link-secondary:hover {
          color: #0056b3;
        }
      `}</style>
    </div>
  );
}
