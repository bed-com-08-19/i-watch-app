// src/app/users/creator/profile/page.tsx

"use client";

import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { SideBar } from '../_components/Sidebar';
import Image from 'next/image';
import { FaUserEdit, FaShareAlt, FaPlusCircle } from 'react-icons/fa';
import { RiCoinLine } from 'react-icons/ri';
import VideoCard from '@/components/VideoCard';
import Select from 'react-select';
import Header from './header';

interface UserDetails {
  playCount: number;
  username: string;
  balance: string;
  profileImage: string;
  bio: string;
}

interface Video {
  _id: string;
  url: string;
  title: string;
  description: string;
  views: number;
  playCount: number;
}

interface CategoryOption {
  value: string;
  label: string;
}

const categories: CategoryOption[] = [
  { value: 'music', label: 'Music' },
  { value: 'sports', label: 'Sports' },
  { value: 'gaming', label: 'Gaming' },
  { value: 'news', label: 'News' },
  // Add more categories as needed
];

const Dashboard: React.FC = () => {
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [videos, setVideos] = useState<Video[]>([]);
  const [showUploadForm, setShowUploadForm] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [selectedCategories, setSelectedCategories] = useState<CategoryOption[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [showBioForm, setShowBioForm] = useState<boolean>(false);

  useEffect(() => {
    getUserDetails();
    fetchVideos();
  }, []);

  const getUserDetails = async () => {
    try {
      const res = await axios.get('/api/users/me');
      setUserDetails(res.data.data);
    } catch (error) {
      toast.error('Failed to fetch user details');
    }
  };

  const logout = async () => {
    try {
      await axios.get('/api/users/logout');
      toast.success('Logout successful');
      window.location.href = '/auth/signin';
    } catch (error) {
      toast.error('Failed to logout.');
    }
  };

  const toggleUploadForm = () => setShowUploadForm(!showUploadForm);
  const toggleBioForm = () => setShowBioForm(!showBioForm);

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => setTitle(event.target.value);
  const handleDescriptionChange = (event: ChangeEvent<HTMLTextAreaElement>) => setDescription(event.target.value);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setVideoFile(event.target.files[0]);
    }
  };

  const handleCategoryChange = (selectedOptions: CategoryOption[]) => {
    setSelectedCategories(selectedOptions);
  };

  const handleUpload = async (event: FormEvent) => {
    event.preventDefault();
    if (!videoFile) {
      toast.error('Please select a video file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('video', videoFile);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('creator', userDetails?.username || '');
    formData.append('categories', JSON.stringify(selectedCategories.map(category => category.value)));

    try {
      await axios.post('/api/videos/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      toast.success('Video uploaded successfully');
      toggleUploadForm();
      fetchVideos();
    } catch (error) {
      toast.error('Failed to upload video');
    }
  };

  const fetchVideos = async () => {
    try {
      const response = await axios.get('/api/videos/user');
      setVideos(response.data.data);
    } catch (error) {
      toast.error('Failed to fetch videos');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`/api/videos/${id}`);
      toast.success('Video deleted successfully');
      fetchVideos();
    } catch (error) {
      toast.error('Failed to delete video');
    }
  };

  const handleViewStatistics = (video: Video) => setSelectedVideo(video);

  const handleGiftCoins = async () => {
    try {
      await axios.post('/api/users/gift-coins', { amount: 100 }); // Example amount
      toast.success('Coins gifted successfully');
      getUserDetails();
    } catch (error) {
      toast.error('Failed to gift coins');
    }
  };

  if (!userDetails) {
    return <div className="text-red-500 text-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen flex bg-black">
      {/* <SideBar /> */}
      {/* <Header /> */}
      <div className="flex-grow p-6 ml-4 bg-black">
        <div className="max-w-md mx-auto text-center">
          <div className="flex flex-col items-center justify-center py-4">
            <div className="p-4 items-center justify-center relative h-16 w-16 rounded-full overflow-hidden">
              <Image src={userDetails.profileImage || "/noavatar.png"} alt="Profile Picture" layout="fill" objectFit="cover" objectPosition="center" />
            </div>
            <div className="p-4 items-center justify-center">
              <h1 className="text-xl font-semibold">{userDetails.username}</h1>
            </div>
          </div>
          <div className="flex justify-around text-center py-4">
            <div className="flex flex-col items-center">
              <div className="flex items-center">
                <RiCoinLine className="mr-1 text-red-600" />
                <span className="text-lg font-bold text-red-600">{userDetails.balance} icoins</span>
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
            <button className="flex items-center bg-gray-600 px-4 py-2 rounded text-white hover:bg-gray-700" onClick={toggleBioForm}>
              <FaPlusCircle className="mr-2" />
              <span className="hidden lg:block">Add bio</span>
            </button>
          </div>
          <div className="border-t border-gray-300 py-4 text-center">
            <p className="text-white">What are some good videos you’ve taken recently?</p>
            <button onClick={toggleUploadForm} className="bg-red-600 text-white px-4 py-2 rounded mt-2">Upload</button>
          </div>
        </div>
        <div className="max-w-5xl mx-auto mt-6">
          <h2 className="text-xl font-semibold text-white">Your Videos</h2>
          {videos.length === 0 ? (
            <p className="text-red-500">No videos uploaded yet.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
              {videos.map((video) => (
                <VideoCard key={video._id} video={video} handleDelete={handleDelete} handleViewStatistics={handleViewStatistics} />
              ))}
            </div>
          )}
        </div>
        {selectedVideo && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-gray-800 p-6 rounded-lg w-full max-w-md">
              <h2 className="text-xl font-semibold text-white mb-4">Video Statistics</h2>
              <div className="relative bg-gray-800 rounded-lg overflow-hidden shadow-md">
                <video className="object-cover w-full h-64" src={selectedVideo.url} controls />
                <div className="px-4 py-2">
                  <h3 className="text-lg font-semibold text-white">{selectedVideo.title}</h3>
                  <p className="text-white">{selectedVideo.description}</p>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-sm text-white-400">Views: {selectedVideo.playCount}</span>
                  </div>
                </div>
              </div>
              <button
                type="button"
                className="mt-4 w-full bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                onClick={() => setSelectedVideo(null)}
              >
                Close
              </button>
            </div>
          </div>
        )}
        {showUploadForm && (
          <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-black p-6 rounded-lg w-full max-w-md border-2 border-red-500">
              <h2 className="text-lg font-semibold mb-4 text-white">Upload Video</h2>
              <form onSubmit={handleUpload}>
                <div className="mb-4">
                  <label htmlFor="title" className="block text-sm font-medium text-white">
                    Video Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    placeholder="Video Title"
                    className="mt-1 p-2 block w-full border rounded-md bg-black text-white"
                    value={title}
                    onChange={handleTitleChange}
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="description" className="block text-sm font-medium text-white">
                    Video Description
                  </label>
                  <input
                    type="text"
                    id="description"
                    name="description"
                    placeholder="Video Description"
                    className="mt-1 p-2 block w-full border rounded-md bg-black text-white"
                    value={description}
                    onChange={handleDescriptionChange}
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="video" className="block text-sm font-medium text-white">
                    Upload Video File
                  </label>
                  <input
                    type="file"
                    id="video"
                    name="video"
                    className="mt-1 p-2 block w-full border rounded-md bg-black text-white"
                    onChange={handleFileChange}
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="categories" className="block text-sm font-medium text-white">
                    Select Categories
                  </label>
                  <Select
                    id="categories"
                    isMulti
                    options={categories}
                    value={selectedCategories}
                    onChange={handleCategoryChange}
                    className="mt-1"
                    styles={{
                      control: (provided) => ({
                        ...provided,
                        backgroundColor: 'black',
                        color: 'white',
                      }),
                      menu: (provided) => ({
                        ...provided,
                        backgroundColor: 'black',
                        color: 'white',
                      }),
                      multiValue: (provided) => ({
                        ...provided,
                        backgroundColor: 'grey',
                        color: 'white',
                      }),
                      input: (provided) => ({
                        ...provided,
                        color: 'white',
                      }),
                      singleValue: (provided) => ({
                        ...provided,
                        color: 'white',
                      }),
                      option: (provided, state) => ({
                        ...provided,
                        backgroundColor: state.isFocused ? 'red' : 'black',
                        color: state.isFocused ? 'white' : 'white',
                      }),
                    }}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-red-600 text-white px-4 py-2 rounded mt-2 hover:bg-red-700"
                >
                  Upload
                </button>
                <button
                  type="button"
                  className="mt-4 px-4 py-2 text-black bg-white hover:bg-gray-400 rounded-lg w-full"
                  onClick={toggleUploadForm}
                >
                  Cancel
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
