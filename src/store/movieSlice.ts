import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { searchMovies, getMovieDetails } from '../services/api';

// Interface for movie state
interface MovieState {
  movies: any[];
  loading: boolean;
  error: string | null;
  totalResults: number;
  currentPage: number;
  searchTerm: string;
  year: string;
  type: 'movie' | 'series' | 'episode' | '';
  selectedMovie: any | null;
}

// Initial state
const initialState: MovieState = {
  movies: [],
  loading: false,
  error: null,
  totalResults: 0,
  currentPage: 1,
  searchTerm: 'Pokemon',
  year: '',
  type: '',
  selectedMovie: null,
};

// Create async thunk for searching movies
export const fetchMovies = createAsyncThunk(
  'movies/fetchMovies',
  async (params: { s: string; y?: string; type?: 'movie' | 'series' | 'episode' | undefined; page: number }) => {
    const response = await searchMovies(params);
    if (response.Response === 'False') {
      throw new Error(response.Error || 'Film bulunamadı');
    }
    return response;
  }
);

// Create async thunk for getting movie details
export const fetchMovieDetails = createAsyncThunk(
  'movies/fetchMovieDetails',
  async (imdbID: string) => {
    const response = await getMovieDetails({ i: imdbID });
    return response;
  }
);

// Create movie slice
const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    setYear: (state, action: PayloadAction<string>) => {
      state.year = action.payload;
    },
    setType: (state, action: PayloadAction<'movie' | 'series' | 'episode' | ''>) => {
      state.type = action.payload;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    clearSelectedMovie: (state) => {
      state.selectedMovie = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload.Search || [];
        state.totalResults = parseInt(action.payload.totalResults) || 0;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'An error occurred';
      })
      .addCase(fetchMovieDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovieDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedMovie = action.payload;
      })
      .addCase(fetchMovieDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'An error occurred';
      });
  },
});

export const { setSearchTerm, setYear, setType, setCurrentPage, clearSelectedMovie } = movieSlice.actions;
export default movieSlice.reducer; 