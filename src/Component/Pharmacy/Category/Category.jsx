import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseurl } from "../../../Baseurl"; 

export default function Category() {
  const [categoryName, setCategoryName] = useState("");
  const [categories, setCategories] = useState([]);
  const [editId, setEditId] = useState(null);

  // Get all categories
  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${baseurl}/getcategory`);
      setCategories(res.data);
    } catch (error) {
      console.error("Fetch Error:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!categoryName) return;

    try {
      if (editId) {
        
        await axios.put(`${baseurl}/updatecategory/${editId}`, { name: categoryName });
      } else {
      
        await axios.post(`${baseurl}/addcategory`, { name: categoryName });
      }

      setCategoryName("");
      setEditId(null);
      fetchCategories();
    } catch (error) {
      console.error("Save Error:", error);
    }
  };

  
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure to delete this category?")) return;

    try {
      await axios.delete(`${baseurl}/deletecategory/${id}`);
      fetchCategories();
    } catch (error) {
      console.error("Delete Error:", error);
    }
  };

 
  const handleEdit = (category) => {
    setCategoryName(category.name);
    setEditId(category.id);
  };

  return (
    <div className="pc-container">
      <div className="pc-content">
        <div className="container mt-4">
          <h4>📁 Category Management</h4>

          
          <form onSubmit={handleSubmit} className="mb-4">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Enter Category Name"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
              />
              <button type="submit" className="btn btn-primary">
                {editId ? "Update" : "Save"}
              </button>
            </div>
          </form>

         
          <table className="table table-bordered">
            <thead>
              <tr>
                <th style={{ width: "10%" }}>#</th>
                <th>Name</th>
                <th style={{ width: "20%" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((cat, index) => (
                <tr key={cat.id}>
                  <td>{index + 1}</td>
                  <td>{cat.name}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-warning me-2"
                      onClick={() => handleEdit(cat)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(cat.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}

              {categories.length === 0 && (
                <tr>
                  <td colSpan="3" className="text-center text-muted">
                    No categories found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
