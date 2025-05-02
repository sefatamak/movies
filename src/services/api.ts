import axios from 'axios';
import { SearchResponse, MovieDetailsResponse, ApiService } from '../types/api';
import { API_KEY, API_URL } from '../constants';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: API_URL,
  params: {
    apikey: API_KEY,
  },
});

// Search movies function
export const searchMovies = async (params: { s: string; y?: string; type?: string; page: number }): Promise<SearchResponse> => {
  try {
    const response = await api.get('', { params });
    return response.data;
  } catch (error) {
    console.error('Error searching movies:', error);
    throw error;
  }
};

// Get movie details function
export const getMovieDetails = async (params: { i: string }): Promise<MovieDetailsResponse> => {
  try {
    const response = await api.get('', { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching movie details:', error);
    throw error;
  }
};

const apiService: ApiService = {
  searchMovies,
  getMovieDetails,
};

export default apiService; 