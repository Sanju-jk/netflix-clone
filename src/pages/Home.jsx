import { useEffect, useState } from 'react';
import { getTrending, getTopRated, getPopularTV } from '../api/tmdb.js';
import Banner from '../components/Banner.jsx';
import Row from '../components/Row.jsx';

export default function Home() {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [popularTV, setPopularTV] = useState([]);

  useEffect(() => {
    // Fetching trending movies, top-rated, and popular TV shows
    getTrending()
      .then(res => setTrendingMovies(res.data.results))
      .catch(err => console.error('Error fetching trending movies:', err));

    getTopRated()
      .then(res => setTopRatedMovies(res.data.results))
      .catch(err => console.error('Error fetching top-rated movies:', err));

    getPopularTV()
      .then(res => setPopularTV(res.data.results))
      .catch(err => console.error('Error fetching popular TV shows:', err));
  }, []);

  return (
    <div className="bg-gray-800 container">
      {/* Banner Section */}
      <Banner />

      {/* Movie Rows */}
      <Row title="Trending Now" movies={trendingMovies} />
      <Row title="Top Rated" movies={topRatedMovies} />
      <Row title="Popular TV Shows" movies={popularTV} />
    </div>
  );
}
