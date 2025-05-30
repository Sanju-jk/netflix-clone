import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx'
import MoviesPage from './pages/Movies.jsx';
import TvShowsPage from './pages/Tvshows.jsx';
import SearchPage from './pages/SearchPage.jsx';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/movies' element={<MoviesPage/>} />
        <Route path='/tv-shows' element={<TvShowsPage/>} />
        <Route path='/search' element={<SearchPage/>} />

      </Routes>
    </Router>
  );
}

