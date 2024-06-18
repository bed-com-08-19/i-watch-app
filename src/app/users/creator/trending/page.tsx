"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import Header from "../_components/Header";
import Footer from "../../../../components/Footer";
import { FiEye } from "react-icons/fi";
import { FaCoins } from "react-icons/fa";

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
      console.log("API response:", res.data);
      if (Array.isArray(res.data.data)) {
        setVideos(res.data.data);
      } else {
        console.error("Unexpected response format", res.data);
      }
    } catch (error) {
      console.error("Failed to fetch trending videos", error);
      setError("Failed to fetch trending videos");
    }
  };

  const handleGiftCoins = async (videoId: string) => {
    try {
      await axios.post("/api/videos/giftcoins", { videoId, userId: data._id });
      toast.success("Coins gifted successfully!");
      fetchTrendingVideos();
    } catch (error) {
      console.error("Error gifting coins:", error);
      toast.error("Failed to gift coins");
    }
  };

  if (error) return <div className="text-center mt-8 text-white">Error: {error}</div>;

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <Header setSearchTerm={undefined} />
      <main className="flex-grow pt-16">
        <div className="container mx-auto p-4">
          <h2 className="text-2xl font-bold text-red-800 mb-4">Trending Videos</h2>
          {videos.length === 0 ? (
            <div className="text-center text-gray-600">No trending videos available</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {videos.map((video) => (
                <div key={video._id} className="bg-white p-4 shadow rounded-lg relative">
                  <video
                    controls
                    src={video.url}
                    className="w-full h-48 object-cover mb-2"
                  />
                  <h3 className="text-lg font-semibold text-black">{video.title}</h3>
                  <p className="text-gray-600">{video.description}</p>
                  <p className="text-gray-600 flex items-center"><FiEye className="mr-1" />{video.playCount}</p>
                  <button
                    onClick={() => handleGiftCoins(video._id)}
                    className="absolute bottom-2 right-2 bg-red-600 text-white p-2 rounded-full hover:bg-red-700 flex items-center justify-center"
                    style={{ width: '30px', height: '30px' }}
                  >
                    <FaCoins />
                  </button>
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
