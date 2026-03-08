import React from "react";
import { Link } from "react-router-dom";
import sports_1 from "../../assets/Sports_Images/sports_1.jpg";
import sports_2 from "../../assets/Sports_Images/sports_2.jpg";
import sports_3 from "../../assets/Sports_Images/sports_3.jpg";
import sports_4 from "../../assets/Sports_Images/sports_4.jpg";
const filters = [
  { title: "Date", chips: ["Today", "Tomorrow", "This Weekend"], extra: "Date Range" },
  { title: "Categories" },
  { title: "More Filters" },
  { title: "Price" }
];
export const events = [
  { id: 1, title: "Indian Supercross Racing League Season", date: "Sat, 6 Dec", 
    venue: "GMC Balayogi Sports Stadium", type: "Bike Racing", price: 249, img: sports_1 },
  { id: 2, title: "Telangana Half Marathon 2K26", date: "Sun, 25 Jan", 
    venue: "Gachibowli Stadium", type: "5K", price: 699, img: sports_2 },
  { id: 3, title: "Push Harder Day Run Challenge Virtual", date: "Sun, 30 Nov", 
    venue: "Your Place and Your Time", type: "Marathon", price: 530, img: sports_3 },
  { id: 4, title: "Diamond Painting Workshop", date: "Sun, 30 Nov", 
    venue: "Third Wave Coffee", type: "Mixed Martial Arts", price: 799, img: sports_4 }
];
const sportsChips = ["Mixed Martial Arts", "Running", "Chess", "Motorsports", "Cricket", "Cycling"];
export default function Sports() {
  return (
    <div className="bg-[#f8f9fa] min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row gap-10">
        {/* LEFT FILTER SIDEBAR */}
        <aside className="w-full lg:w-72 space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">Filters</h2>
          {filters.map((f) => (
            <div key={f.title} className="bg-white rounded-xl">
              <div className="flex justify-between items-center px-4 py-3 border-b">
                <span className="text-sm font-semibold">{f.title}</span>
                <span className="text-xs text-rose-500 cursor-pointer hover:underline">Clear</span>
              </div>
              {f.chips && (
                <div className="px-4 py-3 flex flex-wrap gap-2">
                  {f.chips.map((chip) => (
                    <button key={chip} 
                            className="px-3 py-1 text-xs rounded-full border bg-gray-50 
                                     hover:bg-rose-50 hover:border-rose-400 transition">{chip}</button>
                  ))}
                </div>
              )}
              {f.extra && (
                <div className="px-4 pb-4 flex items-center gap-2 text-xs">
                  <input type="checkbox" />
                  <span>{f.extra}</span>
                </div>
              )}
            </div>
          ))}
          <button className="w-full border border-rose-400 text-rose-500 py-2 rounded-lg 
                             text-sm font-medium hover:bg-rose-50 transition">Browse by Venues</button>
        </aside>
        {/* RIGHT MAIN CONTENT */}
        <main className="flex-1">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Sports In Hyderabad</h1>
            <div className="flex flex-wrap gap-3">
              {sportsChips.map((chip) => (
                <button key={chip} 
                        className="px-4 py-1.5 text-xs font-medium rounded-full bg-red-500 
                                 text-white hover:bg-red-600 transition">{chip}</button>
              ))}
            </div>
          </div>
          {/* EVENTS GRID */}
          <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
            {events.map((ev) => (
              <Link to={`/sports/${ev.id}`} key={ev.id}>
                <article className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition duration-300 overflow-hidden">
                  {/* Image */}
                  <div className="relative">
                    <img src={ev.img} alt={ev.title} className="w-full h-60 object-cover"/>
                    <div className="absolute bottom-0 w-full bg-black/70 text-white text-xs px-3 py-2">
                      {ev.date}
                    </div>
                  </div>
                  {/* Content */}
                  <div className="p-4 space-y-2">
                    <h3 className="text-base font-semibold text-gray-900 line-clamp-2">{ev.title}</h3>
                    <p className="text-sm text-gray-500">{ev.venue}</p>
                    <p className="text-sm text-gray-500">{ev.type}</p>
                    <p className="text-sm font-bold text-gray-900 mt-3">₹ {ev.price} onwards
                    </p>
                  </div>
                </article>
              </Link>
            ))}
          </section>
        </main>
      </div>
    </div>
  );
}