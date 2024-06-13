"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Header from "./_components/Header";
import Footer from "../../../components/Footer";

interface Video {
  title: string;
  description: string;
  _id: string;
  url: string;
}

interface UserData {
  // Define the user data structure here
}

export default function RegularUser() {
  const router = useRouter();
  const [data, setData] = useState<UserData | null>(null);
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
      await axios.post("/api/videos/playcount", { videoId }); // Adjusted to increment play count
      toast.success("Play count updated!");
      fetchVideos(); // Refresh videos to get the updated play count
    } catch (error) {
      console.error("Error updating play count:", error);
      toast.error("Failed to update play count");
    }
    try {
      await axios.post("/api/videos/playback", { videoId });
      toast.success("Credits have been awarded!");
      fetchVideos();
    } catch (error) {
      console.error("Error updating balance:", error);
      toast.error("Failed to update balance");
    }
  };

  useEffect(() => {
    getUserDetails();
    fetchVideos();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <Header />
      <main className="flex flex-col items-center justify-center p-4">
        {videos.length === 0 ? (
          <div className="text-xl font-semibold text-gray-600">No videos available</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 w-full max-w-screen-xl p-4">
            {videos.map((video) => (
              <div key={video._id} className="relative group h-96 overflow-hidden rounded-lg shadow-md">
                <video
                  className="object-cover w-full h-full transition-transform transform group-hover:scale-105"
                  src={video.url}
                  controls
                  onEnded={() => handleVideoPlaybackCompletion(video._id)}
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 transition-opacity group-hover:opacity-100 bg-black bg-opacity-50 text-white">
                  <p className="text-lg font-semibold">{video.title}</p>
                  <p className="text-sm">{video.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
