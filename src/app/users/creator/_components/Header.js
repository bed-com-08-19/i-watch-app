import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import Image from "next/image"; // Corrected import

const Header = () => {
  const [username, setUsername] = useState("null");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [videoFile, setVideoFile] = useState(null);
  const [description, setDescription] = useState("");

  useEffect(() => {
    getUserDetails();
  }, []);

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout successful");
    } catch (error) {
      console.error(error.message);
      toast.error("Failed to logout");
    }
  };

  const getUserDetails = async () => {
    try {
      const res = await axios.get("/api/users/me");
      setUsername(res.data.data.username);
    } catch (error) {
      console.error(error.message);
      toast.error("Failed to fetch user details");
    }
  };

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const toggleUploadForm = () => setShowUploadForm(!showUploadForm);

  const handleFileChange = (event) => {
    setVideoFile(event.target.files[0]);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!videoFile) {
      toast.error("Please select a video file");
      return;
    }

    const formData = new FormData();
    formData.append("title", videoFile.name);
    formData.append("description", description);
    formData.append("creator", username);
    formData.append("video", videoFile);

    try {
      await axios.post("/api/videos/uploadvideos/videos", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Video uploaded successfully");
      toggleUploadForm();
    } catch (error) {
      console.error(error.message);
      toast.error("Failed to upload video");
    }
  };

  return (
    <header className="bg-black py-2 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* iwatch logo */}
        <p className="font-sans font-bold text-3xl text-white hidden md:block">
          <span>i</span>
          <span className="text-red-800">WATCH</span>
        </p>

        {/* Navigation links */}
        <nav className="md:flex space-x-4 text-sm md:text-lg">
          <a href="/users/creator" className="text-white hover:text-gray-300 hover:border-red-500 border-b-2 transition duration-300">HOME</a>
          <a href="/users/creator/trending" className="text-white hover:text-gray-300 hover:border-red-500 border-b-2 transition duration-300">TRENDING</a>
          <a href="/users/creator/recommended" className="text-white hover:text-gray-300 hover:border-red-500 border-b-2 transition duration-300">RECOMMENDED</a>
        </nav>

        {/* User profile dropdown */}
        <div className="relative">
          <button onClick={toggleDropdown} className="mt-4 focus:outline-none">
            <Image
              src="/path/to/profile-image.jpg" // Adjust the path to the actual profile image path
              alt={username}
              width={40}
              height={40}
              className="w-10 h-10 rounded-full cursor-pointer"
            />
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-black rounded-md shadow-lg z-20">
              <a  className="block px-4 py-2 text-sm text-white hover:bg-gray-800" onClick={toggleUploadForm}>Upload</a>
              
                <a href="/users/creator/profile" className="block px-4 py-2 text-sm text-white hover:bg-gray-800">Profile</a>
              
              <a href="/auth/signin" className="block px-4 py-2 text-sm text-white bg-red-500 hover:bg-red-800" onClick={logout}>Logout</a>
            </div>
          )}
        </div>

        {/* Upload Form */}
        {showUploadForm && (
          <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg">
              <h2 className="text-lg font-semibold mb-4">Upload Video</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="video" className="block text-sm font-medium text-gray-700">
                    Upload Video File
                  </label>
                  <input
                    type="file"
                    id="video"
                    name="video"
                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md text-black"
                    onChange={handleFileChange}
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    Video Description
                  </label>
                  <input
                    type="text"
                    id="description"
                    name="description"
                    placeholder="Give a video description e.g. title"
                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md text-black"
                    value={description}
                    onChange={handleDescriptionChange}
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
      </div>
    </header>
  );
};

export default Header;
