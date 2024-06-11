"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import Header from '../_components/Header';
import Footer from '../../../../components/Footer';

export default function UserProfile({ params }: any) {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const res = await axios.get("/api/videos");
      const videos = res.data.data;

      setVideos(videos);
    } catch (error) {
      toast.error("Failed to fetch videos");
    }
  };

  return (
    <div>
      <Header />
      <main className="p-4">
        {videos.length === 0 ? (
          <div className="text-center text-white">
            <p>No videos available</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {videos.map((video) => (
              <div key={video._id} className="relative h-48 sm:h-64">
                <video
                  className="object-cover w-full h-full"
                  src={video.url}
                  controls
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
