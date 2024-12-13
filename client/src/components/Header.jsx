import React from "react";
import { NavLink } from "react-router-dom";

function Header(){
    return(
        <header className="w-full h-[12vh] bg-white flex items-center justify-between px-8 shadow-md sticky top-0">
            <div className="flex items-center gap-4"><img className="w-[5rem]" src="../assets/logo.jpg"/><h1 className="text-4xl text-green-700 font-bold">FreshBasket</h1></div>
            <nav>
                <NavLink to="/" className="px-4 py-1 active:text-green-500">Home</NavLink>
                <NavLink to="/fresh" className="px-4 py-1 active:text-green-500">Fresh</NavLink>
                <NavLink to="/local" className="px-4 py-1 active:text-green-500">Local</NavLink>
                <NavLink to="/farmers" className="px-4 py-1 active:text-green-500">Farmers</NavLink>
                <NavLink to="/about" className="px-4 py-1 active:text-green-500">About</NavLink>
                <NavLink to="/auth" className="px-4 py-1 active:text-green-500">Sign Out</NavLink>
            </nav>
        </header>
    )
}

export default Header;
