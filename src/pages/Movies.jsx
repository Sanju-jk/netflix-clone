import { useEffect, useState } from "react";
import Row from "../components/Row";
import { getPopularMovies, getTopRated, getUpcomingMovies, getLatestMovies } from "../api/tmdb";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";
import Modal from "../components/Modal";

export default function MoviesPage() {
    const [popular, setPopular] = useState([]);
    const [topRated, setTopRated] = useState([]);
    const [upcoming, setUpcoming] = useState([]);
    const [latest, setLatest] = useState([]);
    const [loading, setLoading] = useState(true);

    const [selectedItem, setSelectedItem] = useState(null);
    const [selectedType, setSelectedType] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [popularMoviesRes, topRatedMoviesRes, upcomingMoviesRes, latestMoviesRes] = await Promise.all([
                    getPopularMovies(),
                    getTopRated(),
                    getUpcomingMovies(),
                    getLatestMovies()
                ]);
                setPopular(popularMoviesRes.data.results);
                setTopRated(topRatedMoviesRes.data.results);
                setUpcoming(upcomingMoviesRes.data.results);
                setLatest(latestMoviesRes.data.results);
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
                <Row title="Skip The Queue" movies={latest} type='movie' onItemClick={handleItemClick} />
                <Row title="Popular Movies" movies={popular} type='movie' onItemClick={handleItemClick} />
                <Row title="Top Rated Movies" movies={topRated} type='movie' onItemClick={handleItemClick} />
                <Row title="Upcoming Movies" movies={upcoming} type='movie' onItemClick={handleItemClick} />
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
