
import React, { useRef, useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { addToCart } from "../features/cart/cartSlice";
import { setSelectedProduct } from "../features/cart/productSlice";
import axios from "axios";
import "./Productsection.css";

const ProductSection = ({ products: categoryProducts }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sliderRef = useRef(null);
  const [products, setProducts] = useState([]);

  // Fetch products by category (tech)
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/products/category/tech"
        );
        console.log("Fetched tech products:", res.data);
        setProducts(res.data.products || []);
      } catch (error) {
        console.error("Error fetching tech products:", error);
      }
    };
    fetchProducts();
  }, []);

  const data =
    categoryProducts && categoryProducts.length > 0
      ? categoryProducts
      : products;

  // 🛒 Add to cart
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

  // 🧾 Product click → full detail view
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

    dispatch(
      setSelectedProduct({
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
      })
    );

    navigate("/checkout");
  };

  // Slider scroll
  const scrollLeft = () =>
    sliderRef.current.scrollBy({ left: -300, behavior: "smooth" });
  const scrollRight = () =>
    sliderRef.current.scrollBy({ left: 300, behavior: "smooth" });

  return (
    <section className="product-section">
      <div className="section-header">
        <div>
          <h2>Sauces, proteins & more</h2>
          <p>Find your favorite add-ins.</p>
        </div>
        <Link to="/category/tech" className="view-all">
          View all
        </Link>
      </div>

      {/* Product Slider */}
      <div className="slider-container">
        <button className="arrow left" onClick={scrollLeft}>
          <FaChevronLeft />
        </button>

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

        <button className="arrow right" onClick={scrollRight}>
          <FaChevronRight />
        </button>
      </div>

      {/* Right Banner */}
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
