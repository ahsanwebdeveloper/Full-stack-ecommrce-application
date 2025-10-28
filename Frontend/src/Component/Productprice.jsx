import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";
import { setSelectedProduct } from "../features/cart/productSlice"; 
import "./Productprice.css";

export default function Productprice() {
  const [plan, setPlan] = useState("");
  const product = useSelector((state) => state.product.selectedProduct);
  const dispatch = useDispatch();
  const [localProduct, setLocalProduct] = useState(product);

  //  Restore selected product from localStorage (in case of page refresh)
  useEffect(() => {
    if (!product) {
      const savedProduct = JSON.parse(localStorage.getItem("selectedProduct"));
      if (savedProduct) {
        dispatch(setSelectedProduct(savedProduct));
        setLocalProduct(savedProduct);
      }
    }
  }, [product, dispatch]);

  // ✅ Load cart from localStorage on mount
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart"));
    if (storedCart && storedCart.length > 0) {
      storedCart.forEach((item) => dispatch(addToCart(item)));
    }
  }, [dispatch]);

  const finalProduct = product || localProduct;

  // ✅ Add to Cart + Save to localStorage
  const handleAddToCart = (product) => {
    if (!product) return;

    // Save selected product for persistence
    localStorage.setItem("selectedProduct", JSON.stringify(product));

    const cartItem = {
      id: product._id || product.id,
      name: product.name,
      image:
        product.image ||
        (product.images && product.images.length > 0
          ? product.images[0].url || product.images[0]
          : ""),
      price: typeof product.priceNow === 'string'
        ? parseFloat(product.priceNow.replace("$", ""))
        : typeof product.priceNow === 'number'
        ? product.priceNow
        : typeof product.price === 'string'
        ? parseFloat(product.price.replace("$", ""))
        : typeof product.price === 'number'
        ? product.price
        : 0,
      quantity: 1,
    };

    // Dispatch to Redux
    dispatch(addToCart(cartItem));

    // Save cart to localStorage
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    const updatedCart = [...existingCart, cartItem];
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    alert("Item added to cart successfully!");
  };

  if (!finalProduct) {
    return <p>No product selected</p>;
  }

  return (
    <div className="price-box">
      {/* Price Section */}
      <div className="price-header">
        <div className="current-price">
          Now <span>${finalProduct.priceNow || finalProduct.price || "0.00"}</span>
        </div>
        {finalProduct.priceOld && (
          <div className="old-price">${finalProduct.priceOld}</div>
        )}
      </div>

      {finalProduct.priceNow && finalProduct.priceOld && (
        <div className="save">
          You save{" "}
          {`$${(
            parseFloat(finalProduct.priceOld) - parseFloat(finalProduct.priceNow)
          ).toFixed(2)}`}
        </div>
      )}

      <div className="online-price">
        Price when purchased online
        <span className="info-icon">i</span>
      </div>

      <div className="monthly">
        As low as <strong>$23/mo</strong> with
        <span className="onepay">OnePay</span>
        <a href="#" className="learn">
          Learn more
        </a>
      </div>

      <div className="returns">
        <span className="icon">⟳</span> Free 30-day returns
      </div>

      <button
        className="add-to-cart"
        onClick={() => handleAddToCart(finalProduct)}
      >
        Add to cart
      </button>

      {/* Protection Plan */}
      <div className="plan-box">
        <div className="plan-header">
          <span className="shield">🛡️</span>
          Walmart Protection Plan by Allstate
          <a href="#" className="whats">
            What’s covered
          </a>
        </div>
        <div className="plan-sub">
          Only one option can be selected at a time
        </div>

        <label className="plan-option">
          <input
            type="radio"
            name="plan"
            value="3-year"
            checked={plan === "3-year"}
            onChange={(e) => setPlan(e.target.value)}
          />
          3-Year Plan – $17.00
        </label>
        <label className="plan-option">
          <input
            type="radio"
            name="plan"
            value="2-year"
            checked={plan === "2-year"}
            onChange={(e) => setPlan(e.target.value)}
          />
          2-Year Plan – $16.00
        </label>
      </div>

      {/* Grill Assembly Plan */}
      <div className="plan-box">
        <div className="plan-header">
          <span className="shield">🛡️</span>
          Pro Grill Assembly
          <a href="#" className="whats">
            What’s covered
          </a>
        </div>
        <label className="plan-option">
          <input
            type="radio"
            name="plan"
            value="17.00"
            checked={plan === "17.00"}
            onChange={(e) => setPlan(e.target.value)}
          />
          Basic Grill Assembly – $17.00
        </label>
      </div>

      {/* Shipping Info Section */}
      <div className="shipping-box">
        <h4 className="shipping-title">How you'll get this item:</h4>
        <div className="shipping-options">
          <div className="shipping-option selected">
            <div className="icon">📦</div>
            <div className="method">Shipping</div>
            <div className="details">
              Arrives Oct 3<br />$29.99
            </div>
          </div>
          <div className="shipping-option disabled">
            <div className="icon">🚗</div>
            <div className="method">Pickup</div>
            <div className="details">Not available</div>
          </div>
          <div className="shipping-option disabled">
            <div className="icon">🛍️</div>
            <div className="method">Delivery</div>
            <div className="details">Not available</div>
          </div>
        </div>
        <div className="location">
          <span>Sacramento, 95829</span> <a href="#">Change</a>
        </div>
        <div className="arrival-date">
          Arrives by <strong>Fri, Oct 3</strong> |{" "}
          <a href="#">More options</a>
        </div>
        <div className="shipping-fee">
          Shipping fee <strong>$29.99</strong>
        </div>
        <div className="seller">
          <div>
            Sold by <strong>KISSAIR</strong>{" "}
            <span className="badge">Pro Seller</span>
          </div>
          <div className="rating">⭐ 4.4 (5749 reviews)</div>
        </div>
        <div className="returns">
          <span className="icon">⟳</span> Free 30-day returns
        </div>
      </div>
    </div>
  );
}
