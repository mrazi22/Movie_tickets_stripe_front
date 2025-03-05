import React from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Register from './Components/Register'
import Login from './Components/Login'
import AdminHome from './Components/AdminHome'
import Home from './Components/Home'
import Postmovies from './Components/Postmovies'
import Movies from './Components/Movies'
import Checkout from './Components/Checkout'
import Address from './Components/Address'
import Payment from './Components/Payment'

import {Elements} from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

const promise = loadStripe(
  'pk_test_51QKkoAEFkjYi4pbxZNQ8TKmVgUGDtc39EU2rcuyw9l1ewJN6HRNFfmQln81R3isRqorjoYNvzzUKMDSCm7BuVAxn00xrMF1a4t'
)




function App () {
  return (
    <BrowserRouter>
     
      <Routes>
      <Route path="/signup" element={<Register />} />
      <Route path="/" element={<Login />} />
      <Route path="/admin" element={<AdminHome />} />
      <Route path="/home" element={<Home />} />
      <Route path="/Postmovies" element={<Postmovies />} />
      <Route path="/Movies" element={<Movies />} />
      <Route path="/Checkout" element={<Checkout />} />
      <Route path="/Address" element={<Address />} />
      <Route path="/Payment" element={
        <Elements stripe={promise}>
        <Payment />
      </Elements>
      } />
     
      
      
      </Routes>
       
      
    </BrowserRouter>
  )
}

export default App