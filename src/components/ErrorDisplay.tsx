import React from 'react';
import { Typography } from '@mui/material';

interface ErrorDisplayProps {
  error: string | null;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ error }) => {
  return (
    <Typography color="error" sx={{ mt: 3 }}>
      {error}
    </Typography>
  );
};

export default ErrorDisplay; 