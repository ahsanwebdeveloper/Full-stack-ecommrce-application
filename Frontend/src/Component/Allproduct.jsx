import React, { useEffect, useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Allproduct.css";

export default function Allproduct() {
  const [categories, setCategories] = useState([]);
  const scrollRef = useRef(null);

  //Fetch categories from backend
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/categories");
        if (res.data.success) {
          setCategories(res.data.categories);
        } else {
          console.warn("No categories found");
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  //  Scroll buttons
  const scroll = (dir) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: dir === "left" ? -200 : 200,
        behavior: "smooth",
      });
    }
  };

  //  Mouse wheel scroll
  const handleWheel = (e) => {
    if (scrollRef.current) {
      e.preventDefault();
      scrollRef.current.scrollLeft += e.deltaY;
    }
  };

  return (
    <div className="category-container">
      <div className="category-header">
        <h2>Get it all right here</h2>
        <a href="#">View all</a>
      </div>

      <div className="category-wrapper">
        <button className="scroll-btn left" onClick={() => scroll("left")}>
          <FaChevronLeft />
        </button>

        <div className="category-scroll" ref={scrollRef} onWheel={handleWheel}>
          {categories.map((cat) => (
            <div className="category-item" key={cat._id}>
              <div className="img-box">
                <Link to={`/category/${cat.name?.toLowerCase()}`}>
                  <img
                    src={
                      cat.image?.url ||
                      "https://via.placeholder.com/300x300?text=No+Image"
                    }
                    alt={cat.name || "Category"}
                    onError={(e) => {
                      e.target.src =
                        "https://via.placeholder.com/300x300?text=No+Image";
                    }}
                  />
                </Link>
              </div>
              <p>{cat.name}</p>
            </div>
          ))}
        </div>

        <button className="scroll-btn right" onClick={() => scroll("right")}>
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
}
