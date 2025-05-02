import { SxProps } from '@mui/material';

export const containerStyles: SxProps = {
  my: 4,
};

export const searchFiltersContainer: SxProps = {
  mb: 3,
  display: 'flex',
  gap: 2,
};

export const formControlStyles: SxProps = {
  width: 200,
};

export const paginationContainer: SxProps = {
  mt: 3,
  display: 'flex',
  justifyContent: 'center',
};

export const movieTableRow: SxProps = {
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.04)',
  },
};

export const moviePoster: SxProps = {
  width: 100,
  height: 150,
  objectFit: 'cover',
}; 