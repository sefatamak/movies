import React, { useState } from 'react';
import { Container, Box, CircularProgress } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { fetchMovies } from '../store/slices/movieSlice';
import SearchFilters from '../components/SearchFilters';
import ErrorDisplay from '../components/ErrorDisplay';
import MovieTable from '../components/MovieTable';
import MoviePagination from '../components/MoviePagination';
import { containerStyles, loadingContainer } from '../styles/commonStyles';
import { MovieType } from '../types/movie';

// HomePage component - Main page of the application
const HomePage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { movies, error, loading, totalResults } = useSelector(
    (state: RootState) => state.movies
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('Pokemon');
  const [year, setYear] = useState('all');
  const [type, setType] = useState<MovieType>('all');

  // Handle page change in pagination
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    dispatch(fetchMovies({ searchTerm, page: page, type: type, year: year }) as any);
  };

  return (
    <Container>
      <Box sx={containerStyles}>
        <SearchFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          year={year}
          setYear={setYear}
          type={type}
          setType={setType}
          setCurrentPage={setCurrentPage}
        />
        {searchTerm ? <ErrorDisplay error={error} /> : null}
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