import React, { useEffect } from 'react';
import { Container, Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { fetchMovies, setCurrentPage } from '../store/slices/movieSlice';
import SearchFilters from '../components/SearchFilters';
import ErrorDisplay from '../components/ErrorDisplay';
import MovieTable from '../components/MovieTable';
import MoviePagination from '../components/MoviePagination';
import { containerStyles } from '../styles/commonStyles';

const HomePage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { movies, error, currentPage, totalResults, searchTerm, year, type } = useSelector(
    (state: RootState) => state.movies
  );

  // İlk yüklemede ve filtre değişikliklerinde filmleri getir
  useEffect(() => {
    dispatch(fetchMovies({ searchTerm, year, type, page: currentPage }));
  }, [dispatch, searchTerm, year, type, currentPage]);

  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  return (
    <Container>
      <Box sx={containerStyles}>
        <SearchFilters />
        <ErrorDisplay error={error} />
        <MovieTable movies={movies} />
        <MoviePagination
          totalResults={totalResults}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </Box>
    </Container>
  );
};

export default HomePage; 