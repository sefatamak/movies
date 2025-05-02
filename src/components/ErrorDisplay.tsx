import React from 'react';
import { Alert } from '@mui/material';
import { ErrorDisplayProps } from '../types/components';
import { errorAlert } from '../styles/commonStyles';

// ErrorDisplay component for showing error messages
const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ error }) => {
  if (!error) return null;

  return (
    <Alert severity="error" sx={errorAlert}>
      {error}
    </Alert>
  );
};

export default ErrorDisplay; 