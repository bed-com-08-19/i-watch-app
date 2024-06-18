// src/app/users/creator/profile/page.tsx

"use client";

import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import Sidebar from '../_components/Sidebar';
import Image from 'next/image';
import { FaUserEdit, FaShareAlt, FaPlusCircle } from 'react-icons/fa';
import { RiCoinLine } from 'react-icons/ri';
import VideoCard from '@/components/VideoCard';

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

const Dashboard: React.FC = () => {
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [videos, setVideos] = useState<Video[]>([]);
  const [showUploadForm, setShowUploadForm] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [videoFile, setVideoFile] = useState<File | null>(null);
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
      console.error(error.message);
      toast.error('Failed to fetch user details');
    }
  };

  const logout = async () => {
    try {
      await axios.get('/api/users/logout');
      toast.success('Logout successful');
      window.location.href = '/auth/signin';
    } catch (error) {
      console.error(error.message);
      toast.error(error.message);
    }
  };

  const toggleUploadForm = () => setShowUploadForm(!showUploadForm);
  const toggleBioForm = () => setShowBioForm(!showBioForm);

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => setTitle(event.target.value);
  const handleDescriptionChange = (event: ChangeEvent<HTMLInputElement>) => setDescription(event.target.value);
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setVideoFile(event.target.files[0]);
    }
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

    try {
      await axios.post('/api/videos/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      toast.success('Video uploaded successfully');
      toggleUploadForm();
      fetchVideos();
    } catch (error) {
      console.error(error.message);
      toast.error('Failed to upload video');
    }
  };

  const fetchVideos = async () => {
    try {
      const response = await axios.get('/api/videos/user');
      setVideos(response.data.data);
    } catch (error) {
      console.error(error.message);
      toast.error('Failed to fetch videos');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`/api/videos/${id}`);
      toast.success('Video deleted successfully');
      fetchVideos();
    } catch (error) {
      console.error(error.message);
      toast.error('Failed to delete video');
    }
  };

  const handleViewStatistics = (video: Video) => setSelectedVideo(video);

  if (!userDetails) {
    return <div className="text-red-500 text-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen flex bg-black">
      <Sidebar toggleUploadForm={toggleUploadForm} logout={logout} playcount={userDetails.playCount} />
      <div className="flex-grow p-6 ml-64 bg-black">
        <div className="max-w-md mx-auto text-center">
          <div className="flex items-center justify-center py-4">
            <h1 className="text-xl font-semibold">{userDetails.username}</h1>
            <div className="p-4 flex items-center justify-center">
              <div className="relative h-16 w-16 rounded-full overflow-hidden">
                <Image src={userDetails.profileImage || "/noavatar.png"} alt="Profile Picture" layout="fill" objectFit="cover" objectPosition="center" />
              </div>
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
            <button className="flex items-center bg-red-600 px-4 py-2 rounded text-white hover:bg-red-700">
              <FaUserEdit className="mr-2" />
              Edit profile
            </button>
            <button className="flex items-center bg-gray-600 px-4 py-2 rounded text-white hover:bg-gray-700">
              <FaShareAlt className="mr-2" />
              Share profile
            </button>
            <button className="flex items-center bg-gray-600 px-4 py-2 rounded text-white hover:bg-gray-700" onClick={toggleBioForm}>
              <FaPlusCircle className="mr-2" />
              Add bio
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
          <div className="max-w-md mx-auto mt-6">
            <h2 className="text-xl font-semibold text-white">Video Statistics</h2>
            <div className="relative bg-gray-800 rounded-lg overflow-hidden shadow-md">
              <video className="object-cover w-full h-64" src={selectedVideo.url} controls />
              <div className="px-4 py-2">
                <h3 className="text-lg font-semibold text-white">{selectedVideo.title}</h3>
                <p className="text-white">{selectedVideo.description}</p>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-sm text-gray-400">Views: {selectedVideo.views}</span>
                  <span className="text-sm text-gray-400">Play Count: {selectedVideo.playCount}</span>
                </div>
              </div>
            </div>
          </div>
        )}
        {showUploadForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <form onSubmit={handleUpload} className="bg-gray-800 p-6 rounded shadow-md">
              <h2 className="text-xl font-semibold text-white mb-4">Upload Video</h2>
              <input type="text" value={title} onChange={handleTitleChange} placeholder="Title" className="w-full px-3 py-2 mb-4 border rounded" />
              <textarea value={description} onChange={handleDescriptionChange} placeholder="Description" className="w-full px-3 py-2 mb-4 border rounded" />
              <input type="file" onChange={handleFileChange} className="w-full px-3 py-2 mb-4 border rounded" />
              <div className="flex justify-end">
                <button type="button" onClick={toggleUploadForm} className="px-4 py-2 mr-2 bg-gray-600 text-white rounded hover:bg-gray-700">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">Upload</button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
