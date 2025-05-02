import React from 'react';
import { CardContent, Typography } from '@mui/material';
import { MovieDetails as MovieDetailsType } from '../types/movie';

interface MovieDetailsProps {
  movie: MovieDetailsType;
}

const MovieDetails: React.FC<MovieDetailsProps> = ({ movie }) => {
  return (
    <CardContent>
      <Typography variant="h4" component="h1" gutterBottom>
        {movie.Title}
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" gutterBottom>
        {movie.Year} • {movie.Rated} • {movie.Runtime}
      </Typography>
      <Typography variant="body1" paragraph>
        {movie.Plot}
      </Typography>
      <Typography variant="subtitle2" gutterBottom>
        <strong>Director:</strong> {movie.Director}
      </Typography>
      <Typography variant="subtitle2" gutterBottom>
        <strong>Cast:</strong> {movie.Actors}
      </Typography>
      <Typography variant="subtitle2" gutterBottom>
        <strong>Type:</strong> {movie.Genre}
      </Typography>
      <Typography variant="subtitle2" gutterBottom>
        <strong>IMDB Point:</strong> {movie.imdbRating}
      </Typography>
      <Typography variant="subtitle2" gutterBottom>
        <strong>Awards:</strong> {movie.Awards}
      </Typography>
    </CardContent>
  );
};

export default MovieDetails; 