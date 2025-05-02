import axios from 'axios';

// API base URL and API key configuration
const API_URL = 'http://www.omdbapi.com/';
const API_KEY = '743d3c7'; // OMDb API key

// Create axios instance with base configuration
const api = axios.create({
  baseURL: API_URL,
  params: {
    apikey: API_KEY,
  },
});

// Interface for search parameters
interface SearchParams {
  s?: string;
  y?: string;
  type?: 'movie' | 'series' | 'episode';
  page?: number;
}

// Interface for movie details parameters
interface MovieDetailsParams {
  i: string;
}

// Search movies function
export const searchMovies = async (params: SearchParams) => {
  try {
    const response = await api.get('', { params });
    return response.data;
  } catch (error) {
    console.error('Error searching movies:', error);
    throw error;
  }
};

// Get movie details function
export const getMovieDetails = async (params: MovieDetailsParams) => {
  try {
    const response = await api.get('', { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching movie details:', error);
    throw error;
  }
};

export default api; 