import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './Home';
import LanguageFilter from './LanguageFilter';
import Genre from './Genre';
import YearFilter from './YearFilter';
import RatingFilter from './Rating';
import './App.css';
import LoginPage from './LoginPage';
import Header from './Header';

function App() {
  const [movies, setMovies] = useState([]);

  // Fetch movies from container.json
  useEffect(() => {
    fetch('/container.json') // Replace with your JSON/API endpoint
      .then((response) => response.json())
      .then((data) => setMovies(data))
      .catch((error) => console.error('Error fetching movies:', error));
  }, []);

  return (
    <Router>
      <AppContent movies={movies} />
    </Router>
  );
}

function AppContent({ movies }) {
  const location = useLocation(); // Get the current route

  return (
    <div>
      {/* Render Header only if not on the login page */}
      {location.pathname !== '/' && <Header />}
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<Home movies={movies} />} />
        <Route path="/languages" element={<LanguageFilter />} />
        <Route path="/rating" element={<RatingFilter />} />
        <Route path="/genres" element={<Genre />} />
        <Route path="/years" element={<YearFilter />} />
      </Routes>
      <Footer />
    </div>
  );
}

function Footer() {
  return (
    <footer>
      <p>We use cookies to improve your browsing experience on our site.</p>
    </footer>
  );
}

export default App;
