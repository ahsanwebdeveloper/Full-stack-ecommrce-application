import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";
import "./Productprice.css";

export default function Productprice() {
  const [plan, setPlan] = useState("");
  const product = useSelector((state) => state.product.selectedProduct);
   //  redux se product lo
   const dispatch = useDispatch();
   const handleAddToCart = (product) => {
  dispatch(addToCart({
    id: product.id,
    name: product.name,
    image: product.image,
    price: product.priceNow
      ? parseFloat(product.priceNow.replace("$", ""))
      : product.price
      ? parseFloat(product.price.toString().replace("$", ""))
      : 0, // ✅ hamesha number store karo
    quantity: 1,
  }));
};


  if (!product) {
    return <p>No product selected</p>;
  }

  return (
    <div className="price-box">
      {/* Price Section */}
      <div className="price-header">
  <div className="current-price">
    Now <span>${product.price ? product.price : "0.00"}</span>
  </div>
  {product.oldPrice && (
    <div className="old-price">${product.oldPrice}</div>
  )}
</div>

{product.price && product.oldPrice && (
  <div className="save">
    You save{" "}
    {`$${(
      parseFloat(product.oldPrice) - parseFloat(product.price)
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
        <a href="#" className="learn">Learn more</a>
      </div>

      <div className="returns">
        <span className="icon">⟳</span> Free 30-day returns
      </div>

      <button className="add-to-cart" onClick={() => handleAddToCart(product)}>Add to cart</button>

      {/* Protection Plan */}
      <div className="plan-box">
        <div className="plan-header">
          <span className="shield">🛡️</span>
          Walmart Protection Plan by Allstate
          <a href="#" className="whats">What’s covered</a>
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
          <a href="#" className="whats">What’s covered</a>
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
          Arrives by <strong>Fri, Oct 3</strong> | <a href="#">More options</a>
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
