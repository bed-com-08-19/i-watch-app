"use client";
import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import Image from 'next/image';
import { FaUserEdit, FaShareAlt, FaPlusCircle } from 'react-icons/fa';
import { RiCoinLine } from 'react-icons/ri';
import VideoCard from '@/components/VideoCard';
import Select, { ValueType } from 'react-select';

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
  _id: string;
  name: string;
}

const Dashboard: React.FC = () => {
  const [username, setUsername] = useState("null");
  const [icoins, setIcoinsAmount] = useState("null");
  const [bio, setBio] = useState("null");
  const [views, setViews] = useState("null");

  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [videos, setVideos] = useState<Video[]>([]);
  const [showUploadForm, setShowUploadForm] = useState<boolean>(false);
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [selectedCategories, setSelectedCategories] = useState<CategoryOption[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [showBioForm, setShowBioForm] = useState<boolean>(false);

  const [categories, setCategories] = useState<CategoryOption[]>([]);

  useEffect(() => {
    getUserDetails();
    fetchVideos();
    fetchCategories(); // Fetch categories when component mounts
  }, []);

  const getUserDetails = async () => {
    try {
      const res = await axios.get('/api/users/me');
      setUsername(res.data.data.username);
      setIcoinsAmount(res.data.data.icoins);
      setBio(res.data.data.bio);
      setViews(res.data.data.views);
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
  const togglePopup = () => setShowPopup(!showPopup);
  const toggleBioForm = () => setShowBioForm(!showBioForm);

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => setTitle(event.target.value);
  const handleDescriptionChange = (event: ChangeEvent<HTMLTextAreaElement>) => setDescription(event.target.value);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setVideoFile(event.target.files[0]);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await axios.get("/api/categories");
      setCategories(res.data.categories);
    } catch (error) {
      toast.error("Failed to fetch categories");
    }
  };

  const handleCategoryChange = (selectedOptions: ValueType<CategoryOption, true>) => {
    if (selectedOptions) {
      const selectedCategories = selectedOptions.map(option => option as CategoryOption);
      setSelectedCategories(selectedCategories);
    } else {
      setSelectedCategories([]);
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
    formData.append('categories', JSON.stringify(selectedCategories.map(category => category._id)));

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

  return (
    <div className="min-h-screen flex bg-black">
      <div className="flex-grow p-6 ml-4 bg-black">
        <div className="max-w-md mx-auto text-center">
          <div className="flex flex-col items-center justify-center py-4">
            <div className="p-4 items-center justify-center relative h-16 w-16 rounded-full overflow-hidden">
              <Image src={ "/noavatar.png"} alt="Profile Picture" layout="fill" objectFit="cover" objectPosition="center" />
            </div>
            <div className="p-4 items-center justify-center">
              <h1 className="text-xl font-semibold">{username}</h1>
            </div>
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
            <button className="flex items-center bg-red-600 px-4 py-2 rounded text-white hover:bg-red-700">
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
                <video className="object-cover w-full h-64" controls>
                  <source src={selectedVideo.url} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
              <p className="mt-2 text-white">
                <strong>Title : </strong> {selectedVideo.title}
              </p>
              <p className="text-white">
                <strong>Description : </strong> {selectedVideo.description}
              </p>
              <p className="text-white">
                <strong>Views : </strong> {selectedVideo.playCount}
              </p>
              <button
                className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                onClick={() => setSelectedVideo(null)}
              >
                Close
              </button>
            </div>
          </div>
        )}
        {showUploadForm && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-gray-800 p-6 rounded-lg w-full max-w-md">
              <h2 className="text-xl font-semibold text-white mb-4">Upload Video</h2>
              <form onSubmit={handleUpload}>
                <div className="mb-4">
                  <label className="block text-white mb-2">Title</label>
                  <input
                    type="text"
                    value={title}
                    onChange={handleTitleChange}
                    className="w-full px-3 py-2 border border-gray-400 rounded-lg bg-black text-white"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-white mb-2">Description</label>
                  <textarea
                    value={description}
                    onChange={handleDescriptionChange}
                    className="w-full px-3 py-2 border border-gray-400 rounded-lg bg-black text-white"
                  ></textarea>
                </div>
                <div className="mb-4">
                  <label className="block text-white mb-2">Category</label>
                  <Select
                    options={categories.map(category => ({ value: category._id, label: category.name }))}
                    value={selectedCategories}
                    onChange={handleCategoryChange}
                    isMulti
                    className="text-black"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-white mb-2">Video File</label>
                  <input
                    type="file"
                    accept="video/*"
                    onChange={handleFileChange}
                    className="w-full px-3 py-2 border border-gray-400 rounded-lg bg-black text-white"
                  />
                </div>
                <div className="flex justify-between">
                  <button
                    type="submit"
                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                  >
                    Upload
                  </button>
                  <button
                    type="button"
                    className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
                    onClick={toggleUploadForm}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
        {showBioForm && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-gray-800 p-6 rounded-lg w-full max-w-md">
              <h2 className="text-xl font-semibold text-white mb-4">Edit Bio</h2>
              <textarea
                value={userDetails.bio}
                onChange={(e) => setUserDetails({ ...userDetails, bio: e.target.value })}
                className="w-full px-3 py-2 border border-gray-400 rounded-lg bg-black text-white mb-4"
              ></textarea>
              <div className="flex justify-between">
                <button
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                  onClick={async () => {
                    try {
                      await axios.put('/api/users/update-bio', { bio: userDetails.bio });
                      toast.success('Bio updated successfully');
                      toggleBioForm();
                    } catch (error) {
                      toast.error('Failed to update bio');
                    }
                  }}
                >
                  Save
                </button>
                <button
                  className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
                  onClick={toggleBioForm}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {showPopup && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-gray-800 p-6 rounded-lg w-full max-w-md">
              <h2 className="text-xl font-semibold text-white mb-4">Choose an Option</h2>
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

      </div>
    </div>
  );
};

export default Dashboard;
