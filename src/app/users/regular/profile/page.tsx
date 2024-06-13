"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import axios from "axios";
import { toast } from "react-hot-toast";
import { FaUserEdit, FaShareAlt, FaPlusCircle } from 'react-icons/fa';
import { FiLogOut, FiSettings, FiHelpCircle, FiCheckCircle } from 'react-icons/fi';
import { BiUpload, BiUser } from 'react-icons/bi';
import { AiOutlineHome } from 'react-icons/ai';
import { RiMoneyDollarCircleLine } from 'react-icons/ri';

const Dashboard = () => {
  const [user, setUser] = useState({
    followers: 48,
    following: 467,
    likes: 0,
    profileImage: "/path-to-your-image.jpg",
  });

  const [username, setUsername] = useState("null");
  const [balance, setBalance] = useState("null");
  const [image, setProfileImage] = useState("/path-to-your-image.jpg");
  const [bio, setBio] = useState("null");
  const [views, setViews] = useState("null");

  useEffect(() => {
    getUserDetails();
  }, []);

  const getUserDetails = async () => {
    try {
      const res = await axios.get("/api/users/me");
      setUsername(res.data.data.username);
      setBalance(res.data.data.balance);
      setProfileImage(res.data.data.image);
      setBio(res.data.data.bio);
      setViews(res.data.data.views);
    } catch (error) {
      
      toast.error("Failed to fetch user details");
    }
  };

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout successful");
      window.location.href = "/auth/signin";
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  return (
    <div className="min-h-screen flex bg-black">
      <aside className="fixed top-0 left-0 w-64 h-screen bg-gray-900 text-white flex flex-col overflow-y-auto">
        <nav className="flex-grow mt-6">
          <a href="/users/regular" className="flex items-center block py-2.5 px-4 rounded hover:bg-gray-700">
            <AiOutlineHome className="mr-2" />
            Home
          </a>
          <a href="/users/regular/profile" className="flex items-center block py-2.5 px-4 rounded hover:bg-gray-700">
            <BiUser className="mr-2" />
            Profile
          </a>
          <a href="/users/regular/subscribe" className="flex items-center block py-2.5 px-4 rounded hover:bg-gray-700">
            <FiCheckCircle className="mr-2" />
            Subscribe
          </a>
          <a href="/users/regular/transaction" className="flex items-center block py-2.5 px-4 rounded hover:bg-gray-700">
            <RiMoneyDollarCircleLine className="mr-2" />
            Withdraw
          </a>
          <a href="/users/regular/settings" className="flex items-center block py-2.5 px-4 rounded hover:bg-gray-700">
            <FiSettings className="mr-2" />
            Settings
          </a>
          <a href="/users/regular/help" className="flex items-center block py-2.5 px-4 rounded hover:bg-gray-700">
            <FiHelpCircle className="mr-2" />
            Help
          </a>
        </nav>
        <button
          className="flex items-center w-cover mt-auto mb-4 px-4 py-2 text-sm text-white bg-red-500 hover:bg-red-800 focus:outline-none cursor-pointer"
          onClick={logout}
        >
          <FiLogOut className="mr-2" />
          Logout
        </button>
      </aside>
      <div className="flex-grow p-6 bg-black text-white ml-64">
        <div className="max-w-md mx-auto">
          <div className="flex items-center justify-between py-4">
            <h1 className="text-xl font-semibold">{username}</h1>
            <div className="p-4 flex items-center justify-center">
              <div className="relative h-16 w-16 rounded-full overflow-hidden">
                <Image
                  src={image}
                  alt="Profile Picture"
                  layout="fill"
                  objectFit="cover"
                  objectPosition="center"
                />
              </div>
            </div>
          </div>
          <div className="flex justify-around text-center py-4">
            <div>
              <span className="block text-lg font-bold">{balance}</span>
              <span className="block text-gray-500">Balance</span>
            </div>
            {/* <div>
              <span className="block text-lg font-bold">{bio}</span>
              <span className="block text-gray-500">Viewers</span>
            </div>
            <div>
              <span className="block text-lg font-bold">{views}</span>
              <span className="block text-gray-500">Likes</span>
            </div> */}
          </div>
          <div className="flex justify-around py-4">
            <button className="flex items-center bg-gray-200 px-4 py-2 rounded">
              <FaUserEdit className="mr-2" />
              Edit profile
            </button>
            <button className="flex items-center bg-gray-200 px-4 py-2 rounded">
              <FaShareAlt className="mr-2" />
              Share profile
            </button>
            <button className="flex items-center bg-gray-200 px-4 py-2 rounded">
              <FaPlusCircle className="mr-2" />
              Add bio
            </button>
          </div>
          <div className="border-t border-gray-300 py-4 text-center">
            <p>Subscribe to upload videos and make more money</p>
            <button className="bg-pink-500 text-white px-4 py-2 rounded mt-2">Subscribe</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;