import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Manager.css";

export default function CategoryManager() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [editId, setEditId] = useState(null);

  // Fetch all products in category "tech"
  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/products/category/tech");
      setCategories(res.data.products || []);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Add or Update Category
  const handleUpload = async (e) => {
    e.preventDefault();

    try {
      const form = new FormData();
      form.append("name", name);
      if (image) form.append("image", image);

      if (editId) {
        // Update existing category
        await axios.put(`http://localhost:5000/api/category/update/${editId}`, form);
        alert("Category updated successfully!");
      } else {
        // Add new category
        await axios.post("http://localhost:5000/api/category/add", form);
        alert("Category added successfully!");
      }

      setName("");
      setImage(null);
      setEditId(null);
      fetchCategories();
    } catch (error) {
      console.error("Error saving category:", error);
      alert("Something went wrong!");
    }
  };

  // Delete category
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        await axios.delete(`http://localhost:5000/api/category/delete/${id}`);
        alert("Category deleted successfully!");
        fetchCategories();
      } catch (error) {
        console.error("Error deleting category:", error);
      }
    }
  };

  // Edit category
  const handleEdit = (category) => {
    setEditId(category._id);
    setName(category.name);
  };

  return (
    <div className="manager-container">
      <h2>Tech Category Products</h2>

      {/* Form for Add/Edit */}
      <form onSubmit={handleUpload} className="upload-form">
        <input
          type="text"
          placeholder="Category Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input type="file" onChange={(e) => setImage(e.target.files[0])} />
        <button type="submit">{editId ? "Update" : "Add"}</button>
        {editId && (
          <button
            type="button"
            className="cancel-btn"
            onClick={() => {
              setEditId(null);
              setName("");
              setImage(null);
            }}
          >
            Cancel
          </button>
        )}
      </form>

      {/* Display all products */}
      <div className="grid-container">
        {categories.length === 0 ? (
          <p>No products found in this category.</p>
        ) : (
          categories.map((item) => (
            <div key={item._id} className="card">
              <img
                src={
                  item.images && item.images.length > 0
                    ? item.images[0].url
                    : item.imageUrl || "https://via.placeholder.com/150"
                }
                alt={item.name}
              />
              <h3>{item.name}</h3>
              <p> Price: ${item.price}</p>
              <p>Brand: {item.brandname || "N/A"}</p>
              <p>Color: {item.color || "N/A"}</p>
              <p>Size: {item.size || "N/A"}</p>

              <div className="btn-group">
                <button className="edit-btn" onClick={() => handleEdit(item)}>
                   Edit
                </button>
                <button className="delete-btn" onClick={() => handleDelete(item._id)}>
                   Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
