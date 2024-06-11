"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import Header from '../_components/Header';
import Footer from '../../../../components/Footer';

export default function UserProfile({ params }: any) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const res = await axios.get("/api/videos");
      const videos = res.data.data;

      // if (videos.length === 0) {
      //   setCategories([]);
      // } else {
      //   const newCategories = [
      //     { name: "Newly Added", videos: videos.slice(0, 8) },
      //     { name: "Mostly Liked", videos: videos.slice(8, 16) },
      //   ];
      //   setCategories(newCategories);
      // }
    } catch (error) {
      
      toast.error("Failed to fetch videos");
    }
  };

  return (
    <div>
      <Header />
      <main className="p-4">
        {categories.length === 0 ? (
          <div className="text-center text-white">
            <p>No videos available</p>
          </div>
        ) : (
          categories.map((category) => (
            <div key={category.name} className="mb-8">
              <h2 className="text-2xl font-bold text-red-800 mb-4">{category.name}</h2>
              <div className="grid grid-cols-2 sm:flex overflow-x-auto space-x-4">
                {category.videos.map((video) => (
                  <div key={video._id} className="relative h-48 sm:h-64">
                    <video
                      className="object-cover w-full h-full"
                      src={video.url}
                      controls
                    />
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </main>
      <Footer />
    </div>
  );
}
