import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { getDetails } from '../api/tmdb'; 
import Loader from './Loader';

export default function Modal({ show, onClose, content, type }) {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!content || !type || !show) return;

    const fetchDetails = async () => {
      try {
        const res = await getDetails(content.id, type);
        setDetails(res.data);
      } catch (error) {
        console.error('Failed to fetch details:', error);
      } finally {
        setLoading(false)
      }
    };

    fetchDetails();
  }, [content, type, show]);


  if (!show || !details) return null;
  if (loading) return <Loader />

  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 px-4 py-6"
      onClick={onClose}
    >
      <div
        className="bg-[#121212] text-white rounded-lg overflow-y-auto max-h-[90vh] w-full max-w-4xl relative shadow-lg"
        onClick={(e) => e.stopPropagation()} // Prevent modal close on inner click
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white text-2xl font-bold hover:text-red-500"
        >
          &times;
        </button>

        {/* Modal Content */}
        <div className="flex flex-col md:flex-row gap-4 p-6">
          {/* Poster */}
          <img
            src={`https://image.tmdb.org/t/p/w500${details.poster_path}`}
            alt={details.title || details.name}
            className="w-full md:w-1/3 rounded-lg object-cover"
          />

          {/* Details */}
          <div className="md:w-2/3">
            <h2 className="text-2xl font-bold mb-2">
              {details.title || details.name}
            </h2>

            {/* Genres */}
            <div className="text-sm text-gray-400 mb-2">
              {details.genres?.map((genre) => genre.name).join(', ')}
            </div>

            {/* Overview */}
            <p className="text-gray-200 mb-4">{details.overview}</p>

            {/* Extra Info */}
            <div className="text-sm text-gray-400 space-y-1">
              {details.release_date && (
                <div>Release Date: {details.release_date}</div>
              )}
              {details.first_air_date && (
                <div>First Air Date: {details.first_air_date}</div>
              )}
              {details.runtime && <div>Runtime: {details.runtime} min</div>}
              {details.number_of_seasons && (
                <div>Seasons: {details.number_of_seasons}</div>
              )}
              {details.vote_average && (
                <div>Rating: {details.vote_average.toFixed(1)} / 10</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
