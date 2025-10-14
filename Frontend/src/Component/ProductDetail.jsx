import React from "react";
import { useSelector } from "react-redux";
import "./ProductDetail.css";

export default function ProductDetail() {
  const product = useSelector((state) => state.product.selectedProduct);

  if (!product) {
    return <div className="product-detail-container">No product selected</div>;
  }

  return (
    <div className="product-detail-container">
      {/* Clearance Label */}
      <div className="label">Clearance</div>

      {/* Title */}
      <h2 className="product-title">
        <a href="#">{product.brand}</a> {product.name}
      </h2>

      {/* Rating (example, static for now) */}
      <div className="rating-section">
        <span className="stars">⭐⭐⭐⭐⭐</span>
        <span className="rating-value">(5.0)</span>
        <a href="#" className="rating-count">3 ratings</a>
      </div>

      {/* Variations */}
      <div className="variation-section">
        <div className="actual-color">
          Actual Color: <strong>{product.colors[0]}</strong>
        </div>
        <div className="variation-options">
          <div className="option selected">
            <div className="option-name">{product.name}</div>
            <div className="option-price">${product.price}</div>
            {product.oldPrice && (
              <div className="option-old-price">${product.oldPrice}</div>
            )}
          </div>
        </div>
      </div>

      {/* About this item */}
      <div className="about-section">
        <h4>About this item</h4>
        <ul>
          {product.details.map((d, i) => (
            <li key={i}>{d}</li>
          ))}
        </ul>
        <a href="#" className="full-details-link">View full item details</a>
      </div>

      {/* Quick Glance */}
      <div className="glance-section">
        <h4>At a glance</h4>
        <div className="glance-grid">
          <div className="glance-item">
            <div className="label">Brand</div>
            <div className="value">{product.brand}</div>
          </div>
          <div className="glance-item">
            <div className="label">Cooking surface width</div>
            <div className="value">{product.specs.surfaceWidth}</div>
          </div>
          <div className="glance-item">
            <div className="label">Total cooking area</div>
            <div className="value">{product.specs.cookingArea}</div>
          </div>
          <div className="glance-item">
            <div className="label">Number of burners</div>
            <div className="value">{product.specs.burners}</div>
          </div>
          <div className="glance-item">
            <div className="label">Fuel type</div>
            <div className="value">{product.specs.fuelType}</div>
          </div>
          <div className="glance-item">
            <div className="label">BTU Output</div>
            <div className="value">{product.specs.btu}</div>
          </div>
          <div className="glance-item">
            <div className="label">Seller</div>
            <div className="value">{product.seller}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
