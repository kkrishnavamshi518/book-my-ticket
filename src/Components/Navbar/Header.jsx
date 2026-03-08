import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
function ScrollToTop() {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  return null;
}
export default function Header({ toggleModal, navbarData }) {
  return (
    <div>
      <ScrollToTop />
      <header className="text-gray-600 p-4 border-b bg-white">
        <div className="max-w-6xl mx-auto p-3">
          <div className="flex items-center justify-between mb-2">
            <Link to="/" className="flex items-center font-bold text-xl sm:text-2xl" >
              <span className="text-black mr-1">Book</span>
              <span className="bg-red-500 text-white px-1 mr-1 rounded">My</span>
              <span className="text-black">Ticket</span>
            </Link>
            <div className="flex items-center gap-2">
              <button className="hidden sm:flex items-center text-xs sm:text-sm cursor-pointer">Hyderabad 
                <i className="bi bi-chevron-down ml-1" /></button>
              <button onClick={() => toggleModal("signin")} 
                      className="bg-red-500 text-white text-xs sm:text-sm px-3 sm:px-4 py-1 
                                    rounded flex items-center gap-1 cursor-pointer">
                <i className="bi bi-box-arrow-in-right text-2xl" /> Sign in</button>
              <button onClick={() => toggleModal("sidebar")} 
                      className="text-xl sm:text-2xl">
                <i className="bi bi-list cursor-pointer"></i></button>
            </div>
          </div>
          <div className="p-2 relative">
            <div className="relative">
              <i className="bi bi-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
              <input type="text" placeholder="Search for Movies, Events, Sports and Activities" 
                     className="w-full border rounded-full pl-9 pr-3 py-2 text-xs sm:text-sm"
                     onFocus={() => toggleModal("search")} onClick={() => toggleModal("search")}/>
            </div>
          </div>
        </div>
        <div className="hidden md:block text-sm">
          <nav className="flex gap-4 justify-center text-center">
            {navbarData.Navbar_Options.map((item) => (
              <Link key={item.label} to={item.path} className="hover:text-gray-900">{item.label}</Link>
            ))}
          </nav>
        </div>
      </header>
    </div>
  );
}