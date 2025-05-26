import { useEffect, useState } from "react";
import Row from "../components/Row";
import { getPopularTV, getLatestTvShows, getTopRatedTvShows } from "../api/tmdb";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";

export default function TvShowsPage() {
  const [popular, setPopular] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [latest, setLatest] = useState([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) return <Loader />

  return (
    <>
      <Navbar />
      <div className="bg-black min-h-screen text-white pt-20">
        <Row title="Popular Tv Shows" movies={popular} />
        <Row title="Top Rated Tv Shows" movies={topRated} />
        <Row title="Latest Tv Shows" movies={latest} />
      </div>
    </>
  );
}
