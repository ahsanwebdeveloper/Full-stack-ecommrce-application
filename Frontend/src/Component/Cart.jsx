import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  clearCart,
  increaseQty,
  decreaseQty,
  addToCart,
} from "../features/cart/cartSlice";
import { createOrder } from "../features/order/orderSlice"; // ✅
import "./Cart.css";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const items = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Load cart from localStorage on mount
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart"));
    if (storedCart && storedCart.length > 0) {
      storedCart.forEach((item) => dispatch(addToCart(item)));
    }
  }, [dispatch]);

  // Sync with localStorage whenever cart updates
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items));
  }, [items]);

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  const handlePayNow = () => {
    const orderData = {
      id: Date.now(),
      items,
      subtotal,
      tax,
      total,
      date: new Date().toLocaleString(),
    };

    // ✅ Save to Redux
    dispatch(createOrder(orderData));

    // ✅ Save to localStorage
    localStorage.setItem("latestOrder", JSON.stringify(orderData));

    // ✅ Navigate to invoice
    navigate("/invoice");
  };

  return (
    <div className="cart-container">
      <h2 className="cart-title">Your Cart</h2>

      {items.length === 0 && <p className="cart-empty">No items in cart.</p>}

      {items.map((item) => (
        <div key={item.id} className="cart-item">
          <div className="cart-item-left">
            <img src={item.image} alt={item.name} />

            <div className="cart-item-info">
              <h3>{item.name}</h3>
              <p className="cart-price">${item.price.toFixed(2)}</p>
              <p className="cart-returns">Free 30-day returns</p>

              <div className="cart-links">
                <button onClick={() => dispatch(removeFromCart(item.id))}>
                  Remove
                </button>
                <button>Save for later</button>
              </div>
            </div>
          </div>

          <div className="cart-quantity">
            <button onClick={() => dispatch(decreaseQty(item.id))}>−</button>
            <span>{item.quantity}</span>
            <button onClick={() => dispatch(increaseQty(item.id))}>+</button>
          </div>
        </div>
      ))}

      {items.length > 0 && (
        <div className="cart-billing">
          <h3>Order Summary</h3>
          <p>
            Subtotal ({items.reduce((sum, i) => sum + i.quantity, 0)} items):{" "}
            <strong>${subtotal.toFixed(2)}</strong>
          </p>
          <p>
            Tax (8%): <strong>${tax.toFixed(2)}</strong>
          </p>
          <p className="total">
            Total: <strong>${total.toFixed(2)}</strong>
          </p>

          <button className="pay-btn" onClick={handlePayNow}>
            Pay Now
          </button>

          <button
            onClick={() => {
              dispatch(clearCart());
              localStorage.removeItem("cart");
            }}
            className="clear-btn"
          >
            Clear Cart
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
