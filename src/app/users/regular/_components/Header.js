import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import Image from "next/image";

const Header = () => {
  const [username, setUsername] = useState("null");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    getUserDetails();
  }, []);

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout successful");
    } catch (error) {
      console.error(error.message);
      toast.error("Failed to logout");
    }
  };

  const getUserDetails = async () => {
    try {
      const res = await axios.get("/api/users/me");
      setUsername(res.data.data.username);
    } catch (error) {
      console.error(error.message);
      toast.error("Failed to fetch user details");
    }
  };

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  
  return (
    <header className="bg-black py-2 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* iwatch logo */}
        <p className="font-sans font-bold text-3xl text-white hidden md:block">
          <span>i</span>
          <span className="text-red-800">WATCH</span>
        </p>
        
        {/* Navigation links */}
        <nav className="md:flex space-x-4 text-sm md:text-lg">
          <a href="/users/regular" className="text-white hover:text-gray-300 hover:border-red-500 border-b-2 transition duration-300">HOME</a>
          <a href="/users/regular/trending" className="text-white hover:text-gray-300 hover:border-red-500 border-b-2 transition duration-300">TRENDING</a>
          <a href="/users/regular/recommended" className="text-white hover:text-gray-300 hover:border-red-500 border-b-2 transition duration-300">ADS</a>
        </nav>

        {/* User profile dropdown */} 
        <div className="relative">
          
        <button
            onClick={toggleDropdown}
            className="mt-4 focus:outline-none"
          >
            <Image
              src=""
              alt={username}
              className="w-10 h-10 rounded-full cursor-pointer"
            />
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-black rounded-md shadow-lg z-20">
              <a href="/users/regular/subscribe" className="block px-4 py-2 text-sm text-white hover:bg-gray-800" >subscribe</a>
              <a href="/users/regular/subscribe" className="block px-4 py-2 text-sm text-white hover:bg-gray-800" >Be a Creator</a>
              <a href="/users/regular/profile" className="block px-4 py-2 text-sm text-white hover:bg-gray-800" >Profile</a>
              <a href="/auth/signin" className="block px-4 py-2 text-sm text-white bg-red-500 hover:bg-red-800" onClick={logout}>Logout</a>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;