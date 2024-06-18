// src/app/users/creator/profile/page.tsx
"use client";

import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import Image from 'next/image';
import axios from "axios";
import { toast } from "react-hot-toast";
import { FaUserEdit, FaShareAlt, FaPlusCircle } from 'react-icons/fa';
import { FiLogOut, FiSettings, FiHelpCircle, FiCheckCircle } from 'react-icons/fi';
import { BiUpload, BiUser } from 'react-icons/bi';
import { AiOutlineHome } from 'react-icons/ai';
import { RiCoinLine, RiMoneyDollarCircleLine } from 'react-icons/ri';
import Sidebar from '../_components/Sidebar';

interface User {
  followers: number;
  following: number;
  likes: number;
  profileImage: string;
}

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

const UploadForm: React.FC<{
  showUploadForm: boolean;
  toggleUploadForm: () => void;
  handleUpload: (event: FormEvent) => void;
  handleTitleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleDescriptionChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleFileChange: (event: ChangeEvent<HTMLInputElement>) => void;
  title: string;
  description: string;
}> = ({
  showUploadForm,
  toggleUploadForm,
  handleUpload,
  handleTitleChange,
  handleDescriptionChange,
  handleFileChange,
  title,
  description,
}) => {
  if (!showUploadForm) return null;
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-red-700 p-6 rounded-lg border border-white">
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
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md text-black"
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
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md text-black"
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
  );
};

const VideoCard: React.FC<{
  video: Video;
  handleDelete: (id: string) => void;
  handleViewStatistics: (video: Video) => void;
}> = ({ video, handleDelete, handleViewStatistics }) => (
  <div className="relative bg-gray-800 rounded-lg overflow-hidden shadow-md">
    <div className="px-4 py-2 bg-black bg-opacity-75 text-white">
      <h3 className="text-lg font-semibold">{video.title}</h3>
    </div>
    <video className="object-cover w-full h-48 sm:h-64" src={video.url} controls />
    <div className="px-4 py-2 bg-black bg-opacity-75 text-white flex justify-between">
      <button
        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none"
        onClick={() => handleDelete(video._id)}
      >
        Delete
      </button>
      <button
        className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
        onClick={() => handleViewStatistics(video)}
      >
        View Stats
      </button>
    </div>
    <div className="px-4 py-2 bg-black bg-opacity-75 text-white">
      <p className="text-sm">{video.description}</p>
    </div>
  </div>
);

const BioForm: React.FC<{ bio: string, handleChange: (e: ChangeEvent<HTMLInputElement>) => void, handleSubmit: (e: FormEvent) => void }> = ({ bio, handleChange, handleSubmit }) => (
  <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 flex items-center justify-center z-50">
    <div className="bg-red-700 p-6 rounded-lg border border-white">
      <h2 className="text-lg font-semibold mb-4 text-white">Add Bio</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="bio" className="block text-sm font-medium text-white">
            Bio
          </label>
          <input
            type="text"
            id="bio"
            name="bio"
            placeholder="Enter your bio"
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md text-black"
            value={bio}
            onChange={handleChange}
          />
        </div>
        <div className="flex justify-end">
          <button type="submit" className="px-4 py-2 text-white bg-green-500 hover:bg-green-600 rounded-lg">Submit</button>
        </div>
      </form>
    </div>
  </div>
);

