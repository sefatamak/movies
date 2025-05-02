import React from 'react';
import { Box, CircularProgress } from '@mui/material';
import { loadingContainer, loadingSpinner } from '../styles/commonStyles';

// LoadingSpinner component for showing loading state
const LoadingSpinner: React.FC = () => {
  return (
    <Box sx={loadingContainer}>
      <CircularProgress sx={loadingSpinner} />
    </Box>
  );
};

export default LoadingSpinner; 