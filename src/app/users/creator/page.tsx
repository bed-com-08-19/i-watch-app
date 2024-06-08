"use client";
import React, { useState, useEffect, ChangeEvent } from "react";
import axios from "axios";
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

const StudentProfile: React.FC = () => {
  const [data, setData] = useState<string | null>(null);
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [playbackId, setPlaybackId] = useState<string | null>(null);

  const handleVideoUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    try {
      // Get the upload URL from the server
      const response = await fetch('/api/upload', {
        method: 'POST',
      });

      const { uploadUrl } = await response.json();

      // Upload the video file to Mux
      const uploadResponse = await fetch(uploadUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'video/*',
        },
        body: file,
      });

      if (uploadResponse.ok) {
        // Fetch the newly uploaded video data
        const uploadData = await uploadResponse.json();
        const playbackId = uploadData.playback_id; // Assuming playback_id is part of the response
        setPlaybackId(playbackId);
        toast.success('Video uploaded successfully!');
      } else {
        throw new Error('Video upload failed');
      }
    } catch (error) {
      console.error(error);
      toast.error('Video upload failed');
    }
  };

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
      const response = await axios.get("/api/videos");
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

  if (loading) return <div><Loader/></div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <Header />
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

export default StudentProfile;
