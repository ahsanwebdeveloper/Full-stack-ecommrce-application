
import React, { useRef, useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../features/cart/cartSlice";
import { setSelectedProduct } from "../features/cart/productSlice";
import "./Productsection.css";
import axios from "axios";

const ProductSection = ({ products: categoryProducts }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sliderRef = useRef(null);

  // State for fetched products
  const [products, setProducts] = useState([]);

  // Fetch tech category products
  useEffect(() => {
    const fetchTechProducts = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/products/category/tech"
        );
        setProducts(res.data.products || []);
      } catch (error) {
        console.error(" Error fetching tech products:", error);
      }
    };
    fetchTechProducts();
  }, []);

  // Use products from categoryPage if provided, else API data
  const data =
    categoryProducts && categoryProducts.length > 0
      ? categoryProducts
      : products;

  // Add to cart
  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  // Handle product click
  const handleProductClick = (p) => {
    dispatch(
      setSelectedProduct({
        id: p._id || p.id,
        name: p.name,
        brand: "LHRIVER",
        price: p.price,
        oldPrice: p.oldprice || null,
        image:
          p.image || (p.images && p.images.length > 0 ? p.images[0].url : ""),
        quantity: 1,
        colors: ["Black", "Silver"],
        seller: "Official LHRIVER Store",
        details: [
          "🔥 Double the Firepower – 16,000 BTU total output",
          "🔥 309 sq. in. of Grilling Freedom in a Compact Body",
        ],
        specs: {
          surfaceWidth: "19.4 in",
          cookingArea: "310 sq in",
          burners: "2",
          fuelType: "Propane",
          btu: "16,000",
        },
      })
    );
    navigate("/checkout");
  };

  // Scroll functions
  const scrollLeft = () => {
    sliderRef.current.scrollBy({ left: -300, behavior: "smooth" });
  };
  const scrollRight = () => {
    sliderRef.current.scrollBy({ left: 300, behavior: "smooth" });
  };

  return (
    <section className="product-section">
      <div className="section-header">
        <div>
          <h2>Sauces, proteins & more</h2>
          <p>Find your favorite add-ins.</p>
        </div>
        <a href="#" className="view-all">
          View all
        </a>
      </div>

      {/* Product Slider */}
      <div className="slider-container">
        <button className="arrow left" onClick={scrollLeft}>
          <FaChevronLeft />
        </button>

        <div className="product-slider" ref={sliderRef}>
          {data.map((p) => (
            <div className="product-card" key={p._id || p.id}>
              <div className="img-wrap" onClick={() => handleProductClick(p)}>
                <img
                  src={
                    p.image ||
                    (p.images && p.images.length > 0 ? p.images[0].url : "")
                  }
                  alt={p.name}
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
          ))}
        </div>

        <button className="arrow right" onClick={scrollRight}>
          <FaChevronRight />
        </button>
      </div>

      {/* Banner Section */}
      <div className="product-right">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSe1GKw7JXVnUBI6ZeDE1d5cAGjGqun-54qxw&s"
          alt="Elevate your ramen"
        />
        <div className="banner-text">
          <h2>Elevate your ramen</h2>
          <a href="#" className="shop-btn">
            Shop now
          </a>
        </div>
      </div>
    </section>
  );
};

export default ProductSection;
