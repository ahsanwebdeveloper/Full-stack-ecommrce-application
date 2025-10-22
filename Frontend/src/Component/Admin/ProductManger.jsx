import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Manager.css";

export default function ProductManager() {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/products");
      setProducts(res.data.products || []); // use correct field
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="manager-container">
      <h2>All Products</h2>
      <div className="grid-container">
        {products.length === 0 ? (
          <p>No products found</p>
        ) : (
          products.map((p) => (
            <div key={p._id} className="card">
              <img
                src={
                  p.images && p.images.length > 0
                    ? p.images[0].url
                    : p.imageUrl || "https://via.placeholder.com/150"
                }
                alt={p.name}
              />
              <h3>{p.name}</h3>
              <p>💰 ${p.price}</p>
              <p>📦 {p.category}</p>
              <p>Brand: {p.brandname}</p>
              <p>Available: {p.productquantity}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
