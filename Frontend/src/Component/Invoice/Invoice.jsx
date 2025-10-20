// src/components/Invoice/Invoice.jsx
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./Invoice.css";

const Invoice = () => {
  const { currentOrder } = useSelector((state) => state.order);
  const [order, setOrder] = useState(currentOrder);

  useEffect(() => {
    if (!currentOrder) {
      const saved = JSON.parse(localStorage.getItem("latestOrder"));
      setOrder(saved);
    }
  }, [currentOrder]);

  if (!order) return <h2 style={{ textAlign: "center" }}>No invoice found!</h2>;

  return (
    <div className="invoice-container">
      <div className="invoice-box">
        <h1>🧾 Order Invoice</h1>
        <div className="invoice-header">
          <p><strong>Order ID:</strong> {order.id}</p>
          <p><strong>Date:</strong> {order.date}</p>
        </div>

        <table className="invoice-table">
          <thead>
            <tr>
              <th>Item</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {order.items.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>${item.price.toFixed(2)}</td>
                <td>${(item.price * item.quantity).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="invoice-summary">
          <p>Subtotal: <strong>${order.subtotal.toFixed(2)}</strong></p>
          <p>Tax: <strong>${order.tax.toFixed(2)}</strong></p>
          <p className="invoice-total">Total: <strong>${order.total.toFixed(2)}</strong></p>
        </div>

        <p className="thank-you">Thank you for your purchase! 💙</p>
      </div>
    </div>
  );
};

export default Invoice;
