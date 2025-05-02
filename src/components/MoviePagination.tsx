import React from 'react';
import { Box, Pagination } from '@mui/material';
import { paginationContainer } from '../styles/commonStyles';
import { MoviePaginationProps } from '../types/components';


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