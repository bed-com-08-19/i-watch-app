import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import Link from "next/link";

const Header = () => {
  const [username, setUsername] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    getUserDetails();
  }, []);

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout successful");
      window.location.href = "/auth/signin";
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
        <p className="font-sans font-bold text-3xl text-white hidden md:block">
          <span>i</span>
          <span className="text-red-800">WATCH</span>
        </p>

        <nav className="md:flex space-x-4 text-sm md:text-lg">
          <Link href="/users/admin" legacyBehavior>
            <a className="text-white hover:text-gray-300 transition duration-300">HOME</a>
          </Link>
          <Link href="/users/admin/trending" legacyBehavior>
            <a className="text-white hover:text-gray-300 transition duration-300">TRENDING</a>
          </Link>
          <Link href="/users/admin/recommended" legacyBehavior>
            <a className="text-white hover:text-gray-300 transition duration-300">RECOMMENDED</a>
          </Link>
        </nav>

        <div className="relative">
          <button onClick={toggleDropdown} className="mt-4 focus:outline-none">
            <img src="" alt={username} className="w-10 h-10 rounded-full cursor-pointer" />
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-black rounded-md shadow-lg z-20">
              <Link href="/users/admin/dashboard" legacyBehavior>
                <a className="block px-4 py-2 text-sm text-white hover:bg-gray-800">Dashboard</a>
              </Link>
              <button onClick={logout} className="block px-4 py-2 text-sm text-white bg-red-500 hover:bg-red-800 focus:outline-none">Logout</button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;