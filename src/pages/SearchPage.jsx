import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { searchContent } from '../api/tmdb.js'; // updated import
import MovieCard from '../components/MovieCard';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    try {
      const res = await searchContent(query);
      const filtered = res.data.results.filter(
        (item) => item.media_type !== 'person'
      );
      setResults(filtered);
    } catch (error) {
      console.error('Error fetching search results:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 min-h-screen bg-black text-white">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 bg-gray-700 text-sm px-4 py-2 rounded hover:bg-gray-600"
      >
        ← Back
      </button>

      <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-2 mb-6">
        <input
          type="text"
          placeholder="Search movies or TV shows..."
          className="flex-1 px-4 py-2 text-black rounded"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          type="submit"
          className="bg-purple-600 px-4 py-2 rounded hover:bg-purple-700"
        >
          Search
        </button>
      </form>

      {loading && <p>Loading...</p>}
      {!loading && results.length === 0 && query && <p>No results found.</p>}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {results.map((item) => (
          <MovieCard key={item.id} content={item} type={item.media_type} />
        ))}
      </div>
    </div>
  );
}
