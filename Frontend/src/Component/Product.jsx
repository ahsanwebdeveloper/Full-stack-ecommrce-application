import React, { useRef, useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { setSelectedProduct } from "../features/cart/productSlice";
import "./Product.css";

function HalloweenScroll() {
  const scrollRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);

  //  Fetch Halloween products from backend
  useEffect(() => {
    const fetchHalloweenProducts = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/products/category/fashion"
        );
        console.log(" Fetched Halloween products:", res.data);
        setProducts(res.data.products || []);
      } catch (error) {
        console.error("Error fetching Halloween products:", error);
      }
    };
    fetchHalloweenProducts();
  }, []);

  // 🔹 On product click → Save to Redux + Navigate
  const handleProductClick = (item) => {
    dispatch(
      setSelectedProduct({
        id: item._id || item.id,
        name: item.name || item.title,
        image:
          item.image ||
          (item.images && item.images.length > 0 ? item.images[0].url : ""),
        price: item.price,
        oldPrice: item.oldprice || null,
        quantity: 1,
        brand: item.brand || "Halloween Special ",
        seller: item.seller || "Official LHRIVER Store",
        colors: item.colors || ["Orange", "Black"],
        details: item.details || [
          "Spooky vibes included",
          "Limited Halloween Edition",
        ],
        specs: item.specs || {
          theme: "Halloween 2025",
          material: "Pumpkin Fiber",
          special: "Glow in the Dark",
        },
      })
    );
    navigate("/checkout");
  };

  //  Scroll Controls
  const handleWheel = (e) => {
    if (scrollRef.current) {
      e.preventDefault();
      scrollRef.current.scrollLeft += e.deltaY;
    }
  };

  const scroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -300 : 300,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="scroll-container">
      <h2 className="title">All the Halloween feels </h2>

      <div className="scroll-wrapper">
        <button className="scroll-btn left" onClick={() => scroll("left")}>
          <FaChevronLeft size={20} />
        </button>

        <div className="scroll-items" ref={scrollRef} onWheel={handleWheel}>
          {products.map((item) => {
            const imageUrl =
              item.image ||
              (item.images && item.images.length > 0
                ? item.images[0].url
                : "https://via.placeholder.com/300x300?text=No+Image");

            return (
              <div
                key={item._id || item.id}
                className="card"
                onClick={() => handleProductClick(item)}
              >
                <img
                  src={imageUrl}
                  alt={item.name || "Product"}
                  onError={(e) => {
                    e.target.src =
                      "https://via.placeholder.com/300x300?text=No+Image";
                  }}
                />
                <div className="info">
                  <p className="title-text">{item.name || item.title}</p>
                  <p className="price">Now ${item.price}</p>
                  {item.oldprice && (
                    <p className="old-price">${item.oldprice}</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <button className="scroll-btn right" onClick={() => scroll("right")}>
          <FaChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}

export default HalloweenScroll;
