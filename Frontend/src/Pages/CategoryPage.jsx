import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import products from "../Data/productsdata";
import Navbar from "../Component/Navbar";
import Footer from "../Component/Footer";
import Banner from "../Component/Banner/Banner";
import Categoryproduct from "../Component/Categoryproduct/Categoryproduct";
import ProductSection from "../Component/Productsection";
import ShopProduct from "../Component/Shopproduct/Shopproduct";
import ProductSlider from "../Component/Clothe";
import { useSelector } from "react-redux";

function CategoryPage() {
  const { category } = useParams();
  const [categoryProducts, setCategoryProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const searchText = useSelector((state) => state.search.searchText);

  useEffect(() => {
    const getCategoryProducts = async () => {
      try {
        setLoading(true);
        //  API call kar rahe hain
        const res = await products[category]();
        console.log("Category Data:", res);

        //  Correct extraction of products array
        const data = res.products || [];
        setCategoryProducts(data);
      } catch (error) {
        console.error("Error fetching category products:", error);
      } finally {
        setLoading(false);
      }
    };

    getCategoryProducts();
  }, [category]);

  if (loading) {
    return (
      <>
        <Navbar />
        <div style={{ padding: "20px" }}>
          <h2>Loading {category} products...</h2>
        </div>
        <Footer />
      </>
    );
  }

  if (!categoryProducts.length) {
    return (
      <>
        <Navbar />
        <div style={{ padding: "20px" }}>
          <h1>No products found for "{category}"</h1>
        </div>
        <Footer />
      </>
    );
  }

  const filteredProducts = categoryProducts.filter((p) =>
    p.name?.toLowerCase().includes(searchText?.toLowerCase())
  );

  return (
    <>
      <Navbar />
      <div style={{ padding: "20px" }}>
        <h1 style={{ marginBottom: "20px" }}>
          {category.charAt(0).toUpperCase() + category.slice(1)} Products
        </h1>

        <Banner products={filteredProducts} title={category} />
        <Categoryproduct products={filteredProducts} title={category} />
        <ProductSlider products={filteredProducts} title={category} />
        <ProductSection products={filteredProducts} title={category} />
        <ShopProduct products={filteredProducts} title={category} />
      </div>
      <Footer />
    </>
  );
}

export default CategoryPage;
