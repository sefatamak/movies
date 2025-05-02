import React, { useEffect, useState } from 'react';
import { Box, Container, Paper } from '@mui/material';
import { useParams } from 'react-router-dom';
import apiService from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorPage from '../components/ErrorPage';
import MoviePoster from '../components/MoviePoster';
import MovieDetails from '../components/MovieDetails';
import {
  movieDetailContainer,
  movieDetailPaper,
  movieDetailContent,
  movieDetailPoster,
  movieDetailInfo,
} from '../styles/commonStyles';
import { MovieDetails as MovieDetailsType } from '../types/movie';

const MovieDetailPage: React.FC = () => {
  const { imdbID } = useParams<{ imdbID: string }>();
  const [selectedMovie, setSelectedMovie] = useState<MovieDetailsType | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovie = async () => {
      if (!imdbID) return;

      setLoading(true);
      setError(null);

      try {
        const response = await apiService.getMovieDetails({ i: imdbID });
        setSelectedMovie(response);
      } catch (err) {
        setError('Film detayları yüklenirken bir hata oluştu');
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [imdbID]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error || !selectedMovie) {
    return <ErrorPage />;
  }

  return (
    <Container sx={movieDetailContainer}>
      <Paper sx={movieDetailPaper}>
        <Box sx={movieDetailContent}>
          <Box sx={movieDetailPoster}>
            <MoviePoster movie={selectedMovie} />
          </Box>
          <Box sx={movieDetailInfo}>
            <MovieDetails movie={selectedMovie} />
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default MovieDetailPage; 