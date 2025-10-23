import React, { useRef, useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../features/cart/cartSlice";
import { setSelectedProduct } from "../features/cart/productSlice";
import axios from "axios";
import "./Clothe.css";

const ProductSlider = ({ products: categoryProducts, title }) => {
  const sliderRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  // 🔹 Fetch fashion products from API
  useEffect(() => {
    const fetchFashionProducts = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/products/category/fashion"
        );
        console.log("Fetched fashion products:", res.data);
        setProducts(res.data.products || []);
      } catch (error) {
        console.error("Error fetching fashion products:", error);
      }
    };
    fetchFashionProducts();
  }, []);

  // 🔹 Use either passed props or fetched products
  const data =
    categoryProducts && categoryProducts.length > 0
      ? categoryProducts
      : products;

  // 🛒 Add to cart handler
  const handleAddToCart = (p) => {
    const mainImage =
      p.image ||
      (p.images?.length > 0
        ? p.images[0].url || p.images[0]
        : "https://via.placeholder.com/300x300?text=No+Image");

    const productData = {
      id: p._id || p.id,
      name: p.name,
      price: p.price,
      image: mainImage.startsWith("http")
        ? mainImage
        : `http://localhost:5000/${mainImage}`,
      quantity: 1,
    };

    dispatch(addToCart(productData));
  };

  // 🔹 Product click → set Redux + navigate
  const handleProductClick = (p) => {
    const allImages =
      p.images && p.images.length > 0
        ? p.images.map((img) =>
            (img.url || img).startsWith("http")
              ? img.url || img
              : `http://localhost:5000/${img.url || img}`
          )
        : ["https://via.placeholder.com/400x400?text=No+Image"];

    const mainImage =
      allImages[0] || "https://via.placeholder.com/400x400?text=No+Image";

    const productData = {
      id: p._id || p.id,
      name: p.name,
      brand: p.brand || "LHRIVER",
      price: p.price,
      oldPrice: p.oldPrice || p.oldprice || null,
      description: p.description || "No description available.",
      category: p.category || "Uncategorized",
      stock: p.stock || 0,
      rating: p.rating || 4.5,
      reviews: p.reviews || [],
      colors: p.colors || ["Black", "Silver"],
      sizes: p.sizes || ["S", "M", "L"],
      seller: p.seller || "Official LHRIVER Store",
      details: p.details || [
        "High-quality product",
        "Great value for money",
        "Customer favorite",
      ],
      specs: p.specs || {
        surfaceWidth: "N/A",
        cookingArea: "N/A",
        burners: "N/A",
        fuelType: "N/A",
        btu: "N/A",
      },
      images: allImages,
      mainImage,
      quantity: 1,
    };

    dispatch(setSelectedProduct(productData));
    localStorage.setItem("selectedProduct", JSON.stringify(productData));
    navigate("/checkout");
  };

  // 🔹 Smooth horizontal scroll
  const scroll = (direction) => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: direction === "left" ? -300 : 300,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="slider-container">
      {title && <h2 className="slider-title">{title}</h2>}

      {/* Left Arrow */}
      <button className="scroll-btn left" onClick={() => scroll("left")}>
        <FaChevronLeft />
      </button>

      {/* Product Cards */}
      <div className="product-slider" ref={sliderRef}>
        {data.map((p) => {
          const imageSrc =
            p.image ||
            (p.images?.length > 0
              ? p.images[0].url || p.images[0]
              : "https://via.placeholder.com/300x300?text=No+Image");

          const finalSrc = imageSrc.startsWith("http")
            ? imageSrc
            : `http://localhost:5000/${imageSrc}`;

          return (
            <div className="product-card" key={p._id || p.id}>
              <div className="img-wrap" onClick={() => handleProductClick(p)}>
                <img
                  src={finalSrc}
                  alt={p.name || "Product"}
                  onError={(e) => {
                    e.target.src =
                      "https://via.placeholder.com/300x300?text=No+Image";
                  }}
                />
                <button className="heart">♡</button>
              </div>

              <div className="price-line">
                <span className="now">Now ${p.price}</span>
                {p.oldprice && <span className="old">${p.oldprice}</span>}
              </div>

              {p.unit && <div className="unit">{p.unit}</div>}
              <p className="name">{p.name}</p>

              <button className="add-btn" onClick={() => handleAddToCart(p)}>
                + Add
              </button>
            </div>
          );
        })}
      </div>

      {/* Right Arrow */}
      <button className="scroll-btn right" onClick={() => scroll("right")}>
        <FaChevronRight />
      </button>
    </div>
  );
};

export default ProductSlider;
