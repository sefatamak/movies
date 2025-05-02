import { Movie, MovieDetails } from './movie';

// SearchFilters Props
export interface SearchFiltersProps {
  searchTerm: string;
  year: string;
  type: string;
  onSearchChange: (value: string) => void;
  onYearChange: (value: string) => void;
  onTypeChange: (value: string) => void;
}

// ErrorDisplay Props
export interface ErrorDisplayProps {
  error: string | null;
}

// MovieTable Props
export interface MovieTableProps {
  movies: Movie[];
}

// MoviePagination Props
export interface MoviePaginationProps {
  totalResults: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

// ErrorPage Props
export interface ErrorPageProps {
  error: string | null;
}

// MoviePoster Props
export interface MoviePosterProps {
  movie: MovieDetails;
}

// MovieDetails Props
export interface MovieDetailsProps {
  movie: MovieDetails;
} 