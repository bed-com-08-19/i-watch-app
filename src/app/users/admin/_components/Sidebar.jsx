"use client";
import { FaVideo, FaUser, FaCog, FaChartLine } from 'react-icons/fa';
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
    <div className="bg-gray-900 text-white h-screen p-4">
      <div className="text-center my-6">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      </div>
      <ul>
        <li className="my-4 flex items-center">
          <FaVideo className="mr-2" />
          <Link href="/users/admin/dashboard">
            <span>Dashboard</span>
          </Link>
        </li>
        <li className="my-4 flex items-center">
          <FaUser className="mr-2" />
          <Link href="/users/admin/users">
            <span>Users</span>
          </Link>
        </li>
        <li className="my-4 flex items-center">
          <FaVideo className="mr-2" />
          <Link href="/users/admin/videos">
            <span>Videos</span>
          </Link>
        </li>
        <li className="my-4 flex items-center">
          <FaChartLine className="mr-2" />
          <Link href="/users/admin/transactions">
            <span>Transactions</span>
          </Link>
        </li>
        <li className="my-4 flex items-center">
          <FaCog className="mr-2" />
          <Link href="/users/admin/settings">
            <span>Settings</span>
          </Link>
        </li>
        <li className="my-4 flex items-center">
          <FaChartLine className="mr-2" />
          <Link href="/users/admin/reports">
            <span>Reports</span>
          </Link>
        </li>
        <a onClick={logout} className="block px-4 py-2 text-sm text-white bg-red-500 hover:bg-red-800 focus:outline-none cursor-pointer">
          Logout
        </a>
      </ul>
    </div>
  );
};

export default Sidebar;
