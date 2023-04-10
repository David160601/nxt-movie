export interface MovieInterface {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  overview: string;
  popularity: number;
  poster_path: string;
  video: boolean;
  vote_average: number;
  title: string;
}
export interface HomeMoviesInterface {
  popularMovieData: MovieInterface[];
  topRatedMoviesData: MovieInterface[];
  trendingMoviesDayData: MovieInterface[];
  trendingMoviesWeekData: MovieInterface[];
}
export interface SearchMoviesInterface {
  results: MovieInterface[];
  total_pages: number;
  total_results: number;
}
export interface Trailer {
  key: string;
  id: string;
  type: string;
  official: boolean;
}
export interface WindowDemension {
  width: number | object;
  height: number | object;
}
export interface ImageInterface {
  file_path: string;
}

export interface MovieDetail {
  movieData: MovieInterface;
  similarMovieData: MovieInterface[];
  recommendMovieData: MovieInterface[];
  imageData: ImageInterface[];
  trailerData: { key: string };
}
