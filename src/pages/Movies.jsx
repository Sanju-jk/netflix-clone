import { useEffect, useState } from "react";
import Row from "../components/Row";
import { getPopularMovies, getTopRated, getUpcomingMovies, getLatestMovies } from "../api/tmdb";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";

export default function MoviesPage() {
    const [popular, setPopular] = useState([]);
    const [topRated, setTopRated] = useState([]);
    const [upcoming, setUpcoming] = useState([]);
    const [latest, setLatest] = useState([]);
    const [loading, setLoading] = useState(true);

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

    if (loading) return <Loader />

    return (
        <>
            <Navbar />
            <div className="bg-black min-h-screen text-white pt-20">
                <Row title="Skip The Queue" movies={latest} />
                <Row title="Popular Movies" movies={popular} />
                <Row title="Top Rated Movies" movies={topRated} />
                <Row title="Upcoming Movies" movies={upcoming} />
            </div>
        </>
    );
}
