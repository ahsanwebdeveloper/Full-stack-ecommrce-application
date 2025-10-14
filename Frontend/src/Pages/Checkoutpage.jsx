import React from 'react'
import Productcheck from '../Component/Productcheck'
import ProductDetail from '../Component/ProductDetail'
import Productprice from '../Component/Productprice'
import Navbar from '../Component/Navbar'
import Footer from '../Component/Footer'
import './Checkoutpage.css'

function Checkoutpage() {
  return (
    <>
    <Navbar />

    <div className="product-detail">
      <div className="product-check">
        <Productcheck />
      </div>
    
      <div className="product-detail">
        <ProductDetail />
      </div>
    
      <div className="product-price">
        <Productprice />
      </div>
    </div>
    <Footer />
    </>
  )
}

export default Checkoutpage