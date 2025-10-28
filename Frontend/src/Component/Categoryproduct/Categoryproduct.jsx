
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Categoryproduct.css";

function Categoryproduct() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/banners/banner");

        console.log("API Response:", res.data); // 👈 Debug once to confirm

        // ✅ handle any possible shape
        const data =
          Array.isArray(res.data)
            ? res.data
            : res.data?.data || res.data?.banners || [];

        // ✅ Filter only category-based banners
        const categoryBanners = data.filter(
          (item) => item.category && item.category.trim() !== ""
        );

        // ✅ Limit to 8
        setCategories(categoryBanners.slice(0, 8));
      } catch (error) {
        console.error("Error fetching category banners:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="category-main">
      <div className="category-grid">
        {categories.map((p) => (
          <div className="category-card" key={p._id}>
            <div className="image-card">
              <img
                src={p.image}
                alt={p.category}
                className="category-image"
              />
            </div>
            <p className="category-name">{p.category}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Categoryproduct;
