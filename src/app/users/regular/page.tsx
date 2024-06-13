"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Header from "./_components/Header";
import Footer from "../../../components/Footer";

interface Video {
  createdAt: string | number | Date;
  _id: string;
  title: string;
  description: string;
  url: string;
  playCount: number;
}

interface UserData {
  username: string;
}

const RegularUser: React.FC = () => {
  const router = useRouter();
  const [data, setData] = useState<UserData | null>(null);
  const [videos, setVideos] = useState<Video[]>([]);
  const [filteredVideos, setFilteredVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("");

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout successful");
      router.push("/login");
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
      setLoading(false);
    } catch (error) {
      toast.error("Failed to fetch videos");
      setError("Failed to fetch videos");
      setLoading(false);
    }
  };

  const handleVideoPlaybackCompletion = async (videoId: string) => {
    try {
      await axios.post("/api/videos/playback", { videoId });
      toast.success("Credits have been awarded!");
      fetchVideos();
    } catch (error) {
      console.error("Error updating balance:", error);
      toast.error("Failed to update balance");
    }
  };

  const handleVideoClick = async (videoId: string) => {
    try {
      await axios.post("/api/videos/playcount", { videoId });
      toast.success("Play count updated!");
      fetchVideos();
    } catch (error) {
      console.error("Error updating play count:", error);
      toast.error("Failed to update play count");
    }
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    filterVideos(event.target.value);
  };

  const filterVideos = (term: string) => {
    if (!term) {
      setFilteredVideos(videos);
    } else {
      const filtered = videos.filter((video) =>
        video.title.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredVideos(filtered);
    }
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(event.target.value);
    sortVideos(event.target.value);
  };

  const sortVideos = (sortType: string) => {
    let sortedVideos = [...filteredVideos];
    switch (sortType) {
      case "title-asc":
        sortedVideos.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "title-desc":
        sortedVideos.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case "date-asc":
        sortedVideos.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
        break;
      case "date-desc":
        sortedVideos.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      default:
        break;
    }
    setFilteredVideos(sortedVideos);
  };

  useEffect(() => {
    getUserDetails();
    fetchVideos();
  }, []);

  useEffect(() => {
    filterVideos(searchTerm);
    sortVideos(sortBy);
  }, [searchTerm, sortBy]);

  if (loading) return <div className="text-center mt-8">Loading...</div>;
  if (error) return <div className="text-center mt-8">Error: {error}</div>;

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 p-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-semibold text-gray-800">Welcome, {data?.username}</h1>
            <button
              onClick={logout}
              className="px-4 py-2 bg-red-500 text-white rounded shadow hover:bg-red-600"
            >
              Logout
            </button>
          </div>
          <div className="mb-4 flex items-center space-x-4">
            <input
              type="text"
              placeholder="Search videos by title"
              value={searchTerm}
              onChange={handleSearch}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 flex-1"
            />
            <select
              value={sortBy}
              onChange={handleSortChange}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            >
              <option value="">Sort by...</option>
              <option value="title-asc">Title A-Z</option>
              <option value="title-desc">Title Z-A</option>
              <option value="date-asc">Oldest First</option>
              <option value="date-desc">Newest First</option>
            </select>
          </div>
          {filteredVideos.length === 0 ? (
            <div className="text-center text-gray-600">No videos found</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredVideos.map((video) => (
                <div key={video._id} className="relative group">
                  <video
                    className="object-cover w-full h-64 rounded-lg shadow-md transition-transform transform group-hover:scale-105"
                    src={video.url}
                    controls
                    onClick={() => handleVideoClick(video._id)}
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 transition-opacity group-hover:opacity-100 bg-black bg-opacity-50 text-white">
                    <p className="text-lg font-semibold">{video.title || "Untitled"}</p>
                    <p className="text-sm">{video.description || "No description provided"}</p>
                  </div>
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
