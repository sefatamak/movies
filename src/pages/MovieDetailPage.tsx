import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Paper,
  Button,
  CircularProgress,
  Card,
  CardMedia,
  CardContent,
} from '@mui/material';
import { RootState } from '../store';
import { fetchMovieDetails, clearSelectedMovie } from '../store/movieSlice';

const MovieDetailPage: React.FC = () => {
  const { imdbID } = useParams<{ imdbID: string }>();
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error || !selectedMovie) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography color="error">{error || 'Film bulunamadı'}</Typography>
        <Button onClick={() => navigate('/')} sx={{ mt: 2 }}>
          Ana Sayfaya Dön
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Paper sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
          <Box sx={{ width: { xs: '100%', md: '33%' } }}>
            <Card>
              <CardMedia
                component="img"
                height="500"
                image={selectedMovie.Poster !== 'N/A' ? selectedMovie.Poster : 'https://via.placeholder.com/300x450?text=No+Poster'}
                alt={selectedMovie.Title}
              />
            </Card>
          </Box>
          <Box sx={{ width: { xs: '100%', md: '67%' } }}>
            <CardContent>
              <Typography variant="h4" component="h1" gutterBottom>
                {selectedMovie.Title}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                {selectedMovie.Year} • {selectedMovie.Rated} • {selectedMovie.Runtime}
              </Typography>
              <Typography variant="body1" paragraph>
                {selectedMovie.Plot}
              </Typography>
              <Typography variant="subtitle2" gutterBottom>
                <strong>Yönetmen:</strong> {selectedMovie.Director}
              </Typography>
              <Typography variant="subtitle2" gutterBottom>
                <strong>Oyuncular:</strong> {selectedMovie.Actors}
              </Typography>
              <Typography variant="subtitle2" gutterBottom>
                <strong>Tür:</strong> {selectedMovie.Genre}
              </Typography>
              <Typography variant="subtitle2" gutterBottom>
                <strong>IMDb Puanı:</strong> {selectedMovie.imdbRating}
              </Typography>
              <Typography variant="subtitle2" gutterBottom>
                <strong>Ödüller:</strong> {selectedMovie.Awards}
              </Typography>
            </CardContent>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default MovieDetailPage; 