"use client";
import { backdropUrl } from "@/constant/data";
import { MovieInterface } from "@/interface/movie";
import React, { useState } from "react";
import { Button } from "../mt";
import MovieDialog from "../global/MovieDialog";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
function Hero({ movie }: { movie: MovieInterface }) {
  const [isModalActive, setModalActive] = useState(false);
  const router = useRouter();
  const handleOpenModal = () => {
    setModalActive(!isModalActive);
  };
  const handlePlayNowClick = () => {
    router.push(`/movie/${movie.id}`);
  };
  return (
    <div className="relative bg-green-600">
      <QueryClientProvider client={new QueryClient()}>
        <MovieDialog
          open={isModalActive}
          handleOpenModal={handleOpenModal}
          movie={movie}
        />
      </QueryClientProvider>
      <img className="w-full" src={backdropUrl + movie.backdrop_path} alt="" />
      <div className="flex absolute flex items-center top-0 left-0 px-3 w-full h-full bg-black bg-opacity-50">
        <div className="text-white w-full mt-6 md:mt-0​ max-w-screen-2xl mx-auto">
          <p className="text-xl font-bold lg:text-3xl">{movie.title}</p>
          <p className="hidden md:block md:text-sm my-3 lg:w-2/3">
            {movie.overview}
          </p>
          <p className="text-xs lg:text-lg">Popularity : {movie.popularity} </p>
          <p className="text-xs lg:text-lg">Vote : {movie.vote_average}</p>
          <div className="w-full flex flex-col sm:w-2/4 sm:flex-row sm:items-center sm:gap-3 ">
            <Button
              onClick={handlePlayNowClick}
              size="sm"
              color="red"
              className="btn btn-xs   w-full  my-2 text-white sm:btn-sm"
            >
              PLAY NOW
            </Button>
            <Button
              onClick={handleOpenModal}
              size="sm"
              variant="outlined"
              color="red"
              className="  w-full text-white sm:btn-sm"
            >
              TRAILER
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
