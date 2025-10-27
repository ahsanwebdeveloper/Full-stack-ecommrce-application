import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../Component/Navbar";
import Footer from "../Component/Footer";
import Banner from "../Component/Banner/Banner";
import Categoryproduct from "../Component/Categoryproduct/Categoryproduct";
import ProductSection from "../Component/Productsection";
import ShopProduct from "../Component/Shopproduct/Shopproduct";
import ProductSlider from "../Component/Clothe";
import { useSelector } from "react-redux";
import axios from "axios";

function CategoryPage() {
  const { category } = useParams(); // e.g. "fashion" or "halloween"
  const [categoryProducts, setCategoryProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const searchText = useSelector((state) => state.search.searchText);

  useEffect(() => {
    const getCategoryProducts = async () => {
      try {
        setLoading(true);

        //  API call from backend
        const res = await axios.get(
          `http://localhost:5000/api/products/category/${category}`
        );

        //  Extract products safely
        const data = res.data.products || [];
        setCategoryProducts(data);
        console.log("Fetched category products:", data);
      } catch (error) {
        console.error("Error fetching category products:", error);
      } finally {
        setLoading(false);
      }
    };

    getCategoryProducts();
  }, [category]);

  //  Loading State
  if (loading) {
    return (
      <>
        <Navbar />
        <div style={{ padding: "40px", textAlign: "center" }}>
          <h2>Loading {category} products...</h2>
        </div>
        <Footer />
      </>
    );
  }

  //  Empty State
  if (!categoryProducts.length) {
    return (
      <>
        <Navbar />
        <div style={{ padding: "40px", textAlign: "center" }}>
          <h1>No products found for “{category}”</h1>
        </div>
        <Footer />
      </>
    );
  }

  //  Search filter (if active)
  const filteredProducts = categoryProducts.filter((p) =>
    p.name?.toLowerCase().includes(searchText?.toLowerCase())
  );

  return (
    <>
      <Navbar />

      <div style={{ padding: "20px" }}>
        <h1
          style={{
            marginBottom: "20px",
            textTransform: "capitalize",
            fontSize: "1.8rem",
            fontWeight: "bold",
          }}
        >
          {category.replace("-", " ")} Products
        </h1>

        {/* Keep the UI same — just feed API data */}
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
