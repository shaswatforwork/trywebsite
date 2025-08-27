import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import { AuthProvider } from './Components/authContext.jsx'
import './index.css'
import App from './Components/App.jsx'
import Details from './Components/Details.jsx'
import Navbar from './Components/Navbar.jsx'
import Checkout from './Components/Checkout.jsx'
import Footer from './Components/Footer.jsx'
import Login from './Components/Login.jsx'
import SignUp from './Components/SignUp.jsx'
import AdminPage from './Components/Admin/AdminPage.jsx'
import Add from './Components/Admin/Add.jsx'
import Remove from './Components/Remove.jsx'
import Orders from './Components/Orders.jsx'
import Address from './Components/Address.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
        <AuthProvider>
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/details" element={<Details />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/cart" element={<Checkout />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/add" element={<Add />} />
        <Route path="/remove" element={<Remove />} />
        <Route path='/orders' element={<Orders />} />
        <Route path="/address" element={<Address />} />
        {/* Catch-all route for any undefined paths */}
        <Route path="*" element={<App />} />
      </Routes>
    </BrowserRouter>
        </AuthProvider>
    <Footer />
  </StrictMode>,
)
