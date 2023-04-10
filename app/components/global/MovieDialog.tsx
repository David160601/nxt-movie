"use client";
import { backdropUrl, imageUrl } from "@/constant/data";
import { MovieInterface, Trailer, WindowDemension } from "@/interface/movie";
import { Button, Dialog } from "@material-tailwind/react";
import { useQuery } from "@tanstack/react-query";
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../../../tailwind.config";

import { AiOutlineClose, AiFillPlayCircle } from "react-icons/ai";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getTrailer } from "@/app/Services/general";

const fullConfig = resolveConfig(tailwindConfig);

fullConfig.theme.screens.md;
// => '768px'

export default function MovieDialog({
  open,
  handleOpenModal,
  movie,
}: {
  open: boolean;
  handleOpenModal: any;
  movie: MovieInterface;
}) {
  const router = useRouter();
  function getWindowDimensions() {
    if (typeof window !== "undefined") {
      const { innerWidth: width, innerHeight: height } = window;
      return {
        width,
        height,
      };
    } else {
      return {
        width: undefined,
        height: undefined,
      };
    }
  }
  const [windowDimensions, setWindowDimensions] = useState<any>(
    getWindowDimensions()
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [windowDimensions, setWindowDimensions]);

  const getDialogSize = () => {
    if (windowDimensions?.width <= parseInt(fullConfig.theme.screens.md)) {
      return "xl";
    } else if (
      windowDimensions?.width <= parseInt(fullConfig.theme.screens.lg)
    ) {
      return "lg"
    } else {
      return "sm";
    }
  };
  const handlePlayNowClick = () => {
    router.push(`/movie/${movie.id}`);
  };

  const { data, error, status } = useQuery({
    queryKey: ["trailer", movie.id],
    queryFn: () => getTrailer(movie.id),
  });

  return (
    <Dialog
      open={open}
      handler={handleOpenModal}
      className={`bg-midBlack relative scrollbar-hide max-h-[90vh] overflow-y-scroll pb-2 ${
        !movie.backdrop_path && "pt-2"
      }`}
      size={getDialogSize()}
    >
      <AiOutlineClose
        onClick={handleOpenModal}
        className="fill-white sticky top-0 left-[100%] hover:fill-red-600 duration-500 right-0 -mt-7 w-6 h-6 cursor-pointer"
      />
      {movie.backdrop_path && (
        <img
          src={backdropUrl + movie.backdrop_path}
          alt="movie cover"
          className="rounded-t-md"
        />
      )}

      <div className="px-3 pb-3 flex gap-3 ">
        <img
          src={
            movie.poster_path
              ? imageUrl + movie.poster_path
              : "https://innovating.capital/wp-content/uploads/2021/05/vertical-placeholder-image.jpg"
          }
          className={
            movie.poster_path && movie.backdrop_path ? "h-44 -mt-20" : "h-44"
          }
          alt="image poster"
        />
        <div className="flex flex-col justify-center ">
          <p className="text-sm text-white text-xs md:text-sm font-bold">
            {movie.title}
          </p>
          <p className="text-sm text-white text-xs md:text-sm">
            {movie.popularity}
          </p>
          <Button
            onClick={handlePlayNowClick}
            size="sm"
            className="flex items-center gap-1 w-fit mt-1"
            color="red"
          >
            <AiFillPlayCircle className="w-6 h-6 " />
            Play Now
          </Button>
        </div>
      </div>
      {data?.key && (
        <div className="px-3">
          <iframe
            className="w-full h-64"
            allowFullScreen
            frameBorder="0"
            src={`https://www.youtube.com/embed/${data?.key}?autoplay=1`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          ></iframe>
        </div>
      )}

      <div className="px-3  text-white">
        <div className="flex items-center my-2">
          <div className="h-8 w-2 bg-red-600 mr-2"></div>
          <p className="font-bold">Overview</p>
        </div>
        <p className="text-xs">{movie.overview}</p>
      </div>
    </Dialog>
  );
}
