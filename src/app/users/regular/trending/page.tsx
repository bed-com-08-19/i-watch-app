"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../_components/Header";
import Footer from "../../../../components/Footer";

const TrendingVideos = () => {
  const [videos, setVideos] = useState<any[]>([]);

  useEffect(() => {
    fetchTrendingVideos();
  }, []);

  const fetchTrendingVideos = async () => {
    try {
      const res = await axios.get("/api/videos/trend");
      console.log("API response:", res.data); // Log the response to check its structure
      if (Array.isArray(res.data.data)) {
        setVideos(res.data.data); // Ensure you access the correct part of the response
      } else {
        console.error("Unexpected response format", res.data);
      }
    } catch (error) {
      console.error("Failed to fetch trending videos", error);
    }
  };

  return (
    <div>
      <Header />
      <main className="p-4">
        <h2 className="text-2xl font-bold text-red-800 mb-4">Trending Videos</h2>
        {videos.length === 0 ? (
          <div className="text-center text-white">
            <p>No trending videos available</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:flex overflow-x-auto space-x-4">
            {videos.map((video) => (
              <div key={video._id} className="relative h-48 sm:h-64">
                <video className="object-cover w-full h-full" src={video.url} controls />
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default TrendingVideos;
