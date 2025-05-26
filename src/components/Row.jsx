import { useRef, useState, useEffect } from 'react';

export default function Row({ title, movies }) {
    const rowRef = useRef(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    // Number of movies to scroll at once based on screen size
    const scrollAmount = {
        small: 2,  // Scroll 2 cards on small screens
        medium: 3, // Scroll 3 cards on medium screens
        large: 4,  // Scroll 4 cards on large screens
    };

    // Function to calculate scroll amount based on screen width
    const getScrollAmount = () => {
        if (window.innerWidth >= 1280) return scrollAmount.large; // Large screens (lg, xl)
        if (window.innerWidth >= 768) return scrollAmount.medium; // Medium screens (md)
        return scrollAmount.small; // Small screens (sm)
    };

    // Calculate the width of a single movie card dynamically
    const cardWidth = {
        small: 120,  // 120px for small screens
        medium: 160, // 160px for medium screens
        large: 220,  // 220px for large screens
    };

    // Function to scroll left
    const scrollLeft = () => {
        const scrollAmount = getScrollAmount();
        rowRef.current.scrollBy({ left: -cardWidth.large * scrollAmount, behavior: 'smooth' });
    };

    // Function to scroll right
    const scrollRight = () => {
        const scrollAmount = getScrollAmount();
        rowRef.current.scrollBy({ left: cardWidth.large * scrollAmount, behavior: 'smooth' });
    };

    // Check if the user can scroll left or right
    const checkScrollPosition = () => {
        const { scrollLeft, scrollWidth, clientWidth } = rowRef.current;
        setCanScrollLeft(scrollLeft > 0); // Can scroll left if scrollLeft is more than 0
        setCanScrollRight(scrollLeft + clientWidth < scrollWidth); // Can scroll right if there is more content to scroll
    };

    // Check scroll position on initial load and when scrolled
    useEffect(() => {
        checkScrollPosition();
    }, [movies]); 

    useEffect(() => {
        // Listen to the scroll event to update button visibility
        const handleScroll = () => checkScrollPosition();
        const row = rowRef.current;
        row.addEventListener('scroll', handleScroll);

        // Update scroll amounts and positions when screen size changes
        const handleResize = () => {
            checkScrollPosition();
        };

        window.addEventListener('resize', handleResize);

        return () => {
            row.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className="p-4">
            <h2 className="text-2xl font-semibold text-white">{title}</h2>

            {/* Row container with no horizontal scrollbar */}
            <div className="relative mt-4">
                {/* Left Arrow Button */}
                {canScrollLeft && (
                    <button
                        onClick={scrollLeft}
                        className="absolute top-1/2 left-0 transform -translate-y-1/2 text-white text-xl z-10 opacity-75 hover:opacity-100 bg-gray-800 rounded-full p-2"
                    >
                        &#10094;
                    </button>
                )}

                {/* Movie Row (Without overflow-x-auto) */}
                <div
                    ref={rowRef}
                    className="flex space-x-4 overflow-hidden" // Ensures no horizontal scrollbar
                >
                    {movies.map((movie) => (
                        <div
                            key={movie.id}
                            className="relative flex-shrink-0 group overflow-hidden border-4 border-transparent hover:border-white transition-all duration-300 rounded-lg"
                        >
                            {/* Movie Card */}
                            <img
                                className="w-[120px] sm:w-[160px] md:w-[180px] lg:w-[220px] xl:w-[240px] object-cover rounded-lg group-hover:scale-105 transition-transform duration-300 ease-in-out"
                                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                alt={movie.title || movie.name}
                            />

                            {/* Movie Name on Hover */}
                            <div className="absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out rounded-lg">
                                <p className="text-white text-lg">{movie.title || movie.name}</p>
                            </div>
                        </div>
                    ))}

                </div>

                {/* Right Arrow Button */}
                {canScrollRight && (
                    <button
                        onClick={scrollRight}
                        className="absolute top-1/2 right-0 transform -translate-y-1/2 text-white text-xl z-10 opacity-75 hover:opacity-100 bg-gray-800 rounded-full p-2"
                    >
                        &#10095;
                    </button>
                )}
            </div>
        </div>
    );
}
