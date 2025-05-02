import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiService from '../services/api';
import { MovieState, Movie, MovieDetails } from '../types/movie';
import { AsyncThunkConfig } from '../types/store';

// Initial state
const initialState: MovieState = {
  movies: [],
  selectedMovie: null,
  loading: false,
  error: null,
  totalResults: 0,
  currentPage: 1,
  searchTerm: 'Pokemon',
  year: '',
  type: '',
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

      // Eğer year varsa ve all değilse ekle
      if (year && year !== 'all') {
        params.y = year;
      }

      // Eğer type varsa ve 'all' değilse ekle
      if (type && type !== 'all') {
        params.type = type;
      }

      const response = await apiService.searchMovies(params);

      if (response.Response === 'False') {
        if (response.Error === 'Too many results.') {
          // Eğer çok fazla sonuç varsa, sadece ilk sayfayı getir
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
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
      state.currentPage = 1;
    },
    setYear: (state, action) => {
      state.year = action.payload;
      state.currentPage = 1;
    },
    setType: (state, action) => {
      state.type = action.payload;
      state.currentPage = 1;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    clearSelectedMovie: (state) => {
      state.selectedMovie = null;
    },
  },
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

export const { setSearchTerm, setYear, setType, setCurrentPage, clearSelectedMovie } = movieSlice.actions;
export default movieSlice.reducer; 