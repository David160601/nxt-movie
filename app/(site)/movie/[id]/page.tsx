import { getTrailer } from "@/app/Services/general";
import MovieRow from "@/app/components/Home/MovieRow";
import Overview from "@/app/components/Movie/Overview";
import Pictures from "@/app/components/Movie/Pictures";

import { apiKey, backdropUrl, imageUrl } from "@/constant/data";
import { MovieDetail } from "@/interface/movie";
import React from "react";
const getMoviedetail = async (id: number) => {
  const movieRes: any = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`
  );
  const movieData = await movieRes.json();

  const imageRes: any = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/images?api_key=${apiKey}`
  );
  const imageData = await imageRes.json();
  //
  const similarMovieRes: any = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${apiKey}&language=en-US&page=1`
  );
  const similarMovieData = await similarMovieRes.json();

  //
  const RecommendMovieRes: any = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${apiKey}&language=en-US&page=1`
  );
  const recommendMovieData = await RecommendMovieRes.json();
  const trailerData = await getTrailer(id);
  return {
    movieData: movieData,
    imageData: imageData.backdrops,
    similarMovieData: similarMovieData.results,
    recommendMovieData: recommendMovieData.results,
    trailerData: trailerData,
  };
};
async function MovieDetail({ params }: { params: any }) {
  const movieDetail: MovieDetail = await getMoviedetail(params.id);

  return (
    <div className="min-h-[85vh] mx-auto mt-[7vh] ">
      <div
        style={{
          background: `url("${
            backdropUrl + movieDetail.movieData.backdrop_path
          }")`,
          backgroundSize: "cover",
          backgroundAttachment: "fixed",
          position: "fixed",
          height: "100%",
          width: "100%",
          filter: "blur(4px)",
          zIndex: -100,
        }}
        className="fixed blur-sm -z-10"
      ></div>

      <div className="min-h-[85vh] bg-black bg-opacity-30 p-3">
        <div className="max-w-screen-2xl mx-auto h-full">
          <div className="moviePart">
            <div className="movie-detail flex flex-col md:flex-row gap-3">
              <div className="lg:flex-1">
                <div className=" flex flex-col  items-center">
                  <img
                    className="h-72"
                    src={
                      movieDetail.movieData.poster_path
                        ? imageUrl + movieDetail.movieData.poster_path
                        : "https://innovating.capital/wp-content/uploads/2021/05/vertical-placeholder-image.jpg"
                    }
                    alt=""
                  />
                </div>
                <div>
                  <div className=" flex flex-col md:items-center">
                    <p className="font-bold text-xl my-2">
                      {movieDetail.movieData.title}
                    </p>
                    <p>
                      Original Language :{" "}
                      {movieDetail.movieData.original_language}
                    </p>
                    <p>Vote : {movieDetail.movieData.vote_average}</p>
                    <p>Popularity : {movieDetail.movieData.popularity}</p>
                  </div>
                </div>
              </div>
              <div className="youtube container my-2 flex-1 ">
                {movieDetail.trailerData?.key ? (
                  <div className="px-3 h-full">
                    <iframe
                      className="w-full h-64 md:h-full"
                      allowFullScreen
                      frameBorder="0"
                      src={`https://www.youtube.com/embed/${movieDetail.trailerData?.key}?autoplay=1`}
                      title="YouTube video player"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    ></iframe>
                  </div>
                ) : (
                  <div className="flex justify-center items-center h-full bg-midBlack">
                    <h1 className="text-3xl ">Trailer Not Found ! </h1>
                  </div>
                )}
              </div>
            </div>
          </div>
          {movieDetail.movieData.overview && (
            <Overview
              title="Overview"
              overview={movieDetail.movieData.overview}
            />
          )}
          {movieDetail.imageData.length > 0 && (
            <Pictures images={movieDetail.imageData} />
          )}

          {movieDetail.similarMovieData.length > 0 && (
            <MovieRow
              movies={movieDetail.similarMovieData}
              title={"Similar Movies"}
            />
          )}

          {movieDetail.recommendMovieData.length > 0 && (
            <MovieRow
              movies={movieDetail.recommendMovieData}
              title={"Recommend Movies"}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default MovieDetail;
