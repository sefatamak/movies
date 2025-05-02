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

export const errorAlert: SxProps = {
  mb: 2,
};

export const errorPageContainer: SxProps = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '60vh',
  textAlign: 'center',
};

export const errorPageTitle: SxProps = {
  mb: 2,
  color: 'error.main',
};

export const errorPageMessage: SxProps = {
  mb: 4,
  color: 'text.secondary',
};

export const loadingContainer: SxProps = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: 200,
};

export const loadingSpinner: SxProps = {
  color: 'primary.main',
};

export const movieDetailContainer: SxProps = {
  p: 3,
};

export const movieDetailPaper: SxProps = {
  p: 3,
};

export const movieDetailContent: SxProps = {
  display: 'flex',
  flexDirection: { xs: 'column', md: 'row' },
  gap: 3,
};

export const movieDetailPoster: SxProps = {
  width: { xs: '100%', md: '33%' },
};

export const movieDetailInfo: SxProps = {
  width: { xs: '100%', md: '67%' },
}; 