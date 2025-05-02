# Movie Search Application

A React-based Application that allows users to search and view details of movies using the OMDB API.

## Features

- Search movies by title
- Filter movies by year and type (movie, series, game)
- Pagination support
- Detailed movie information view
- Responsive design
- Modern UI with Material-UI components

## Technical Stack

- React with TypeScript
- Redux Toolkit for state management
- Material-UI for UI components
- React Router for navigation
- Axios for API requests
- SASS for styling

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- OMDb API key (get it from http://www.omdbapi.com/)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd movie-app
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add your OMDb API key:
```
REACT_APP_OMDB_API_KEY=your_api_key_here
```

4. Start the development server:
```bash
npm start
```

The application will be available at http://localhost:3000

## Available Scripts

- `npm start`: Runs the app in development mode
- `npm test`: Launches the test runner
- `npm run build`: Builds the app for production
- `npm run eject`: Ejects from Create React App

## Project Structure

```
src/
  ├── components/     # Reusable UI components
  ├── pages/         # Page components
  ├── store/         # Redux store configuration
  ├── services/      # API services
  ├── types/         # TypeScript type definitions
  ├── utils/         # Utility functions
  ├── hooks/         # Custom React hooks
  └── styles/        # Global styles
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 