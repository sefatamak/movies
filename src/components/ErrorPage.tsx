import React from 'react';
import { Box, Typography } from '@mui/material';
import { errorPageContainer, errorPageTitle, errorPageMessage } from '../styles/commonStyles';

// ErrorPage component for showing error state
const ErrorPage: React.FC = () => {
  return (
    <Box sx={errorPageContainer}>
      <Typography variant="h4" sx={errorPageTitle}>
        Bir Hata Oluştu
      </Typography>
      <Typography variant="body1" sx={errorPageMessage}>
        Üzgünüz, bir hata oluştu. Lütfen daha sonra tekrar deneyin.
      </Typography>
    </Box>
  );
};

export default ErrorPage; 