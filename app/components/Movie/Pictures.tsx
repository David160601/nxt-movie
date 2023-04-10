import { imageUrl } from "@/constant/data";
import { ImageInterface } from "@/interface/movie";
import React from "react";

function Pictures({ images }: { images: any }) {
  return (
    <div className="my-2">
      <div className="flex items-center">
        <div className="h-8 w-2 bg-red-600 mr-2"></div>
        <p className="font-bold">Pictures</p>
      </div>
      <div className="my-2 grid grid-cols-2 gap-3 md:grid-cols-4">
        {images.map((image: ImageInterface, index: number) => {
          return (
            index <= 3 && (
              <img
                src={imageUrl + image.file_path}
                alt="movie image"
                className="cursor-pointer"
              />
            )
          );
        })}
      </div>
    </div>
  );
}

export default Pictures;
