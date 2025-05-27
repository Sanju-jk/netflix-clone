import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { getDetails, getTrailer } from '../api/tmdb';
import Loader from './Loader';

export default function Modal({ show, onClose, content, type }) {
    const [details, setDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [trailerKey, setTrailerKey] = useState('');
    const [showTrailer, setShowTrailer] = useState(false);

    useEffect(() => {
        if (!content || !type || !show) return;

        const fetchDetails = async () => {
            try {
                const [detailsRes, trailerRes] = await Promise.all([
                    getDetails(content.id, type),
                    getTrailer(content.id, type),
                ]);

                setDetails(detailsRes.data);

                const trailer = trailerRes.data.results.find(
                    (video) => video.type === 'Trailer' && video.site === 'YouTube'
                );

                if (trailer) setTrailerKey(trailer.key);
            } catch (error) {
                console.error('Failed to fetch details or trailer:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchDetails();
    }, [content, type, show]);

    if (!show || !details) return null;
    if (loading) return <Loader />;

    return ReactDOM.createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90">
            {showTrailer ? (
                <div className="fixed inset-0 bg-black z-50">
                    {/* Fullscreen YouTube Video */}
                    <iframe
                        src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&controls=0&modestbranding=1&rel=0&showinfo=0`}
                        title="Trailer"
                        frameBorder="0"
                        allow="autoplay; encrypted-media"
                        allowFullScreen
                        className="w-full h-full"
                    ></iframe>

                    {/* Back Button */}
                    <button
                        onClick={() => setShowTrailer(false)}
                        className="absolute top-4 left-4 z-50 bg-black bg-opacity-60 text-white px-4 py-2 rounded-md text-sm hover:bg-opacity-80"
                        style={{ pointerEvents: 'auto' }}
                    >
                        ← Back
                    </button>

                    {/* Exit Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 z-50 text-white text-3xl font-bold hover:text-red-500"
                        style={{ pointerEvents: 'auto' }}
                    >
                        &times;
                    </button>
                </div>
            ) : (
                <div
                    className="bg-[#121212] text-white rounded-lg overflow-y-auto max-h-[90vh] w-full max-w-xs sm:max-w-md md:max-w-xl lg:max-w-3xl relative shadow-lg p-4"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Exit Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-white text-2xl font-bold hover:text-red-500 z-20"
                        style={{ pointerEvents: 'auto' }}
                    >
                        &times;
                    </button>

                    <div className="flex flex-col md:flex-row gap-4">
                        {/* Poster */}
                        <img
                            src={`https://image.tmdb.org/t/p/w500${details.poster_path}`}
                            alt={details.title || details.name}
                            className="w-full md:w-1/3 rounded-lg object-cover"
                        />

                        {/* Info */}
                        <div className="md:w-2/3">
                            <h2 className="text-xl sm:text-2xl font-bold mb-2">
                                {details.title || details.name}
                            </h2>

                            <p className="text-xs sm:text-sm text-gray-400 mb-2">
                                {details.genres?.map((g) => g.name).join(', ')}
                            </p>

                            <p className="text-sm text-gray-200 mb-4">{details.overview}</p>

                            <div className="text-xs sm:text-sm text-gray-400 space-y-1 mb-4">
                                {details.release_date && <div>Release Date: {details.release_date}</div>}
                                {details.first_air_date && <div>First Air Date: {details.first_air_date}</div>}
                                {details.runtime && <div>Runtime: {details.runtime} min</div>}
                                {details.number_of_seasons && <div>Seasons: {details.number_of_seasons}</div>}
                                {details.vote_average && <div>Rating: {details.vote_average.toFixed(1)} / 10</div>}
                            </div>

                            {/* Trailer Button */}
                            {trailerKey && (
                                <button
                                    onClick={() => setShowTrailer(true)}
                                    className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg text-sm transition duration-300"
                                    style={{ pointerEvents: 'auto' }}
                                >
                                    ▶ Watch Trailer
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>,
        document.body
    );
}
