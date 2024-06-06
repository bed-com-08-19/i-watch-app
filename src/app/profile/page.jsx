"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { FaRegEye, FaDollarSign } from "react-icons/fa";
import { SlLike } from "react-icons/sl";
import { FiHome } from "react-icons/fi";
import { FiUpload } from "react-icons/fi";
import { BiMoneyWithdraw } from "react-icons/bi";
import { CiSettings } from "react-icons/ci";
import axios from "axios";
import toast from "react-hot-toast"; // Assuming you're using react-hot-toast for notifications
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { collection, query, where, getDocs, deleteDoc, addDoc } from "firebase/firestore";
//import { storage, db } from "./firebaseConfig"; // Ensure your Firebase config is imported

const Profile = () => {
  const [username, setUsername] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [videoFile, setVideoFile] = useState(null);
  const [description, setDescription] = useState("");
  const [user, setUser] = useState({});
  const [videos, setVideos] = useState([]);
  const [profileImage, setProfileImage] = useState(null);
  const [isImageViewerOpen, setIsImageViewerOpen] = useState(false);
  const [profileImageUrl, setProfileImageUrl] = useState("");

  useEffect(() => {
    getUserDetails();
    getUserBalance();
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
      setUser(res.data.data);
    } catch (error) {
      console.error(error.message);
      toast.error("Failed to fetch user details");
    }
  };

  const getUserBalance = async () => {
    try {
      const res = await axios.get("/api/balance/getBalance", {
        params: { userId: user._id },
      });
      setUser((prevUser) => ({ ...prevUser, balance: res.data.data.balance }));
    } catch (error) {
      console.error(error.message);
      toast.error("Failed to fetch user balance");
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
      await axios.post("/api/videos/uploadvideos", formData, {
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

  const toggleDropdownImage = () => setDropdownOpen(!dropdownOpen);

  const toggleUploadFormImage = () => {
    setShowUploadForm(!showUploadForm);
    if (isImageViewerOpen) setIsImageViewerOpen(false);
  };

  const toggleImageViewer = () => setIsImageViewerOpen(!isImageViewerOpen);

  const handleFileChangeImage = (event) => {
    setProfileImage(event.target.files[0]);
  };

  const handleSubmitImage = async (event) => {
    event.preventDefault();

    if (!profileImage) {
      toast.error("Please select an image file");
      return;
    }

    const storageRef = ref(storage, `profileImages/${profileImage.name}`);
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

  const handleFileDelete = async () => {
    if (!profileImageUrl) {
      toast.error("No profile image to delete");
      return;
    }

    // Find the document in Firestore
    const q = query(collection(db, "profileImages"), where("username", "==", username));
    const querySnapshot = await getDocs(q);
    const docId = querySnapshot.docs[0]?.id;

    if (docId) {
      // Delete the image from Firebase Storage
      const storageRef = ref(storage, profileImageUrl);
      try {
        await deleteObject(storageRef);

        // Delete the document from Firestore
        await deleteDoc(doc(db, "profileImages", docId));

        setProfileImageUrl("");
        toast.success("Image deleted successfully");
      } catch (error) {
        console.error(error.message);
        toast.error("Failed to delete image");
      }
    } else {
      toast.error("No profile image found to delete");
    }
  };

  return (
    <main className="flex items-center justify-between pt-4 pr-4">
      {/* Side bar navigation */}
      <section className="sticky flex-1 flex flex-col -mt-80 top-1/2 transform -translate-y-1/2">
      <div className="p-2 flex items-top gap-2 rounded-lg hover:bg-gray-700 active:bg-gray-700">
         <a href="/users/creator"><FiHome /></a> 
        </div>
        <div className="p-2 flex items-center gap-2 rounded-lg hover:bg-gray-700 active:bg-gray-700">
          <FiUpload />
        </div>
        <div className="p-2 flex items-center gap-2 rounded-lg hover:bg-gray-700 active:bg-gray-700">
          <a href="/users/creator/transaction"><BiMoneyWithdraw /></a>
        </div>
        <div className="p-2 flex items-center gap-2 rounded-lg hover:bg-gray-700 active:bg-gray-700">
          <CiSettings />
        </div>
      </section>

      <section className="w-full">
        <section className="w-full sticky top-0 z-10 section1">
          {/* Profile Header */}
          <div className="flex items-center justify-center w-full p-4">
            <div className="flex items-center">
              <div className="relative h-16 w-16 sm:h-20 sm:w-20 rounded-full overflow-hidden">
                <button onClick={toggleDropdownImage} className="mt-4 focus:outline-none">
                  <Image
                    src={profileImageUrl || "/noavatar.png"}
                    alt="Profile Picture"
                    layout="fill"
                    objectFit="cover"
                    objectPosition="center"
                  />
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-black rounded-md shadow-lg z-20">
                    <a className="block px-4 py-2 text-sm text-white hover:bg-gray-800" onClick={toggleImageViewer}>
                      View image
                    </a>
                    <a className="block px-4 py-2 text-sm text-white hover:bg-gray-800" onClick={toggleUploadFormImage}>
                      Change image
                    </a>
                    <a className="block px-4 py-2 text-sm text-white bg-red-500 hover:bg-red-800" onClick={handleFileDelete}>
                      Delete image
                    </a>
                  </div>
                )}
              </div>
              <div className="ml-4 text-white">
                <h1 className="text-xl font-semibold">{username}</h1>
                <p className="text-sm text-gray-500">{user.bio}</p>
              </div>
            </div>
          </div>

          {/* Money and Views */}
          <div className="flex w-full items-center justify-center font-bold p-2 text-center text-white">
            <div className="m-4 flex flex-col">
              <p>MK{user.balance}</p>
              <a href="/users/creator/transaction" className="text-sm text-gray-500 font-thin">Balance</a>
            </div>
            <div className="m-4 flex flex-col">
              <p>{user.views}</p>
              <p className="text-sm text-gray-500 font-thin">Views</p>
            </div>
            <div className="m-4 flex flex-col">
              <p>{user.likes}</p>
              <p className="text-sm text-gray-500 font-thin">Likes</p>
            </div>
          </div>

          {/* Divider */}
          <hr className="w-full border-t-0.5 border-gray-300 my-2" />
        </section>

        {/* User Videos */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full p-4">
          {videos.map((video) => (
            <div key={video.id} className="relative h-48 sm:h-64">
              <video className="object-cover w-full h-full" src={video.src} controls autoPlay />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Profile;
