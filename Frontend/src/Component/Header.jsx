import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Header.css";

function Header() {
  const [banners, setBanners] = useState({
    fashion: [],
    makeup: [],
    home: [],
    bedroom: [],
  });

  //  Fetch all banners from API
  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/banners/banner");
        const all = data.data;

        //  Group images by category
        const grouped = {
          fashion: all.filter((b) => b.category === "fashion"),
          makeup: all.filter((b) => b.category === "makup"),
          home: all.filter((b) => b.category === "home"),
          bedroom: all.filter((b) => b.category === "badroom"),
        };
        setBanners(grouped);
      } catch (error) {
        console.error("Banner fetch error:", error);
      }
    };

    fetchBanners();
  }, []);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  //  Auto-slide images
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % (banners.fashion.length || 1));
    }, 3000);
    return () => clearInterval(timer);
  }, [isPaused, banners.fashion.length]);

  return (
    <div className="header">
      <div className="header-content">
        {/*  LEFT SECTION — Fashion banners */}
        <div className="left-header">
          <div className="left-header-content">
            <div className="left-header-content-item1">
              <h1>Scary good makeup for Halloween</h1>
              <a href="#">Shop Now</a>
            </div>
            <div className="left-header-content-item2">
              <img
                src={banners.fashion[0]?.image || ""}
                alt="fashion"
              />
            </div>
          </div>

          <div className="left-header-content1">
            <div className="left-header-content-item3">
              <h1>Scary good makeup for Halloween</h1>
              <a href="#">Shop Now</a>
            </div>
            <div className="left-header-content-item4">
              <img
                src={banners.fashion[1]?.image || ""}
                alt="fashion"
              />
            </div>
          </div>

          <div className="left-header-content2">
            <div className="left-header-content-item6">
              <img
                src={banners.fashion[2]?.image || ""}
                alt="fashion"
              />
            </div>
            <div className="left-header-content-item5">
              <h1>Scary good makeup for Halloween</h1>
              <a href="#">Shop Now</a>
            </div>
          </div>
        </div>

        {/*  CENTER SECTION — Makeup banners (auto slider) */}
        <div className="center-header">
          <div
            className="center-header-content"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <img
              src={
                banners.makeup[currentIndex]?.image ||
                banners.makeup[0]?.image ||
                ""
              }
              alt="makeup"
              className="slider-media"
            />
          </div>

          <div className="center-header1">
            <div className="center-header1-content">
              <div className="center-header1-content-item1">
                <img
                  src={banners.home[0]?.image || ""}
                  alt="home"
                />
                <h2>Mums have arrived at Walmart</h2>
                <a href="#">Shop Now</a>
              </div>
              <div className="center-header1-content-item2">
                <img
                  src={banners.home[0]?.image || ""}
                  alt="home"
                />
                <h2>Up to 30% off</h2>
                <a href="#">Shop Now</a>
              </div>
            </div>

            <div className="center-header1-content">
              <div className="center-header1-content-item3">
                <h2>Save 25% on Burger king as member</h2>
                <a href="#">Start free trial</a>
              </div>
              <div className="center-header1-content-item4">
                <img
                  src={banners.fashion[2]?.image || ""}
                  alt="makeup"
                />
              </div>
            </div>
          </div>
        </div>

        {/*  RIGHT SECTION — Bedroom banners */}
        <div className="right-header">
          <div className="right-header-content">
            <div className="right-header-content-item1">
              <h1>Scary good makeup for Halloween</h1>
              <a href="#">Shop Now</a>
            </div>
            <div className="right-header-content-item2">
              <img
                src={banners.bedroom[0]?.image || ""}
                alt="bedroom"
              />
            </div>
          </div>

          <div className="right-header-content1">
            <div className="right-header-content-item3">
              <h1>Spooktacular savings on Halloween costumes</h1>
              <a href="#">Shop Now</a>
            </div>
            <div className="right-header-content-item4">
              <img
                src={banners.bedroom[1]?.image || ""}
                alt="bedroom"
              />
            </div>
          </div>

          <div className="right-header-content2">
            <div className="right-header-content-item5">
              <h1>Activewear for all</h1>
              <a href="#">Shop Now</a>
            </div>
            <div className="right-header-content-item6">
              <img
                src={banners.bedroom[0]?.image || ""}
                alt="bedroom"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
