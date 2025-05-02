import React, { useEffect } from 'react';
import { Container, Box, CircularProgress } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { fetchMovies, setCurrentPage } from '../store/slices/movieSlice';
import SearchFilters from '../components/SearchFilters';
import ErrorDisplay from '../components/ErrorDisplay';
import MovieTable from '../components/MovieTable';
import MoviePagination from '../components/MoviePagination';
import { containerStyles, loadingContainer } from '../styles/commonStyles';

// HomePage component - Main page of the application
const HomePage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { movies, error, loading, currentPage, totalResults, searchTerm, year, type } = useSelector(
    (state: RootState) => state.movies
  );

  // Fetch movies on initial load and when filters change
  useEffect(() => {
    dispatch(fetchMovies({ searchTerm, year, type, page: currentPage }));
  }, [dispatch, searchTerm, year, type, currentPage]);

  // Handle page change in pagination
  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  return (
    <Container>
      <Box sx={containerStyles}>
        <SearchFilters />
        <ErrorDisplay error={error} />
        {loading ? (
          <Box sx={loadingContainer}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            <MovieTable movies={movies} />
            <MoviePagination
              totalResults={totalResults}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </Box>
    </Container>
  );
};

export default HomePage; 