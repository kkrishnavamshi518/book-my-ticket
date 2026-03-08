import React, { useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import LanguageFormatModal from "./ShowLanguageFormat";
import { orgmovies } from "./MovieData";
const movies = orgmovies.map((m) => ({
  id: m.id, img: m.img, title: m.title, lang: m.lang, duration: m.duration, describe: m.describe,
}));
const CINEMAS = [
  { id: 1, name: "Asian Mall : Secunderabad", shows: ["02:40 PM", "06:40 PM", "08:15 PM"] },
  { id: 2, name: "PVR: Nexus Mall Kukatpally, Hyderabad", shows: ["02:40 PM", "06:40 PM", "08:15 PM"] },
  { id: 3, name: "Prasads Multiplex : Khairtabad, Hyderabad", shows: ["02:40 PM", "06:40 PM", "08:15 PM"] },
  { id: 4, name: "Sandhya 70 MM : RTC X Road, Hyderabad", shows: ["02:40 PM", "06:40 PM", "08:15 PM"] },
];
const PRICE_RANGES = ["₹200 - ₹400", "₹400 - ₹700"];
const PREFERRED_TIMES = [
  "Morning (9 AM - 12 PM)", "Afternoon (1 PM - 4 PM)", "Evening (5 PM - 8 PM)", "Night (8:30 PM - 11:30 PM)",
];
const SORT_OPTIONS = [
  "Earliest show", "Latest show", "Price: Low to High", "Price: High to Low", "Nearest cinema",
];
const parseTimeToMinutes = (t) => {
  const [time, mer] = t.split(" ");
  let [h, m] = time.split(":").map(Number);
  if (mer === "PM" && h !== 12) h += 12;
  if (mer === "AM" && h === 12) h = 0;
  return h * 60 + m;
};
export default function ShowtimesPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const movie = movies.find((m) => m.id === Number(id));
  const [langFormat, setLangFormat] = useState(null);
  const [lfOpen, setLfOpen] = useState(true);
  const [selectedPriceRange, setSelectedPriceRange] = useState(null);
  const [selectedTimeRange, setSelectedTimeRange] = useState(null);
  const [selectedSort, setSelectedSort] = useState(null);
  const [priceOpen, setPriceOpen] = useState(false);
  const [timeOpen, setTimeOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  if (!movie) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-700">Movie not found.</p>
      </div>
    );
  }
  const handleShowClick = (time) => {
    const lang = langFormat?.lang || "English";
    const format = langFormat?.format || "2D";
    navigate(
      `/seats/${movie.id}?time=${encodeURIComponent(time)}&lang=${encodeURIComponent(
        lang
      )}&format=${encodeURIComponent(format)}`
    );
  };
  const handleSelectLangFormat = (choice) => {
    setLangFormat({ lang: choice.lang, format: choice.format });
    setLfOpen(false);
  };
  const sortedCinemas = useMemo(() => {
    const copy = [...CINEMAS];
    if (selectedSort === "Earliest show") {
      copy.sort((a, b) => {
        const aMin = Math.min(...a.shows.map(parseTimeToMinutes));
        const bMin = Math.min(...b.shows.map(parseTimeToMinutes));
        return aMin - bMin;
      });
    } else if (selectedSort === "Latest show") {
      copy.sort((a, b) => {
        const aMax = Math.max(...a.shows.map(parseTimeToMinutes));
        const bMax = Math.max(...b.shows.map(parseTimeToMinutes));
        return bMax - aMax;
      });
    }
    return copy;
  }, [selectedSort]);
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b bg-white">
        <div className="max-w-6xl mx-auto px-3 sm:px-4 md:px-6 py-4">
          <h1 className="text-lg sm:text-2xl font-semibold">{movie.title} {langFormat ? `- (${langFormat.lang})` : ""}</h1>
          <div className="mt-2 flex flex-wrap gap-2 text-[11px] sm:text-xs">
            <span className="px-2 py-1 bg-gray-100 rounded-full">Movie duration : {movie.duration}</span>
            <span className="px-2 py-1 bg-gray-100 rounded-full">UA 7+</span>
            <span className="px-2 py-1 bg-gray-100 rounded-full">Adventure</span>
            <span className="px-2 py-1 bg-gray-100 rounded-full">Animation</span>
            <span className="px-2 py-1 bg-gray-100 rounded-full">Comedy</span>
          </div>
          {/* FILTER BAR */}
          <div className="mt-4 grid grid-cols-2 sm:flex sm:flex-wrap border border-gray-300 rounded-xl overflow-hidden text-xs sm:text-sm">
            <button onClick={() => setLfOpen(true)}
              className="px-3 sm:px-4 py-2 flex-1 min-w-[45%] sm:min-w-0 border-r flex items-center 
                        justify-between text-center border-b sm:border-b-0 sm:border-r border-gray-300" >
              <span>
                {langFormat ? `${langFormat.lang} - ${langFormat.format}` : "Select language"}
              </span>
              <i className="bi bi-chevron-down text-[10px] sm:text-xs" />
            </button>
            <button onClick={() => setPriceOpen(true)}
              className="px-3 sm:px-4 py-2 flex-1 min-w-[45%] sm:min-w-0 border-r flex 
                        items-center justify-between text-center border-b sm:border-b-0 sm:border-r border-gray-300" >
              <span>{selectedPriceRange || "Price Range"}</span>
              <i className="bi bi-chevron-down text-[10px] sm:text-xs" />
            </button>
            <button onClick={() => setTimeOpen(true)}
              className="px-3 sm:px-4 py-2 flex-1 min-w-[45%] sm:min-w-0 border-r 
                        flex items-center justify-between text-center border-b sm:border-b-0 sm:border-r border-gray-300" >
              <span>{selectedTimeRange || "Preferred Time"}</span>
              <i className="bi bi-chevron-down text-[10px] sm:text-xs" />
            </button>
            <button onClick={() => setSortOpen(true)}
              className="px-3 sm:px-4 py-2 flex-1 min-w-[45%] sm:min-w-0 border-r 
                        flex items-center justify-between text-center border-b sm:border-b-0 sm:border-r border-gray-300" >
              <span>{selectedSort || "Sort By"}</span>
              <i className="bi bi-chevron-down text-[10px] sm:text-xs" />
            </button>
            <button className="px-3 py-2 flex items-center justify-center">
              <i className="bi bi-search" />
            </button>
          </div>
        </div>
      </header>
      {/* CINEMA LIST */}
      <main className="max-w-6xl mx-auto px-3 sm:px-4 md:px-6 py-4 sm:py-6 space-y-3 sm:space-y-4">
        {sortedCinemas.map((c) => (
          <div key={c.id} 
            className="bg-white rounded-lg shadow-sm border px-3 py-3 sm:px-4 sm:py-4 
                        flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
            <div className="min-w-0">
              <h3 className="text-sm sm:text-base font-semibold leading-snug">{c.name}</h3>
              <p className="text-[11px] sm:text-xs text-gray-500 mt-1">Non-cancellable</p>
            </div>
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {c.shows.map((t) => (
                <button key={t} onClick={() => handleShowClick(t)} 
                  className="px-3 sm:px-4 py-1.5 sm:py-2 border border-green-500 rounded text-xs sm:text-sm text-green-600 
                          hover:bg-green-50  cursor-pointer">{t}</button>
              ))}
            </div>
          </div>
        ))}
      </main>
      {/* LANGUAGE + FORMAT MODAL */}
      <LanguageFormatModal movieTitle={movie.title} open={lfOpen} onClose={() => setLfOpen(false)} onSelect={handleSelectLangFormat}/>
      {/* PRICE MODAL */}
      {priceOpen && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-sm">
            <div className="flex items-center justify-between px-5 py-4 border-b">
              <h2 className="text-base sm:text-lg font-semibold">Select price range</h2>
              <button onClick={() => setPriceOpen(false)} 
                className="text-base sm:text-lg text-gray-500 hover:text-gray-700 leading-none">
                <i className="bi bi-x" />
              </button>
            </div>
            <div className="px-5 py-4 space-y-2 text-sm">
              {PRICE_RANGES.map((p) => (
                <button key={p} onClick={() => {
                    setSelectedPriceRange(p);
                    setPriceOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-50">{p}</button>
              ))}
            </div>
          </div>
        </div>
      )}
      {/* TIME MODAL */}
      {timeOpen && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-sm">
            <div className="flex items-center justify-between px-5 py-4 border-b">
              <h2 className="text-base sm:text-lg font-semibold">Preferred Time</h2>
              <button onClick={() => setTimeOpen(false)}
                className="text-base sm:text-lg text-gray-500 hover:text-gray-700 leading-none ">
                <i className="bi bi-x" />
              </button>
            </div>
            <div className="px-5 py-4 space-y-2 text-sm">
              {PREFERRED_TIMES.map((t) => (
                <button key={t} onClick={() => {
                    setSelectedTimeRange(t);
                    setTimeOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-50 ">{t}</button>
              ))}
            </div>
          </div>
        </div>
      )}
      {/* SORT MODAL */}
      {sortOpen && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-sm">
            <div className="flex items-center justify-between px-5 py-4 border-b">
              <h2 className="text-base sm:text-lg font-semibold">Sort shows</h2>
              <button onClick={() => setSortOpen(false)}
                className="text-base sm:text-lg text-gray-500 hover:text-gray-700 leading-none">
                <i className="bi bi-x" />
              </button>
            </div>
            <div className="px-5 py-4 space-y-2 text-sm">
              {SORT_OPTIONS.map((s) => (
                <button key={s} onClick={() => {
                    setSelectedSort(s);
                    setSortOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-50">{s}</button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}