import React, { useState } from "react";
import { FaEye, FaPills, FaFileMedical } from "react-icons/fa";
import "./HealthWellnessMenu.css"; // custom css import

const HealthWellnessMenu = () => {
  const [openMenu, setOpenMenu] = useState(null);

  const toggleMenu = (menu) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  return (
    <div className="health-container">
      <h2 className="menu-title">Health & Wellness</h2>

      {/* Pharmacy */}
      <div className="menu-item">
        <button onClick={() => toggleMenu("pharmacy")} className="menu-button">
          <span className="menu-label">
            <FaPills className="icon" /> Pharmacy
          </span>
          <span>{openMenu === "pharmacy" ? "▲" : "▼"}</span>
        </button>
        {openMenu === "pharmacy" && (
          <ul className="submenu">
            <li>Prescriptions</li>
            <li>Refill</li>
            <li>Transfer Prescription</li>
            <li>Medication Therapy</li>
          </ul>
        )}
      </div>

      {/* Vision Center */}
      <div className="menu-item">
        <button onClick={() => toggleMenu("vision")} className="menu-button">
          <span className="menu-label">
            <FaEye className="icon" /> Vision Center
          </span>
          <span>{openMenu === "vision" ? "▲" : "▼"}</span>
        </button>
        {openMenu === "vision" && (
          <ul className="submenu">
            <li>Home</li>
            <li>Schedule Eye Exam</li>
            <li>Prescription Glasses</li>
            <li>Virtually Try-on Glasses</li>
            <li>Order Contact Lenses</li>
            <li>Find a Vision Center</li>
            <li>Find Your Order</li>
          </ul>
        )}
      </div>

      {/* Insurance */}
      <div className="menu-item">
        <button onClick={() => toggleMenu("insurance")} className="menu-button">
          <span className="menu-label">
            <FaFileMedical className="icon" /> Insurance Services
          </span>
          <span>{openMenu === "insurance" ? "▲" : "▼"}</span>
        </button>
        {openMenu === "insurance" && (
          <ul className="submenu">
            <li>Health Insurance</li>
            <li>Medicare</li>
            <li>Dental Plans</li>
            <li>Vision Insurance</li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default HealthWellnessMenu;
