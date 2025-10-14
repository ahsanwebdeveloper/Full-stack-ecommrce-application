import React from 'react'
import PharmacyBanner from '../Component/Pharmacy/PharmacyBanner'
import HealthWellnessMenu from '../Component/Pharmacy/HealthWellnessMenu'
import "./Pharmacypage.css"   // custom css
import Navbar from '../Component/Navbar'
import Footer from '../Component/Footer'

function Pharmacypage() {
  return (
    <>
    <Navbar />
    <div className="pharmacy-page">
      <div className="menu-section">
        <HealthWellnessMenu />
      </div>
      <div className="banner-section">
        <PharmacyBanner />
      </div>
    </div>
    <Footer />
    </>
  )
}

export default Pharmacypage
