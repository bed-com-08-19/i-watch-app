// Sidebar.js or Sidebar.jsx
import React from "react";
import { FaCoins,FaHome, FaUser, FaCheckCircle, FaMoneyBillWave, FaCog, FaQuestionCircle } from 'react-icons/fa';
import axios from "axios";
import Link from "next/link";

const Sidebar = () => {
  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      window.location.href = "/auth/signin";
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="fixed top-0 left-0 w-64 h-screen bg-gray-900 text-white flex flex-col justify-between p-4">
      <div>
        <div className="text-center my-6">
          <h1 className="text-2xl font-bold">User Profile</h1>
        </div>
        <ul>
          <li className="my-4">
            <Link href="/users/regular" className="flex items-center py-2.5 px-4 rounded hover:bg-gray-700">
              <FaHome className="mr-2" />
              <span>Home</span>
            </Link>
          </li>
          <li className="my-4">
            <Link href="/users/regular/profile" className="flex items-center py-2.5 px-4 rounded hover:bg-gray-700">
              <FaUser className="mr-2" />
              Profile
            </Link>
          </li>

          <li className="my-4">
            <Link href="/users/regular/subscription" className="flex items-center py-2.5 px-4 rounded hover:bg-gray-700">
              <FaCheckCircle className="mr-2" />
              <span>Subscribe</span>
            </Link>
          </li>
          <li className="my-4">
            <Link href="/users/regular/transaction" className="flex items-center py-2.5 px-4 rounded hover:bg-gray-700">
              <FaMoneyBillWave className="mr-2" />
              <span>Withdraw</span>
            </Link>
          </li>
          <li className="my-4">
            <Link href="/users/regular/topup" className="flex items-center py-2.5 px-4 rounded hover:bg-gray-700">
              <FaCoins className="mr-2" />
              <span>Top Up Coins</span>
            </Link>
          </li>
          <li className="my-4">
            <Link href="/users/regular/settings" className="flex items-center py-2.5 px-4 rounded hover:bg-gray-700">
              <FaCog className="mr-2" />
              <span>Settings</span>
            </Link>
          </li>
          <li className="my-4">
            <Link href="/users/regular/help" className="flex items-center py-2.5 px-4 rounded hover:bg-gray-700">
              <FaQuestionCircle className="mr-2" />
              <span>Help</span>
            </Link>
          </li>
        </ul>
      </div>
      <button
        onClick={logout}
        className="mt-4 px-4 py-2 text-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none cursor-pointer"
      >
        Logout
      </button>
    </div>
  );
};

export default Sidebar;