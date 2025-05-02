import React, { useEffect } from 'react';
import { Box, Container, Paper } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { RootState } from '../store';
import { fetchMovieDetails, clearSelectedMovie } from '../store/slices/movieSlice';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorPage from '../components/ErrorPage';
import MoviePoster from '../components/MoviePoster';
import MovieDetails from '../components/MovieDetails';

const MovieDetailPage: React.FC = () => {
  const { imdbID } = useParams<{ imdbID: string }>();
  const dispatch = useDispatch();
  const { selectedMovie, loading, error } = useSelector((state: RootState) => state.movies);

  useEffect(() => {
    if (imdbID) {
      dispatch(fetchMovieDetails(imdbID) as any);
    }
    return () => {
      dispatch(clearSelectedMovie());
    };
  }, [dispatch, imdbID]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error || !selectedMovie) {
    return <ErrorPage error={error} />;
  }

  return (
    <Container sx={{ p: 3 }}>
      <Paper sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
          <Box sx={{ width: { xs: '100%', md: '33%' } }}>
            <MoviePoster movie={selectedMovie} />
          </Box>
          <Box sx={{ width: { xs: '100%', md: '67%' } }}>
            <MovieDetails movie={selectedMovie} />
          </Box>
        </Box>
      </Paper>
      </Container>
  );
};

export default MovieDetailPage; 