import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx'
import MoviesPage from './pages/Movies.jsx';
import TvShowsPage from './pages/Tvshows.jsx';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/movies' element={<MoviesPage/>} />
        <Route path='/tv-shows' element={<TvShowsPage/>} />
      </Routes>
    </Router>
  );
}

