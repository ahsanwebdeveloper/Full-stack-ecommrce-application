import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Manager.css";

export default function OrderManager() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/api/order");
      setOrders(res.data.orders || []);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      await axios.put(`http://localhost:5000/api/order/${id}/status`, { status: newStatus });
      fetchOrders();
    } catch (error) {
      console.error("Error updating order:", error);
    }
  };

  const deleteOrder = async (id) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      try {
        await axios.delete(`http://localhost:5000/api/order/${id}`);
        fetchOrders();
      } catch (error) {
        console.error("Error deleting order:", error);
      }
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="manager-container">
      <div className="header-section">
        <h2>🛒 Orders Management</h2>
        <button className="refresh-btn" onClick={fetchOrders}>
          Refresh
        </button>
      </div>

      {loading ? (
        <div className="loading">Loading orders...</div>
      ) : (
        <div className="table-wrapper">
          <table className="order-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Products</th>
                <th>Total</th>
                <th>Status</th>
                <th>Actions</th>
                <th>Date</th>
              </tr>
            </thead>

            <tbody>
              {orders.length > 0 ? (
                orders.map((order) => (
                  <tr key={order._id}>
                    <td className="order-id">{order._id.slice(-6).toUpperCase()}</td>

                    <td>
                      <strong>{order.userInfo?.name || "N/A"}</strong> <br />
                      {order.userInfo?.phone} <br />
                      {order.userInfo?.city}, {order.userInfo?.province}
                    </td>

                    <td>
                      {order.products?.map((p, index) => (
                        <div key={index} className="product-item">
                          <img src={p.image} alt={p.name} className="product-image" />
                          <span>{p.name} × {p.quantity}</span>
                        </div>
                      ))}
                    </td>

                    <td>${order.totalAmount}</td>

                    <td>
                      <select
                        className={`status-select ${order.status.toLowerCase()}`}
                        value={order.status}
                        onChange={(e) => updateStatus(order._id, e.target.value)}
                      >
                        <option>Pending</option>
                        <option>Processing</option>
                        <option>Shipped</option>
                        <option>Delivered</option>
                        <option>Cancelled</option>
                      </select>
                    </td>

                    <td>
                      <button className="delete-btn" onClick={() => deleteOrder(order._id)}>
                        Delete
                      </button>
                    </td>

                    <td>{new Date(order.createdAt).toLocaleString()}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" style={{ textAlign: "center", padding: "20px" }}>
                    No orders found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
