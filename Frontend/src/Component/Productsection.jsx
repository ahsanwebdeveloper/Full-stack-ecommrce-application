
import React, { useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../features/cart/cartSlice";
import { setSelectedProduct } from "../features/cart/productSlice";
import "./Productsection.css";

// 👇 Default products (fallback)
const products = [
{
id: 1,
name: "Tyson Oven Roasted Diced Chicken Breast, 22 oz",
priceNow: "$7.47",
priceOld: "$8.47",
unit: "34.0 ¢/oz",
image:
"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSe1GKw7JXVnUBI6ZeDE1d5cAGjGqun-54qxw&s",
},
{
id: 2,
name: "Kikkoman Less Sodium Soy Sauce, 15 oz",
priceNow: "$3.28",
priceOld: "$3.77",
unit: "Options from $3.28 – $42.97",
image:
"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSe1GKw7JXVnUBI6ZeDE1d5cAGjGqun-54qxw&s",
},
{
id: 3,
name: "Maruchan Ramen Noodle Chicken Flavor Soup, 12 pack",
priceNow: "$3.34",
priceOld: "$4.00",
unit: "",
image:
"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSe1GKw7JXVnUBI6ZeDE1d5cAGjGqun-54qxw&s",
},
{
id: 4,
name: "Maruchan Ramen Noodle Chicken Flavor Soup, 12 pack",
priceNow: "$3.34",
priceOld: "$4.00",
unit: "",
image:
"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSe1GKw7JXVnUBI6ZeDE1d5cAGjGqun-54qxw&s",
},
];

const ProductSection = ({ products: categoryProducts }) => {
const dispatch = useDispatch();
const navigate = useNavigate();
const sliderRef = useRef(null);


// Agar CategoryPage se products aaye to wahi use honge, warna fallback
const data = categoryProducts && categoryProducts.length > 0 ? categoryProducts : products;

// Add to cart
const handleAddToCart = (product) => {
dispatch(addToCart(product));
};

// Product click  select + navigate
const handleProductClick = (p) => {
dispatch(
setSelectedProduct({
id: p.id,
name: p.name,
brand: "LHRIVER",
price: parseFloat(p.priceNow.replace("$", "")),
oldPrice: p.priceOld ? parseFloat(p.priceOld.replace("$", "")) : null,
image: p.image,
quantity: 1,
colors: ["Black", "Silver"],
seller: "Official LHRIVER Store",
details: [
"🔥 Double the Firepower – 16,000 BTU total output",
"🔥 309 sq. in. of Grilling Freedom in a Compact Body",
],
specs: {
surfaceWidth: "19.4 in",
cookingArea: "310 sq in",
burners: "2",
fuelType: "Propane",
btu: "16,000",
},
})
);
navigate("/checkout");
};

// Scroll functions
const scrollLeft = () => {
sliderRef.current.scrollBy({ left: -300, behavior: "smooth" });
};
const scrollRight = () => {
sliderRef.current.scrollBy({ left: 300, behavior: "smooth" });
};

return ( <section className="product-section"> <div className="section-header"> <div> <h2>Sauces, proteins & more</h2> <p>Find your favorite add-ins.</p> </div> <a href="#" className="view-all">
View all </a> </div>

  {/* Slider */}
  <div className="slider-container">
    <button className="arrow left" onClick={scrollLeft}>
      <FaChevronLeft />
    </button>
    <div className="product-slider" ref={sliderRef}>
      
      {data.map((p) => (
        <div className="product-card" key={p.id}>
          <div className="img-wrap" onClick={() => handleProductClick(p)}>
            <img src={p.image} alt={p.name} />
            <button className="heart">♡</button>
          </div>
          <div className="price-line">
            <span className="now">Now {p.priceNow}</span>
            {p.priceOld && <span className="old">{p.priceOld}</span>}
          </div>
          {p.unit && <div className="unit">{p.unit}</div>}
          <p className="name">{p.name}</p>
          <button className="add-btn" onClick={() => handleAddToCart(p)}>
            + Add
          </button>
        </div>
      ))}
    </div>
    <button className="arrow right" onClick={scrollRight}>
    <FaChevronRight />
    </button>
  </div>

  {/* Banner */}
  <div className="product-right">
    <img
      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSe1GKw7JXVnUBI6ZeDE1d5cAGjGqun-54qxw&s"
      alt="Elevate your ramen"
    />
    <div className="banner-text">
      <h2>Elevate your ramen</h2>
      <a href="#" className="shop-btn">
        Shop now
      </a>
    </div>
  </div>
</section>


);
};

export default ProductSection;
