import React from "react";
import { useParams, Link } from "react-router-dom";
import { orgmovies } from "./MovieData";
export const movies = orgmovies.map(({ id, img, title, lang, duration, describe }) => (
                                      { id, img, title, lang, duration, describe }));
export default function MovieDetail() {
  const { id } = useParams();
  const movie = movies.find((m) => m.id === Number(id));
  if (!movie) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-white bg-gray-900">
        <p className="mb-4">Movie not found.</p>
        <Link to="/" className="text-red-400">Back to home</Link>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="relative w-full h-90">
        <img src={movie.img} alt={movie.title} className="w-full h-64 sm:h-80 md:h-96 object-cover opacity-40"/>
        <div className="absolute inset-0 gradient-to-r from-black via-black/80 to-transparent" />
        <div className="absolute inset-0 flex flex-col md:flex-row items-center md:items-center 
                        justify-center md:justify-start gap-4 md:gap-8 px-4 sm:px-6 md:px-10">
          <img src={movie.img} alt={movie.title} 
               className="w-32 h-48 sm:w-40 sm:mt-15 sm:h-60 md:w-48 md:h-72 object-cover rounded-lg shadow-lg"/>
          <div className="text-center md:text-left mt-4 md:mt-0 max-w-md">
            <h1 className="text-2xl sm:text-3xl font-bold mb-2">{movie.title}</h1>
            <p className="text-xs sm:text-sm text-gray-300 mb-2">{movie.lang} • {movie.duration}</p>
            <Link to={`/showtimes/${movie.id}`}>
              <button 
                className="mt-3 sm:mt-4 bg-red-500 hover:bg-red-600 text-white px-4 
                           sm:px-5 py-2 rounded cursor-pointer">
                Book tickets
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <h2 className="text-lg sm:text-xl font-semibold mb-2">About the movie</h2>
        <p className="text-gray-300 text-sm sm:text-base">{movie.describe}</p>
      </div>
    </div>
  );
}