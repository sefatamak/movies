import React, { useState } from 'react';
import { Container, Box, CircularProgress } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import SearchFilters from '../components/SearchFilters';
import ErrorDisplay from '../components/ErrorDisplay';
import MovieTable from '../components/MovieTable';
import MoviePagination from '../components/MoviePagination';
import { containerStyles, loadingContainer } from '../styles/commonStyles';

// HomePage component - Main page of the application
const HomePage: React.FC = () => {
  const { movies, error, loading, totalResults } = useSelector(
    (state: RootState) => state.movies
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('Pokemon');
  

  // Handle page change in pagination
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <Container>
      <Box sx={containerStyles}>
        <SearchFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          
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