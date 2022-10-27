type Film = {
  id: number;
  title: string;
  genre: string;
  releaseDate: number;
  smallCardSrcImage: string;
  posterSrcImage: string;
  srcPreviewVideo: string;
  srcVideo: string;
  duration: number;
  description: string;
  director: string;
  rating: number;
  similarFilms: Film[];
  starring: string[];
  srcBgImage: string;
}

export default Film;
