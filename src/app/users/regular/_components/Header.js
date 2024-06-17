import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FiSearch } from "react-icons/fi";

const Header = ({ setSearchTerm }) => {
  const [username, setUsername] = useState("null");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const router = useRouter();

  useEffect(() => {
    getUserDetails();
  }, []);

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout successful");
      router.push("/auth/signin");
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
  const toggleSearch = () => setSearchOpen(!searchOpen);

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
    setSearchTerm(event.target.value);
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-black py-2 px-4 sm:px-6 lg:px-8 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* iwatch logo */}
        <p
          className="font-sans font-bold text-3xl text-white hidden md:block cursor-pointer"
          onClick={() => router.push("/users/regular")}
        >
          <span>i</span>
          <span className="text-red-800">WATCH</span>
        </p>
        
        {/* Navigation links */}
        <nav className="md:flex space-x-4 text-sm md:text-lg">
          <a href="/users/regular" className="text-white hover:text-gray-300 hover:border-red-500 border-b-2 transition duration-300">HOME</a>
          <a href="/users/regular/trending" className="text-white hover:text-gray-300 hover:border-red-500 border-b-2 transition duration-300">TRENDING</a>
          <a href="/users/regular/ads" className="text-white hover:text-gray-300 hover:border-red-500 border-b-2 transition duration-300">ADS</a>
        </nav>

        {/* Search Icon and Input */}
        <div className="relative flex items-center">
          <FiSearch
            onClick={toggleSearch}
            className="text-white cursor-pointer hover:text-red-800 transition duration-300"
            size={24}
          />
          {searchOpen && (
            <input
              type="text"
              placeholder="Search videos by title"
              value={searchValue}
              onChange={handleSearchChange}
              className="text-black ml-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
          )}
        </div>

        {/* User profile dropdown */}
        <div className="relative ml-4">
          <button
            onClick={toggleDropdown}
            className="focus:outline-none"
          >
            <Image
              src="/path/to/profile-pic.jpg" // Placeholder image path
              alt={username}
              className="w-10 h-10 rounded-full cursor-pointer"
              width={40}
              height={40}
            />
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-black rounded-md shadow-lg z-20">
              <a href="/users/regular/subscribe" className="block px-4 py-2 text-sm text-white hover:bg-gray-800">Subscribe</a>
              <a href="/users/regular/creator" className="block px-4 py-2 text-sm text-white hover:bg-gray-800">Be a Creator</a>
              <a href="/users/regular/profile" className="block px-4 py-2 text-sm text-white hover:bg-gray-800">Profile</a>
              <button
                onClick={logout}
                className="block w-full text-left px-4 py-2 text-sm text-white bg-red-500 hover:bg-red-800"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
