import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react'; // or any other icon

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav className="sticky top-0 z-50 bg-black bg-opacity-90 text-white p-4 shadow-md">
      <ul className="flex items-center justify-between">
        <div className="flex space-x-6 font-semibold text-lg">
          <li>
            <Link
              to="/"
              className={`hover:text-red-500 transition ${
                location.pathname === '/' ? 'text-red-500' : ''
              }`}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/movies"
              className={`hover:text-red-500 transition ${
                location.pathname === '/movies' ? 'text-red-500' : ''
              }`}
            >
              Movies
            </Link>
          </li>
          <li>
            <Link
              to="/tv-shows"
              className={`hover:text-red-500 transition ${
                location.pathname === '/tv-shows' ? 'text-red-500' : ''
              }`}
            >
              TV Shows
            </Link>
          </li>
        </div>

        {/* Search Icon */}
        <li className="ml-auto">
          <button
            onClick={() => navigate('/search')}
            className="hover:text-red-500 transition p-2"
            aria-label="Search"
          >
            <Search className="w-5 h-5" />
          </button>
        </li>
      </ul>
    </nav>
  );
}
