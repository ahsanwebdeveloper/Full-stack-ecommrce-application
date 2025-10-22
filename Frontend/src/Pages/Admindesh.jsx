import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import "./Admindesh.css";

export default function Admindesh() {
  return (
    <>
      <div className="admin-container">
        {/* Sidebar */}
        <aside className="sidebar">
          <h1 className="logo">Admin Panel</h1>
          <nav>
            <ul>
              <li><Link to="/dashboard">Dashboard</Link></li>
              <li><Link to="/banners">Banners</Link></li>
              <li><Link to="/categories">Categories</Link></li>
              <li><Link to="/products">Products</Link></li>
              <li><Link to="/orders">Orders</Link></li>
            </ul>
          </nav>
        </aside> 
      </div>
    </>
  );
}