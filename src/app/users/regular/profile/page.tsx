// Dashboard Component
"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import axios from "axios";
import { toast } from "react-hot-toast";
import { FaUserEdit, FaShareAlt, FaPlusCircle } from 'react-icons/fa';
import { RiCoinLine } from 'react-icons/ri';
import ScrollToTopButton from '../_components/scrollToTop';

const UserProfile = () => {
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
  const [showPopup, setShowPopup] = useState<boolean>(false); // State for popup visibility


  const togglePopup = () => setShowPopup(!showPopup); // Toggle popup visibility

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

  return (
    <div className="min-h-screen flex bg-black">
      <div className="flex-grow p-6 bg-black text-white ml-4">
        <div className="max-w-md mx-auto text-center">
          <div className="flex flex-col items-center justify-center py-4">
            <div className="p-4 flex items-center justify-center">
              <div className="relative h-16 w-16 rounded-full overflow-hidden">
                <Image
                  src={image || "/noavatar.png"}
                  alt="Profile Picture"
                  layout="fill"
                  objectFit="cover"
                  objectPosition="center"
                />
              </div>
            </div>
            <h1 className="text-xl font-semibold">{username}</h1>
          </div>
          <div className="flex justify-around text-center py-4">
          <div className="flex flex-col items-center cursor-pointer" onClick={togglePopup}>
              <div className="flex items-center">
                <RiCoinLine className="mr-1 text-red-600" />
                <span className="text-lg font-bold text-red-600">{balance} icoins</span>
              </div>
            </div>
          </div>
          <div className="flex justify-around py-4">
            <button className="flex items-center bg-white px-4 py-2 rounded text-black hover:bg-gray-400">
              <FaUserEdit className="mr-2" />
              <span className="hidden lg:block">Edit profile</span>
            </button>
            <button className="flex items-center bg-gray-600 px-4 py-2 rounded text-white hover:bg-gray-700">
              <FaShareAlt className="mr-2" />
              <span className="hidden lg:block">Share profile</span>
            </button>
            <button className="flex items-center bg-gray-600 px-4 py-2 rounded text-white hover:bg-gray-700">
              <FaPlusCircle className="mr-2" />
              <span className="hidden lg:block">Add bio</span>
            </button>
          </div>
          <div className="border-t border-gray-600 py-4 text-center">
            <p>Subscribe to upload videos and make more money</p>
            <button className="bg-red-600 text-white px-4 py-2 rounded mt-2 hover:bg-red-700">Subscribe</button>
          </div>
        </div>
        {showPopup && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-gray-800 p-6 rounded-lg w-full max-w-md">
              <h2 className="text-xl font-semibold text-white mb-4">Choose of Option</h2>
              <ul className="text-white">
                <li className="mb-2 cursor-pointer" onClick={() => { /* Handle Withdraw logic */ }}>Withdraw</li>
                <li className="mb-2 cursor-pointer" onClick={() => { /* Handle Subscribe logic */ }}>Subscribe</li>
                <li className="mb-2 cursor-pointer" onClick={() => { /* Handle Top up coins logic */ }}>Top up coins</li>
              </ul>
              <button
                className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                onClick={togglePopup}
              >
                Close
              </button>
            </div>
          </div>
        )}
         <ScrollToTopButton />
      </div>
    </div>
  );
};

export default UserProfile;
