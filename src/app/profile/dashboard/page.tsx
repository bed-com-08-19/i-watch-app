// pages/index.js
"use client"
import Head from 'next/head';
import Image from 'next/image';
import React, { useState, useEffect } from "react";
import axios from "axios"; // Import axios for making HTTP requests
import { toast } from "react-hot-toast";
import Link from "next/link";

export default function Home() {

  const [username, setUsername] = useState("null"); // State to store the username

  useEffect(() => {
    getUserDetails(); // Fetch user details when the component mounts
  }, []);

  const logout = async () => {
   
      await axios.get("/api/users/logout");
      toast.success("Logout successful");
    
  };

  const getUserDetails = async () => {
    
      const res = await axios.get("/api/users/me");
      setUsername(res.data.data.username); // Update the state with the username
    
  };
  return (
    <div className="bg-gray-50 min-h-screen">
      <Head>
        <title>Iwatch Profile</title>
        <meta name="description" content="TikTok Profile Page" />
      </Head>

      <main className="p-4">
        <div className="max-w-md mx-auto bg-black rounded-lg overflow-hidden shadow-lg my-2">
          <div className="bg-cover bg-center h-56 p-4 flex items-end justify-between">
            {/* Background image */}
            <Image src="/profile-bg.jpg" alt="Profile background" layout="fill" objectFit="cover" />
          </div>
          <div className="p-4">
            <div className="flex justify-center">
              {/* Profile image */}
              <Image src="/profile-pic.jpg" alt="Profile" width={70} height={70} className="rounded-full" />
            </div>
            <div className="text-center mt-2">
              <p className="text-lg font-semibold">{username}</p>
              <p className="text-sm text-gray-600">Bio goes here...</p>
            </div>
            <div className="flex justify-around mt-4">
              <div className="text-center">
                <p className="text-lg font-semibold">150</p>
                <p className="text-sm text-gray-600">Following</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-semibold">2.5M</p>
                <p className="text-sm text-gray-600">Followers</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-semibold">10.8M</p>
                <p className="text-sm text-gray-600">Likes</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
