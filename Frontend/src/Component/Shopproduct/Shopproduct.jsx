import React, { useRef, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSelectedProduct } from "../../features/cart/productSlice";
import { addToCart } from "../../features/cart/cartSlice";
import { getAllProducts } from "../../api/Productapi";
import "./Shopproduct.css";

const ShopProduct = ({ title }) => {
  const sliderRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [productList, setProductList] = useState([]);

  // Fetch product data from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getAllProducts();
        console.log("Fetched all products:", response.products);
        setProductList(response.products || []);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  //  Add to Cart
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

  //  Full product detail when clicked
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

  return (
    <div className="shop-slider">
      {title && <h2 className="shop-slider-title">{title}</h2>}

      <div className="shop-slider-track" ref={sliderRef}>
        {productList.map((p) => {
          const imageSrc =
            p.image ||
            (p.images?.length > 0
              ? p.images[0].url || p.images[0]
              : "https://via.placeholder.com/300x300?text=No+Image");

          const finalSrc = imageSrc.startsWith("http")
            ? imageSrc
            : `http://localhost:5000/${imageSrc}`;

          return (
            <div className="shop-card" key={p._id || p.id}>
              <div className="shop-img" onClick={() => handleProductClick(p)}>
                <img
                  src={finalSrc}
                  alt={p.name || "Product"}
                  onError={(e) => {
                    e.target.src =
                      "https://via.placeholder.com/300x300?text=No+Image";
                  }}
                />
                <button className="shop-heart">♡</button>
              </div>

              <div className="shop-price">
                <span className="shop-price-now">Now ${p.price}</span>
                {p.oldprice && (
                  <span className="shop-price-old">${p.oldprice}</span>
                )}
              </div>

              {p.unit && <div className="shop-unit">{p.unit}</div>}
              <p className="shop-name">{p.name}</p>

              <button className="shop-btn" onClick={() => handleAddToCart(p)}>
                Add to cart
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ShopProduct;
