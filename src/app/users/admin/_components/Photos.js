"use client";
import React, { useState, useEffect } from "react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
//import { storage, db } from "../firebaseConfig"; // Adjust the path
import { toast } from "react-hot-toast";
import axios from "axios";

const Page = () => {
  const [username, setUsername] = useState("null");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [isImageViewerOpen, setIsImageViewerOpen] = useState(false);
  const [profileImageUrl, setProfileImageUrl] = useState(""); // Store profile image URL

  useEffect(() => {
    getUserDetails();
    fetchProfileImage();
  }, []);

  const getUserDetails = async () => {
    try {
      const res = await axios.get("/api/users/me");
      setUsername(res.data.data.username);
    } catch (error) {
      console.error(error.message);
      toast.error("Failed to fetch user details");
    }
  };

  const fetchProfileImage = async () => {
    try {
      const q = query(collection(db, "profileImages"), where("username", "==", username));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setProfileImageUrl(doc.data().imageUrl);
      });
    } catch (error) {
      console.error(error.message);
      toast.error("Failed to fetch profile image");
    }
  };

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const toggleUploadForm = () => {
    setShowUploadForm(!showUploadForm);
    if (isImageViewerOpen) setIsImageViewerOpen(false);
  };
  const toggleImageViewer = () => setIsImageViewerOpen(!isImageViewerOpen);

  const handleFileChange = (event) => {
    setProfileImage(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!profileImage) {
      toast.error("Please select an image file");
      return;
    }

    const storageRef = ref(storage, `profileImages/${profileImage}`);
    try {
      await uploadBytes(storageRef, profileImage);
      const downloadURL = await getDownloadURL(storageRef);

      await addDoc(collection(db, "profileImages"), {
        username: username,
        imageUrl: downloadURL,
      });

      toast.success("Image uploaded successfully");
      setProfileImageUrl(downloadURL);
      toggleUploadForm();
    } catch (error) {
      console.error(error.message);
      toast.error("Failed to upload image");
    }
  };

  const logout = () => {
    toast.success("Logged out successfully");
  };

  return (
    <div className="relative">
      <button onClick={toggleDropdown} className="mt-4 focus:outline-none">
        <img
          src={profileImageUrl || "/default-profile.png"}
          alt={username}
          className="w-10 h-10 rounded-full cursor-pointer"
        />
      </button>
      {dropdownOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-black rounded-md shadow-lg z-20">
          <a className="block px-4 py-2 text-sm text-white hover:bg-gray-800" onClick={toggleImageViewer}>
            View Image
          </a>
          <a className="block px-4 py-2 text-sm text-white hover:bg-gray-800" onClick={toggleUploadForm}>
            Change Image
          </a>
          <a className="block px-4 py-2 text-sm text-white bg-red-500 hover:bg-red-800" onClick={logout}>
            Delete Image
          </a>
        </div>
      )}
      {showUploadForm && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md mx-auto">
            <h2 className="text-2xl font-semibold mb-6 text-center">Upload Profile Image</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                  Select Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  className="mr-2 px-4 py-2 text-white bg-red-500 hover:bg-red-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  onClick={toggleUploadForm}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-white bg-green-500 hover:bg-green-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  Upload
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {isImageViewerOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-30 transition-opacity duration-300">
          <div className="bg-white p-6 rounded-lg shadow-xl transform transition-transform duration-300 scale-95">
            <img
              src={profileImageUrl || "/default-profile.png"}
              alt={username}
              className="w-full h-auto rounded"
            />
            <div className="flex justify-end mt-4">
              <button className="mr-2 px-4 py-2 text-white bg-green-500 hover:bg-blue-600 rounded" onClick={toggleUploadForm}>
                Change Image
              </button>
              <button onClick={toggleImageViewer} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
