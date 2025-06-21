import React, { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu } from "lucide-react"; // ✅ Lucide Menu icon
import { Context } from "../context/Contextapi";

function Header() {
  const { user, setUser, cart } = useContext(Context);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    setUser(null);
    localStorage.clear();
    setMenuOpen(false);
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="w-full bg-slate-200 shadow-md sticky top-0 z-10">
      <div className="flex justify-between items-center px-4 py-3 md:px-8 h-[12vh]">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img className="w-12 h-12 rounded-full" src="../assets/logo.jpg" alt="logo" />
          <h1 className="text-2xl md:text-4xl text-green-700 font-bold">FreshBasket</h1>
        </div>

        {/* Hamburger Icon (Mobile) */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle Menu">
            <Menu className="w-6 h-6 text-black" />
          </button>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-4 items-center">
          <NavLink to="/" className="px-2 py-1 hover:text-green-600">Home</NavLink>

          {user?.role === "buyer" && (
            <>
              <NavLink to="/fresh" className="px-2 py-1 hover:text-green-600">Fresh</NavLink>
              <NavLink to="/local" className="px-2 py-1 hover:text-green-600">Local</NavLink>
              <NavLink to="/farmers" className="px-2 py-1 hover:text-green-600">Farmers</NavLink>
              <NavLink to="/myorders" className="px-2 py-1 hover:text-green-600">My Orders</NavLink>
            </>
          )}

          {(user?.role === "seller" || user?.role === "farmer") && (
            <>
              <NavLink to="/sell" className="px-2 py-1 hover:text-green-600">Sell</NavLink>
              <NavLink to="/dashboard" className="px-2 py-1 hover:text-green-600">Dashboard</NavLink>
            </>
          )}

          {user?.gmail === "admin@gmail.com" && (
            <NavLink to="/admin" className="px-2 py-1 hover:text-green-600">Admin</NavLink>
          )}

          <NavLink to="/about" className="px-2 py-1 hover:text-green-600">About</NavLink>

          <NavLink to="/auth" onClick={handleLogout} className="px-2 py-1 hover:text-green-600">
            {user ? "Sign Out" : "Sign In"}
          </NavLink>

          {user?.role === "buyer" && (
            <Link to="/cart" className="relative">
              <img src="/assets/cart.svg" alt="cart" className="w-6 h-6" />
              {cart.length > 0 && (
                <span className="absolute -top-3 -right-3 w-5 h-5 flex justify-center items-center text-xs rounded-full bg-green-700 text-white">
                  {cart.length}
                </span>
              )}
            </Link>
          )}
        </nav>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <nav className="flex flex-col items-start gap-2 px-4 pb-4 md:hidden bg-slate-100">
          <NavLink to="/" onClick={closeMenu} className="px-2 py-1">Home</NavLink>

          {user?.role === "buyer" && (
            <>
              <NavLink to="/fresh" onClick={closeMenu} className="px-2 py-1">Fresh</NavLink>
              <NavLink to="/local" onClick={closeMenu} className="px-2 py-1">Local</NavLink>
              <NavLink to="/farmers" onClick={closeMenu} className="px-2 py-1">Farmers</NavLink>
              <NavLink to="/myorders" onClick={closeMenu} className="px-2 py-1">My Orders</NavLink>
            </>
          )}

          {(user?.role === "seller" || user?.role === "farmer") && (
            <>
              <NavLink to="/sell" onClick={closeMenu} className="px-2 py-1">Sell</NavLink>
              <NavLink to="/dashboard" onClick={closeMenu} className="px-2 py-1">Dashboard</NavLink>
            </>
          )}

          {user?.gmail === "admin@gmail.com" && (
            <NavLink to="/admin" onClick={closeMenu} className="px-2 py-1">Admin</NavLink>
          )}

          <NavLink to="/about" onClick={closeMenu} className="px-2 py-1">About</NavLink>

          <NavLink to="/auth" onClick={handleLogout} className="px-2 py-1">
            {user ? "Sign Out" : "Sign In"}
          </NavLink>

          {user?.role === "buyer" && (
            <Link to="/cart" onClick={closeMenu} className="flex items-center gap-2 px-2 py-1">
              <img src="/assets/cart.svg" alt="cart" className="w-6 h-6" />
              {cart.length > 0 && (
                <span className="text-sm font-bold bg-green-700 text-white px-2 py-0.5 rounded-full">
                  {cart.length}
                </span>
              )}
            </Link>
          )}
        </nav>
      )}
    </header>
  );
}

export default Header;
