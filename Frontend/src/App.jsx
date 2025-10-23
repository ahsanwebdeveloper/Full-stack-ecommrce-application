import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Checkoutpage from './Pages/Checkoutpage'
import Cartpage from './Pages/Cartpage'
import Pharmacypage from './Pages/Pharmacypage'
import FindPharmacystorepage from './Pages/FindPharmacystorepage'
import Medicationtherapypage from './Pages/Medicationtherapypage'
import CategoryPage from './Pages/CategoryPage'
import Signin from './Pages/UserRegisterpage/Signin'
import Login from './Pages/UserRegisterpage/Login'
import Invoice from './Component/Invoice/Invoice'
import Admindesh from './Pages/Admindesh'
import BannerManager from './Component/Admin/BannerManager'
import Dashboard from './Component/Admin/Dashboard'
import CategoryManager from './Component/Admin/CategoryManager'
import ProductManager from './Component/Admin/ProductManger'
import OrderManager from './Component/Admin/OrderManager'
import ProtectedRoute from './Component/ProtectedRoute'

function App() {

  return (
    <>
    
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/checkout" element={<Checkoutpage />} />
      <Route path="/cart" element={<Cartpage />} />
      <Route path="/pharmacy" element={<Pharmacypage />} />
      <Route path="/find-pharmacy" element={<FindPharmacystorepage/>} />
      <Route path="//medication-therapy" element={<Medicationtherapypage/>}/>
      <Route path="/category/:category" element={<CategoryPage />} />
      <Route path="/signin" element={<Signin/>}/>
       <Route path='login' element={<Login/>}/>
       <Route path='Invoice' element={<Invoice/>}/>
       <Route
          path="/admin/*"
          element={
            <ProtectedRoute adminOnly={true}>
              <Admindesh />
            </ProtectedRoute>
          }
        />
       <Route path="/dashboard" element={<Dashboard />} />
       <Route path="/banners" element={<BannerManager />} />
       <Route path="/categories" element={<CategoryManager />} />
       <Route path="/products" element={<ProductManager />} />
       <Route path="/orders" element={<OrderManager />} />
    </Routes>
    </>
  )
}

export default App
