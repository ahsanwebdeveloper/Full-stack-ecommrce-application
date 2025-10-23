import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Manager.css";

export default function BannerManager() {
  const [banners, setBanners] = useState([]);
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState("");
  const [link, setLink] = useState("");

  //  Fetch all banners
  const fetchBanners = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/banners/banner");
      setBanners(res.data.data || []);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  //  Upload banner
  const handleUpload = async (e) => {
    e.preventDefault();
    if (!image || !category.trim()) {
      return alert("Please select an image and enter a category!");
    }

    try {
      const form = new FormData();
      form.append("image", image);
      form.append("category", category.trim());
      if (link.trim()) form.append("link", link.trim());

      await axios.post("http://localhost:5000/api/banners/banner", form);
      alert(" Banner uploaded successfully!");
      setImage(null);
      setCategory("");
      setLink("");
      fetchBanners();
    } catch (err) {
      console.error("Upload error:", err);
      alert(" Failed to upload banner");
    }
  };

  // 🔹 Delete banner
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this banner?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/banners/banner/${id}`);
      alert(" Banner deleted successfully!");
      fetchBanners();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  return (
    <div className="manager-container">
      <h2>Manage Banners</h2>

      {/* Upload Form */}
      <form onSubmit={handleUpload} className="upload-form">
        <div className="form-row">
          <input
            type="text"
            placeholder="Category (e.g. tech, fashion)"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Optional Link (e.g. /category/tech)"
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            required
          />
        </div>

        <div className="btn-group">
          <button type="submit">Upload Banner</button>
        </div>
      </form>

      {/* Banner Grid */}
      <div className="grid-container">
        {banners.length === 0 ? (
          <p>No banners found.</p>
        ) : (
          banners.map((b) => (
            <div key={b._id} className="card">
              <img
                src={b.image}
                alt={b.category}
                className="banner-img"
                onError={(e) =>
                  (e.target.src =
                    "https://via.placeholder.com/400x200?text=No+Image")
                }
              />
              <h3>{b.category}</h3>
              {b.link && (
                <a
                  href={b.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="banner-link"
                >
                  {b.link}
                </a>
              )}
              <button
                onClick={() => handleDelete(b._id)}
                className="delete-btn"
              >
                 Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}