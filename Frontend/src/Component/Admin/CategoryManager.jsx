import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Manager.css";

export default function CategoryManager() {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    oldprice: "",
    category: "tech",
    color: "",
    size: "",
    brandname: "",
    productquantity: "",
  });
  const [images, setImages] = useState([]);
  const [editId, setEditId] = useState(null);

  // 🔹 Fetch tech products
  const fetchProducts = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/products/category/tech"
      );
      setProducts(res.data.products || []);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // 🔹 Handle form input changes
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // 🔹 Handle image upload
  const handleImageChange = (e) => {
    setImages(Array.from(e.target.files));
  };

  // 🔹 Add or Update Product
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const form = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        form.append(key, value);
      });
      images.forEach((img) => form.append("images", img));

      if (editId) {
        await axios.put(
          `http://localhost:5000/api/products/update/${editId}`,
          form
        );
        alert(" Product updated successfully!");
      } else {
        await axios.post("http://localhost:5000/api/products/add", form);
        alert(" Product added successfully!");
      }

      setFormData({
        name: "",
        price: "",
        oldprice: "",
        category: "tech",
        color: "",
        size: "",
        brandname: "",
        productquantity: "",
      });
      setImages([]);
      setEditId(null);
      fetchProducts();
    } catch (error) {
      console.error("Error saving product:", error);
      alert(" Something went wrong!");
    }
  };

  // 🔹 Edit Product
  const handleEdit = (item) => {
    setEditId(item._id);
    setFormData({
      name: item.name,
      price: item.price,
      oldprice: item.oldprice || "",
      category: item.category,
      color: item.color || "",
      size: item.size || "",
      brandname: item.brandname || "",
      productquantity: item.productquantity || "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // 🔹 Delete Product
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await axios.delete(`http://localhost:5000/api/products/delete/${id}`);
        alert("🗑️ Product deleted successfully!");
        fetchProducts();
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };

  return (
    <div className="manager-container">
      <h2> Manage Tech Products</h2>

      {/*  Form */}
      <form onSubmit={handleSubmit} className="upload-form">
        <div className="form-row">
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="oldprice"
            placeholder="Old Price"
            value={formData.oldprice}
            onChange={handleChange}
          />
        </div>

        <div className="form-row">
          <input
            type="text"
            name="brandname"
            placeholder="Brand Name"
            value={formData.brandname}
            onChange={handleChange}
          />
          <input
            type="text"
            name="color"
            placeholder="Color"
            value={formData.color}
            onChange={handleChange}
          />
          <input
            type="text"
            name="size"
            placeholder="Size"
            value={formData.size}
            onChange={handleChange}
          />
        </div>

        <div className="form-row">
          <input
            type="number"
            name="productquantity"
            placeholder="Quantity"
            value={formData.productquantity}
            onChange={handleChange}
          />
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>

        <div className="btn-group">
          <button type="submit">{editId ? "Update Product" : "Add Product"}</button>
          {editId && (
            <button
              type="button"
              className="cancel-btn"
              onClick={() => {
                setEditId(null);
                setFormData({
                  name: "",
                  price: "",
                  oldprice: "",
                  category: "tech",
                  color: "",
                  size: "",
                  brandname: "",
                  productquantity: "",
                });
                setImages([]);
              }}
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* 🔹 Product Grid */}
      <div className="grid-container">
        {products.length === 0 ? (
          <p>No products found in this category.</p>
        ) : (
          products.map((item) => (
            <div key={item._id} className="card">
              <img
                src={
                  item.images && item.images.length > 0
                    ? item.images[0].url
                    : "https://via.placeholder.com/200x200?text=No+Image"
                }
                alt={item.name}
              />
              <h3>{item.name}</h3>
              <p><b>Brand:</b> {item.brandname || "N/A"}</p>
              <p><b>Price:</b> ${item.price}</p>
              {item.oldprice && <p><b>Old Price:</b> ${item.oldprice}</p>}
              <p><b>Color:</b> {item.color || "N/A"}</p>
              <p><b>Size:</b> {item.size || "N/A"}</p>
              <p><b>Qty:</b> {item.productquantity || 0}</p>

              <div className="btn-group">
                <button className="edit-btn" onClick={() => handleEdit(item)}>
                   Edit
                </button>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(item._id)}
                >
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
