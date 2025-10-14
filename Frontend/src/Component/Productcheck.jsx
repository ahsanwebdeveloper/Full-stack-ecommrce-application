import React, { useState } from "react";
import { useSelector } from "react-redux";
import "./Productcheck.css";

export default function Productcheck() {
  const [current, setCurrent] = useState(0);
  const [zoom, setZoom] = useState(false);

  // Redux se selected product lao
  const product = useSelector((state) => state.product.selectedProduct);

  // agar product null hai to fallback
  if (!product) {
    return <p>No product selected</p>;
  }

  const images = product.images || [product.image]; // agar multiple ho to array, warna ek image

  const handleShare = async () => {
    const url = window.location.href;
    const title = "Check out this product";
    if (navigator.share) {
      try {
        await navigator.share({ title, url });
      } catch (err) {
        console.log("Share cancelled", err);
      }
    } else {
      alert(`Copy this link: ${url}`);
    }
  };

  return (
    <div className="gallery">
      {/* Thumbnails */}
      <div className="thumbs">
        {images.map((img, i) => (
          <img
            key={i}
            src={img}
            alt={`thumb-${i}`}
            className={current === i ? "active" : ""}
            onClick={() => setCurrent(i)}
          />
        ))}
      </div>

      {/* Main Image */}
      <div className={`main-image ${zoom ? "zoomed" : ""}`}>
        <img src={images[current]} alt="main" className="big-image" />

        {/* Overlays */}
        <div className="top-overlay">
          <span className="title">{product.name}</span>
          <span className="highlight">{product.priceNow}</span>
        </div>

        <div className="bottom-overlay">
          <span>Old Price</span>
          <span className="highlight">{product.priceOld}</span>
        </div>

        {/* Arrows */}
        <button
          className="nav left"
          onClick={() =>
            setCurrent((current - 1 + images.length) % images.length)
          }
        >
          &#10094;
        </button>
        <button
          className="nav right"
          onClick={() => setCurrent((current + 1) % images.length)}
        >
          &#10095;
        </button>

        {/* Action buttons */}
        <div className="action-buttons">
          <button className="icon" onClick={() => alert("Added to wishlist")}>
            &#9825;
          </button>
          <button className="icon" onClick={handleShare}>
            &#128257;
          </button>
          <button className="icon" onClick={() => setZoom(!zoom)}>
            &#128269;
          </button>
        </div>
      </div>
    </div>
  );
}
