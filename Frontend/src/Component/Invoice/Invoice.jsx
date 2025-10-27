import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { clearCart } from "../../features/cart/cartSlice";
import "./Invoice.css";

export default function Invoice() {
  const { items } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    province: "",
    city: "",
    area: "",
    address: "",
    deliveryLabel: "home",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  //  Calculate totals (USD)
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = 5.0;
  const total = subtotal + deliveryFee;

  //  Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  //  Submit order to backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const userId = localStorage.getItem("userId") || "671621af14d8b9e43ac67890"; // Dummy fallback

    //  Full user info snapshot
    const userInfo = {
      name: formData.fullName,
      phone: formData.phone,
      province: formData.province,
      city: formData.city,
      area: formData.area,
      address: formData.address,
      deliveryType: formData.deliveryLabel,
    };

    //  Product snapshot (for invoice)
    const products = items.map((item) => ({
      productId: item._id || item.id,
      name: item.name,
      image: item.image,
      price: item.price,
      quantity: item.quantity,
    }));

    const orderData = {
      userId,
      userInfo,
      products,
      totalAmount: total,
      paymentMethod: "Cash on Delivery",
    };

    try {
      const res = await axios.post("http://localhost:5000/api/order/create", orderData);

      if (res.data.success) {
        setMessage(" Order placed successfully!");
        dispatch(clearCart());
        localStorage.removeItem("cart");
        setFormData({
          fullName: "",
          phone: "",
          province: "",
          city: "",
          area: "",
          address: "",
          deliveryLabel: "home",
        });
      } else {
        setMessage(" Failed to place order. Try again.");
      }
    } catch (error) {
      console.error("Order Error:", error);
      setMessage(" Failed to place order. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="invoice-container">
      {/* Left: Delivery Info */}
      <form className="invoice-left" onSubmit={handleSubmit}>
        <h2>Delivery Information</h2>

        <div className="form-group">
          <label>Full name</label>
          <input
            type="text"
            name="fullName"
            placeholder="Enter your first and last name"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Phone Number</label>
          <input
            type="text"
            name="phone"
            placeholder="Please enter your phone number"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Province</label>
            <select
              name="province"
              value={formData.province}
              onChange={handleChange}
              required
            >
              <option value="">Please choose your province</option>
              <option value="Punjab">Punjab</option>
              <option value="Sindh">Sindh</option>
              <option value="KPK">KPK</option>
              <option value="Balochistan">Balochistan</option>
            </select>
          </div>

          <div className="form-group">
            <label>City</label>
            <input
              type="text"
              name="city"
              placeholder="Enter city"
              value={formData.city}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Area</label>
            <input
              type="text"
              name="area"
              placeholder="Enter area"
              value={formData.area}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Address</label>
            <input
              type="text"
              name="address"
              placeholder="Street, House No."
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="delivery-type">
          <p>Select a label for effective delivery:</p>
          <div className="delivery-buttons">
            <button
              type="button"
              className={formData.deliveryLabel === "office" ? "active" : ""}
              onClick={() =>
                setFormData((prev) => ({ ...prev, deliveryLabel: "office" }))
              }
            >
              🏢 OFFICE
            </button>
            <button
              type="button"
              className={formData.deliveryLabel === "home" ? "active" : ""}
              onClick={() =>
                setFormData((prev) => ({ ...prev, deliveryLabel: "home" }))
              }
            >
              🏠 HOME
            </button>
          </div>
        </div>

        <button type="submit" className="save-btn" disabled={loading}>
          {loading ? "Processing..." : "SAVE & PLACE ORDER"}
        </button>

        {message && (
          <p className={`message ${message.includes("✅") ? "success" : "error"}`}>
            {message}
          </p>
        )}
      </form>

      {/* Right: Order Summary */}
      <div className="invoice-right">
        <h3>Promotion</h3>
        <div className="promo-box">
          <input type="text" placeholder="Enter Store/Code" />
          <button>Apply</button>
        </div>

        <h3>Invoice and Contact Info</h3>
        <div className="summary-box">
          <p>
            Items Total ({items.length} items):{" "}
            <span>${subtotal.toFixed(2)}</span>
          </p>
          <p>
            Delivery Fee: <span>${deliveryFee.toFixed(2)}</span>
          </p>
          <hr />
          <h4>
            Total: <span className="total">${total.toFixed(2)}</span>
          </h4>
          <small>All prices in USD</small>
        </div>

        <button className="pay-btn" disabled={loading}>
          Proceed to Pay
        </button>
      </div>
    </div>
  );
}
