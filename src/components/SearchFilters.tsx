import React from 'react';
import {
  Box,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  SelectChangeEvent,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { setSearchTerm, setYear, setType } from '../store/slices/movieSlice';
import { MovieType } from '../types/movie';
import { searchFiltersContainer, formControlStyles } from '../styles/commonStyles';

const SearchFilters: React.FC = () => {
  const dispatch = useDispatch();
  const { searchTerm, year, type } = useSelector((state: RootState) => state.movies);
  const [years] = React.useState(() => {
    const currentYear = new Date().getFullYear();
    return Array.from({ length: currentYear - 1900 + 1 }, (_, i) => (currentYear - i).toString());
  });

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchTerm(event.target.value));
  };

  const handleYearChange = (event: SelectChangeEvent) => {
    dispatch(setYear(event.target.value));
  };

  const handleTypeChange = (event: SelectChangeEvent) => {
    dispatch(setType(event.target.value as MovieType));
  };

  const typeOptions = [
    { value: 'all', label: 'All' },
    { value: 'movie', label: 'Movie' },
    { value: 'series', label: 'Series' },
    { value: 'episode', label: 'Episode' },
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
          {years.map((year) => (
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