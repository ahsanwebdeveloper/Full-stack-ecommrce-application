import React from 'react'
import MedicationTherapy from '../Component/Pharmacy/MedicationTherapy'
import Navbar from '../Component/Navbar'
import Footer from '../Component/Footer'
import "./Pharmacypage.css"
import HealthWellnessMenu from '../Component/Pharmacy/HealthWellnessMenu'

function Medicationtherapypage() {
  return (
    <>
    <Navbar />
    <div className="pharmacy-page">
      <div className="menu-section">
        <HealthWellnessMenu />
      </div>
      <div className="banner-section">
        <MedicationTherapy />
      </div>
    </div>
    <Footer />
    </>
  )
}

export default Medicationtherapypage