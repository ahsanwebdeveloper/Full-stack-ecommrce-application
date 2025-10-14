import React from 'react'
import Navbar from '../Component/Navbar'
import Header from '../Component/Header'
import Allproduct from '../Component/Allproduct'
import ProductSection from '../Component/Productsection'
import Product from '../Component/Product'
import FeaturedVideos from '../Component/Featurevideo'
import Footer from '../Component/Footer'
import Clothe from '../Component/Clothe'
import ShopProduct from '../Component/Shopproduct/Shopproduct'

function Home() {
  return (
    <div>
        <Navbar />
        <Header />
        <Allproduct />
        <ProductSection />
        <Product />
        <Clothe />
        <ShopProduct />
        <FeaturedVideos />
        <Footer />

    </div>
  )
}

export default Home