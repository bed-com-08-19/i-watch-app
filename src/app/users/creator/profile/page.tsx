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
import image from 'next/image';

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
          <button type="submit" className="px-4 py-2 text-white bg-green-500 hover:bg-green-600 rounded-lg">Save</button>
        </div>
      </form>
    </div>
  </div>
);

const Dashboard: React.FC = () => {
  const [user, setUser] = useState<User>({ followers: 48, following: 467, likes: 0, profileImage: "/path-to-your-image.jpg" });
  const [username, setUsername] = useState<string>("");
  const [balance, setBalance] = useState<string>("");
  const [profileImage, setProfileImage] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  const [playcount, setPlaycount] = useState<number>(0); 
  const [showUploadForm, setShowUploadForm] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videos, setVideos] = useState<Video[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [showBioForm, setShowBioForm] = useState<boolean>(false);

  useEffect(() => {
    getUserDetails();
    fetchVideos();
  }, []);

  const getUserDetails = async () => {
    try {
      const res = await axios.get("/api/users/me");
      const userDetails: UserDetails = res.data.data;
      setUsername(userDetails.username);
      setBalance(userDetails.balance);
      setProfileImage(userDetails.profileImage); 
      setPlaycount(userDetails.playCount);
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
      toast.error("Please select a video file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("video", videoFile);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("creator", username);

    try {
      await axios.post("/api/videos/upload", formData, { headers: { "Content-Type": "multipart/form-data" } });
      toast.success("Video uploaded successfully");
      toggleUploadForm();
      fetchVideos();
    } catch (error: any) {
      console.error(error.message);
      toast.error("Failed to upload video");
    }
  };

  const fetchVideos = async () => {
    try {
      const response = await axios.get("/api/videos/user");
      setVideos(response.data.data);
      setLoading(false);
    } catch (error: any) {
      setError(error.message);
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`/api/videos/${id}`);
      toast.success('Video deleted successfully!');
      fetchVideos();
    } catch (error: any) {
      console.error(error.message);
      toast.error('Failed to delete video');
    }
  };

  const handleViewStatistics = (video: Video) => setSelectedVideo(video);

  const handleBioChange = (event: ChangeEvent<HTMLInputElement>) => setBio(event.target.value);

  const handleBioSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      await axios.put('/api/users/updatebio', { userId: 'logged-in-user-id', bio });
      toast.success("Bio updated successfully");
      toggleBioForm();
    } catch (error: any) {
      console.error(error.message);
      toast.error("Failed to update bio");
    }
  };

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  return (
    <div className="min-h-screen flex bg-black">
      <Sidebar toggleUploadForm={toggleUploadForm} logout={logout} playcount={playcount} />
      <div className="flex-grow p-6 ml-64 bg-black">
        <div className="max-w-md mx-auto text-center">
          <div className="flex items-center justify-center py-4">
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
              <RiCoinLine className="mr-1" />
              <span className="block text-lg font-bold text-red-600">{balance} icoins</span>
              <span className="block text-white">Balance</span>
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
            <button className="flex items-center bg-gray-600 px-4 py-2 rounded text-white hover:bg-gray-700">
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
              <div className="px-4 py-2 bg-black bg-opacity-75 text-white">
                <p className="text-lg font-semibold">{selectedVideo.title}</p>
                <p className="mt-2">Description: {selectedVideo.description}</p>
                <p className="mt-2">Views: {selectedVideo.playCount}</p>
              </div>
            </div>
          </div>
        )}
      </div>
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
      {showBioForm && (
        <BioForm bio={bio} handleChange={handleBioChange} handleSubmit={handleBioSubmit} />
      )}
    </div>
  );
};

export default Dashboard;
