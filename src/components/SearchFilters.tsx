import React, { useEffect } from 'react';
import {
  Box,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  SelectChangeEvent,
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { fetchMovies } from '../store/slices/movieSlice';
import { MovieType } from '../types/movie';
import { searchFiltersContainer, formControlStyles } from '../styles/commonStyles';

interface SearchFiltersProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  year: string;
  setYear: (value: string) => void;
  type: string;
  setType: (value: MovieType) => void;
  setCurrentPage: (page: number) => void;
}

// SearchFilters component for filtering movies
const SearchFilters: React.FC<SearchFiltersProps> = ({ setCurrentPage, year, setYear, type, setType, searchTerm, setSearchTerm }) => {
  const dispatch = useDispatch();

  // Generate years array from 1900 to current year
  const getYears = () => {
    const currentYear = new Date().getFullYear();
    return Array.from({ length: currentYear - 1900 + 1 }, (_, i) => (currentYear - i).toString());
  };

  // Handle search term change
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  // Handle year filter change
  const handleYearChange = (event: SelectChangeEvent) => {
    setCurrentPage(1);
    setYear(event.target.value);
  };

  // Handle type filter change
  const handleTypeChange = (event: SelectChangeEvent) => {
    setCurrentPage(1);
    setType(event.target.value as MovieType);
  };

  // Fetch movies when filters change
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchTerm) {
        dispatch(fetchMovies({ searchTerm, year, type, page: 1 }) as any);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [dispatch, searchTerm, year, type]);

  // Available movie types
  const typeOptions = [
    { value: 'all', label: 'All' },
    { value: 'movie', label: 'Movie' },
    { value: 'series', label: 'Series' },
    { value: 'game', label: 'Game' },
  ];

  return (
    <Box sx={searchFiltersContainer}>
      <TextField
        label="Search Movies"
        value={searchTerm}
        onChange={handleSearchChange}
        fullWidth
      />
      <FormControl sx={formControlStyles}>
        <InputLabel>Year</InputLabel>
        <Select value={year} onChange={handleYearChange} label="Year">
          <MenuItem value="all">All</MenuItem>
          {getYears()?.map((year: string) => (
            <MenuItem key={year} value={year}>
              {year}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl sx={formControlStyles}>
        <InputLabel>Type</InputLabel>
        <Select value={type} onChange={handleTypeChange} label="Type">
          {typeOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default SearchFilters; 