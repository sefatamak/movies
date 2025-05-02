import React from 'react';
import { Box, Pagination } from '@mui/material';

interface MoviePaginationProps {
  totalResults: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const MoviePagination: React.FC<MoviePaginationProps> = ({
  totalResults,
  currentPage,
  onPageChange,
}) => {
  if (totalResults <= 0) return null;

  return (
    <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
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