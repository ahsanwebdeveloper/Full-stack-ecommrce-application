import React from "react";
import { useParams } from "react-router-dom";
import products from "../Data/productsdata";
import ProductSlider from "../Component/Clothe";
import Navbar from "../Component/Navbar";
import Footer from "../Component/Footer";
import ProductSection from "../Component/Productsection";
import Categoryproduct from "../Component/Categoryproduct/Categoryproduct";
import Banner from "../Component/Banner/Banner";
import { useSelector } from "react-redux";
import ShopProduct from "../Component/Shopproduct/Shopproduct";

function CategoryPage() {
  const { category } = useParams(); // URL se category milegi
  
  // Category ka product list nikal lo
  const categoryProducts = products[category] || [];

  // Agar koi product hi nahi mila
  if (!categoryProducts.length) {
    return (
      <div style={{ padding: "20px" }}>
        <h1>No products found for "{category}"</h1>
      </div>
    );
  }
  const searchText = useSelector((state) => state.search.searchText);

  // Apply search filter
  const filteredProducts = categoryProducts.filter((p) =>
    p.name.toLowerCase().includes(searchText.toLowerCase())
  );

  if (!filteredProducts.length) {
    return (
      <div style={{ padding: "20px" }}>
        <Navbar />
        <h1>No products found for "{searchText || category}"</h1>
        <Footer />
      </div>
    );
  }


  return (
    <>
    <Navbar />
    <div style={{ padding: "20px" }}>
      <h1 style={{ marginBottom: "20px" }}>
        {category.charAt(0).toUpperCase() + category.slice(1)} Products
      </h1>
      
      {/* Slider component ko products bhejo */}
      <Banner products={products} title={category} />
      <Categoryproduct products={categoryProducts} title={category} />
      <ProductSlider products={categoryProducts} title={category} />
      <ProductSection products={categoryProducts} title={category}/>
      <ShopProduct products={categoryProducts} title={category} />
    </div>
    <Footer />
    </>
  );
}

export default CategoryPage;
