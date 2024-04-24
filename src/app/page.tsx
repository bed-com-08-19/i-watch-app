export default function HomePage() {
  return (
    <div className="bg-black text-white min-h-screen">
      {/* Hero Section */}
      <div className="relative h-screen overflow-hidden">
        <img
          src="/path/to/hero-image.jpg"
          alt="Hero"
          className="absolute inset-0 object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center">
          <h1 className="text-5xl font-semibold mb-4">Earn money by watching <br /> Videos, Content creation, advertise with us and more.</h1>
          <p className="text-xl mb-6">Watch anywhere. Cancel anytime.</p>
          <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-full font-semibold">
          <a href="/register">
            Try Now For Free
          </a>
          </button>
        </div>
      </div>

      {/* Movie Categories */}
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-semibold mb-4">Browse by Category</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {/* Sample categories, you can add more */}
          <div className="group">
            <img src="/path/to/category1.jpg" alt="Category" className="w-full h-full object-cover rounded-lg" />
            <div className="absolute inset-0 bg-black opacity-40 group-hover:opacity-0 transition-opacity"></div>
            <p className="absolute inset-0 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
              Category 1
            </p>
          </div>
          {/* Repeat similar blocks for other categories */}
        </div>
      </div>

      {/* Featured Movies */}
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-semibold mb-4">Featured Movies</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {/* Sample featured movies, you can add more */}
          <div className="group">
            <img src="/path/to/movie1.jpg" alt="Movie" className="w-full h-full object-cover rounded-lg" />
            <div className="absolute inset-0 bg-black opacity-40 group-hover:opacity-0 transition-opacity"></div>
            <p className="absolute inset-0 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
              Movie 1
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
