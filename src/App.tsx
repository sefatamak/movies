import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { store } from './store';
import HomePage from './pages/HomePage';
import MovieDetailPage from './pages/MovieDetailPage';
import { theme } from './styles/theme';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/movie/:imdbID" element={<MovieDetailPage />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </Provider>
  );
};

export default App; 