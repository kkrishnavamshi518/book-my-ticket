import React from "react";
import { Link } from "react-router-dom";
import { orgmovies } from "./MovieData";
export default function Gallery({ genre, movies }) {
  const data = movies || orgmovies;
  const filteredMovies = !genre || genre === "All" ? data : data.filter(movie => movie.genre === genre);
  return (
    <section className="text-gray-600 body-font">
      <div className="container p-3 m-auto text-center">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mt-5">Recommended Movies</h1>
        <div className="flex justify-center flex-wrap">
          {filteredMovies.map((movie) => (
            <div key={movie.id} className="w-40 sm:w-48 md:w-56 lg:w-64 p-4">
              <Link to={`/movie/${movie.id}`} className="block rounded overflow-hidden">
                <img src={movie.img} alt={movie.title}
                     className="w-40 h-60 sm:w-48 sm:h-72 md:w-45 md:h-80 lg:h-80 lg:w-50
                                object-cover cursor-pointer hover:scale-105 transition-transform" />
              </Link>
              <div className="mt-4">
                <h3 className="text-gray-800 text-xs tracking-widest title-font mb-1">{movie.title}</h3>
                <h2 className="text-gray-900 title-font text-lg font-medium">{movie.lang}</h2>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}