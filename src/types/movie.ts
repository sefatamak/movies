export type MovieType = 'movie' | 'series' | 'game' | '';

export interface Movie {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

export interface MovieDetails extends Movie {
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
  Response: string;
}

export interface MovieState {
  movies: Movie[];
  loading: boolean;
  error: string | null;
  totalResults: number;
  currentPage: number;
  searchTerm: string;
  year: string;
  type: MovieType;
  selectedMovie: MovieDetails | null;
}

export interface SearchParams {
  s: string;
  y?: string;
  type?: MovieType;
  page: number;
}

export interface MovieDetailsParams {
  i: string;
} 