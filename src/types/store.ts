import { MovieState } from './movie';

// Root State
export interface RootState {
  movies: MovieState;
}

// Action Types
export interface SetSearchTermAction {
  type: 'movies/setSearchTerm';
  payload: string;
}

export interface SetYearAction {
  type: 'movies/setYear';
  payload: string;
}

export interface SetTypeAction {
  type: 'movies/setType';
  payload: string;
}

export interface SetCurrentPageAction {
  type: 'movies/setCurrentPage';
  payload: number;
}

export interface ClearSelectedMovieAction {
  type: 'movies/clearSelectedMovie';
}

// Async Thunk Types
export interface AsyncThunkConfig {
  state: RootState;
  rejectValue: string;
}

// Movie Actions Union Type
export type MovieAction =
  | SetSearchTermAction
  | SetYearAction
  | SetTypeAction
  | SetCurrentPageAction
  | ClearSelectedMovieAction; 