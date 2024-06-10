// Footer.js

"use client"
const Footer = () => {
    return (
      <footer className="bg-black py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Left side */}
          <div className="flex items-center mb-4 md:mb-0">
            <img className="h-6" src="/netflix-logo.png" alt="Netflix Logo" />
            <span className="text-white ml-2">© 2024 I-WATCH, Inc.</span>
          </div>
          {/* Right side */} 
          <div className="flex space-x-4">
            <a href="#" className="text-white hover:text-gray-300 transition duration-300">FAQ</a>
            <a href="#" className="text-white hover:text-gray-300 transition duration-300">Help Center</a>
            <a href="#" className="text-white hover:text-gray-300 transition duration-300">Account</a>
            <a href="#" className="text-white hover:text-gray-300 transition duration-300">Media Center</a>
            <a href="#" className="text-white hover:text-gray-300 transition duration-300">Investor Relations</a>
          </div>
        </div>
      </div>
    </footer>
    );
  }
  
  export default Footer;
  