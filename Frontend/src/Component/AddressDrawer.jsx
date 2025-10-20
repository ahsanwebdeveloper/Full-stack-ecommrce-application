import React from "react";
import "./AddressDrawer.css";

function AddressDrawer({ isOpen, onClose }) {
  if (!isOpen) return null; 

  return (
    <div className="drawer-overlay">
      <div className="drawer">
        <div className="drawer-header">
          <h2>Add Address</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <form className="drawer-form">
          <label>
            Last name*
            <input type="text" required placeholder="Enter your name" />
          </label>

          <label>
            Street address*
            <input type="text" required placeholder="Enter your street address" />
          </label>

          <label>
            Apt, suite, etc.
            <input type="text" placeholder="Enter your apartment or suite number" />
          </label>

          <label>
            City*
            <input type="text" required placeholder="Enter your city" />
          </label>

          <div className="row">
            <label>
              State*
              <select required>
                <option value="">Select</option>
                <option value="CA">California</option>
                <option value="NY">New York</option>
                <option value="TX">Texas</option>
              </select>
            </label>

            <label>
              Zip code*
              <input type="text" required placeholder="Enter your zip code" />
            </label>
          </div>

          <label>
            Phone number*
            <input type="tel" required placeholder="Enter your phone number" />
          </label>

          <button type="submit" className="save-btn">
            Save
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddressDrawer;
