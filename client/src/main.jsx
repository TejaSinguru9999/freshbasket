import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './pages/Auth'
import Header from './components/Header'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Auth from './pages/Auth'
import Home from './pages/Home'
import Products from './components/Products'
const data=[
  {
    "name": "Burger",
    "imageUrl": "https://media.istockphoto.com/id/1041137232/photo/100-gluten-free-low-carb-hamburger-and-bun.jpg?s=2048x2048&w=is&k=20&c=NTefRc_cJBY14JsjFwZ0qanX9N3YF5xmUciYp7IHI84=",
    "nutritions": {
      "vitamins": ["Vitamin A", "Vitamin C", "Vitamin B6"],
      "carbohydratesInCal": 250,
      "protienInGrams": 15,
      "fatsGrams": 12
    },
    "foodType": "fastfood",
    "priceInRs": 150
  },
  {
    "name": "Vegetable Salad",
    "imageUrl": "https://cdn.pixabay.com/photo/2022/05/20/08/55/pasta-7209002_1280.jpg",
    "nutritions": {
      "vitamins": ["Vitamin A", "Vitamin K", "Vitamin C"],
      "carbohydratesInCal": 80,
      "protienInGrams": 5,
      "fatsGrams": 2
    },
    "foodType": "organic",
    "priceInRs": 120
  },
  {
    "name": "Chicken Curry",
    "imageUrl": "https://cdn.pixabay.com/photo/2016/07/22/05/07/delicious-1534207_1280.jpg",
    "nutritions": {
      "vitamins": ["Vitamin B12", "Vitamin C", "Vitamin D"],
      "carbohydratesInCal": 300,
      "protienInGrams": 25,
      "fatsGrams": 18
    },
    "foodType": "homemade",
    "priceInRs": 250
  },
  {
    "name": "Pizza",
    "imageUrl": "https://cdn.pixabay.com/photo/2017/12/05/20/08/pizza-3000273_1280.jpg",
    "nutritions": {
      "vitamins": ["Vitamin A", "Vitamin D"],
      "carbohydratesInCal": 350,
      "protienInGrams": 12,
      "fatsGrams": 22
    },
    "foodType": "fastfood",
    "priceInRs": 300
  },
  {
    "name": "Catering Buffet",
    "imageUrl": "https://cdn.pixabay.com/photo/2019/01/26/02/09/buffet-3955616_1280.jpg",
    "nutritions": {
      "vitamins": ["Vitamin A", "Vitamin E", "Vitamin B12"],
      "carbohydratesInCal": 500,
      "protienInGrams": 40,
      "fatsGrams": 30
    },
    "foodType": "catering",
    "priceInRs": 1200
  },
]
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <Header/>
    <Routes>
      <Route path="/auth" element={<Auth/>}/>
      <Route path="/" element={<Home/>}/>
      <Route path="/fresh" element={<Products title="Fresh" data={data}/>}/>
      <Route path="/local" element={<Products title="Local" data={data}/>}/>
      <Route path="/farmers" element={<Products title="Farmers" data={data}/>}/>
      <Route path="/about" element={<h1>About page</h1>}/>
    </Routes>
  </BrowserRouter>
)
