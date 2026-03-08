import React from "react";
import { Link } from "react-router-dom";
const icons = ["bi bi-facebook", "bi bi-twitter-x", "bi bi-instagram", "bi bi-linkedin"];
export default function Footer() {
  return (
    <footer className="bg-[#141414] text-gray-400">
      <div className="container mx-auto flex flex-col items-center py-8">
        <div className="mb-4 text-white text-xl font-semibold">
          <Link to="/" className="flex items-center font-bold text-xl sm:text-2xl" >
            <span className="text-white mr-1">Book</span>
            <span className="bg-red-500 text-white px-1 mr-1 rounded">My</span>
            <span className="text-white">Ticket</span>
          </Link>
        </div>
        <div className="flex space-x-5 mb-4 text-xl">
          {icons.map((name) => (
            <Link key={name} to="#" className="hover:text-white"> <i className={`${name}`} /> </Link>
          ))}
        </div>
        <p className="text-xs md:text-sm text-center max-w-4xl leading-relaxed"> © 2026 Book My Ticket | All Rights Reserved.</p>
      </div>
    </footer>
  );
}