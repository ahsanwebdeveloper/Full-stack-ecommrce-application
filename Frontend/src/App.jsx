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

function App() {
  const [count, setCount] = useState(0)

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
    </Routes>
    </>
  )
}

export default App
