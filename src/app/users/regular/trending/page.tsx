"use client";

import React, { useState, useEffect, useRef } from "react";
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
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [coinAmount, setCoinAmount] = useState<number>(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    fetchTrendingVideos();
  }, []);

  const fetchTrendingVideos = async () => {
    try {
      const res = await axios.get("/api/videos/trend");
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

  const handleGiftCoins = async (videoId: string, amount: number) => {
    try {
      await axios.post("/api/videos/giftcoins", { videoId, amount });
      toast.success("Coins gifted successfully!");
      fetchTrendingVideos();
    } catch (error) {
      console.error("Error gifting coins:", error);
      toast.error("Failed to gift coins");
    }
  };

  const handleMouseDown = (videoId: string) => {
    timerRef.current = setTimeout(() => {
      setSelectedVideo(videoId);
      setShowPopup(true);
    }, 1000); // 1 second delay for long press
  };

  const handleMouseUp = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const handlePopupSubmit = () => {
    if (selectedVideo) {
      handleGiftCoins(selectedVideo, coinAmount);
      setShowPopup(false);
      setCoinAmount(0);
    }
  };

  const handlePopupCancel = () => {
    setShowPopup(false);
    setCoinAmount(0);
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
                <div key={video._id} className="bg-black p-4 shadow rounded-lg relative border border-white">
                  <video
                    controls
                    src={video.url}
                    className="w-full h-48 object-cover mb-2"
                  />
                  <h3 className="text-lg font-semibold text-white">{video.title}</h3>
                  <p className="text-gray-400">{video.description}</p>
                  <p className="text-gray-400 flex items-center"><FiEye className="mr-1" />{video.playCount}</p>
                  <button
                    onMouseDown={() => handleMouseDown(video._id)}
                    onMouseUp={handleMouseUp}
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
        {showPopup && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75">
            <div className="bg-black p-4 rounded-lg border border-white">
              <h2 className="text-lg font-semibold mb-2 text-white">Gift Coins</h2>
              <input
                type="number"
                value={coinAmount}
                onChange={(e) => setCoinAmount(Number(e.target.value))}
                className="border border-gray-300 rounded-lg p-2 mb-4 w-full text-black"
                placeholder="Enter amount"
              />
              <div className="flex justify-end">
                <button
                  onClick={handlePopupSubmit}
                  className="bg-white text-black p-2 rounded-lg mr-2"
                >
                  Submit
                </button>
                <button
                  onClick={handlePopupCancel}
                  className="bg-red-500 text-white p-2 rounded-lg"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default TrendingVideos;
