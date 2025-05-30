export default function Loader() {
  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen bg-gray-900">
      {/* App Name Above Loader */}
      <h1
        className="text-4xl font-bold mb-4"
        style={{ fontFamily: 'Orbitron, sans-serif' }}
      >
        <span className="text-white">Stream</span>
        <span className="text-purple-500">Berry</span>
      </h1>

      {/* Visually Appealing Loader Spinner */}
      <div className="relative">
        <div className="spinner-border animate-spin inline-block w-16 h-16 border-4 border-solid border-purple-500 border-t-transparent rounded-full" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    </div>
  );
}
