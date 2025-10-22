import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Manager.css";

export default function OrderManager() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/order");
      setOrders(res.data.orders || []);
      console.log("Fetched Orders:", res.data.orders);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="manager-container">
      <h2>Orders Management</h2>

      <table className="order-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer Info</th>
            <th>Products</th>
            <th>Total Amount</th>
            <th>Status</th>
            <th>Payment</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          {orders.length > 0 ? (
            orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>

                <td>
                  <strong>{order.userInfo?.name || "N/A"}</strong> <br />
                   {order.userInfo?.phone} <br />
                   {order.userInfo?.city}, {order.userInfo?.province}
                </td>

                <td>
                  {order.products?.map((p) => (
                    <div key={p._id} className="product-item">
                      <img
                        src={p.image}
                        alt={p.name}
                        className="product-image"
                      />
                      <span>
                        {p.name} × {p.quantity}
                      </span>
                    </div>
                  ))}
                </td>

                <td>${order.totalAmount}</td>
                <td>{order.status}</td>
                <td>{order.paymentMethod}</td>
                <td>{new Date(order.createdAt).toLocaleString()}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" style={{ textAlign: "center" }}>
                No orders found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
