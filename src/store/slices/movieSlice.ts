import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiService from '../../services/api';
import { MovieState, Movie, MovieDetails } from '../../types/movie';
import { AsyncThunkConfig } from '../../types/store';

// Initial state
const initialState: MovieState = {
  movies: [],
  selectedMovie: null,
  loading: false,
  error: null,
  totalResults: 0,
};

// Async thunk for fetching movies
export const fetchMovies = createAsyncThunk<
  { Search: Movie[]; totalResults: string; Response: string; Error?: string },
  { searchTerm: string; year?: string; type?: string; page: number },
  AsyncThunkConfig
>(
  'movies/fetchMovies',
  async ({ searchTerm, year, type, page }, { rejectWithValue }) => {
    try {
      const params: any = {
        s: searchTerm,
        page,
      };

      if (year && year !== 'all') {
        params.y = year;
      }

      if (type && type !== 'all') {
        params.type = type;
      }

      const response = await apiService.searchMovies(params);

      if (response.Response === 'False') {
        if (response.Error === 'Too many results.') {
          const firstPageResponse = await apiService.searchMovies({
            ...params,
            page: 1,
          });
          return firstPageResponse;
        }
        return rejectWithValue(response.Error || 'Bilinmeyen bir hata oluştu');
      }

      return response;
    } catch (error) {
      return rejectWithValue('Filmler yüklenirken bir hata oluştu');
    }
  }
);

// Async thunk for fetching movie details
export const fetchMovieDetails = createAsyncThunk<
  MovieDetails,
  string,
  AsyncThunkConfig
>(
  'movies/fetchMovieDetails',
  async (imdbID, { rejectWithValue }) => {
    try {
      const response = await apiService.getMovieDetails({ i: imdbID });

      if (response.Response === 'False') {
        return rejectWithValue(response.Error || 'Bilinmeyen bir hata oluştu');
      }

      return response;
    } catch (error) {
      return rejectWithValue('Film detayları yüklenirken bir hata oluştu');
    }
  }
);

// Create slice
const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch movies
      .addCase(fetchMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload.Search;
        state.totalResults = parseInt(action.payload.totalResults);
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.movies = [];
        state.totalResults = 0;
      })
      // Fetch movie details
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
        state.error = action.payload as string;
        state.selectedMovie = null;
      });
  },
});

export default movieSlice.reducer; 