import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Pagination,
  CircularProgress,
  Typography,
  SelectChangeEvent,
} from '@mui/material';
import { RootState } from '../store';
import { setSearchTerm, setYear, setType, setCurrentPage, fetchMovies } from '../store/movieSlice';

const HomePage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    movies,
    loading,
    error,
    totalResults,
    currentPage,
    searchTerm,
    year,
    type,
  } = useSelector((state: RootState) => state.movies);

  // Yıl seçenekleri için state
  const [years] = useState(() => {
    const currentYear = new Date().getFullYear();
    return Array.from({ length: currentYear - 1900 + 1 }, (_, i) => (currentYear - i).toString());
  });

  // Fetch movies when search parameters change
  useEffect(() => {
    const params = {
      s: searchTerm || 'Pokemon',
      y: year || undefined,
      type: type || undefined,
      page: currentPage,
    };
    dispatch(fetchMovies(params) as any);
  }, [dispatch, searchTerm, year, type, currentPage]);

  // Handle search input change
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchTerm(event.target.value));
  };

  // Handle year select change
  const handleYearChange = (event: SelectChangeEvent) => {
    dispatch(setYear(event.target.value));
  };

  // Handle type select change
  const handleTypeChange = (event: SelectChangeEvent) => {
    dispatch(setType(event.target.value as 'movie' | 'series' | 'episode' | ''));
  };

  // Handle page change
  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    dispatch(setCurrentPage(value));
  };

  // Handle movie click
  const handleMovieClick = (imdbID: string) => {
    navigate(`/movie/${imdbID}`);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ mb: 3, display: 'flex', gap: 2 }}>
        <TextField
          label="Search Movies"
          value={searchTerm}
          onChange={handleSearchChange}
          fullWidth
        />
        <FormControl sx={{ width: 200 }}>
          <InputLabel>Year</InputLabel>
          <Select value={year} onChange={handleYearChange} label="Year">
            <MenuItem value="">All Years</MenuItem>
            {years.map((year) => (
              <MenuItem key={year} value={year}>
                {year}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ width: 200 }}>
          <InputLabel>Type</InputLabel>
          <Select value={type} onChange={handleTypeChange} label="Type">
            <MenuItem value="">All</MenuItem>
            <MenuItem value="movie">Movie</MenuItem>
            <MenuItem value="series">TV Series</MenuItem>
            <MenuItem value="episode">Episode</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Typography color="error" sx={{ mt: 3 }}>
          {error}
        </Typography>
      ) : (
        <>
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
                {movies.map((movie: any) => (
                  <TableRow 
                    key={movie.imdbID}
                    onClick={() => handleMovieClick(movie.imdbID)}
                    sx={{ cursor: 'pointer', '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' } }}
                  >
                    <TableCell>
                      <Box
                        component="img"
                        src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/100x150?text=No+Poster'}
                        alt={movie.Title}
                        sx={{ width: 100, height: 150, objectFit: 'cover' }}
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

          {totalResults > 0 && (
            <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
              <Pagination
                count={Math.ceil(totalResults / 10)}
                page={currentPage}
                onChange={handlePageChange}
                color="primary"
              />
            </Box>
          )}
        </>
      )}
    </Box>
  );
};

export default HomePage; 