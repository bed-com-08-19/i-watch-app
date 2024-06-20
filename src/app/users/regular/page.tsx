// src/app/users/regularUser/page.tsx

"use client";
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Header from "./_components/Header";
import Footer from "../../../components/Footer";
import { FiEye } from "react-icons/fi";
import { FaCoins } from "react-icons/fa";
import ScrollToTopButton from "./_components/scrollToTop";

interface Video {
  createdAt: string | number | Date;
  _id: string;
  title: string;
  description: string;
  url: string;
  playCount: number;
  awardedViewers: string[];
}

interface UserData {
  _id: string;
  username: string;
  creditedVideos: string[];
}

const RegularUser: React.FC = () => {
  const router = useRouter();
  const [data, setData] = useState<UserData | null>(null);
  const [videos, setVideos] = useState<Video[]>([]);
  const [filteredVideos, setFilteredVideos] = useState<Video[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("");
  const [showWelcome, setShowWelcome] = useState<boolean>(true);
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [coinAmount, setCoinAmount] = useState<number>(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const getUserDetails = async () => {
    try {
      const res = await axios.get("/api/users/me");
      setData(res.data.data);
    } catch (error) {
      toast.error("Failed to fetch user details");
      setError("Failed to fetch user details");
    }
  };

  const fetchVideos = async () => {
    try {
      const response = await axios.get("/api/videos");
      setVideos(response.data.data);
      setFilteredVideos(response.data.data);
    } catch (error) {
      toast.error("Failed to fetch videos");
      setError("Failed to fetch videos");
    }
  };

  const handleVideoPlaybackCompletion = async (videoId: string) => {
    if (!data) return;
    try {
      await axios.post("/api/videos/playcount", { videoId, userId: data._id });
      toast.success("Credits have been awarded!");
      fetchVideos();
    } catch (error) {
      console.error("Error updating balance:", error);
      toast.error("Failed to update balance");
    }
  };

  const handleVideoClick = async (videoId: string) => {
    if (!data) return;
    try {
      await axios.post("/api/videos/playcount", { videoId, userId: data._id });
      toast.success("Play count updated!");
      fetchVideos();
    } catch (error) {
      console.error("Error updating play count:", error);
      toast.error("Failed to update play count");
    }
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(event.target.value);
  };

  const handleGiftCoins = async (videoId: string, amount: number) => {
    if (!data) return;
    try {
      await axios.post("/api/videos/giftcoins", { videoId, userId: data._id, amount });
      toast.success("Coins gifted successfully!");
      fetchVideos();
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

  useEffect(() => {
    getUserDetails();
    fetchVideos();
    const timer = setTimeout(() => setShowWelcome(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const filterAndSortVideos = () => {
      let filtered = videos.filter((video) =>
        video.title.toLowerCase().includes(searchTerm.toLowerCase())
      );

      switch (sortBy) {
        case "title-asc":
          filtered.sort((a, b) => a.title.localeCompare(b.title));
          break;
        case "title-desc":
          filtered.sort((a, b) => b.title.localeCompare(a.title));
          break;
        case "date-asc":
          filtered.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
          break;
        case "date-desc":
          filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
          break;
        default:
          break;
      }

      setFilteredVideos(filtered);
    };

    filterAndSortVideos();
  }, [searchTerm, sortBy, videos]);

  if (error) return <div className="text-center mt-8 text-white">Error: {error}</div>;

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <Header setSearchTerm={setSearchTerm} />
      <main className="flex-grow pt-16">
        {showWelcome && (
          <div className="bg-green-500 text-white p-4 text-center">
            Welcome back, {data?.username}!
          </div>
        )}
        <div className="container mx-auto p-4">
          <div className="mb-4 flex justify-end">
            <label htmlFor="sort" className="mr-2">Sort by:</label>
            <select
              id="sort"
              value={sortBy}
              onChange={handleSortChange}
              className="border border-gray-300 rounded-lg p-2 text-black"
            >
              <option value="">Select</option>
              <option value="title-asc">Title (A-Z)</option>
              <option value="title-desc">Title (Z-A)</option>
              <option value="date-asc">Date (Oldest first)</option>
              <option value="date-desc">Date (Newest first)</option>
            </select>
          </div>
          {filteredVideos.length === 0 ? (
            <div className="text-center text-gray-600">No videos found</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredVideos.map((video) => (
                <div key={video._id} className="bg-black p-4 shadow rounded-lg relative border border-white">
                  <video
                    controls
                    src={video.url}
                    className="w-full h-48 object-cover mb-2"
                    onEnded={() => handleVideoPlaybackCompletion(video._id)}
                    onClick={() => handleVideoClick(video._id)}
                  />
                  <h3 className="text-lg font-semibold text-white">{video.title}</h3>
                  <p className="text-gray-400">{video.description}</p>
                  <p className="text-gray-400 flex items-center"><FiEye className="mr-1" />{video.playCount}</p>
                  <button
                    onMouseDown={() => handleMouseDown(video._id)}
                    onMouseUp={handleMouseUp}
                    className="absolute bottom-2 right-2 bg-red-600 text-white p-2 rounded-full hover:bg-red-700"
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
      <ScrollToTopButton />
    </div>
  );
};

export default RegularUser;
