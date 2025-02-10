import { createRoot } from 'react-dom/client'
import './index.css'
import Auth from './pages/Auth'
import Header from './components/Header'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Product from './components/Product'
import Sell from './pages/Sell'
import Dashboard from './pages/Dashboard'
import About from './pages/About'
import Cart from './pages/Cart'
import Orders from './pages/Orders'
import ContextWrapper, { Context } from './context/Contextapi'
import { useContext } from 'react'


const App = () => {
  const { user } = useContext(Context);
  return (<>
    <Header />
    <Routes>
      <Route path="/auth" element={<Auth />} />
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      {user !== null ? (
        <>
          <Route path="/fresh" element={<Product title="Fresh"/>} />
          <Route path="/local" element={<Product title="Local"/>} />
          <Route path="/farmers" element={<Product title="Farmers"/>} />
          <Route path="/sell" element={<Sell />} />
          <Route path='/cart' element={<Cart/>}/>
          {user?.role==="buyer" && <Route path='/myorders' element={<Orders/>}/>}
          <Route path="/dashboard" element={user.role!=="buyer" ?<Dashboard />:<Navigate to="/"/>} />
        </>
      ) : (
        <Route path="*" element={<Navigate to="/auth" />} />
      )}
    </Routes>
  </>
  )
}


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <ContextWrapper>
      <App />
    </ContextWrapper>
  </BrowserRouter>
)
