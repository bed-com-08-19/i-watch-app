"use client";
import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import Image from 'next/image';
import axios from "axios";
import { toast } from "react-hot-toast";
import { FaUserEdit, FaShareAlt, FaPlusCircle } from 'react-icons/fa';
import { FiLogOut, FiSettings, FiHelpCircle } from 'react-icons/fi';
import { BiUpload, BiUser } from 'react-icons/bi';
import { AiOutlineHome } from 'react-icons/ai';
import { RiMoneyDollarCircleLine } from 'react-icons/ri';

interface User {
  followers: number;
  following: number;
  likes: number;
  profileImage: string;
}

interface UserDetails {
  username: string;
  balance: string;
  Profileimage: string;
  bio: string;
}

const Dashboard: React.FC = () => {
  const [user, setUser] = useState<User>({
    followers: 48,
    following: 467,
    likes: 0,
    profileImage: "/path-to-your-image.jpg",
  });
  const [username, setUsername] = useState<string>("null");
  const [balance, setBalance] = useState<string>("null");
  const [image, setProfileImage] = useState<string>("null");
  const [bio, setBio] = useState<string>("null");

  const [showUploadForm, setShowUploadForm] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [videoFile, setVideoFile] = useState<File | null>(null);

  useEffect(() => {
    getUserDetails();
  }, []);

  const getUserDetails = async () => {
    try {
      const res = await axios.get("/api/users/me");
      const userDetails: UserDetails = res.data.data;
      setUsername(userDetails.username);
      setBalance(userDetails.balance);
      setProfileImage(userDetails.Profileimage);
      setBio(userDetails.bio);
    } catch (error: any) {
      console.error(error.message);
      toast.error("Failed to fetch user details");
    }
  };

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout successful");
      window.location.href = "/auth/signin";
    } catch (error: any) {
      console.error(error.message);
      toast.error(error.message);
    }
  };

  const toggleUploadForm = () => setShowUploadForm(!showUploadForm);

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setVideoFile(event.target.files[0]);
    }
  };

  const handleUpload = async (event: FormEvent) => {
    event.preventDefault();

    if (!videoFile) {
      toast.error("Please select a video file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("video", videoFile);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("creator", username);

    try {
      await axios.post("/api/videos/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Video uploaded successfully");
      toggleUploadForm();
    } catch (error: any) {
      console.error(error.message);
      toast.error("Failed to upload video");
    }
  };

  return (
    <div className="min-h-screen flex bg-black">
      <aside className="w-64 bg-black-800 text-white flex-shrink-0">
        <nav className="mt-6">
          <a href="/users/creator" className="block py-2.5 px-4 rounded hover:bg-gray-700">
            <AiOutlineHome className="inline mr-2" />
            Home
          </a>
          <a href="/users/creator/profile" className="block py-2.5 px-4 rounded hover:bg-gray-700">
            <BiUser className="inline mr-2" />
            Profile
          </a>
          <a onClick={toggleUploadForm} className="block py-2.5 px-4 rounded hover:bg-gray-700">
            <BiUpload className="inline mr-2" />
            Upload
          </a>
          {showUploadForm && (
            <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 flex items-center justify-center z-50">
              <div className="bg-black p-6 rounded-lg border border-white">
                <h2 className="text-lg font-semibold mb-4">Upload Video</h2>
                <form onSubmit={handleUpload}>
                  <div className="mb-4">
                    <label htmlFor="title" className="block text-sm font-medium text-red-700">
                      Video Title
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      placeholder="Video Title"
                      className="mt-1 p-2 block w-full border border-gray-300 rounded-md text-black"
                      value={title}
                      onChange={handleTitleChange}
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="description" className="block text-sm font-medium text-red-700">
                      Video Description
                    </label>
                    <input
                      type="text"
                      id="description"
                      name="description"
                      placeholder="Video Description"
                      className="mt-1 p-2 block w-full border border-gray-300 rounded-md text-black"
                      value={description}
                      onChange={handleDescriptionChange}
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="video" className="block text-sm font-medium text-red-700">
                      Upload Video File
                    </label>
                    <input
                      type="file"
                      id="video"
                      name="video"
                      className="mt-1 p-2 block w-full border border-gray-300 rounded-md text-white"
                      onChange={handleFileChange}
                    />
                  </div>
                  <div className="flex justify-end">
                    <button type="button" className="mr-2 px-4 py-2 text-white bg-red-500 hover:bg-red-600 rounded-lg" onClick={toggleUploadForm}>Cancel</button>
                    <button type="submit" className="px-4 py-2 text-white bg-green-500 hover:bg-green-600 rounded-lg">Upload</button>
                  </div>
                </form>
              </div>
            </div>
          )}
          <a href="/users/creator/transaction" className="block py-2.5 px-4 rounded hover:bg-gray-700">
            <RiMoneyDollarCircleLine className="inline mr-2" />
            Withdraw
          </a>
          <a href="/users/creator/settings" className="block py-2.5 px-4 rounded hover:bg-gray-700">
            <FiSettings className="inline mr-2" />
            Settings
          </a>
          <a href="/help" className="block py-2.5 px-4 rounded hover:bg-gray-700">
            <FiHelpCircle className="inline mr-2" />
            Help
          </a>
          <button className="w-full text-left block py-2.5 px-4 rounded hover:bg-red-700" onClick={logout}>
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
            <p>What are some good videos you’ve taken recently?</p>
            <button onClick={toggleUploadForm} className="bg-pink-500 text-white px-4 py-2 rounded mt-2">Upload</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
