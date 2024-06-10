"use client"
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Header from "./_components/Header";
import Footer from "../../../components/Footer";

export default function RegularUser() {
  const router = useRouter();
  const [data, setData] = useState({});
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout successful");
      router.push("/login");
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const getUserDetails = async () => {
    try {
      const res = await axios.get("/api/users/me");
      setData(res.data.data);
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const fetchVideos = async () => {
    try {
      const response = await axios.get("/api/videos");
      setVideos(response.data.data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const handleVideoPlaybackCompletion = async (videoId) => {
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
      <main className="flex flex-col items-center justify-between p-4">
        <button onClick={logout} className="mb-4">Logout</button>
        {videos.length === 0 ? (
          <div>No videos available</div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full max-w-5xl p-4">
            {videos.map((video) => (
              <div key={video._id} className="relative h-48 sm:h-64">
                <video
                  className="object-cover w-full h-full"
                  src={video.url}
                  controls
                  onEnded={() => handleVideoPlaybackCompletion(video._id)}
                />
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
