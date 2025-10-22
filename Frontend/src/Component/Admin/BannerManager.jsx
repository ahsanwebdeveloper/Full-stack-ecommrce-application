import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Manager.css";

export default function BannerManager() {
  const [banners, setBanners] = useState([]);
  const [image, setImage] = useState(null);

  const fetchBanners = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/banners/banner");
      setBanners(res.data.data || []);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => { fetchBanners(); }, []);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!image) return alert("Please select an image");
    const form = new FormData();
    form.append("image", image);
    try {
      await axios.post("http://localhost:5000/api/banners", form);
      fetchBanners();
      setImage(null);
    } catch (err) {
      console.error("Upload error:", err);
    }
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/banners/${id}`);
    fetchBanners();
  };

  return (
    <div className="manager-container">
      <h2>Manage Banners</h2>
      <form onSubmit={handleUpload} className="upload-form">
        <input type="file" onChange={(e) => setImage(e.target.files[0])} />
        <button type="submit">Upload</button>
      </form>

      <div className="grid-container">
        {banners.map((b) => (
          <div key={b._id} className="card">
            <img src={b.image} alt="banner" />
            <p>{b.category || "No Category"}</p>
            <button onClick={() => handleDelete(b._id)} className="delete-btn">Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}