import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { Context } from "../context/Contextapi";

function Header() {
    const { user,setUser, cart } = useContext(Context)
    return (
        <header className="w-full h-[12vh] bg-slate-200 flex items-center justify-between px-8 shadow-md sticky top-0 z-10">
            <div className="flex items-center gap-4"><img className="w-[5rem] rounded-full" src="../assets/logo.jpg" /><h1 className="text-4xl text-green-700 font-bold">FreshBasket</h1></div>
            <nav className="flex">
                <NavLink to="/" className="px-4 py-1 active:text-green-500">Home</NavLink>
                {/* For buyers only */}
                {user?.role === "buyer" && <>
                    <NavLink to="/fresh" className="px-4 py-1 active:text-green-500">Fresh</NavLink>
                    <NavLink to="/local" className="px-4 py-1 active:text-green-500">Local</NavLink>
                    <NavLink to="/farmers" className="px-4 py-1 active:text-green-500">Farmers</NavLink>
                    <NavLink to="/myorders" className="px-4 py-1 active:text-green-500">My orders</NavLink>
                </>}
                {/* For sellers/Farmers */}
                {(user?.role === "seller"||user?.role==="farmer") &&<>
                <NavLink to="/sell" className="px-4 py-1 active:text-green-500">Sell</NavLink>
                <NavLink to="/dashboard" className="px-4 py-1 active:text-green-500">Dashboard</NavLink>
                </>}
                {/* For admin */}
                {user?.gmail==="admin@gmail.com" && <NavLink to="/admin" className="px-4 py-1 active:text-green-500">Admin</NavLink>}
                <NavLink to="/about" className="px-4 py-1 active:text-green-500">About</NavLink>
                <NavLink to="/auth" className="px-4 py-1 active:text-green-500" onClick={()=>{setUser(null);localStorage.clear()}}>{user!==null?"Sign Out":"Sign In"}</NavLink>
                {user?.role === "buyer" && <Link to="/cart" className="relative">
                    <img src="/assets/cart.svg" alt="cart" className="w-8"/>
                    {cart.length!==0 && <p className="absolute -top-5 -right-5 w-8 h-8 flex justify-center items-center rounded-full bg-green-700 text-white">{cart.length}</p>}
                </Link> }
            </nav>
        </header>
    )
}

export default Header;
