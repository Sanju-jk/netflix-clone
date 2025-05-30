import { useState } from 'react';
import Modal from './Modal';

export default function MovieCard({ content, type }) {
  const [showModal, setShowModal] = useState(false);

  const handleCardClick = () => {
    setShowModal(true);
  };

  return (
    <>
      <div
        onClick={handleCardClick}
        className="cursor-pointer rounded overflow-hidden shadow-lg bg-gray-800 hover:shadow-xl hover:scale-105 transition-transform"
      >
        <img
          src={
            content.poster_path
              ? `https://image.tmdb.org/t/p/w500${content.poster_path}`
              : 'https://placehold.co/300x450?text=No+Image&font=roboto'

          }
          alt={content.title || content.name}
          className="w-full h-[300px] object-cover"
        />
        <div className="p-2 text-center text-white font-semibold">
          {content.title || content.name}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <Modal
          show={showModal}
          onClose={() => setShowModal(false)}
          content={content}
          type={type}
        />
      )}
    </>
  );
}
