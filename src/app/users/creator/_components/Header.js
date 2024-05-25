import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { getStorage, ref, uploadBytes } from 'firebase/storage';
import { storage } from "./../../../../firebase";

const Header = () => {
  const [username, setUsername] = useState("null");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [videoFile, setVideoFile] = useState(null);
  const [description, setDescription] = useState("");

  // Function to handle file change
  const handleFileChange = (event) => {
    setVideoFile(event.target.files[0]);
  };

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout successful");
    } catch (error) {
      console.error(error.message);
      toast.error("Failed to logout");
    }
  };

  // Function to handle description change
  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!videoFile) {
      toast.error("Please select a video file");
      return;
    }

    try {
      // Create a storage reference with a unique filename
      const storageRef = ref(storage, `videos/${videoFile.name}`);

      // Upload the file to Firebase Storage
      const snapshot = await uploadBytes(storageRef, videoFile);

      // Get the download URL of the uploaded file
      const downloadUrl = await snapshot.ref.getDownloadURL();

      // Perform any further actions with the download URL as needed
      // For example, display the video or store the URL in a database

      // Reset form fields and state
      setVideoFile(null);
      setDescription("");
      setShowUploadForm(false);

      toast.success("Video uploaded successfully");
    } catch (error) {
      console.error(error.message);
      toast.error("Failed to upload video");
    }
  };

  // Function to toggle upload form visibility
  const toggleUploadForm = () => setShowUploadForm(!showUploadForm);

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
          <a href="./creator" className="text-white hover:text-gray-300 transition duration-300">HOME</a>
          <a href="./creator/trending" className="text-white hover:text-gray-300 transition duration-300">TRENDING</a>
          <a href="./creator/recommended" className="text-white hover:text-gray-300 transition duration-300">RECOMMENDED</a>
        </nav>

        {/* User profile dropdown */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="mt-4 focus:outline-none"
          >
            <img
              src=""
              alt={username}
              className="w-10 h-10 rounded-full cursor-pointer"
            />
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-black rounded-md shadow-lg z-20">
              <a href="#" className="block px-4 py-2 text-sm text-white hover:bg-gray-800" onClick={toggleUploadForm}>Upload</a>
              <a href="./creator/dashboard" className="block px-4 py-2 text-sm text-white hover:bg-gray-800" >Profile</a>
              <a href="../auth/signin" className="block px-4 py-2 text-sm text-white bg-red-500 hover:bg-red-800" onClick={logout}>Logout</a>
            </div>
          )}
        </div>
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
                <input type="file" id="video" name="video" className="mt-1 p-2 block w-full border border-gray-300 rounded-md" onChange={handleFileChange} />
              </div>
              <div className="mb-4">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Video Description
                </label>
                <input type="text" id="description" name="description" placeholder="Enter video description" className="mt-1 p-2 block w-full border border-gray-300 rounded-md" value={description} onChange={handleDescriptionChange} />
              </div>
              <div className="flex justify-end">
                <button type="button" className="mr-2 px-4 py-2 text-white bg-gray-500 hover:bg-gray-600 rounded-lg" onClick={toggleUploadForm}>Cancel</button>
                <button type="submit" className="px-4 py-2 text-white bg-red-500 hover:bg-red-600 rounded-lg">Upload</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
