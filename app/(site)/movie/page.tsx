import React from "react";
import { apiKey } from "@/constant/data";
import { SearchMoviesInterface } from "@/interface/movie";
import Movie from "../../components/global/Movie";
import Pagination from "@/app/components/global/Pagination";
const getMovies = async (search: string, page: number = 1) => {
  const moviesRes: any = await fetch(
    `https://api.themoviedb.org/3/search/movie?query=${search}&api_key=${apiKey}&language=en-US&page=${page}`
  );
  const moviesResData = await moviesRes.json();
  return moviesResData;
};
async function MovieSearch({ searchParams }: { searchParams: any }) {
  if (searchParams.search) {
    const movies: SearchMoviesInterface = await getMovies(
      searchParams.search,
      searchParams.page
    );
    return (
      <div className="min-h-[92vh] max-w-screen-2xl mx-auto mt-[8vh]">
        <div className="p-3">
          <div className="flex items-center 2">
            <div className="h-8 w-2 bg-red-600 mr-2"></div>
            <p className="font-bold">Search Results : {movies.total_results}</p>
          </div>
          <div className="grid grid-cols-2  sm:grid-cols-4 md:grid-cols-6 gap-2 mt-3">
            {movies.results?.map((movie, index) => {
              return <Movie key={movie.id} movie={movie} />;
            })}
          </div>
          {movies.results.length > 0 && movies.total_pages > 1 && (
            <div className="flex justify-center my-2 ">
              <Pagination
                pageCount={movies.total_pages}
                forcePage={parseInt(searchParams.page)}
                search={searchParams.search}
              />
            </div>
          )}
        </div>
      </div>
    );
  } else {
    return (
      <div className="min-h-[92vh] max-w-screen-2xl mx-auto mt-[8vh]">
        <div className="p-3">
          <div className="flex items-center 2">
            <div className="h-8 w-2 bg-red-600 mr-2"></div>
            <p className="font-bold">Search Results : 0</p>
          </div>
        </div>
      </div>
    );
  }
}
export default MovieSearch;
