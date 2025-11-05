import React, { useEffect, useState } from "react";
import axios from "axios";
import "./UserOrders.css";

export default function UserOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  //  Get logged-in user's ID from localStorage
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const userId = storedUser?._id;

  // Fetch user's orders
  const fetchUserOrders = async () => {
    if (!userId) return;
    try {
      setLoading(true);
      const res = await axios.get(`http://localhost:5000/api/order/user/${userId}`);
      setOrders(res.data.orders || []);
    } catch (error) {
      console.error("Error fetching user orders:", error);
    } finally {
      setLoading(false);
    }
  };

  //  Cancel user's order
  const cancelOrder = async (id) => {
    if (window.confirm("Are you sure you want to cancel this order?")) {
      try {
        await axios.put(`http://localhost:5000/api/order/${id}/cancel`);
        fetchUserOrders();
      } catch (error) {
        console.error("Error canceling order:", error);
      }
    }
  };

  useEffect(() => {
    fetchUserOrders();
  }, [userId]);

  //  Skeleton Loader
  if (loading) {
    return (
      <div className="user-orders-container">
        <h2> My Orders</h2>
        <div className="skeleton-container">
          {[1, 2, 3].map((i) => (
            <div key={i} className="skeleton-card">
              <div className="skeleton-header shimmer"></div>
              <div className="skeleton-line shimmer"></div>
              <div className="skeleton-line shimmer"></div>
              <div className="skeleton-footer shimmer"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  //  Main UI
  return (
    <div className="user-orders-container">
      <h2> My Orders</h2>

      {!userId ? (
        <p className="no-orders"> Please log in to view your orders.</p>
      ) : orders.length === 0 ? (
        <p className="no-orders">You haven’t placed any orders yet.</p>
      ) : (
        <div className="orders-grid">
          {orders.map((order) => (
            <div key={order._id} className="order-card">
              <div className="order-header">
                <span className="order-id">
                  Order #{order._id.slice(-6).toUpperCase()}
                </span>
                <span className={`status-badge ${order.status.toLowerCase()}`}>
                  {order.status}
                </span>
              </div>

              <div className="order-products">
                {order.products?.map((p, index) => (
                  <div key={index} className="product-item">
                    <img src={p.image} alt={p.name} />
                    <div>
                      <p>{p.name}</p>
                      <small>Qty: {p.quantity}</small>
                    </div>
                  </div>
                ))}
              </div>

              <div className="order-info">
                <p><strong>Total:</strong> ${order.totalAmount}</p>
                <p><strong>Payment:</strong> {order.paymentMethod}</p>
                <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}</p>
              </div>

              {order.status === "Pending" && (
                <button
                  className="cancel-btn"
                  onClick={() => cancelOrder(order._id)}
                >
                  Cancel Order
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
