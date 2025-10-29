import React from 'react'
import Navbar from "../Component/Navbar";
import Footer from "../Component/Footer";
import UserOrders from '../Component/UserOrders/UserOrders'

function UserOrdersPage() {
  return (
    <>
      <div>UserOrders</div>
      <Navbar />
      <UserOrders />
      <Footer />
    </>
  )
}

export default UserOrdersPage