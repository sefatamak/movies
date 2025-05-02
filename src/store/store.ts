import { configureStore } from '@reduxjs/toolkit';
import movieReducer from './slices/movieSlice';

// Configure Redux store
export const store = configureStore({
  reducer: {
    movies: movieReducer,
  },
});

// Export types for use in components
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 