import { apiKey } from "@/constant/data";
import { HomeMoviesInterface } from "@/interface/movie";
import { Inter } from "next/font/google";
import Hero from "../components/Home/Hero";
import MovieRow from "../components/Home/MovieRow";
import ShowCase from "../components/Home/ShowCase";
const inter = Inter({ subsets: ["latin"] });
const getMovies = async () => {
  const popularMoviesRes = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`
  );
  const popularMovieData = await popularMoviesRes.json();
  const topRatedMoviesRes = await fetch(
    `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=en-US&page=1`
  );
  const topRatedMoviesData = await topRatedMoviesRes.json();
  const trendingMoviesDayRes = await fetch(
    `
    https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}`
  );
  const trendingMoviesDayData = await trendingMoviesDayRes.json();
  const trendingMoviesWeekRes = await fetch(
    `
    https://api.themoviedb.org/3/trending/movie/week?api_key=${apiKey}`
  );
  const trendingMoviesWeekData = await trendingMoviesWeekRes.json();
  return {
    popularMovieData: popularMovieData.results,
    topRatedMoviesData: topRatedMoviesData.results,
    trendingMoviesDayData: trendingMoviesDayData.results,
    trendingMoviesWeekData: trendingMoviesWeekData.results,
  };
};

export default async function Home() {
  const movies: HomeMoviesInterface = await getMovies();

  return (
    <>
      <Hero movie={movies.popularMovieData[3]} />
      <div className="max-w-screen-2xl mx-auto p-3">
        <MovieRow movies={movies.popularMovieData} title={"Popular Movies"} />
        <MovieRow
          movies={movies.topRatedMoviesData}
          title={"Top Rated Movies"}
        />
      </div>
      <ShowCase movie={movies.trendingMoviesDayData[1]} />
      <div className="max-w-screen-2xl mx-auto p-3">
        <MovieRow
          movies={movies.trendingMoviesDayData}
          title={"Trending Movies Today"}
        />
        <MovieRow
          movies={movies.trendingMoviesWeekData}
          title={"Trending Movies This Week"}
        />
      </div>
    </>
  );
}
