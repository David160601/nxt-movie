import { MovieInterface } from "@/interface/movie";
import React from "react";
import Movie from "../global/Movie";

function MovieRow({
  title = "title",
  movies,
}: {
  title: string;
  movies: MovieInterface[];
}) {
  return (
    <div className="my-2">
      <div className="flex items-center">
        <div className="h-8 w-2 bg-red-600 mr-2"></div>
        <p className="font-bold">{title}</p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2 mt-3">
        {movies?.map((movie, index) => {
          return index <= 5 && <Movie key={movie.id} movie={movie} />;
        })}
      </div>
    </div>
  );
}

export default MovieRow;
