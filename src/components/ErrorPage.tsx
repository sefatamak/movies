import React from 'react';
import { Box, Typography } from '@mui/material';
import { errorPageContainer, errorPageTitle, errorPageMessage } from '../styles/commonStyles';

// ErrorPage component for showing error state
const ErrorPage: React.FC = () => {
  return (
    <Box sx={errorPageContainer}>
      <Typography variant="h4" sx={errorPageTitle}>
        An Error Occurred
      </Typography>
      <Typography variant="body1" sx={errorPageMessage}>
        Sorry, an error occurred. Please try again later.
      </Typography>
    </Box>
  );
};

export default ErrorPage; 