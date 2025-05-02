import React from 'react';
import { Card, CardMedia } from '@mui/material';
import { MovieDetails } from '../types/movie';

interface MoviePosterProps {
  movie: MovieDetails;
}

const MoviePoster: React.FC<MoviePosterProps> = ({ movie }) => {
  return (
    <Card>
      <CardMedia
        component="img"
        height="500"
        image={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450?text=No+Poster'}
        alt={movie.Title}
      />
    </Card>
  );
};

export default MoviePoster; 