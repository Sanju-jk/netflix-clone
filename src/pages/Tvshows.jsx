import { useEffect, useState } from "react";
import Row from "../components/Row";
import { getPopularTV, getLatestTvShows, getTopRatedTvShows } from "../api/tmdb";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";
import Modal from "../components/Modal";


export default function TvShowsPage() {
  const [popular, setPopular] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [latest, setLatest] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [popularTvRes, topRatedTvRes, latestTvRes] = await Promise.all([
          getPopularTV(),
          getTopRatedTvShows(),
          getLatestTvShows()
        ]);
        setPopular(popularTvRes.data.results);
        setTopRated(topRatedTvRes.data.results);
        setLatest(latestTvRes.data.results);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false)
      }
    }
    fetchData();
  }, []);

  const handleItemClick = (item, type) => {
    setSelectedItem(item);
    setSelectedType(type);
    setShowModal(true);
  };

  if (loading) return <Loader />

  return (
    <>
      <Navbar />
      <div className="bg-gray-900 min-h-screen text-white pt-20">
        <Row title="Popular Tv Shows" movies={popular} type='tv' onItemClick={handleItemClick} />
        <Row title="Top Rated Tv Shows" movies={topRated} type='tv' onItemClick={handleItemClick} />
        <Row title="Latest Tv Shows" movies={latest} type='tv' onItemClick={handleItemClick} />
        <Modal
          show={showModal}
          onClose={() => setShowModal(false)}
          content={selectedItem}
          type={selectedType}
        />
      </div>
    </>
  );
}
