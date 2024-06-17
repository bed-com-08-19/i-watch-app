"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../_components/Header";
import Footer from "../../../../components/Footer";
import { FiEye } from "react-icons/fi";

interface Video {
  createdAt: string | number | Date;
  _id: string;
  title: string;
  description: string;
  url: string;
  playCount: number;
  awardedViewers: string[];
}

const TrendingVideos: React.FC = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [error, setError] = useState<string | null>(null);

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
      setError("Failed to fetch trending videos");
    }
  };

  if (error) return <div className="text-center mt-8 text-white">Error: {error}</div>;

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <Header />
      <main className="flex-grow pt-16">
        <div className="container mx-auto p-4">
          <h2 className="text-2xl font-bold text-red-800 mb-4">Trending Videos</h2>
          {videos.length === 0 ? (
            <div className="text-center text-gray-600">No trending videos available</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {videos.map((video) => (
                <div key={video._id} className="bg-white p-4 shadow rounded-lg">
                  <video
                    controls
                    src={video.url}
                    className="w-full h-48 object-cover mb-2"
                  />
                  <h3 className="text-lg font-semibold text-black">{video.title}</h3>
                  <p className="text-gray-600">{video.description}</p>
                  <p className="text-gray-600 flex items-center"><FiEye className="mr-1" />{video.playCount}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TrendingVideos;
