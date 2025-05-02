import React from 'react';
import { Box, Pagination } from '@mui/material';
import { paginationContainer } from '../styles/commonStyles';

// Props interface for MoviePagination component
interface MoviePaginationProps {
  totalResults: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

// MoviePagination component for handling pagination
const MoviePagination: React.FC<MoviePaginationProps> = ({
  totalResults,
  currentPage,
  onPageChange,
}) => {
  // Don't render pagination if there are no results
  if (totalResults <= 0) return null;

  return (
    <Box sx={paginationContainer}>
      <Pagination
        count={Math.ceil(totalResults / 10)}
        page={currentPage}
        onChange={(_, value) => onPageChange(value)}
        color="primary"
      />
    </Box>
  );
};

export default MoviePagination; 