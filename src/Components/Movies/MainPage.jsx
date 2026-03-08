import React from "react";
import Gallery from "./Gallery";
import { orgmovies } from "./MovieData";
import blog from "../../assets/blog.jpg";
import Events from "../Events/Events";
export default function MainPage(){
    const firstFourMovies = orgmovies.slice(0,4);
    return(
        <div>
            <Gallery movies={firstFourMovies}/>
            <section id="banner">
                <img src={blog} alt="blog_poster" className="flex m-auto justify-center w-auto h-auto cursor-pointer" />
            </section>
            <Events/>
        </div>
    )
}