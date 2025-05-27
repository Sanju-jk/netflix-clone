import { useEffect, useState } from 'react';
import { getTrending, getTopRated, getPopularTV } from '../api/tmdb.js';
import Banner from '../components/Banner.jsx';
import Row from '../components/Row.jsx';
import Navbar from '../components/Navbar.jsx';
import Loader from '../components/Loader.jsx';
import Modal from '../components/Modal.jsx'

export default function Home() {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [popularTV, setPopularTV] = useState([]);
  const [loading, setLoading] = useState(true);

  //modal code
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [showModal, setShowModal] = useState(false);

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

  const handleItemClick = (item, type) => {
    setSelectedItem(item);
    setSelectedType(type);
    setShowModal(true);
  };

  if (loading) return <Loader />;

  return (
    <div className="bg-gray-900 min-h-screen">
      <Navbar />
      <Banner />
      <Row title="Trending Now" movies={trendingMovies} type='movie' onItemClick={handleItemClick} />
      <Row title="Top Rated" movies={topRatedMovies} type='movie' onItemClick={handleItemClick} />
      <Row title="Popular TV Shows" movies={popularTV} type='tv' onItemClick={handleItemClick} />
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        content={selectedItem}
        type={selectedType}
      />
    </div>
  );
}