const CreatorProfilePage: React.FC = () => {
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [playCount, setPlayCount] = useState(0);
  const [user, setUser] = useState<UserDetails | null>(null);
  const [showBioForm, setShowBioForm] = useState(false);
  const [bio, setBio] = useState('');
  const [videos, setVideos] = useState<Video[]>([]);

  const toggleUploadForm = () => setShowUploadForm(!showUploadForm);
  const toggleBioForm = () => setShowBioForm(!showBioForm);

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value);
  const handleDescriptionChange = (e: ChangeEvent<HTMLInputElement>) => setDescription(e.target.value);
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => setFile(e.target.files?.[0] || null);

  const handleUpload = async (e: FormEvent) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append('video', file);
    formData.append('title', title);
    formData.append('description', description);

    try {
      const response = await axios.post('/api/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      if (response.status === 200) {
        toast.success('Video uploaded successfully');
        setVideos(prevVideos => [...prevVideos, response.data]);
        toggleUploadForm();
        setTitle('');
        setDescription('');
        setFile(null);
      } else {
        toast.error('Video upload failed');
      }
    } catch (error) {
      console.error('Upload error', error);
      toast.error('Error uploading video');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await axios.delete(`/api/video/${id}`);
      if (response.status === 200) {
        toast.success('Video deleted successfully');
        setVideos(videos.filter(video => video._id !== id));
      } else {
        toast.error('Failed to delete video');
      }
    } catch (error) {
      console.error('Delete error', error);
      toast.error('Error deleting video');
    }
  };

  const handleViewStatistics = (video: Video) => {
    toast(`Video views: ${video.views}`);
  };

  const handleLogout = async () => {
    try {
      const response = await axios.post('/api/auth/logout');
      if (response.status === 200) {
        toast.success('Logged out successfully');
        window.location.href = '/';
      } else {
        toast.error('Logout failed');
      }
    } catch (error) {
      console.error('Logout error', error);
      toast.error('Error logging out');
    }
  };

  const handleBioChange = (e: ChangeEvent<HTMLInputElement>) => setBio(e.target.value);

  const handleBioSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/user/bio', { bio });
      if (response.status === 200) {
        toast.success('Bio updated successfully');
        setUser(prevUser => prevUser ? { ...prevUser, bio } : null);
        toggleBioForm();
      } else {
        toast.error('Failed to update bio');
      }
    } catch (error) {
      console.error('Bio update error', error);
      toast.error('Error updating bio');
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('/api/user');
        if (response.status === 200) {
          setUser(response.data);
          setPlayCount(response.data.playCount);
        } else {
          toast.error('Failed to fetch user data');
        }
      } catch (error) {
        console.error('Fetch user data error', error);
        toast.error('Error fetching user data');
      }
    };

    const fetchVideos = async () => {
      try {
        const response = await axios.get('/api/videos');
        if (response.status === 200) {
          setVideos(response.data);
        } else {
          toast.error('Failed to fetch videos');
        }
      } catch (error) {
        console.error('Fetch videos error', error);
        toast.error('Error fetching videos');
      }
    };

    fetchUserData();
    fetchVideos();
  }, []);

  return (
    <div className="flex">
      <Sidebar toggleUploadForm={toggleUploadForm} logout={handleLogout} playcount={playCount} />
      <div className="flex-1 p-8 bg-gray-100">
        <h1 className="text-3xl font-semibold mb-8">Creator Profile</h1>
        {user && (
          <div className="bg-white shadow rounded-lg p-6 mb-8">
            <div className="flex items-center">
              <Image src={user.profileImage} alt="Profile Image" width={80} height={80} className="rounded-full mr-6" />
              <div>
                <h2 className="text-xl font-semibold">{user.username}</h2>
                <p className="text-gray-600">{user.bio}</p>
                <button onClick={toggleBioForm} className="mt-2 px-4 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded-lg">Edit Bio</button>
              </div>
            </div>
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">Balance: ${user.balance}</h3>
              <h3 className="text-lg font-semibold mb-2">Play Count: {playCount}</h3>
            </div>
          </div>
        )}
        <h2 className="text-2xl font-semibold mb-4">Videos</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map(video => (
            <VideoCard key={video._id} video={video} handleDelete={handleDelete} handleViewStatistics={handleViewStatistics} />
          ))}
        </div>
        {showUploadForm && (
          <UploadForm
            showUploadForm={showUploadForm}
            toggleUploadForm={toggleUploadForm}
            handleUpload={handleUpload}
            handleTitleChange={handleTitleChange}
            handleDescriptionChange={handleDescriptionChange}
            handleFileChange={handleFileChange}
            title={title}
            description={description}
          />
        )}
        {showBioForm && (
          <BioForm bio={bio} handleChange={handleBioChange} handleSubmit={handleBioSubmit} />
        )}
      </div>
    </div>
  );
};

export default CreatorProfilePage;
