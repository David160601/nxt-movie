"use client";

import { backdropUrl } from "@/constant/data";
import { MovieInterface } from "@/interface/movie";

import React, { useState } from "react";
import { Button } from "../mt";
import MovieDialog from "../global/MovieDialog";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
function ShowCase({ movie }: { movie: MovieInterface }) {
  const router = useRouter();
  const [isModalActive, setModalActive] = useState(false);
  const handleOpenModal = () => {
    setModalActive(!isModalActive);
  };
  const handlePlayNowClick = () => {
    router.push(`/movie/${movie.id}`);
  };
  return (
    <div className="relative">
      <QueryClientProvider client={new QueryClient()}>
        <MovieDialog
          open={isModalActive}
          handleOpenModal={handleOpenModal}
          movie={movie}
        />
      </QueryClientProvider>
      ​
      <div
        style={{
          background: `url(${backdropUrl + movie.backdrop_path})`,
          backgroundAttachment: "fixed",
          backgroundSize: "cover",
        }}
        className="h-[36rem]"
      >
        <div className="w-full h-full bg-black bg-opacity-50 p-3">
          <div className="max-w-screen-2xl mx-auto flex items-center h-full flex-col gap-3                                                                                                                                                                md:flex-row">
            <div className="text-white w-full mt-6 md:mt-0​ flex-1">
              <p className="text-xl font-bold lg:text-3xl">{movie.title}</p>
              <p className="text-xs md:text-sm my-3 lg:w-2/3">
                {movie.overview}
              </p>
              <p className="text-xs lg:text-lg">
                Popularity : {movie.popularity}{" "}
              </p>
              <p className="text-xs lg:text-lg mb-2">
                Vote : {movie.vote_average}
              </p>

              <div
                style={{ width: "100%" }}
                className="flex flex-col sm:w-2/4 sm:flex-row sm:items-center sm:gap-3"
              >
                <Button
                  onClick={handlePlayNowClick}
                  size="sm"
                  color="red"
                  className="w-full"
                >
                  PLAY NOW
                </Button>
                <Button
                  onClick={handleOpenModal}
                  size="sm"
                  variant="outlined"
                  color="red"
                  className="my-2 md:my-0 w-full"
                >
                  TRAILER
                </Button>
              </div>
            </div>
            <div className="flex-1 mt-2">
              <img
                src={backdropUrl + movie.backdrop_path}
                alt="image"
                className="h-auto w-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShowCase;
