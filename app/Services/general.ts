import { Trailer } from "@/interface/movie";

export const getTrailer = async (id: number) => {
  const trailerRes = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/videos?api_key=7ad3a7eaa9fb2e82ff9934c0a41fcf5c&language=en-US`
  );
  const trialerData = await trailerRes.json();

  if (trialerData?.results.length > 0) {
    const trialer = trialerData.results.find((result: Trailer) => {
      return result.official && result.type === "Trailer";
    });

    if (trialer) {
      return trialer;
    } else {
      return {};
    }
  } else {
    return {};
  }
};
