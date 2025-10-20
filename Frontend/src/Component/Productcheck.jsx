import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "./Productcheck.css";

export default function Productcheck() {
  const [current, setCurrent] = useState(0);
  const [zoom, setZoom] = useState(false);
  const [product, setProduct] = useState(null);

  //  Get selected product from Redux
  const reduxProduct = useSelector((state) => state.product.selectedProduct);

  //  On mount → Check Redux or localStorage
  useEffect(() => {
    if (reduxProduct) {
      setProduct(reduxProduct);
      localStorage.setItem("selectedProduct", JSON.stringify(reduxProduct)); // Save in localStorage
    } else {
      const saved = localStorage.getItem("selectedProduct");
      if (saved) {
        setProduct(JSON.parse(saved)); // Load from localStorage
      }
    }
  }, [reduxProduct]);

  //  If still no product → show fallback
  if (!product) {
    return <p>No product selected</p>;
  }

  //  Handle multiple images
  let images = [];
  if (Array.isArray(product.images) && product.images.length > 0) {
    // Case: product.images = ["url1", "url2", "url3", ...]
    if (typeof product.images[0] === "string") {
      images = product.images;
    }
    // Case: product.images = [{url: "..."}, {url: "..."}]
    else if (typeof product.images[0] === "object" && product.images[0].url) {
      images = product.images.map((img) => img.url);
    }
  } else if (product.image) {
    // Fallback to single image
    images = [product.image];
  }

  const handleShare = async () => {
    const url = window.location.href;
    const title = `Check out ${product.name}`;
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
      {/*  Thumbnails */}
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

      {/*  Main Image */}
      <div className={`main-image ${zoom ? "zoomed" : ""}`}>
        <img
          src={images[current]}
          alt="main"
          className="big-image"
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/400x400?text=No+Image";
          }}
        />

        {/* Overlays */}
        <div className="top-overlay">
          <span className="title">{product.name}</span>
          <span className="highlight">
            ${product.priceNow || product.price}
          </span>
        </div>

        <div className="bottom-overlay">
          <span>Old Price</span>
          <span className="highlight">
            {product.priceOld ? `$${product.priceOld}` : "-"}
          </span>
        </div>

        {/* Arrows */}
        {images.length > 1 && (
          <>
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
          </>
        )}

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
