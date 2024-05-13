// Header.js
//<img className="h-8" src= {logo} alt="Logo" />
import logo from "./logo.png"
import Image from "next/image";
const Header = () => {
    return (
      <header className="bg-black py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* iwatch logo */}
        <div className="flex-shrink-0">
        <Image src={logo}  
                    alt="GFG logo imported from public directory" width={90}
                    height={20} /> 
        </div>
        
        {/* Navigation links */}
        <nav className="hidden md:flex space-x-4">
          <a href="/landing" className="text-white hover:text-gray-300 transition duration-300">HOME</a>
          <a href="#" className="text-white hover:text-gray-300 transition duration-300">CATEGORY</a>
          <a href="#" className="text-white hover:text-gray-300 transition duration-300">TRENDING</a>
          <a href="#" className="text-white hover:text-gray-300 transition duration-300">RECOMENDED</a>
        </nav>
        {/* User profile */}
        <div className="flex items-center">
          <img className="h-10 w-10 rounded-full" src="#" alt="User Profile" />
          <span className="text-white ml-2">John Doe</span>
        </div>
      </div>
    </header>
    );
  }
  
  export default Header;
  