import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
} from '@mui/material';
import { Movie } from '../types/movie';
import { movieTableRow, moviePoster } from '../styles/commonStyles';

// Props interface for MovieTable component
interface MovieTableProps {
  movies: Movie[];
}

const MovieTable: React.FC<MovieTableProps> = ({ movies }) => {
  const navigate = useNavigate();

  // Handle movie click to navigate to movie details page
  const handleMovieClick = (imdbID: string) => {
    navigate(`/movie/${imdbID}`);
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Poster</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Year</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>IMDb ID</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {movies?.map((movie) => (
            <TableRow
              key={movie.imdbID}
              onClick={() => handleMovieClick(movie.imdbID)}
              sx={movieTableRow}
            >
              <TableCell>
                <Box
                  component="img"
                  src={movie.Poster !== 'N/A' ? movie.Poster : 'https://placehold.co/100x150/000000/FFFFFF/png?text=No+Poster'}
                  alt={movie.Title}
                  sx={moviePoster}
                />
              </TableCell>
              <TableCell>{movie.Title}</TableCell>
              <TableCell>{movie.Year}</TableCell>
              <TableCell>{movie.Type}</TableCell>
              <TableCell>{movie.imdbID}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MovieTable; 