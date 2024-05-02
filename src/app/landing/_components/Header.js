// Header.js

const Header = () => {
    return (
      <header className="bg-black py-2 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* iwatch logo */}
        <div className="flex-shrink-0 ">
        <p className="font-sans font-bold text-3xl text-600 hidden md:flex md:flex-row">
          <span className="text-white">i</span>
          <span className="text-red-800">WATCH</span>
        </p>

        </div>
        
        {/* Navigation links */}
        <nav className="md:flex space-x-4 text-[10px] sm:text-sm md:text-lg">
          <a href="/landing" className="text-white hover:text-gray-300 transition duration-300">HOME</a>
          <a href="/trending" className="text-white hover:text-gray-300 transition duration-300">TRENDING</a>
          <a href="/recommended" className="text-white hover:text-gray-300 transition duration-300">RECOMMENDED</a>
        </nav>
        {/* User profile */}
        <div className="flex items-center text-[10px] sm:text-sm md:text-lg">
          <img className="h-10 w-10 rounded-full" src="#" alt="User Profile" />
          <span className="text-white ml-2 hidden md:block">John Doe</span>
        </div>
      </div>
    </header>
    );
  }
  
  export default Header;
  