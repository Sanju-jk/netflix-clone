import { useEffect, useState } from 'react';
import { getUpcomingMovies } from '../api/tmdb.js';
import Modal from './Modal.jsx';

export default function Banner() {
  const [movie, setMovie] = useState(null);
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    getUpcomingMovies()
      .then((res) => {
        const results = res.data.results;
        const random = Math.floor(Math.random() * results.length);
        setMovie(results[random]);
      })
      .catch((err) => console.error('Error fetching trending movie:', err));
  }, []);

  const handleDetailsModal = ()=>{
    setShowModal(true);

  }

  if (!movie) return null;

  return (
    <header
      className="relative h-[50vh]  md:h-[80vh]  bg-cover object-fill bg-center"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
      }}
    >
      {/* Add a dark transparent overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-40" />

      {/* Content inside the banner */}
      <div className="absolute bottom-20 left-6 md:left-16 z-10 max-w-xl text-slate-300">
        <h1 className="text-3xl md:text-5xl font-bold">{movie.title || movie.name}</h1>
        <p className="mt-3 text-sm md:text-base text-gray-300 max-h-[100px] overflow-hidden">
          {movie.overview}
        </p>
        <div className="mt-4 space-x-4">
          <button
            onClick={handleDetailsModal}
            className="bg-purple-700 px-5 py-2 rounded font-semibold text-slate-200 hover:bg-purple-600">
            ℹ More Info
          </button>
        </div>
      </div>
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        content={movie}
        type='movie'
      />
    </header>
  );
}

