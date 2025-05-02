import React from 'react';
import { Alert } from '@mui/material';

// Props interface for ErrorDisplay component
interface ErrorDisplayProps {
  error: string | null;
}

// ErrorDisplay component for showing error messages
const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ error }) => {
  if (!error) return null;

  return (
    <Alert severity="error" sx={{ mb: 2 }}>
      {error}
    </Alert>
  );
};

export default ErrorDisplay; 