import React, { useState } from "react";
const liveEvents = [
  { id: 1, title: "COMEDY SHOWS", subtitle: "85+ Events", colorFrom: "#f97373", colorTo: "#ec4899" },
  { id: 2, title: "AMUSEMENT PARK", subtitle: "15+ Events", colorFrom: "#38bdf8", colorTo: "#22c55e" },
  { id: 3, title: "THEATRE SHOWS", subtitle: "15+ Events", colorFrom: "#2563eb", colorTo: "#0ea5e9" },
  { id: 4, title: "KIDS", subtitle: "15+ Events", colorFrom: "#6366f1", colorTo: "#22c55e" },
  { id: 5, title: "ADVENTURE & FUN", subtitle: "10 Events", colorFrom: "#22c55e", colorTo: "#06b6d4" }
];
const CARD_WIDTH = 260;
const GAP = 24;
export default function Events() {
  const [index, setIndex] = useState(0);
  const visibleCards = 4;
  const maxIndex = Math.max(0, liveEvents.length - visibleCards);
  const handlePrev = () => setIndex((i) => Math.max(0, i - 1));
  const handleNext = () => setIndex((i) => Math.min(maxIndex, i + 1));
  return (
    <section className="grow">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mt-5">Recommended Events</h1>
        <h2 className="text-lg md:text-xl font-semibold mb-4">The Best Of Live Events</h2>
        <div className="relative">
          <button onClick={handlePrev} 
                  disabled={index === 0} 
                  className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 
                              w-9 h-9 rounded-full bg-white shadow items-center 
                              justify-center text-gray-700 disabled:opacity-40">
                                ‹
          </button>
          <button onClick={handleNext} 
                  disabled={index === maxIndex} 
                  className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 
                              w-9 h-9 rounded-full bg-white shadow items-center 
                              justify-center text-gray-700 disabled:opacity-40" >
                                ›
          </button>
          <div className="overflow-x-auto md:overflow-hidden">
            <div className="flex md:transition-transform md:duration-300 gap-4 md:gap-6 pb-2" 
                 style={{ transform: `translateX(-${index * (CARD_WIDTH + GAP)}px)` }} >
              {liveEvents.map((item) => (
                <div key={item.id}
                     className="shrink-0 w-[70vw] max-w-xs sm:w-[45vw] md:w-65 rounded-3xl p-1 
                              text-white cursor-pointer hover:scale-[1.02] transition-transform">
                  <div className="w-full h-40 sm:h-48 md:h-52 rounded-3xl p-5 flex flex-col justify-between" 
                       style={{ backgroundImage: `linear-gradient(135deg, ${item.colorFrom}, ${item.colorTo})`}}>
                    <div>
                      <p className="text-xs sm:text-sm font-medium opacity-90">The Best Of</p>
                      <h3 className="mt-2 text-lg sm:text-2xl font-bold leading-tight">{item.title}</h3>
                    </div>
                    <p className="text-xs sm:text-sm font-semibold opacity-90">{item.subtitle}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}