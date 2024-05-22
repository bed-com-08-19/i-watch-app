"use client"
import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { toast } from "react-hot-toast";
import Header from './_components/Header';
import Footer from '../../../components/Footer';


export default function useProfile({ params }: any) {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get("/api/videos/getallvideos/videos");
        setVideos(response.data.data);
      } catch (error) {
        toast.error("Failed to fetch videos");
        console.error("Failed to fetch videos:", error);
      }
    };

    fetchVideos();
  }, []);

  const categories = [
    { name: "Newly Added", videos: videos.slice(0, 8) },
    { name: "Mostly Liked", videos: videos.slice(8, 16) },
    // Add more categories as needed
  ];

  return (
    <div>
      <Header />
      <main className="p-4">
        {categories.map((category) => (
          <div className="mb-8">
          
            <div className="grid grid-cols-2 sm:flex overflow-x-auto space-x-4">
              {category.videos.map((video) => (
                <div key={video._id} className="relative h-48 sm:h-64">
                  <video
                    className="object-cover w-full h-full"
                    src={video.src}
                    controls
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </main>
      <Footer />
    </div>
  );
}