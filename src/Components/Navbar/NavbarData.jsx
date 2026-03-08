import React from "react";
export const navbarData = {
    Navbar_Options: [
      { label: "Home", path: "/" }, 
      { label: "Movies", path: "/Movies-Pg" }, 
      { label: "Stream", path: "/Stream-Pg" }, 
      { label: "Events", path: "/Events-Pg" }, 
      { label: "Sports", path: "/Sports-Pg" }, 
      { label: "Activities", path: "/Activities-Pg" }
    ],
    Signin_Options: [
       { icon: "google", label: "Continue with Google" }, 
       { icon: "envelope", label: "Continue with Email" }, 
       { icon: "apple", label: "Continue with Apple" }
    ],
    Sidebar_Options: [
      { title: "Notifications", sub: "View all your Notifications" },
      { title: "Your Orders", sub: "View all your bookings & purchases", muted: true },
      { title: "Stream Library", sub: "Rented & Purchased Movies", muted: true },
      { title: "Play Credit Card", sub: "View your Play Credit Card details and offers", muted: true },
      { title: "Help & Support", sub: "View commonly asked queries and Chat" },
      { title: "Accounts & Settings", sub: "Location, Payments, Permissions & More", muted: true },
      { title: "Rewards", sub: "View your rewards & unlock new ones", muted: true },
      { title: "Book A Change", sub: " ", muted: true }
    ]
  };