import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface ErrorPageProps {
  error: string | null;
}

const ErrorPage: React.FC<ErrorPageProps> = ({ error }) => {
  const navigate = useNavigate();

  return (
    <Box sx={{ p: 3 }}>
      <Typography color="error">{error || 'Film bulunamadı'}</Typography>
      <Button onClick={() => navigate('/')} sx={{ mt: 2 }}>
        Ana Sayfaya Dön
      </Button>
    </Box>
  );
};

export default ErrorPage; 