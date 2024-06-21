"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { FaUserEdit, FaShareAlt, FaPlusCircle } from 'react-icons/fa';
import { RiCoinLine } from 'react-icons/ri';
import ScrollToTopButton from '../_components/scrollToTop';

interface Video {
  id: string;
  title: string;
  description: string;
  watchDate: string;
}

const UserProfile: React.FC = () => {
  const [username, setUsername] = useState<string>("null");
  const [icoins, setIcoinsAmount] = useState<string>("null");
  const [image, setProfileImage] = useState<string>("/path-to-your-image.jpg");
  const [bio, setBio] = useState<string>("null");
  const [views, setViews] = useState<string>("null");
  const [watchedVideos, setWatchedVideos] = useState<Video[]>([]);
  const [showPopup, setShowPopup] = useState<boolean>(false);

  useEffect(() => {
    getUserDetails();
    fetchWatchedVideos();
  }, []);

  const getUserDetails = async () => {
    try {
      const res = await axios.get("/api/users/me");
      setUsername(res.data.data.usurname);
      setIcoinsAmount(res.data.data.icoins);
      setProfileImage(res.data.data.image);
      setBio(res.data.data.bio);
      setViews(res.data.data.views);
    } catch (error) {
      toast.error("Failed to fetch user details");
    }
  };

  const fetchWatchedVideos = async () => {
    try {
      const res = await axios.get("/api/videos/history");
      setWatchedVideos(res.data.data.slice(0, 15)); // Assuming endpoint returns last 15 videos
    } catch (error) {
      toast.error("Failed to fetch watched videos");
    }
  };

  const togglePopup = () => setShowPopup(!showPopup);

  return (
    <div className="min-h-screen flex bg-black">
      <div className="flex-grow p-6 bg-black text-white m-4">
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
                <span className="text-lg font-bold text-red-600">{icoins} icoins</span>
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
          <div className="mt-8">
            <h2 className="text-xl mb-4">Recently Watched Videos</h2>
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-3">
              {watchedVideos.map((video) => (
                <div key={video.id} className="bg-gray-800 p-4 rounded shadow-md">
                  <h3 className="text-lg font-semibold mb-2">{video.title}</h3>
                  <p className="text-sm text-gray-400">{video.description}</p>
                  <p className="text-sm text-gray-400">Watched on: {new Date(video.watchDate).toLocaleDateString()}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <ScrollToTopButton />
      </div>
    </div>
  );
};

export default UserProfile;
