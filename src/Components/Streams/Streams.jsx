import React, { useState } from "react";
import Gallery from "../Movies/Gallery";
const genres = ["All","Action", "Comedy", "Drama", "Thriller"];
export default function Streams() {
  const [selectedGenre,setSelectedGenre] = useState("All");
  return (
    <div>
      <section className="pt-10">
        <div className="max-w-5xl mx-auto px-6 text-center justify-center">
          <h2 className="text-2xl md:text-3xl font-semibold mb-6">Browse movies by genre based titles</h2>
          <div className="flex justify-center gap-4">
            {genres.map((g) => (
              <button key={g}
                      onClick={()=>setSelectedGenre(g)}
                      className="px-6 py-2 rounded-full bg-rose-500 text-white text-sm
                                 md:text-base shadow-sm hover:bg-rose-600 cursor-pointer">
                {g}
              </button>
            ))}
          </div>
        </div>
      </section>
      <Gallery genre={selectedGenre}/>
    </div>
  );
}