"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { toast } from "react-hot-toast";
import Header from "./_components/Header";
import Footer from "../../../components/Footer";

interface Video {
  _id: string;
  url: string;
  title: string;
  description: string;
  creator: string;
}

const StudentProfile: React.FC = () => {
  const [data, setData] = useState<string | null>(null);
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout successful");
      window.location.href = "/auth/signin";
    } catch (error: any) {
      console.error(error.message);
      toast.error(error.message);
    }
  };

  const getUserDetails = async () => {
    try {
      const res = await axios.get("/api/users/me");
      console.log(res.data);
      setData(res.data.data._id);
    } catch (error: any) {
      console.error(error.message);
      toast.error(error.message);
    }
  };

  const fetchVideos = async () => {
    try {
      const response = await axios.get("/api/videos/getallvideos");
      setVideos(response.data.data);
      setLoading(false);
    } catch (error: any) {
      setError(error.message);
      setLoading(false);
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
      <div>
        <Header />
      </div>
      <div>
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
    </div>
  );
};

export default StudentProfile;
