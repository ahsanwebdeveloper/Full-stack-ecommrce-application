import React from "react";
import "./Findpharmacystore.css";

const Findpharmacystore = () => {
  return (
    <div className="find-store">
      {/* --- Header --- */}
      <h2>Find a Walmart store</h2>
      <p>Enter your location to find a nearby store.</p>

      {/* --- Search Bar --- */}
      <div className="search-bar">
        <input type="text" placeholder="Enter zip code or city, state" />
        <button className="find-btn">Find store</button>
        <a href="/" className="directory-link">View store directory</a>
      </div>

      {/* --- Use Current Location --- */}
      <div className="location-link">
        <span>📍</span> <a href="/">Use my current location</a>
      </div>

      <hr />

      {/* --- Result Info --- */}
      <p className="store-count">
        <b>44 stores</b> near to your location <b>95829</b>, within <b>50 miles</b>
      </p>

      {/* --- Categories --- */}
      <div className="categories">
        <button>🚗 Auto Care Center</button>
        <button>🥖 Bakery</button>
        <button>🥪 Deli</button>
        <button className="active">💊 Pharmacy</button>
        <button>⛽ Gas station</button>
        <button>💵 Money Services</button>
        <button>👓 Vision Center</button>
        <button>📸 Photo Center</button>
        <button>🛒 Grocery</button>
        <button>🏥 Walmart Health</button>
        <button>🌿 Garden Center</button>
        <button>📱 Wireless Services</button>
        <button>⚡ EV Charging</button>
        <button>🐾 Pet Services</button>
      </div>

      {/* --- Store Result --- */}
      <div className="store-card">
        <h3>Sacramento Supercenter</h3>
        <a href="/" className="store-link">Store details</a>
        <p>Walmart Supercenter #3081</p>
        <p>8915 Gerber Road, Sacramento, CA 95829</p>
      </div>

      {/* --- Google Maps Embed --- */}
      <div className="map-container">
        <iframe
          title="Google Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3131.987641415839!2d-121.3954492846819!3d38.4711944796351!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x809ad5f0f1a5bfa9%3A0x6e8b8a0a84d1cabc!2sWalmart%20Supercenter!5e0!3m2!1sen!2sus!4v1696259702905!5m2!1sen!2sus"
          width="100%"
          height="300"
          style={{ border: "0", borderRadius: "10px" }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
};

export default Findpharmacystore;
