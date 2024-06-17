"use client"
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Header from "./_components/Header";
import Footer from "../../../components/Footer";
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

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout successful");
      router.push("/auth/signin");
    } catch (error) {
      toast.error("Logout failed");
    }
  };

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
                <div key={video._id} className="bg-white p-4 shadow rounded-lg">
                  <video
                    controls
                    src={video.url}
                    className="w-full h-48 object-cover mb-2"
                    onEnded={() => handleVideoPlaybackCompletion(video._id)}
                    onClick={() => handleVideoClick(video._id)}
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

export default RegularUser;
