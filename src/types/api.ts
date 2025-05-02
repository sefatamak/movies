import { Movie, MovieDetails } from './movie';

// API Response Types
export interface SearchResponse {
  Search: Movie[];
  totalResults: string;
  Response: string;
  Error?: string;
}

export interface MovieDetailsResponse extends MovieDetails {
  Response: string;
  Error?: string;
}

// API Error Response
export interface ApiErrorResponse {
  Response: string;
  Error: string;
}

// API Service Types
export interface ApiService {
  searchMovies: (params: { s: string; y?: string; type?: string; page: number }) => Promise<SearchResponse>;
  getMovieDetails: (params: { i: string }) => Promise<MovieDetailsResponse>;
} 