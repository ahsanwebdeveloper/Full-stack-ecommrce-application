import React, { useRef, useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../features/cart/cartSlice";
import { setSelectedProduct } from "../features/cart/productSlice";
import "./Clothe.css";
import axios from "axios";

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

  // 🔹 Choose between props or fetched data
  const data =
    categoryProducts && categoryProducts.length > 0
      ? categoryProducts
      : products;

  // 🔹 Add to cart
  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  //  On product click → store in Redux + navigate
  const handleProductClick = (p) => {
    const productData = {
      id: p._id || p.id,
      name: p.name,
      brand: p.brand || "LHRIVER",
      price: p.price,
      oldPrice: p.oldprice || null,
      image:
        p.image || (p.images && p.images.length > 0 ? p.images[0].url : ""),
      quantity: 1,
      colors: ["Black", "Silver"],
      seller: p.seller || "Official LHRIVER Store",
      details: [
        " Double the Firepower – 16,000 BTU total output",
        " 309 sq. in. of Grilling Freedom in a Compact Body",
      ],
      specs: {
        surfaceWidth: "19.4 in",
        cookingArea: "310 sq in",
        burners: "2",
        fuelType: "Propane",
        btu: "16,000",
      },
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

      {/* Left Button */}
      <button className="scroll-btn left" onClick={() => scroll("left")}>
        <FaChevronLeft />
      </button>

      {/* Product List */}
      <div className="product-slider" ref={sliderRef}>
        {data.map((p) => {
          const imageUrl =
            p.image ||
            (p.images && p.images.length > 0 ? p.images[0].url : null) ||
            "https://via.placeholder.com/300x300?text=No+Image";

          return (
            <div className="product-card" key={p._id || p.id}>
              <div className="img-wrap" onClick={() => handleProductClick(p)}>
                <img src={imageUrl} alt={p.name || "Product"} />
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

      {/* Right Button */}
      <button className="scroll-btn right" onClick={() => scroll("right")}>
        <FaChevronRight />
      </button>
    </div>
  );
};

export default ProductSlider;
