import React from "react";
import "./StoreDrawer.css";
import logo from "../assets/logo.jpg";

function StoreDrawer({ isOpen, onClose }) {
  const handleUseLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;

          // Open Google Maps with current location
          const mapUrl = `https://www.google.com/maps?q=${lat},${lng}`;
          window.open(mapUrl, "_blank"); 
        },
        (error) => {
          alert("Location access denied or unavailable.");
          console.error(error);
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="drawer-overlay">
      <div className="store-drawer">
        {/* Header */}
        <div className="drawer-header">
          <h2>Select a store</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        {/* Search box */}
        <div className="search-box">
          <input
            type="text"
            placeholder="Enter zip code or city, state"
          />
          <button className="map-btn">🗺</button>
        </div>

        {/* Use current location */}
        <div className="location-link" onClick={handleUseLocation} style={{cursor: "pointer"}}>
           <span>Use my current location</span>
        </div>

        {/* Illustration */}
        <div className="illustration">
          <img
            src={logo}
            alt="Store"
          />
        </div>

        {/* save location */}
        <div className="drawer-footer">
          <button className="save-btn">Save</button>
        </div>
      </div>
    </div>
  );
}

export default StoreDrawer;
