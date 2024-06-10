"use client";
import { FaVideo, FaUser, FaCog, FaChartLine, FaDashcube } from 'react-icons/fa';
import React from "react";
import axios from "axios";
import Link from "next/link";

const Sidebar = () => {
  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      // Redirect to login page after logout
      window.location.href = "/auth/signin";
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="bg-gray-900 text-white h-screen p-4 flex flex-col justify-between">
      <div>
        <div className="text-center my-6">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        </div>
        <ul>
          <li className="my-4 flex items-center">
            <Link href="/users/admin" className="flex items-center block py-2.5 px-4 rounded hover:bg-gray-700">
              <FaDashcube className="mr-2" />
              <span>Dashboard</span>
            </Link>
          </li>
          <li className="my-4 flex items-center">
            <Link href="/users/admin/users" className="flex items-center block py-2.5 px-4 rounded hover:bg-gray-700">
              <FaUser className="mr-2" />
              Users
            </Link>
          </li>
          <li className="my-4 flex items-center">
            <Link href="/users/admin/videos" className="flex items-center block py-2.5 px-4 rounded hover:bg-gray-700">
              <FaVideo className="mr-2" />
              <span>Videos</span>
            </Link>
          </li>
          <li className="my-4 flex items-center">
            <Link href="/users/admin/transactions" className="flex items-center block py-2.5 px-4 rounded hover:bg-gray-700">
              <FaChartLine className="mr-2" />
              <span>Transactions</span>
            </Link>
          </li>
          <li className="my-4 flex items-center">
            <Link href="/users/admin/settings" className="flex items-center block py-2.5 px-4 rounded hover:bg-gray-700">
              <FaCog className="mr-2" />
              <span>Settings</span>
            </Link>
          </li>
          <li className="my-4 flex items-center">
            <Link href="/users/admin/reports" className="flex items-center block py-2.5 px-4 rounded hover:bg-gray-700">
              <FaChartLine className="mr-2" />
              <span>Reports</span>
            </Link>
          </li>
        </ul>
      </div>
      <button
        onClick={logout}
        className="mt-4 px-4 py-2 text-sm text-white bg-red-500 hover:bg-red-800 focus:outline-none cursor-pointer"
      >
        Logout
      </button>
    </div>
  );
};

export default Sidebar;
