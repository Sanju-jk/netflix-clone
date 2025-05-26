import { useEffect, useState } from 'react';
import { getTrending, getTopRated, getPopularTV } from '../api/tmdb.js';
import Banner from '../components/Banner.jsx';
import Row from '../components/Row.jsx';
import Navbar from '../components/Navbar.jsx';
import Loader from '../components/Loader.jsx';

export default function Home() {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [popularTV, setPopularTV] = useState([]);
  const [loading, setLoading] = useState(true); // start as true

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [trendingRes, topRatedRes, popularTVRes] = await Promise.all([
          getTrending(),
          getTopRated(),
          getPopularTV(),
        ]);
        setTrendingMovies(trendingRes.data.results);
        setTopRatedMovies(topRatedRes.data.results);
        setPopularTV(popularTVRes.data.results);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="bg-gray-800 min-h-screen">
      <Navbar />
      <Banner />
      <Row title="Trending Now" movies={trendingMovies} />
      <Row title="Top Rated" movies={topRatedMovies} />
      <Row title="Popular TV Shows" movies={popularTV} />
    </div>
  );
}
