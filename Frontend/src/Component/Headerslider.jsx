import React, { useState, useEffect } from "react";
import "./Headerslider.css"; // CSS alag file me

const MediaSlider = ({ media, interval = 4000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto slide
  useEffect(() => {
    if (!isPaused) {
      const timer = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % media.length);
      }, interval);
      return () => clearInterval(timer);
    }
  }, [isPaused, media.length, interval]);

  // Controls
  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % media.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? media.length - 1 : prev - 1
    );
  };

  return (
    <div className="slider-container">
      {/* Slide */}
      <div
        className="slider-content"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {media[currentIndex].type === "image" ? (
          <img
            src={media[currentIndex].src}
            alt={`slide-${currentIndex}`}
            className="slider-media"
          />
        ) : (
          <video
            src={media[currentIndex].src}
            className="slider-media"
            autoPlay
            muted
            loop
          />
        )}
      </div>

      {/* Arrows */}
      <button className="arrow left" onClick={prevSlide}>❮</button>
      <button className="arrow right" onClick={nextSlide}>❯</button>

      {/* Dots */}
      <div className="slider-dots">
        {media.map((_, i) => (
          <span
            key={i}
            className={`dot ${i === currentIndex ? "active" : ""}`}
            onClick={() => setCurrentIndex(i)}
          />
        ))}
      </div>
    </div>
  );
};

export default MediaSlider;
