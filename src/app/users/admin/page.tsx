"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { toast } from "react-hot-toast";
import Header from "./_components/Header";
import Footer from "../../../components/Footer";
import Loader from "../../../components/Loader";

interface Video {
  _id: string;
  url: string;
  title: string;
  description: string;
  creator: string;
}

const UserProfile: React.FC = ({ params }: any) => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get("/api/videos/getallvideos");
        setVideos(response.data.data);
        setLoading(false);
      } catch (error: any) {
        toast.error("Failed to fetch videos");
        console.error("Failed to fetch videos:", error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  if (loading) return <div><Loader/></div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <div>
        <Header />
      </div>

      <main className="flex flex-col items-center justify-between p-4">
        {videos.length === 0 ? (
          <div>No videos available</div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full max-w-5xl p-4">
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

export default UserProfile;
