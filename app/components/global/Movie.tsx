"use client";
import React, { useState } from "react";
import { MovieInterface } from "@/interface/movie";
import { imageUrl } from "@/constant/data";
import { AiFillPlayCircle } from "react-icons/ai";
import { IoIosInformationCircle } from "react-icons/io";
import MovieDialog from "./MovieDialog";
import Link from "next/link";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function Movie({ movie }: { movie: MovieInterface }) {
  const [isModalActive, setModalActive] = useState(false);
  const handleOpenModal = () => {
    setModalActive(!isModalActive);
  };

  return (
    <>
      <QueryClientProvider client={new QueryClient()}>
        <MovieDialog
          open={isModalActive}
          handleOpenModal={handleOpenModal}
          movie={movie}
        />
      </QueryClientProvider>

      <div className="movie-container group hover:cursor-pointer flex flex-col">
        <div className="overflow-hidden relative flex-2 ">
          <img
            src={
              movie.poster_path
                ? imageUrl + movie.poster_path
                : "https://innovating.capital/wp-content/uploads/2021/05/vertical-placeholder-image.jpg"
            }
            alt=""
            className="group-hover:scale-125 duration-500 group-hover:blur-sm "
          />

          <div className="hidden w-full h-full top-0 left-0 bg-black duration-500 bg-opacity-50 group-hover:absolute group-hover:block"></div>

          <Link href={`movie/${movie.id}`}>
            <AiFillPlayCircle className="duration-300 fill-red-600 w-12 scale-0 group-hover:scale-100 h-12 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 hover:fill-red-800 " />
          </Link>

          <IoIosInformationCircle
            onClick={handleOpenModal}
            style={{ right: 0 }}
            className="duration-300 fill-red-600 w-8 h-8 scale-0 group-hover:scale-100 absolute top-0  ​​ hover:fill-red-800 "
          />
          <div
            style={{ zIndex: 100 }}
            className="h-0 group-hover:h-full duration-300 w-2  z-100 absolute top-0 left-0"
          ></div>
        </div>
        <p className="text-xs flex-1 text-center group-hover:text-red-600 duration-500 md:text-md mt-1 h-full">
          {movie.title}
        </p>
      </div>
    </>
  );
}

export default Movie;
