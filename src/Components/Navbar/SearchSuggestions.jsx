import React, { useState, useMemo } from "react";
import { useNavigate, Link } from "react-router-dom";
import { movies } from "../Movies/MovieDetail";
const MoviesListdata = movies.map(({ id, title }) => ({ id, title }));
const CategorybarOptions = [
  { label: "Home", path: "/" }, { label: "Movies", path: "/Movies-Pg" }, 
  { label: "Stream", path: "/Stream-Pg" }, { label: "Events", path: "/Events-Pg" }, 
  { label: "Sports", path: "/Sports-Pg" }, { label: "Activities", path: "/Activities-Pg" }
];
const CategorybarOptions_Links = ({ label, path, onClose }) => (
  <Link to={path} 
        className="px-4 py-1.5 rounded-full text-xs font-medium bg-red-500 text-white text-center" 
        onClick={onClose} > {label} </Link>
);
export default function SearchSuggestions({ onClose }) {
  const [query, setQuery] = useState("");
  const [movieMap, setMovieMap] = useState(MoviesListdata);
  const navigate = useNavigate();
  const allTitles = movieMap.map((m) => m.title);
  const filteredTitles = useMemo(() => {
    if (!allTitles.length) {
      return [];
    }
    if (!query.trim()) {
      return allTitles.slice(0, 6);
    }
    const q = query.toLowerCase();
    return allTitles.filter((t) => t.toLowerCase().includes(q));
  }, [query, allTitles]);
  const handleSelect = (title) => {
    const movie = movieMap.find((m) => m.title === title);
    if (movie) {
      navigate(`/search/${movie.id}`);
      onClose();
    }
  };
  const handleDelete = (title, e) => {
    e.stopPropagation();
    setMovieMap((prev) => prev.filter((m) => m.title !== title));
  }
  return (
    <div className="fixed inset-0 bg-white z-40 overflow-y-auto">
      <div className="max-w-4xl mx-auto pt-4 px-4 pb-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex-1">
            <div className="relative">
              <i className="bi bi-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
              <input type="text" value={query} onChange={(e) => setQuery(e.target.value)}
                     placeholder="Search for Movies, Events, Plays & more"
                     className="w-full rounded-full border border-rose-300 pl-10 pr-10 py-3 
                                text-sm focus:outline-none focus:ring-1 focus:ring-rose-400"/>
              <button onClick={onClose} type="button" 
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-3xl text-gray-400 
                               hover:text-gray-600 leading-none">
                <i className="bi bi-x"></i></button>
            </div>
            <div className="flex flex-wrap flex-col sm:flex-row  text-center justify-center gap-2 mt-4 ">
              {CategorybarOptions.map(({ label, path }) => (
                <div key={label} className="flex justify-center basis-1/3 sm:basis-auto">
                  <CategorybarOptions_Links label={label} path={path} onClose={onClose}/>
                </div>
              ))}
            </div>
          </div>
        </div>
        <section className="mt-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xs font-semibold text-gray-500 tracking-wide"> {query ? "SEARCH RESULTS" : "SUGGESTED TITLES"}</h3>
          </div>
          <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
            {filteredTitles.length === 0 ? (
              <div className="px-4 py-3 text-sm text-gray-500">No matches found.</div>
            ) : (
              filteredTitles.map((title, idx) => (
                <button key={title + idx} onClick={() => handleSelect(title)} 
                        className={`w-full flex items-center justify-between px-4 py-3 text-sm hover:bg-gray-50 ${
                    idx !== filteredTitles.length - 1 ? "border-b" : ""
                  }`}>
                  <span className="text-gray-800">{title}</span>
                  <div className="flex items-center gap-3">
                    <button type="button" onClick={(e) => handleDelete(title, e)} 
                            className="text-2xl text-gray-400 hover:text-red-500">
                      <i className="bi bi-trash cursor-pointer"></i></button>
                  </div>
                </button>
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  );
}