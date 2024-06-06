"use client"
import { FaVideo, FaUser, FaCog, FaChartLine } from 'react-icons/fa';
import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";


const Sidebar = () => {

    // const [username, setUsername] = useState(null);
    // const [dropdownOpen, setDropdownOpen] = useState(false);
  
    // useEffect(() => {
    //   getUserDetails();
    // }, []);
  
    const logout = async () => {
      try {
        await axios.get("/api/users/logout");
        toast.success("Logout successful");
        // Redirect to login page after logout
        window.location.href = "/auth/signin";
      } catch (error) {
        console.error(error.message);
        toast.error("Failed to logout");
      }
    };
  return (
    <div className="bg-gray-900 text-white h-screen p-4">
      <div className="text-center my-6">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      </div>
      <ul>
        <li className="my-4 flex items-center">
          <FaVideo className="mr-2" /> <span>Dashboard</span>
        </li>
        <li className="my-4 flex items-center">
          <FaUser className="mr-2" /> <span>Users</span>
        </li>
        <li className="my-4 flex items-center">
          <FaCog className="mr-2" /> <span>Settings</span>
        </li>
        <li className="my-4 flex items-center">
          <FaChartLine className="mr-2" /> <span>Reports</span>
        </li>
        <a onClick={logout} className="block px-4 py-2 text-sm text-white bg-red-500 hover:bg-red-800 focus:outline-none">Logout</a>
      
      </ul>
    </div>
  );
};

export default Sidebar;
