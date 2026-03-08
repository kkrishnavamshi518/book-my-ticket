import React from "react";
import { useNavigate } from "react-router-dom";
import pic1 from "../../assets/Activities_Images/pic1.jpg";
import pic2 from "../../assets/Activities_Images/pic2.jpg";
import pic3 from "../../assets/Activities_Images/pic3.jpg";
import pic4 from "../../assets/Activities_Images/pic4.jpg";
export const activitiesData = [
  { id: 1, title: "Snow Kingdom Hyderabad", venue: "Snow Kingdom: Hyderabad", type: "Snow Parks", price: 150, date: "Sat, 29 Nov onwards", img: pic1 },
  { id: 2, title: "Ramoji Film City", venue: "Ramoji Film City: Hyderabad", type: "Theme Parks", price: 1475, date: "Sun, 30 Nov onwards", img: pic2 },
  { id: 3, title: "EXPERIUM", venue: "Experium: Hyderabad", type: "Adventure", price: 590, date: "Sun, 30 Nov onwards", img: pic3 },
  { id: 4, title: "Wild Waters Amusement Park", venue: "Wild Waters: Hyderabad", type: "Water Park", price: 795, date: "Sun, 30 Nov", img: pic4 }
];
const filterBlocks = [
  { title: "Date", chips: ["Today", "Tomorrow", "This Weekend"], extraCheckbox: "Date Range" }, 
  { title: "Categories" }, { title: "More Filters" }, { title: "Price" }
];
const activityChips = [ "Amusement Parks", "Tourist Attractions", "Adventure", "Gaming", "Festivals", "Food & Drinks"];
export default function Activities() {
  const navigate = useNavigate();
  return (
    <div className="bg-[#f5f5f7] min-h-screen py-10">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8 px-4">
        {/* FILTER SIDEBAR */}
        <aside className="w-full md:w-72">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Filters</h2>
          <div className="space-y-4">
            {filterBlocks.map((block) => (
              <div key={block.title}
                className="bg-white rounded-xl shadow-sm border border-gray-200" >
                <div className="flex items-center justify-between px-4 py-3 text-sm font-medium text-gray-900">
                  <div className="flex items-center gap-2">
                    {block.title}
                    <span className="text-xs">▾</span>
                  </div>
                  <button className="text-xs text-rose-500 hover:underline">Clear</button>
                </div>
                {block.chips && (
                  <div className="px-4 pb-3 flex flex-wrap gap-2">
                    {block.chips.map((chip) => (
                      <button key={chip} 
                              className="px-3 py-1 rounded-full border text-xs text-gray-800 bg-gray-50 
                                       hover:bg-rose-50 hover:border-rose-400 transition" >
                        {chip}
                      </button>
                    ))}
                  </div>
                )}
                {block.extraCheckbox && (
                  <div className="px-4 pb-3 flex items-center gap-2 text-xs text-gray-700">
                    <input type="checkbox" className="h-3 w-3" />
                    <span>{block.extraCheckbox}</span>
                  </div>
                )}
              </div>
            ))}
            <button className="w-full border border-rose-400 text-rose-500 text-sm font-medium 
                               py-2 rounded-lg bg-white hover:bg-rose-50 transition">
              Browse by Venues
            </button>
          </div>
        </aside>
        {/*  MAIN CONTENT */}
        <main className="flex-1">
          {/* Header */}
          <header className="mb-6">
            <h1 className="text-2xl font-semibold text-gray-900 mb-3">Activities In Hyderabad</h1>
            <div className="flex flex-wrap gap-2">
              {activityChips.map((chip) => (
                <button key={chip} 
                        className="px-3 py-1 rounded-full bg-red-500 text-white text-xs 
                                 hover:bg-red-600 transition" >
                  {chip}
                </button>
              ))}
            </div>
          </header>
          {/* Activity Cards */}
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {activitiesData.map((act) => (
              <article key={act.id}
                onClick={() =>
                  navigate(`/activity-booking/${act.id}`)
                }
                className="bg-white rounded-xl shadow-sm overflow-hidden cursor-pointer 
                             hover:shadow-xl transition duration-200" >
                <div className="relative">
                  <img src={act.img} alt={act.title} className="w-full h-64 object-cover" />
                  <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white text-xs px-3 py-2">
                    {act.date}
                  </div>
                </div>
                <div className="px-4 py-3 space-y-1">
                  <h3 className="text-sm font-semibold text-gray-900 line-clamp-2">{act.title}</h3>
                  <p className="text-xs text-gray-500">{act.venue}</p>
                  <p className="text-xs text-gray-500">{act.type}</p>
                  <p className="text-sm font-semibold text-gray-800 mt-1"> ₹ {act.price}</p>
                </div>
              </article>
            ))}
          </section>
        </main>
      </div>
    </div>
  );
}