"use client"
import React, { useEffect,useState } from 'react';
import Image from 'next/image';
import axios from "axios";
import { toast } from "react-hot-toast";
import { FaUserEdit, FaShareAlt, FaPlusCircle } from 'react-icons/fa';
import { FiLogOut, FiSettings, FiHelpCircle } from 'react-icons/fi';
import { BiUpload, BiUser } from 'react-icons/bi';
import { AiOutlineHome } from 'react-icons/ai';
import { RiMoneyDollarCircleLine } from 'react-icons/ri';

const Dashboard = () => {
  const [user] = useState({
    followers: 48,
    following: 467,
    likes: 0,
    profileImage: "/path-to-your-image.jpg", // Add your profile image path
  });
  const [username, setUsername] = useState("null");
  const [balance, setBalance] = useState("null");
  const [image, setProfileImage] = useState("null");
  const [bio, setBio] = useState("null");

  useEffect(() => {
    getUserDetails();
  }, []);

  const getUserDetails = async () => {
    try {
      const res = await axios.get("/api/users/me");
      setUsername(res.data.data.username);
      setBalance(res.data.data.balance);
      setProfileImage(res.data.data.Profileimage);
      setBio(res.data.data.bio);

    } catch (error) {
      console.error(error.message);
      toast.error("Failed to fetch user details");
    }
  };

  return (
    <div className="min-h-screen flex bg-black">
      <aside className="w-64 bg-black-800 text-white flex-shrink-0">
        
        <nav className="mt-6">
            <a  href="/dashboard" className="block py-2.5 px-4 rounded hover:bg-gray-700">
              <AiOutlineHome className="inline mr-2" />
              Pages
            </a>

            <a href="/profile" className="block py-2.5 px-4 rounded hover:bg-gray-700">
              <BiUser className="inline mr-2" />
              Profile
            </a>
          
          
            <a href="/users/creator/upload" className="block py-2.5 px-4 rounded hover:bg-gray-700">
              <BiUpload className="inline mr-2" />
              Upload
            </a>
          
            <a href="/users/creator/transaction" className="block py-2.5 px-4 rounded hover:bg-gray-700">
              <RiMoneyDollarCircleLine className="inline mr-2" />
              Withdraw
            </a>
         
            <a href="/users" className="block py-2.5 px-4 rounded hover:bg-gray-700">
              <BiUser className="inline mr-2" />
              User
            </a>
          
            <a href="/settings" className="block py-2.5 px-4 rounded hover:bg-gray-700">
              <FiSettings className="inline mr-2" />
              Settings
            </a>
          
            <a href="/help" className="block py-2.5 px-4 rounded hover:bg-gray-700">
              <FiHelpCircle className="inline mr-2" />
              Help
            </a>
          
          <button className="w-full text-left block py-2.5 px-4 rounded hover:bg-red-700">
            <FiLogOut className="inline mr-2" />
            Logout
          </button>
        </nav>
      </aside>
      <div className="flex-grow p-6 bg-black">
        <div className="max-w-md mx-auto">
          <div className="flex items-center justify-between py-4">
            <h1 className="text-xl font-semibold">{username}</h1>
            <div className="p-4 flex items-center justify-center">
          <div className="relative h-16 w-16 rounded-full overflow-hidden">
            <Image
              src={user.profileImage}
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
            <div>
              <span className="block text-lg font-bold">{user.followers}</span>
              <span className="block text-gray-500">Viewers</span>
            </div>
            <div>
              <span className="block text-lg font-bold">{user.likes}</span>
              <span className="block text-gray-500">Likes</span>
            </div>
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
            <p>What are some good photos you’ve taken recently?</p>
            <button className="bg-pink-500 text-white px-4 py-2 rounded mt-2">Upload</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
