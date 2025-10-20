
import { FaMapMarkerAlt, FaSearch, FaHeart, FaUser, FaShoppingCart } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Logo from "../assets/logo.jpg";
import "./Navbar.css";
import AddressDrawer from "./AddressDrawer";
import StoreDrawer from "./StoreDrawer";
import { setSearchText } from "../features/search/searchSlice";

function Navbar() {
  const items = useSelector((state) => state.cart.items);
  const total = items.reduce((sum, item) => {
    const price = parseFloat(item.priceNow?.replace("$", "")) || 0;
    return sum + price;
  }, 0);

  const [openDept, setOpenDept] = useState(false);
  const [openServices, setOpenServices] = useState(false);
  const [open, setOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [addressFormOpen, setAddressFormOpen] = useState(false);

  // 🔹 Search states
  const [localSearch, setLocalSearch] = useState("");
  const dispatch = useDispatch();

  // input change → sirf local state update
  const handleChange = (e) => {
    setLocalSearch(e.target.value);
  };

  // 🔹 Debounce: Redux me 500ms ke baad value save hogi
  useEffect(() => {
    const delay = setTimeout(() => {
      dispatch(setSearchText(localSearch));
    }, 500);
    return () => clearTimeout(delay);
  }, [localSearch, dispatch]);

  return (
    <div>
      {/* Top Navbar */}
      <div className="navbar">
        <div className="navbar-left">
          <Link to="/">
            <img src={Logo} alt="logo" className="logoimg" />
          </Link>
          <div className="location">
            <div className="location-trigger" onClick={() => setOpen(!open)}>
              <FaMapMarkerAlt className="icon" />
              <div>
                <p className="loc-title">Pickup or delivery?</p>
                <p className="loc-sub">Sacramento, 95829 • Supercenter</p>
              </div>
            </div>
            {/* Dropdown Panel */}
            {open && (
              <div className="location-dropdown">
                <div className="options">
                  <div className="option">
                    <p>🚚</p>
                    <h3>Shipping</h3>
                  </div>
                  <div className="option">
                    <p>🚗</p>
                    <h3>Pickup</h3>
                  </div>
                  <div className="option">
                    <p>🛍</p>
                    <h3>Delivery</h3>
                  </div>
                </div>

                <div className="address-box">
                  <p>Add an address for shipping and delivery</p>
                  <div>
                    <button
                      className="add-btn"
                      onClick={() => setIsDrawerOpen(true)}
                    >
                      Add Address
                    </button>

                    {/* Drawer Component */}
                    <AddressDrawer
                      isOpen={isDrawerOpen}
                      onClose={() => setIsDrawerOpen(false)}
                    />
                  </div>
                </div>

                <div className="store-box">
                  <p>
                    <b>Sacramento Supercenter</b>
                  </p>
                  <p>8915 GERBER ROAD, Sacramento, CA 95829</p>
                  <button
                    className="add-btn"
                    onClick={() => setAddressFormOpen(true)}
                  >
                    Add Address
                  </button>
                  <StoreDrawer
                    isOpen={addressFormOpen}
                    onClose={() => setAddressFormOpen(false)}
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/*  Search */}
        <div className="navbar-center">
          <div className="search">
            <input
              type="text"
              placeholder="Search everything at shopping online and in store"
              className="searchinput"
              value={localSearch}
              onChange={handleChange}
            />
            <button className="searchbtn">
              <FaSearch />
            </button>
          </div>
        </div>

        <div className="navbar-right">
          <div className="nav-item">
            <FaHeart className="icon" />
            <div className="account-info">
              <p>Reorder</p>
              <span>My Items</span>
            </div>
          </div>
          <Link to="/signin">
            <div className="nav-item">
              <FaUser className="icon" />
              <div className="account-info">
                <p>Sign in</p>
                <span>Account</span>
              </div>
            </div>
          </Link>
          <div className="nav-item cart">
            <Link to="/cart">
              <FaShoppingCart className="icon" />
            </Link>
            {items.length > 0 && (
              <span className="cart-badge">{items.length}</span>
            )}
            <span className="cart-price">${total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Bottom Navbar */}
      <div className="navbar-bottom">
        {/* Departments */}
        <div
          className="menu-item"
          onMouseEnter={() => setOpenDept(true)}
          onMouseLeave={() => setOpenDept(false)}
        >
          <button className="menu-btn">Departments ▼</button>
          {openDept && (
            <div className="dropdown-menu">
              {/* Left Column */}
              <div className="dropdown-column scrollable">
                <h4>All Departments</h4>
                <ul>
                  <li>Rollbacks & more</li>
                  <Link to="/pharmacy">
                    <li>Pharmacy, Health & Wellness</li>
                  </Link>
                  <li>Clothing, Shoes, & Accessories</li>
                  <li>Baby & Kids</li>
                  <li>Beauty</li>
                  <li>Home, Garden & Tools</li>
                  <li>Electronics</li>
                  <li>Gaming & Entertainment</li>
                  <li>Toys & Outdoor Play</li>
                  <li>Paper & Cleaning</li>
                  <li>Grocery</li>
                  <li>Pets</li>
                  <li>Sports & Outdoors</li>
                  <li>Auto</li>
                  <li>Office Supplies</li>
                </ul>
              </div>
              {/* Right Column */}
              <div className="dropdown-column scrollable">
                <h4>Category</h4>
                <ul>
                  <li>Shop All</li>
                  <li>Home</li>
                  <li>Patio & Garden</li>
                  <li>Electronics</li>
                  <li>Fashion</li>
                  <li>Grocery</li>
                  <li>Paper & Cleaning</li>
                  <li>Sports & Outdoors</li>
                  <li>Toys</li>
                  <li>Pets</li>
                  <li>Baby</li>
                  <li>Health</li>
                  <li>Beauty</li>
                  <li>Pharmacy</li>
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Services */}
        <div
          className="menu-item"
          onMouseEnter={() => setOpenServices(true)}
          onMouseLeave={() => setOpenServices(false)}
        >
          <button className="menu-btn">Services ▼</button>
          {openServices && (
            <div className="dropdown-menu">
              {/* Left Column */}
              <div className="dropdown-column scrollable">
                <h4>In-Store Services</h4>
                <ul>
                  <li>Pharmacy</li>
                  <li>Auto Care Center</li>
                  <li>Photo Center</li>
                  <li>Money Services</li>
                  <li>Vision Center</li>
                  <li>Tech Services</li>
                  <li>Custom Cakes</li>
                </ul>
              </div>
              {/* Right Column */}
              <div className="dropdown-column scrollable">
                <h4>Online & Membership</h4>
                <ul>
                  <li>Walmart+</li>
                  <li>Gift Cards</li>
                  <li>Grocery Pickup & Delivery</li>
                  <li>Health & Wellness</li>
                  <li>Financial Services</li>
                  <li>Insurance Services</li>
                  <li>Travel & Entertainment</li>
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Quick Links */}
        <Link to="/category/tech">
          <button className="menu-btn">Get it Fast</button>
        </Link>

        <Link to="/category/new-arrivals">
          <button className="menu-btn">New Arrivals</button>
        </Link>

        <Link to="/category/halloween">
          <button className="menu-btn">Halloween</button>
        </Link>

        <Link to="/pharmacy">
          <button className="menu-btn">Pharmacy</button>
        </Link>

        <Link to="/category/rollbacks">
          <button className="menu-btn">Rollbacks & More</button>
        </Link>

        <Link to="/category/baby">
          <button className="menu-btn">Baby Event</button>
        </Link>

        <Link to="/category/dinner">
          <button className="menu-btn">Dinner Made Easy</button>
        </Link>

        <Link to="/category/more">
          <button className="menu-btn">More ▼</button>
        </Link>
      </div>
    </div>
  );
}

export default Navbar;

