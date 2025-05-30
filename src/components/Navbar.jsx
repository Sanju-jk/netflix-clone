import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';

export default function Navbar() {
    const location = useLocation();
    const navigate = useNavigate();

    return (
        <nav className="sticky top-0 z-50 bg-black bg-opacity-90 text-white p-4 shadow-md">
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-0">

                <Link
                    to="/"
                    className="flex items-center space-x-2 text-3xl font-bold"
                    style={{ fontFamily: 'Orbitron, sans-serif' }}
                >
                    {/* Logo Image */}
                    <img
                        src="blackberry.png"
                        alt="Logo"
                        className="h-8 w-8 sm:h-10 sm:w-10 object-contain"
                    />

                    {/* Title */}
                    <div>
                        <span className="text-white">Stream</span>
                        <span className="text-purple-500">Berry</span>
                    </div>
                </Link>


                {/* Navigation Links */}
                <ul className="flex flex-wrap justify-center sm:justify-start items-center gap-4 sm:gap-6 font-semibold text-base sm:text-lg">
                    <li>
                        <Link
                            to="/"
                            className={`hover:text-purple-500 transition ${location.pathname === '/' ? 'text-purple-500' : ''
                                }`}
                        >
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/movies"
                            className={`hover:text-purple-500 transition ${location.pathname === '/movies' ? 'text-purple-500' : ''
                                }`}
                        >
                            Movies
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/tv-shows"
                            className={`hover:text-purple-500 transition ${location.pathname === '/tv-shows' ? 'text-purple-500' : ''
                                }`}
                        >
                            TV Shows
                        </Link>
                    </li>
                </ul>

                {/* Search Icon */}
                <button
                    onClick={() => navigate('/search')}
                    className="hover:text-purple-500 transition p-2"
                    aria-label="Search"
                >
                    <Search className="w-5 h-5" />
                </button>
            </div>
        </nav>
    );
}
